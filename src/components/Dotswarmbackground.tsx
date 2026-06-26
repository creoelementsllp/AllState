import { useEffect, useRef, type RefObject } from 'react';

// ── DotSwarmBackground ─────────────────────────────────────────────────
// Recreates the "Google Antigravity" effect: a sparse grid of neutral dots
// swept by colored "comets" drifting in slow looping paths. Any dot near a
// comet lights up with that comet's color and grows slightly, fading back
// to neutral gray as the comet moves away.
//
// hoverReveal mode: the whole canvas stays invisible at rest. The moment
// the pointer enters the parent section, the canvas fades in (grid +
// comets together) and starts animating; it fades back out a beat after
// the pointer leaves. Pass the section's ref as `hoverTargetRef` so the
// listener covers the entire section, not just the canvas itself.
// ───────────────────────────────────────────────────────────────────────

interface DotSwarmBackgroundProps {
  className?: string;
  dotSpacing?: number;
  baseColor?: string;
  hoverReveal?: boolean;
  hoverTargetRef?: RefObject<HTMLElement>;
  fadeMs?: number;
}

const DEFAULT_COMETS = [
  { color: '79, 70, 229' },   // indigo/purple
  { color: '37, 99, 235' },   // blue
  { color: '219, 39, 119' },  // pink
  { color: '217, 119, 6' },   // amber/orange
];

export default function DotSwarmBackground({
  className = '',
  dotSpacing = 26,
  baseColor = '180, 188, 201',
  hoverReveal = false,
  hoverTargetRef,
  fadeMs = 450,
}: DotSwarmBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const opacityRef = useRef(hoverReveal ? 0 : 1);
  const targetOpacityRef = useRef(hoverReveal ? 0 : 1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const hoverTarget = hoverTargetRef?.current ?? canvas.parentElement ?? canvas;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: { x: number; y: number }[] = [];
    let rafId = 0;
    let t = 0;

    const comets = DEFAULT_COMETS.map((c, i) => ({
      color: c.color,
      angle: (i / DEFAULT_COMETS.length) * Math.PI * 2,
      speed: 0.00022 + i * 0.00006,
      radiusX: 0.32 + i * 0.07,
      radiusY: 0.38 + (i % 2) * 0.1,
      offsetPhase: i * 1.7,
      wobble: 0.18 + i * 0.05,
      glowRadius: 150 + i * 18,
    }));

    function buildDots() {
      dots = [];
      const cols = Math.ceil(width / dotSpacing) + 1;
      const rows = Math.ceil(height / dotSpacing) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: c * dotSpacing, y: r * dotSpacing });
        }
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    }

    function frame() {
      t += 1;

      const target = targetOpacityRef.current;
      const current = opacityRef.current;
      if (Math.abs(target - current) > 0.001) {
        const step = 1000 / 60 / fadeMs;
        opacityRef.current = current + (target - current) * Math.min(step * 4, 1);
      } else {
        opacityRef.current = target;
      }

      ctx!.clearRect(0, 0, width, height);

      const visibleOpacity = opacityRef.current;
      const stillFullyHidden = hoverReveal && visibleOpacity < 0.004;

      if (!stillFullyHidden) {
        const cometPositions = comets.map((cm) => {
          const angle = t * cm.speed + cm.angle;
          const wob = Math.sin(t * 0.006 + cm.offsetPhase) * cm.wobble;
          const cx = width * (0.5 + Math.cos(angle) * cm.radiusX);
          const cy = height * (0.5 + Math.sin(angle * 1.3 + wob) * cm.radiusY);
          return { x: cx, y: cy, color: cm.color, glow: cm.glowRadius };
        });

        const mouse = mouseRef.current;

        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          let r = 1.4;
          let colorStr = `rgba(${baseColor}, ${(0.45 * visibleOpacity).toFixed(3)})`;
          let strongest = 0;

          for (let j = 0; j < cometPositions.length; j++) {
            const cp = cometPositions[j];
            const dx = dot.x - cp.x;
            const dy = dot.y - cp.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < cp.glow) {
              const proximity = 1 - dist / cp.glow;
              if (proximity > strongest) {
                strongest = proximity;
                const eased = Math.pow(proximity, 1.6);
                const alpha = (0.18 + eased * 0.75) * visibleOpacity;
                colorStr = `rgba(${cp.color}, ${alpha.toFixed(3)})`;
                r = 1.4 + eased * 2.2;
              }
            }
          }

          const mdx = dot.x - mouse.x;
          const mdy = dot.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 90) {
            const mProx = 1 - mDist / 90;
            r += mProx * 1.1;
          }

          ctx!.beginPath();
          ctx!.fillStyle = colorStr;
          ctx!.arc(dot.x, dot.y, r, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
    function handleMouseLeaveCanvas() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }
    function handleHoverEnter() {
      targetOpacityRef.current = 1;
    }
    function handleHoverLeave() {
      targetOpacityRef.current = 0;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeaveCanvas);

    if (hoverReveal) {
      hoverTarget.addEventListener('mouseenter', handleHoverEnter);
      hoverTarget.addEventListener('mouseleave', handleHoverLeave);
    }

    if (!prefersReduced) {
      rafId = requestAnimationFrame(frame);
    } else {
      if (hoverReveal) {
        opacityRef.current = 0;
        targetOpacityRef.current = 0;
      }
      frame();
    }

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeaveCanvas);
      if (hoverReveal) {
        hoverTarget.removeEventListener('mouseenter', handleHoverEnter);
        hoverTarget.removeEventListener('mouseleave', handleHoverLeave);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [dotSpacing, baseColor, hoverReveal, hoverTargetRef, fadeMs]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}