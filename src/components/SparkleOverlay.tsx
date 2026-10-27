"use client";
import { useEffect, useRef } from "react";

export default function SparkleOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number | null = null;
    let isVisible = false;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      maxOpacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Create particles
    for (let i = 0; i < 32; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25 - 0.12,
        opacity: 0,
        fadeSpeed: Math.random() * 0.008 + 0.003,
        maxOpacity: Math.random() * 0.6 + 0.2,
      });
    }

    const animate = () => {
      if (!isVisible) {
        animationId = null;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.opacity += p.fadeSpeed;
        if (p.opacity >= p.maxOpacity) p.fadeSpeed = -Math.abs(p.fadeSpeed);
        if (p.opacity <= 0) {
          p.fadeSpeed = Math.abs(p.fadeSpeed);
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.maxOpacity = Math.random() * 0.6 + 0.2;
        }

        p.x += p.speedX;
        p.y += p.speedY;

        const alpha = Math.max(0, p.opacity);
        ctx.fillStyle = "#ffffff";

        // Soft halo without expensive GPU shadowBlur
        ctx.globalAlpha = alpha * 0.22;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.6, 0, Math.PI * 2);
        ctx.fill();

        // Core sparkle
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Cross sparkle lines
        if (p.size > 1.5) {
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 3, p.y);
          ctx.lineTo(p.x + p.size * 3, p.y);
          ctx.moveTo(p.x, p.y - p.size * 3);
          ctx.lineTo(p.x, p.y + p.size * 3);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible && animationId === null) {
          animationId = requestAnimationFrame(animate);
        } else if (!isVisible && animationId !== null) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (animationId !== null) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
    />
  );
}
