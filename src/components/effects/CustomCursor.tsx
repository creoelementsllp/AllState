import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px), (pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
    };

    const onEnter = () => gsap.to(ring, { scale: 1.8, opacity: 0.6, duration: 0.3 });
    const onLeave = () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });

    window.addEventListener('mousemove', onMove);

    const interactives = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent pointer-events-none"
        style={{ boxShadow: '0 0 12px rgba(56, 189, 248, 0.8)' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 pointer-events-none"
        style={{ boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)' }}
      />
    </div>
  );
}
