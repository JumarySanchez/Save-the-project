import React, { useEffect, useRef } from "react";

const MOUSE_RADIUS = 80;

function makeStars(width, height) {
  const count = Math.min(220, Math.max(60, Math.round((width * height) / 9000)));
  return Array.from({ length: count }, () => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    return {
      hx: x,
      hy: y,
      x,
      y,
      vx: 0,
      vy: 0,
      r: 0.35 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 1.6,
      hue: Math.random() < 0.35 ? "198,184,255" : "255,255,255",
    };
  });
}

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let stars = [];
    let frame = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = makeStars(width, height);
    }

    function render(time) {
      const t = time / 1000;
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        if (!reduceMotion) {
          const dx = s.x - mouse.x;
          const dy = s.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS && dist > 0.01) {
            const push = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.5;
            s.vx += (dx / dist) * push;
            s.vy += (dy / dist) * push;
          }
          s.vx += (s.hx - s.x) * 0.02;
          s.vy += (s.hy - s.y) * 0.02;
          s.vx *= 0.88;
          s.vy *= 0.88;
          s.x += s.vx;
          s.y += s.vy;
        }

        const dist = Math.hypot(s.x - mouse.x, s.y - mouse.y);
        const near = Math.max(0, 1 - dist / MOUSE_RADIUS);
        const twinkle = 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        const alpha = Math.min(1, 0.25 + twinkle * 0.55 + near * 0.25);
        const radius = s.r * (1 + near * 0.15);

        ctx.fillStyle = `rgba(${s.hue},${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop(time) {
      render(time);
      frame = requestAnimationFrame(loop);
    }

    function onMove(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onVisibility() {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduceMotion) frame = requestAnimationFrame(loop);
    }

    resize();
    if (reduceMotion) render(0);
    else frame = requestAnimationFrame(loop);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
    />
  );
}
