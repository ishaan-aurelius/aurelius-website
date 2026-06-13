"use client";
import { useEffect, useRef } from "react";

/**
 * Visceral "kill web" — a dense, alive network used behind the Why Now headline.
 *
 * Unlike the hero's SignalNetwork (faint, sparse, pinned to map dots), this is meant
 * to feel OVERWHELMING: many nodes, a thick proximity graph, threat-red nodes that
 * pulse, and packets racing along every edge. The eye can't find the exit — that
 * illegibility IS the argument. Colors are Aurelius tokens only; aria-hidden.
 */

const COLOR = {
  edge: "#2A3E55", // dark.border
  node: "#6A859A", // dark.low
  hi: "#A0B8C8", // dark.mid
  teal: "#4AAFB8",
  gold: "#C8A85C",
  red: "#D44040",
};

type Kind = "node" | "teal" | "gold" | "red";
type Node = { x: number; y: number; r: number; phase: number; kind: Kind };
type Edge = { a: number; b: number; len: number };
type Pulse = { edge: number; t: number; speed: number; col: string };

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

function pickKind(): Kind {
  const r = Math.random();
  if (r < 0.16) return "red";
  if (r < 0.28) return "gold";
  if (r < 0.4) return "teal";
  return "node";
}

export function KillWeb({ className = "" }: { className?: string }) {
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
    let pulses: Pulse[] = [];
    let raf = 0;

    const colorFor = (k: Kind) =>
      k === "red" ? COLOR.red : k === "gold" ? COLOR.gold : k === "teal" ? COLOR.teal : COLOR.node;

    function buildGraph() {
      // Dense scatter with a minimum spacing — more nodes than the hero, packed tight.
      const count = Math.max(28, Math.min(64, Math.round((W * H) / 9000)));
      const minSpace = Math.min(W, H) / 12;
      nodes = [];
      let guard = 0;
      while (nodes.length < count && guard < count * 40) {
        guard++;
        const x = Math.random() * W;
        const y = Math.random() * H;
        if (nodes.some((n) => Math.hypot(n.x - x, n.y - y) < minSpace)) continue;
        nodes.push({ x, y, r: 1.4 + Math.random() * 1.6, phase: Math.random() * Math.PI * 2, kind: pickKind() });
      }

      // Thick proximity graph: link each node to its 3 nearest neighbours.
      const maxDist = Math.min(W, H) / 2.4;
      const seen = new Set<string>();
      edges = [];
      nodes.forEach((n, i) => {
        nodes
          .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
          .filter((o) => o.j !== i && o.d < maxDist)
          .sort((p, q) => p.d - q.d)
          .slice(0, 3)
          .forEach(({ j, d }) => {
            const key = i < j ? `${i}-${j}` : `${j}-${i}`;
            if (seen.has(key)) return;
            seen.add(key);
            edges.push({ a: i, b: j, len: d });
          });
      });

      // Lots of packets — one per ~2 edges — so the web reads as frantic, not calm.
      const pulseCount = Math.min(40, Math.max(10, Math.round(edges.length / 2)));
      pulses = Array.from({ length: pulseCount }, spawnPulse);
    }

    function spawnPulse(): Pulse {
      const edge = Math.floor(Math.random() * edges.length);
      const len = edges[edge]?.len || 100;
      const roll = Math.random();
      const col = roll < 0.22 ? COLOR.red : roll < 0.4 ? COLOR.gold : COLOR.hi;
      return { edge, t: Math.random(), speed: (0.03 + Math.random() * 0.03) / Math.max(len, 1), col };
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

      // Edges — the tangled structure. Brighter than the hero so it reads as dense.
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(COLOR.edge, 0.5);
      edges.forEach((e) => {
        const a = nodes[e.a];
        const b = nodes[e.b];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // Nodes — threat reds pulse hard; others twinkle.
      nodes.forEach((n) => {
        const base = colorFor(n.kind);
        const beat = reduced ? 0.85 : 0.5 + 0.5 * Math.sin(time * (n.kind === "red" ? 0.004 : 0.0009) + n.phase);
        if (n.kind === "red") {
          // glow ring around threat nodes
          ctx.fillStyle = rgba(COLOR.red, 0.12 + 0.16 * beat);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 5 + 3 * beat, 0, Math.PI * 2);
          ctx.fill();
        }
        const alpha = (n.kind === "node" ? 0.45 : 0.7) * (0.6 + 0.4 * beat);
        ctx.fillStyle = rgba(base, alpha);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + (n.kind === "node" ? 0 : 0.6), 0, Math.PI * 2);
        ctx.fill();
      });

      // Packets — short bright streaks racing along edges.
      pulses.forEach((p) => {
        const e = edges[p.edge];
        if (!e) return;
        const a = nodes[e.a];
        const b = nodes[e.b];
        const head = p.t;
        const tail = Math.max(0, p.t - 0.22);
        const hx = a.x + (b.x - a.x) * head;
        const hy = a.y + (b.y - a.y) * head;
        const tx = a.x + (b.x - a.x) * tail;
        const ty = a.y + (b.y - a.y) * tail;
        const grad = ctx.createLinearGradient(tx, ty, hx, hy);
        grad.addColorStop(0, rgba(p.col, 0));
        grad.addColorStop(1, rgba(p.col, 0.7));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.stroke();
        ctx.fillStyle = rgba(p.col, 0.9);
        ctx.beginPath();
        ctx.arc(hx, hy, 1.3, 0, Math.PI * 2);
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
