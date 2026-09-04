import React, { useEffect, useRef } from 'react';

export const TelemetryCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    let angle = 0;
    const points: { x: number; y: number; alpha: number; size: number }[] = [];

    // Generate static telemetry nodes
    for (let i = 0; i < 24; i++) {
      points.push({
        x: Math.random(),
        y: Math.random(),
        alpha: 0.15 + Math.random() * 0.35,
        size: Math.random() > 0.8 ? 2 : 1
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle telemetry points & crosshairs
      points.forEach((pt) => {
        const px = pt.x * width;
        const py = pt.y * height;

        ctx.fillStyle = `rgba(0, 255, 102, ${pt.alpha * 0.4})`;
        ctx.fillRect(px, py, pt.size, pt.size);

        // Occasional tiny crosshair tick
        if (pt.size === 2) {
          ctx.strokeStyle = `rgba(0, 255, 102, ${pt.alpha * 0.25})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(px - 4, py);
          ctx.lineTo(px + 4, py);
          ctx.moveTo(px, py - 4);
          ctx.lineTo(px, py + 4);
          ctx.stroke();
        }
      });

      // Subtle radar angle sweep in bottom-right corner
      const radarCenterX = width - Math.min(width * 0.15, 120);
      const radarCenterY = Math.min(height * 0.25, 150);
      const radius = 60;

      if (width > 640) {
        // Outer concentric rings
        ctx.strokeStyle = 'rgba(0, 255, 102, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(radarCenterX, radarCenterY, radius, 0, Math.PI * 2);
        ctx.arc(radarCenterX, radarCenterY, radius * 0.5, 0, Math.PI * 2);
        ctx.stroke();

        // Cross axis
        ctx.beginPath();
        ctx.moveTo(radarCenterX - radius, radarCenterY);
        ctx.lineTo(radarCenterX + radius, radarCenterY);
        ctx.moveTo(radarCenterX, radarCenterY - radius);
        ctx.lineTo(radarCenterX, radarCenterY + radius);
        ctx.stroke();

        // Sweep vector
        ctx.save();
        ctx.translate(radarCenterX, radarCenterY);
        ctx.rotate(angle);
        const gradient = ctx.createLinearGradient(0, 0, radius, 0);
        gradient.addColorStop(0, 'rgba(0, 255, 102, 0.25)');
        gradient.addColorStop(1, 'rgba(0, 255, 102, 0.0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, 0, 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      angle += 0.012;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
      aria-hidden="true"
    />
  );
};
