"use client";

import { useEffect, useRef } from "react";

/**
 * Abstract signal network for the hero background.
 *
 * Design intent (DESIGN_SPEC.md §1): purposeful, "earned" motion that reads as a
 * live sensing / decision network over the world map — NOT a generic particle field.
 * Nodes are pinned to real land dots of the dotted world map, linked by a proximity
 * graph, and faint signal pulses travel along the edges toward the hero's focal point.
 * Slow + low-contrast so the headline stays dominant.
 *
 * Node positions reuse the same `background-size: cover` transform the CSS map div
 * uses, so the network nodes line up exactly with the visible map dots.
 *
 * Colors come only from the Aurelius tokens (tailwind.config.ts / color spec).
 */

const COLOR = {
  edge: "#2A3E55", // dark.border
  node: "#A0B8C8", // dark.mid
  hub: "#C8D4DE", // dark.hi
  pulse: "#C8D4DE", // dark.hi
  gold: "#C8A85C", // gold.DEFAULT
};

type Node = { x: number; y: number; r: number; hub: boolean; phase: number };
type Edge = { a: number; b: number; len: number };
type Pulse = { edge: number; t: number; speed: number; gold: boolean };

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

type Props = {
  /** Land-dot coordinates, normalized to 0..1 of the map viewBox. */
  points: { x: number; y: number }[];
  /** Map aspect ratio (viewBox width / height) — needed to match `cover`. */
  mapAspect: number;
};

export function SignalNetwork({ points, mapAspect }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;
    // Typed non-null aliases so the narrowing holds inside the nested closures below.
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;

    const focal = () => ({ x: W * 0.66, y: H * 0.43 });

    // Replicate `background-size: cover` for an image of ratio `mapAspect` in W×H.
    function coverTransform() {
      const s = Math.max(W / mapAspect, H);
      return { s, offX: (W - mapAspect * s) / 2, offY: (H - s) / 2 };
    }

    function buildGraph() {
      const f = focal();
      const { s, offX, offY } = coverTransform();

      // Map every land point to screen space; keep only those actually on-screen.
      const maxR = Math.hypot(W, H) * 0.5;
      const cand = [];
      for (const p of points) {
        const x = offX + p.x * mapAspect * s;
        const y = offY + p.y * s;
        if (x < 0 || x > W || y < 0 || y > H) continue;
        // Keep the left half (behind the headline) plain — no nodes or edges there.
        if (x < W * 0.5) continue;
        // Weight selection toward the focal point so nodes land where the map is visible.
        const w = Math.max(0.05, 1 - Math.hypot(x - f.x, y - f.y) / maxR);
        cand.push({ x, y, key: Math.pow(Math.random(), 1 / w) });
      }
      cand.sort((a, b) => b.key - a.key);

      // Pick a sparse, well-spaced subset as nodes.
      const count = Math.max(10, Math.min(18, Math.round((W * H) / 70000)));
      const minSpace = Math.min(W, H) / 7;
      nodes = [];
      for (const c of cand) {
        if (nodes.length >= count) break;
        if (nodes.some((n) => Math.hypot(n.x - c.x, n.y - c.y) < minSpace)) continue;
        nodes.push({ x: c.x, y: c.y, r: 1.6 + Math.random() * 1.1, hub: false, phase: Math.random() * Math.PI * 2 });
      }

      // Proximity graph: link each node to its 2 nearest neighbours within range.
      const maxDist = Math.min(W, H) / 3;
      const seen = new Set<string>();
      edges = [];
      nodes.forEach((n, i) => {
        nodes
          .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
          .filter((o) => o.j !== i && o.d < maxDist)
          .sort((p, q) => p.d - q.d)
          .slice(0, 2)
          .forEach(({ j, d }) => {
            const key = i < j ? `${i}-${j}` : `${j}-${i}`;
            if (seen.has(key)) return;
            seen.add(key);
            // Orient edge a->b so b is the endpoint closer to the focal point.
            const da = Math.hypot(nodes[i].x - f.x, nodes[i].y - f.y);
            const db = Math.hypot(nodes[j].x - f.x, nodes[j].y - f.y);
            const [a, b] = da > db ? [i, j] : [j, i];
            edges.push({ a, b, len: d });
          });
      });

      // Hub = best-connected nodes get a slightly larger, brighter dot.
      const deg = new Array(nodes.length).fill(0);
      edges.forEach((e) => {
        deg[e.a]++;
        deg[e.b]++;
      });
      deg.forEach((d, i) => {
        if (d >= 3) nodes[i].hub = true;
      });

      // Pulses: sparse, slow. One per ~4 edges, capped low.
      const pulseCount = Math.min(9, Math.max(4, Math.round(edges.length / 4)));
      pulses = Array.from({ length: pulseCount }, () => spawnPulse());
    }

    function spawnPulse(): Pulse {
      const edge = Math.floor(Math.random() * edges.length);
      const len = edges[edge]?.len || 100;
      return {
        edge,
        t: Math.random(),
        speed: (0.011 + Math.random() * 0.009) / Math.max(len, 1),
        gold: Math.random() < 0.2,
      };
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGraph();
      if (reduced) draw(0);
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, W, H);

      // Edges — faint, static structure.
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(COLOR.edge, 0.32);
      edges.forEach((e) => {
        const a = nodes[e.a];
        const b = nodes[e.b];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // Nodes — gentle twinkle, hubs a touch brighter. Pinned to the map dots.
      nodes.forEach((n) => {
        const tw = reduced ? 0.8 : 0.7 + 0.3 * (0.5 + 0.5 * Math.sin(time * 0.0004 + n.phase));
        ctx.fillStyle = rgba(n.hub ? COLOR.hub : COLOR.node, (n.hub ? 0.7 : 0.5) * tw);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.hub ? n.r + 0.6 : n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Pulses — a faint short packet drifting along the edge toward the focal point.
      pulses.forEach((p) => {
        const e = edges[p.edge];
        if (!e) return;
        const a = nodes[e.a];
        const b = nodes[e.b];
        const col = p.gold ? COLOR.gold : COLOR.pulse;
        const head = p.t;
        const tail = Math.max(0, p.t - 0.16);
        const hx = a.x + (b.x - a.x) * head;
        const hy = a.y + (b.y - a.y) * head;
        const tx = a.x + (b.x - a.x) * tail;
        const ty = a.y + (b.y - a.y) * tail;

        const grad = ctx.createLinearGradient(tx, ty, hx, hy);
        grad.addColorStop(0, rgba(col, 0));
        grad.addColorStop(1, rgba(col, 0.55));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        // glowing head
        ctx.fillStyle = rgba(col, 0.2);
        ctx.beginPath();
        ctx.arc(hx, hy, 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(col, 0.7);
        ctx.beginPath();
        ctx.arc(hx, hy, 1.1, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    let last = 0;
    function frame(time: number) {
      const dt = last ? Math.min(time - last, 50) : 16;
      last = time;
      pulses.forEach((p, i) => {
        p.t += p.speed * dt;
        if (p.t >= 1) pulses[i] = spawnPulse();
      });
      draw(time);
      raf = requestAnimationFrame(frame);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (!reduced) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [points, mapAspect]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80 [mask-image:radial-gradient(ellipse_at_72%_42%,black_0%,black_34%,transparent_72%)] [-webkit-mask-image:radial-gradient(ellipse_at_72%_42%,black_0%,black_34%,transparent_72%)]"
    />
  );
}
