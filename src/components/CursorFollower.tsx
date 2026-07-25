import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  max: number;
  alpha: number;
  speed: number;
}

const RIPPLE_COLOR = '0, 140, 170'; // teal accent, matches the site's interactive color

export default function CursorFollower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarsePointer || prefersReducedMotion) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const ripples: Ripple[] = [];
    let frameId: number;
    let lastMove = 0;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resizeCanvas();

    const addRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        max: Math.random() * 120 + 180,
        alpha: 0.18,
        speed: Math.random() * 0.25 + 0.18,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (Date.now() - lastMove > 18) {
        addRipple(e.clientX, e.clientY);
        lastMove = Date.now();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(${RIPPLE_COLOR}, ${r.alpha})`;
        ctx.lineWidth = 2 + r.radius * 0.025;
        ctx.stroke();
        r.radius += r.speed;
        r.alpha *= 0.985;
        if (r.radius > r.max || r.alpha < 0.02) {
          ripples.splice(i, 1);
        }
      }
      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="water-ripple-canvas" aria-hidden="true" />;
}
