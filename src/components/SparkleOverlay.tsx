"use client";
import { useEffect, useRef } from "react";

export default function SparkleOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
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
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 - 0.15,
        opacity: 0,
        fadeSpeed: Math.random() * 0.008 + 0.003,
        maxOpacity: Math.random() * 0.6 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Fade in/out
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

        // Draw sparkle
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = p.size * 4;
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
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - p.size * 3);
          ctx.lineTo(p.x, p.y + p.size * 3);
          ctx.stroke();
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
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
