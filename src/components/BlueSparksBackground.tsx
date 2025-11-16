import { useEffect, useRef } from "react";

// Beautiful, lightweight canvas-based blue sparks/embers background
// Uses the design token --neon-blue for color
export const BlueSparksBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const pageWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const pageHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body?.scrollHeight || 0,
        window.innerHeight || 0
      );
      canvas.width = Math.floor(pageWidth * dpr);
      canvas.height = Math.floor(pageHeight * dpr);
      canvas.style.width = `${pageWidth}px`;
      canvas.style.height = `${pageHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    // Observe parent size changes to cover full page height
    let ro: ResizeObserver | null = null;
    if ((window as any).ResizeObserver && canvas.parentElement) {
      ro = new ResizeObserver(() => resize());
      ro.observe(canvas.parentElement);
    }

    // Light purple glow color
    const cssColor = "260 60% 75%"; // Light purple HSL

    type Particle = { x: number; y: number; r: number; speed: number; alpha: number; initialAlpha: number; drift: number; waveOffset: number; waveSpeed: number };
    const particles: Particle[] = [];
    const maxParticles = 150; // Increased density

    const spawn = () => {
      const w = canvas.width;
      const h = canvas.height;
      particles.push({
        x: Math.random() * w,
        y: -Math.random() * h * 0.2,
        r: (Math.random() * 0.5 + 0.3) * dpr, // Much thinner, dot-like
        speed: (Math.random() * 0.25 + 0.25) * dpr, // Slower falling speed
        alpha: 0, // will be set based on progress
        initialAlpha: Math.random() * 0.4 + 0.7, // Even brighter glow
        drift: (Math.random() - 0.5) * 0.35 * dpr,
        waveOffset: Math.random() * Math.PI * 2,
        waveSpeed: Math.random() * 0.02 + 0.01,
      });
      if (particles.length > maxParticles) particles.shift();
    };

    for (let i = 0; i < maxParticles; i++) spawn();

    const step = () => {
      const w = canvas.width,
        h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speed;
        p.waveOffset += p.waveSpeed;
        // Add wave motion for organic movement
        p.x += p.drift + Math.sin(p.waveOffset) * 0.8 * dpr;

        // Natural fade throughout the journey with glow effect
        const progress = p.y / h; // 0 at top, 1 at bottom
        
        // Fade in at the start (0-10%)
        if (progress < 0.1) {
          p.alpha = p.initialAlpha * (progress / 0.1);
        } 
        // Full brightness in middle (10-75%)
        else if (progress < 0.75) {
          p.alpha = p.initialAlpha;
        } 
        // Natural dim and fade out (75-100%)
        else {
          const fadeProgress = (progress - 0.75) / 0.25;
          p.alpha = p.initialAlpha * (1 - fadeProgress * fadeProgress); // Quadratic for natural dimming
        }

        if (p.y - p.r > h + 10) {
          // recycle to the top
          particles[i] = {
            x: Math.random() * w,
            y: -p.r - Math.random() * h * 0.1,
            r: (Math.random() * 0.5 + 0.3) * dpr, // Much thinner, dot-like
            speed: (Math.random() * 0.25 + 0.25) * dpr, // Slower falling speed
            alpha: 0,
            initialAlpha: Math.random() * 0.4 + 0.7, // Even brighter glow
            drift: (Math.random() - 0.5) * 0.35 * dpr,
            waveOffset: Math.random() * Math.PI * 2,
            waveSpeed: Math.random() * 0.02 + 0.01,
          };
        }

        // Enhanced glow effect with light purple color
        const glowSize = p.r * 12; // Even larger glow for increased visibility
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        grad.addColorStop(0, `hsla(${cssColor} / ${Math.min(1, p.alpha * 1.3)})`); // Bright purple core
        grad.addColorStop(0.2, `hsla(${cssColor} / ${Math.min(1, p.alpha * 0.8)})`); // Strong glow
        grad.addColorStop(0.6, `hsla(${cssColor} / ${Math.min(1, p.alpha * 0.3)})`); // Extended soft glow
        grad.addColorStop(1, `hsla(${cssColor} / 0)`); // Fade to transparent
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // occasional new sparks
      if (Math.random() < 0.5) spawn();
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      ro?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full opacity-60"
    />
  );
};

export default BlueSparksBackground;
