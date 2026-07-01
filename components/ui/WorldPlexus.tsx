"use client";

import { useEffect, useRef } from "react";

/**
 * Full-map living plexus for the hero background, EDGES ONLY.
 *
 * The continents are formed by edge DENSITY, not by dots: every land point is meshed to
 * its nearest neighbours with thin additive lines, so dense interiors fill in as bright
 * landmass while sparse coasts stay wispy. No node dots are drawn.
 *
 * Motion (subtle, ambient, no cursor):
 *  - SHIMMER: each edge twinkles independently between its own trough and peak brightness,
 *    at its own slow random frequency / phase / intensity, like scattered glinting light.
 *  - FLOAT: each node drifts on a tiny, slow, random orbit (small bound) so the mesh
 *    wanders organically without the whole map sliding.
 *
 * Intensity is high at the periphery but DIMMED in a central ellipse where the hero
 * headline sits, so the copy stays legible without flattening the rest of the map.
 *
 * Per-frame, edges are bucketed by current brightness and each bucket stroked once.
 * Colors come only from the Aurelius spec tokens. aria-hidden / decorative.
 */

const COLOR = {
  line: "#6A859A", // dark.text-muted, dim edges
  glow: "#A0B8C8", // dark.text-secondary, brighter edges + soft halo
  hi: "#C8D4DE", // dark.text-primary, the brightest glints
};

const NB = 18; // brightness buckets
const MAX_A = 0.75; // alpha of the brightest bucket

// ─── Hero motion knobs — tune these two ─────────────────────────────
const FLOAT_AMP = 16; // max node drift in px (bigger = wider-swinging edges)
const FLOAT_SPEED = 2500; // base orbit period in ms (SMALLER = faster motion)
// ────────────────────────────────────────────────────────────────────

// ─── Rolling-wave knobs — one smooth band of brightness sweeping diagonally ──
// On top of the per-edge shimmer, edges brighten together in a single broad,
// smooth band that flows along the diagonal from the top-right toward the
// bottom-left — like sheen travelling across brushed velvet. A single sine
// (no second frequency) keeps it one coherent crest, never splitting. Brightness only.
const WAVE_BANDS = 0.8; // ~how many bands span the diagonal (smaller = one broader, smoother sweep)
const WAVE_SPEED = 8000; // ms for a crest to advance one full phase (SMALLER = faster)
// The sweep waveform is gently asymmetric: a broad, soft crest and a shorter trough.
const WAVE_FLOOR = 0.4; // trough multiplier — darkest the wave dims an edge (higher = never dark)
const WAVE_PEAK = 1.8; // crest multiplier — brightest the wave lifts an edge (higher = hotter)
const WAVE_SHAPE = 0.8; // <1 widens the bright crest & shortens the trough (1 = pure smooth sine)
// ────────────────────────────────────────────────────────────────────
const TAU = Math.PI * 2;
const WAVE_K1 = WAVE_BANDS * TAU; // band spatial frequency
const WAVE_OMEGA1 = TAU / WAVE_SPEED; // roll speed (rad/ms)

type Node = {
  hx: number; // home x (screen space, post-jitter)
  hy: number; // home y
  ax: number; // float amplitude x
  ay: number; // float amplitude y
  fx: number; // float angular frequency x (rad/ms)
  fy: number; // float angular frequency y
  px: number; // float phase x
  py: number; // float phase y
  x: number; // live x
  y: number; // live y
};
type Edge = {
  a: number;
  b: number;
  phase: number; // shimmer phase
  freq: number; // shimmer angular frequency (rad/ms)
  lo: number; // trough alpha
  hi: number; // peak alpha
  dim: number; // 0..1 central-falloff multiplier (low behind the headline)
};

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

type Props = {
  /** Land-dot coordinates, normalized to 0..1 of the map viewBox. */
  points: { x: number; y: number }[];
  /** Map aspect ratio (viewBox width / height), needed to match `cover`. */
  mapAspect: number;
  className?: string;
};

export function WorldPlexus({ points, mapAspect, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let raf = 0;

    const STEP = MAX_A / NB;
    // Per-bucket stroke style is fixed (alpha depends only on the bucket), so precompute.
    const bucketStyle: string[] = Array.from({ length: NB }, (_, b) => {
      const a = (b + 0.5) * STEP;
      const frac = b / (NB - 1);
      const col = frac > 0.8 ? COLOR.hi : frac > 0.48 ? COLOR.glow : COLOR.line;
      return rgba(col, a);
    });

    // Replicate `background-size: cover` for an image of ratio `mapAspect` in W×H.
    function coverTransform() {
      const s = Math.max(W / mapAspect, H);
      return { s, offX: (W - mapAspect * s) / 2, offY: (H - s) / 2 };
    }

    // Central falloff: ~0.15 behind the headline ellipse, ramping to 1 at the periphery.
    function centreDim(x: number, y: number) {
      const cx = W * 0.5;
      const cy = H * 0.52;
      const rx = W * 0.46;
      const ry = H * 0.3;
      const dn = Math.hypot((x - cx) / rx, (y - cy) / ry);
      return 0.15 + 0.85 * smoothstep(0.35, 1, dn);
    }

    function buildGraph() {
      const { s, offX, offY } = coverTransform();

      const m = 40;
      const proj: Node[] = [];
      for (const p of points) {
        const x = offX + p.x * mapAspect * s;
        const y = offY + p.y * s;
        if (x < -m || x > W + m || y < -m || y > H + m) continue;
        proj.push({ hx: x, hy: y, ax: 0, ay: 0, fx: 0, fy: 0, px: 0, py: 0, x, y });
      }
      nodes = proj;
      if (nodes.length === 0) {
        edges = [];
        return;
      }

      // Estimate local point spacing from a sample of nearest-neighbour distances.
      let spacing = Math.min(W, H) / 60;
      {
        const sample = Math.min(80, nodes.length);
        const dists: number[] = [];
        for (let s2 = 0; s2 < sample; s2++) {
          const i = Math.floor((s2 / sample) * nodes.length);
          const ni = nodes[i];
          let best = Infinity;
          for (let j = 0; j < nodes.length; j++) {
            if (j === i) continue;
            const d = Math.hypot(nodes[j].hx - ni.hx, nodes[j].hy - ni.hy);
            if (d < best) best = d;
          }
          if (best < Infinity) dists.push(best);
        }
        if (dists.length) {
          dists.sort((a, b) => a - b);
          spacing = dists[Math.floor(dists.length / 2)] || spacing;
        }
      }

      // Break the regular dotted grid into an organic point cloud.
      const jitter = spacing * 0.95;
      const floatAmp = Math.min(spacing * 0.9, FLOAT_AMP);
      for (const n of nodes) {
        n.hx += (Math.random() - 0.5) * jitter;
        n.hy += (Math.random() - 0.5) * jitter;
        n.x = n.hx;
        n.y = n.hy;
        // Per-node float, small bounded orbit, slow, fully desynced.
        n.ax = floatAmp * (0.5 + Math.random() * 0.9);
        n.ay = floatAmp * (0.5 + Math.random() * 0.9);
        n.fx = (2 * Math.PI) / (FLOAT_SPEED + Math.random() * (FLOAT_SPEED * 1.8));
        n.fy = (2 * Math.PI) / (FLOAT_SPEED + Math.random() * (FLOAT_SPEED * 1.8));
        n.px = Math.random() * Math.PI * 2;
        n.py = Math.random() * Math.PI * 2;
      }

      const R = spacing * 3.1;
      const k = 11;

      // Spatial hash grid (cell = R) so neighbour search is ~O(n).
      const cell = Math.max(R, 1);
      const grid = new Map<string, number[]>();
      const key = (cx: number, cy: number) => `${cx},${cy}`;
      nodes.forEach((n, i) => {
        const gk = key(Math.floor(n.hx / cell), Math.floor(n.hy / cell));
        const bucket = grid.get(gk);
        if (bucket) bucket.push(i);
        else grid.set(gk, [i]);
      });

      const seen = new Set<number>();
      edges = [];
      const R2 = R * R;
      nodes.forEach((n, i) => {
        const cx = Math.floor(n.hx / cell);
        const cy = Math.floor(n.hy / cell);
        const near: { j: number; d: number }[] = [];
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            const bucket = grid.get(key(gx, gy));
            if (!bucket) continue;
            for (const j of bucket) {
              if (j === i) continue;
              const dx = nodes[j].hx - n.hx;
              const dy = nodes[j].hy - n.hy;
              const d2 = dx * dx + dy * dy;
              if (d2 > R2) continue;
              near.push({ j, d: Math.sqrt(d2) });
            }
          }
        }
        near.sort((p, q) => p.d - q.d);
        for (let t = 0; t < Math.min(k, near.length); t++) {
          const j = near[t].j;
          const ek = i < j ? i * 65536 + j : j * 65536 + i;
          if (seen.has(ek)) continue;
          seen.add(ek);
          const nb = nodes[j];
          // Wider, more random shimmer: peak intensity, rate, and twinkle depth all vary.
          const peak = 0.18 + Math.random() * 0.42; // 0.18-0.60
          const period = 2200 + Math.random() * 12000; // 2.2s-14.2s
          const depth = 0.1 + Math.random() * 0.45; // how deep the trough goes
          edges.push({
            a: i,
            b: j,
            phase: Math.random() * Math.PI * 2,
            freq: (2 * Math.PI) / period,
            lo: peak * depth,
            hi: peak,
            dim: centreDim((n.hx + nb.hx) / 2, (n.hy + nb.hy) / 2),
          });
        }
      });
    }

    function resize() {
      // Cap DPR, at native 2× retina the canvas has 4× the pixels to stroke, which
      // dominates the cost of a dense edge mesh. 1.5 is plenty for a faint backdrop.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGraph();
      draw(0);
    }

    const paths: Path2D[] = Array.from({ length: NB }, () => new Path2D());

    function draw(time: number) {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      // FLOAT: live node positions = home + tiny slow orbit.
      const move = reduced ? 0 : 1;
      for (const n of nodes) {
        n.x = n.hx + move * n.ax * Math.sin(time * n.fx + n.px);
        n.y = n.hy + move * n.ay * Math.sin(time * n.fy + n.py);
      }

      // SWEEP: precompute the rolling-band time offset once per frame. Each edge's
      // contribution then depends only on where its midpoint falls along the diagonal
      // axis, so neighbours brighten together in one smooth band that slides from the
      // top-right toward the bottom-left as `time` advances.
      const t1 = time * WAVE_OMEGA1;
      const invW = W > 0 ? 1 / W : 0;
      const invH = H > 0 ? 1 / H : 0;

      // Build halo + bucket geometry in one pass over live edges.
      const halo = new Path2D();
      for (let b = 0; b < NB; b++) paths[b] = new Path2D();
      for (const e of edges) {
        const wave = reduced ? 0.5 : 0.5 + 0.5 * Math.sin(time * e.freq + e.phase);
        const a = nodes[e.a];
        const nb = nodes[e.b];
        // Coherent rolling-wave multiplier. `proj` is the midpoint's distance along the
        // top-right → bottom-left diagonal (x decreasing + y increasing). The raw sine is
        // normalized to 0..1, then bent by WAVE_SHAPE (<1) so brightness lingers near the
        // crest and only briefly dips, and finally mapped onto FLOOR..PEAK. Brightness only.
        let sweep = 1;
        if (!reduced) {
          const mx = (a.x + nb.x) * 0.5 * invW;
          const my = (a.y + nb.y) * 0.5 * invH;
          const proj = (my - mx) * 0.7071; // unit diagonal: TR → BL
          const s = Math.sin(proj * WAVE_K1 - t1); // single smooth travelling wave
          const u = 0.5 + 0.5 * s; // 0..1 sinusoidal
          const shaped = Math.pow(u < 0 ? 0 : u > 1 ? 1 : u, WAVE_SHAPE);
          sweep = WAVE_FLOOR + (WAVE_PEAK - WAVE_FLOOR) * shaped;
        }
        const alpha = (e.lo + (e.hi - e.lo) * wave) * e.dim * sweep;
        let bi = (alpha / STEP) | 0;
        if (bi < 0) bi = 0;
        else if (bi >= NB) bi = NB - 1;
        halo.moveTo(a.x, a.y);
        halo.lineTo(nb.x, nb.y);
        const p = paths[bi];
        p.moveTo(a.x, a.y);
        p.lineTo(nb.x, nb.y);
      }

      // Soft continental halo, faint + wide, also dimmed centrally via the bucket dim.
      ctx.lineWidth = 1.7;
      ctx.strokeStyle = rgba(COLOR.glow, 0.05);
      ctx.stroke(halo);

      // Crisp shimmering core, one stroke per brightness bucket.
      ctx.lineWidth = 0.7;
      for (let b = 0; b < NB; b++) {
        ctx.strokeStyle = bucketStyle[b];
        ctx.stroke(paths[b]);
      }

      ctx.globalCompositeOperation = "source-over";
    }

    // Throttle to ~30fps, the shimmer/float are slow enough that 60fps is wasted work.
    const FRAME_MS = 1000 / 30;
    let lastDraw = 0;
    function frame(time: number) {
      raf = requestAnimationFrame(frame);
      if (time - lastDraw < FRAME_MS) return;
      lastDraw = time;
      draw(time);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Only animate while the hero is actually on-screen, frees the CPU once the user
    // scrolls past it instead of running a heavy rAF loop for the whole page.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced) {
          if (!raf) raf = requestAnimationFrame(frame);
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [points, mapAspect]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-[0.92] ${className}`}
    />
  );
}
