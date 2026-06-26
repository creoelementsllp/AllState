import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../hooks/useLenisScroll';
import { HOME_STATS, GROUP_COMPANIES, SITE_META } from '../data';

// ─── Cursor magnetic blob ───────────────────────────────────────────────────
function CursorBlob() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 25, stiffness: 120 });
  const springY = useSpring(y, { damping: 25, stiffness: 120 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      style={{ left: springX, top: springY }}
      className="pointer-events-none fixed z-0 w-[400px] h-[400px] rounded-full"
      aria-hidden
    >
      <div
        className="w-full h-full rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, #8b5cf6 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
    </motion.div>
  );
}

// ─── Magnetic + shimmer headline word ────────────────────────────────────────
function MagneticWord({
  children,
  delay,
  className,
  shimmer = false,
}: {
  children: string;
  delay: number;
  className?: string;
  shimmer?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 200;
      if (dist < maxDist) {
        const strength = (1 - dist / maxDist) * 14;
        x.set((dx / dist) * strength);
        y.set((dy / dist) * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.span
      ref={ref}
      style={{ x: springX, y: springY, display: 'block' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        'relative inline-block cursor-default select-none transition-all duration-300',
        hovered ? 'scale-[1.03]' : 'scale-100',
        shimmer ? 'shimmer-text' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Underline accent that slides in on hover */}
      {/* <span
        className="absolute bottom-0 left-0 h-[3px] rounded-full transition-all duration-500 ease-out"
        style={{
          width: hovered ? '100%' : '0%',
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
        }}
      /> */}
      {children}
    </motion.span>
  );
}

// ─── Dot grid that reacts to cursor ─────────────────────────────────────────
function ReactiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    const DOT_GAP = 36;
    const DOT_R = 1.5;
    const INFLUENCE = 120;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / DOT_GAP) + 1;
      const rows = Math.ceil(canvas.height / DOT_GAP) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * DOT_GAP;
          const by = r * DOT_GAP;
          const dx = mouse.current.x - bx;
          const dy = mouse.current.y - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = Math.max(0, 1 - dist / INFLUENCE);
          const ox = dx * t * 0.35;
          const oy = dy * t * 0.35;
          const alpha = 0.12 + t * 0.55;
          const radius = DOT_R + t * 2.5;
          ctx.beginPath();
          ctx.arc(bx + ox, by + oy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

// ─── Tilt stat card ──────────────────────────────────────────────────────────
function StatCard({
  value,
  suffix,
  label,
}: {
  value: string | number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRX = useSpring(rotX, { stiffness: 300, damping: 20 });
  const sRY = useSpring(rotY, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotX.set(-y * 18);
    rotY.set(x * 18);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        rotX.set(0);
        rotY.set(0);
      }}
      style={{
        rotateX: sRX,
        rotateY: sRY,
        transformStyle: 'preserve-3d',
        perspective: 600,
      }}
      className="group relative rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 p-5 text-center cursor-default select-none"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, transparent 60%)',
        }}
      />
      <div className="font-display text-2xl md:text-3xl font-bold text-indigo-600">
        {value}
        {suffix}
      </div>
      <div className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-medium">
        {label}
      </div>
    </motion.div>
  );
}

// ─── Main Hero ───────────────────────────────────────────────────────────────
export default function Hero() {
  const [hoveredPill, setHoveredPill] = useState<string | null>(null);

  return (
    <>
      {/* Shimmer keyframes injected once */}
      <style>{`
        @keyframes shimmerMove {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-text {
          background: linear-gradient(
            90deg,
            #0f172a 0%,
            #0f172a 30%,
            #6366f1 50%,
            #8b5cf6 55%,
            #0f172a 70%,
            #0f172a 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .shimmer-text:hover {
          animation: shimmerMove 1.2s linear infinite;
        }
      `}</style>

      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center bg-white text-slate-900 overflow-hidden"
        aria-label="Hero"
      >
        {/* Ambient cursor blob */}
        <CursorBlob />

        {/* Interactive dot grid */}
        <ReactiveGrid />

        {/* Top gradient bar */}
        {/* <div
          className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)' }}
        /> */}

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-32 pb-24 w-full">
          <div className="flex flex-col items-center text-center">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="block w-8 h-px bg-indigo-500" />
              <span className="text-xs uppercase tracking-[0.2em] text-indigo-500 font-semibold">
                Since {SITE_META.founded}
              </span>
              <span className="block w-8 h-px bg-indigo-500" />
            </motion.div>

            {/* Headline — centered, magnetic + hover shimmer on last word */}
            <h1 className="font-display font-bold leading-[0.92] tracking-tight mb-8 pb-3">
              <div className="text-6xl sm:text-7xl md:text-8xl text-slate-900 overflow-visible pb-3">
                <MagneticWord delay={0.1}>Building</MagneticWord>
              </div>
              <div className="text-6xl sm:text-7xl md:text-8xl text-slate-900 overflow-visible pb-3">
                <MagneticWord delay={0.25}>Industry</MagneticWord>
              </div>
              <div className="text-6xl sm:text-7xl md:text-8xl overflow-visible pb-3">
                <MagneticWord delay={0.4} shimmer>
                  Excellence
                </MagneticWord>
              </div>
            </h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-500 max-w-xl mb-10 leading-relaxed"
            >
              {SITE_META.tagline} — India's diversified industrial conglomerate spanning
              engineering, manufacturing, IT, real estate, and finance.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center mb-14"
            >
              <button
                type="button"
                onClick={() => scrollToSection('#companies')}
                className="group inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 active:scale-95"
              >
                Explore Group
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('#about')}
                className="group inline-flex items-center gap-2 border border-slate-200 text-slate-600 text-sm font-semibold px-6 py-3.5 rounded-full hover:border-indigo-400 hover:text-indigo-600 transition-colors active:scale-95"
              >
                Our Story
              </button>
            </motion.div>

            {/* Stats */}
            {/* <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full max-w-2xl"
              style={{ perspective: 1000 }}
            >
              {HOME_STATS.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </motion.div> */}

            {/* Company pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap gap-2 justify-center"
            >
              {GROUP_COMPANIES.slice(0, 6).map((company) => (
                <a
                  key={company.id}
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredPill(company.id)}
                  onMouseLeave={() => setHoveredPill(null)}
                  className="relative inline-flex items-center px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 overflow-hidden"
                  style={{
                    borderColor: hoveredPill === company.id ? '#6366f1' : '#e2e8f0',
                    color: hoveredPill === company.id ? '#6366f1' : '#64748b',
                    background:
                      hoveredPill === company.id ? 'rgba(99,102,241,0.06)' : '#fff',
                    transform: hoveredPill === company.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {company.name.split(' ')[0]}
                </a>
              ))}
              <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium border border-slate-200 text-slate-400 bg-white">
                +3 more
              </span>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          onClick={() => scrollToSection('#about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-indigo-500 transition-colors"
          aria-label="Scroll to about"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </section>
    </>
  );
}