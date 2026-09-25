"use client";

import { useEffect, useRef } from "react";
import dots from "@/data/dodo-dots.json";

type Props = { label?: string };

// Le dodo du logo redessiné en matrice de points.
// Les points s'écartent et s'allument sous le curseur (ou le doigt),
// quelques-uns clignotent, une ligne de balayage descend en continu.
export function DodoMatrix({ label = "Le logo Cyber-Dodo en points lumineux" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#26BECA";
    const light = "#E8F1F2";
    const pts = dots.pts as [number, number][];
    const blink = pts.map((_, k) => ((k * 7919) % 13 === 0 ? ((k * 37) % 26) / 10 : -1));

    let W = 0, H = 0, cell = 0, ox = 0, oy = 0;
    let mx = -9999, my = -9999, cx = -9999, cy = -9999, amp = 0, hover = false;
    let raf = 0, visible = true;
    const start = performance.now();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.min(W / (dots.cols + 4), H / (dots.rows + 4));
      ox = (W - dots.cols * cell) / 2 + cell / 2;
      oy = (H - dots.rows * cell) / 2 + cell / 2;
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      amp += ((hover ? 1 : 0) - amp) * 0.15;
      cx += (mx - cx) * 0.3;
      cy += (my - cy) * 0.3;
      ctx.clearRect(0, 0, W, H);
      const R = cell * 9, r = cell * 0.34;
      for (let k = 0; k < pts.length; k++) {
        let x = ox + pts[k][0] * cell, y = oy + pts[k][1] * cell;
        let color = accent, alpha = 1;
        if (amp > 0.005) {
          const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy) || 1;
          if (d < R) {
            const f = Math.pow(1 - d / R, 2) * cell * 3.2 * amp;
            x += (dx / d) * f; y += (dy / d) * f;
            if (d < R * 0.45) color = light;
          }
        }
        if (!reduce && blink[k] >= 0) alpha = 0.18 + 0.82 * (0.5 + 0.5 * Math.cos(((t + blink[k]) / 2.6) * Math.PI * 2));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) {
        const sy = (((t % 5.5) / 5.5) * 1.2 - 0.1) * H;
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = accent;
        ctx.fillRect(0, sy, W, 1);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (reduce && !hover && amp < 0.005) return;
      draw(now);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      if (amp < 0.05) { cx = mx; cy = my; }
      hover = true;
    };
    const onLeave = () => { hover = false; };

    resize();
    draw(performance.now());
    const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointercancel", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} role="img" aria-label={label} style={{ width: "100%", height: "100%", display: "block", touchAction: "pan-y" }} />;
}
