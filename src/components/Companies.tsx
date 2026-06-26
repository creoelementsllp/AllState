


import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, Globe, ChevronRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import { GROUP_COMPANIES, VERTICAL_COLORS } from '../data';
import type { GroupCompany } from '../types';

gsap.registerPlugin(ScrollTrigger);

/* ─── Vertical pill colours (text + border, on white bg) ──────────────── */
const PILL: Record<string, { text: string; bg: string; dot: string }> = {
  Technology:   { text: '#2563eb', bg: '#eff6ff', dot: '#3b82f6' },
  Finance:      { text: '#16a34a', bg: '#f0fdf4', dot: '#22c55e' },
  Real_Estate:  { text: '#b45309', bg: '#fffbeb', dot: '#f59e0b' },
  Healthcare:   { text: '#dc2626', bg: '#fef2f2', dot: '#ef4444' },
  Logistics:    { text: '#7c3aed', bg: '#f5f3ff', dot: '#8b5cf6' },
  Education:    { text: '#0891b2', bg: '#ecfeff', dot: '#06b6d4' },
  Energy:       { text: '#ea580c', bg: '#fff7ed', dot: '#f97316' },
  Retail:       { text: '#db2777', bg: '#fdf2f8', dot: '#ec4899' },
  Media:        { text: '#4f46e5', bg: '#eef2ff', dot: '#6366f1' },
};

const getPill = (vertical: string) =>
  PILL[vertical] ?? { text: '#374151', bg: '#f9fafb', dot: '#6b7280' };

/* ─── Fallback gradient for image placeholder ─────────────────────────── */
const GRAD: Record<string, string> = { ...(VERTICAL_COLORS as Record<string, string>) };
const getGrad = (v: string) => GRAD[v] ?? 'from-slate-400 to-slate-600';

/* ════════════════════════════════════════════════════════════════════════ */
/*  CompanyCard                                                             */
/* ════════════════════════════════════════════════════════════════════════ */
function CompanyCard({
  company,
  index,
  onClick,
}: {
  company: GroupCompany;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const pill = getPill(company.vertical);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  };

  return (
    <motion.article
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.18s ease-out, box-shadow 0.3s ease',
        boxShadow: hovered
          ? '0 20px 60px -10px rgba(0,0,0,0.13), 0 4px 16px -4px rgba(0,0,0,0.07)'
          : '0 2px 12px -2px rgba(0,0,0,0.07)',
      }}
      className="group relative cursor-pointer select-none rounded-4xl bg-white border border-slate-100 overflow-hidden flex flex-col h-full"
      role="button"
      tabIndex={0}
      aria-label={`View ${company.name}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* ── Image / placeholder ── */}
      <div className="relative overflow-hidden" style={{ height: 210 }}>
        {(company as any).imageUrl ? (
          <img
            src={(company as any).imageUrl}
            alt={company.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getGrad(company.vertical)}`}>
            {/* subtle noise */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <filter id={`n${index}`}>
                <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch"/>
                <feColorMatrix type="saturate" values="0"/>
              </filter>
              <rect width="100%" height="100%" filter={`url(#n${index})`}/>
            </svg>
            {/* monogram */}
            <span className="absolute inset-0 flex items-center justify-center text-white/20 font-black text-[90px] leading-none select-none">
              {company.name.charAt(0)}
            </span>
          </div>
        )}

        {/* scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* vertical badge */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{ color: pill.text, background: pill.bg }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: pill.dot }} />
            {company.vertical}
          </span>
        </div>

        {/* arrow button appears on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md"
        >
          <ArrowUpRight size={16} className="text-slate-800" />
        </motion.div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[11px] font-mono text-slate-400 mb-1">Est. {company.establishedYear}</p>
        <h3 className="font-bold text-slate-900 text-[17px] leading-snug mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {company.name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-3">
          {company.description}
        </p>

        {/* divider + link */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-slate-300 text-[11px]">Click to learn more</span>
          {(company as any).websiteUrl && (
            <a
              href={(company as any).websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-[12px] font-medium text-blue-500 hover:text-blue-700 transition-colors"
            >
              <Globe size={12} /> Website
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  Detail Modal                                                            */
/* ════════════════════════════════════════════════════════════════════════ */
function CompanyModal({ company, onClose }: { company: GroupCompany; onClose: () => void }) {
  const pill = getPill(company.vertical);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', h);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: 'rgba(15,20,30,0.55)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={company.name}
        className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Hero */}
        <div className="relative h-56 overflow-hidden">
          {(company as any).imageUrl ? (
            <img src={(company as any).imageUrl} alt={company.name} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${getGrad(company.vertical)} flex items-center justify-center`}>
              <span className="text-white/15 font-black text-[110px] leading-none select-none">
                {company.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div className="px-7 pb-8 -mt-4 relative">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full mb-3"
            style={{ color: pill.text, background: pill.bg }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: pill.dot }} />
            {company.vertical}
          </span>
          <h3 className="font-bold text-slate-900 text-2xl leading-tight mb-1">{company.name}</h3>
          <p className="text-slate-400 font-mono text-xs mb-4">Est. {company.establishedYear}</p>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            {(company as any).longDescription || company.description}
          </p>

          {(company as any).websiteUrl && (
            <a
              href={(company as any).websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
            >
              Visit {company.name.split(' ')[0]}
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  Main Section                                                            */
/* ════════════════════════════════════════════════════════════════════════ */
export default function Companies() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<GroupCompany | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const verticals = ['All', ...Array.from(new Set(GROUP_COMPANIES.map((c) => c.vertical)))];
  const filtered =
    filter === 'All' ? GROUP_COMPANIES : GROUP_COMPANIES.filter((c) => c.vertical === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.co-label', {
        y: 16, opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      });
      gsap.from('.co-title', {
        y: 28, opacity: 0, duration: 0.7, delay: 0.07,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="companies"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: '#ffffff' }}
      aria-label="Group Companies"
    >
      {/* Very subtle dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.5,
        }}
      />

      {/* Top accent rule */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p className="co-label text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-500 mb-3">
              Portfolio
            </p>
            <h2 className="co-title font-black text-slate-900 text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight">
              Nine Specialized<br />
              <span className="relative inline-block">
                <span className="relative z-10 text-gradient">Enterprises</span>
                {/* Signature: hand-drawn underline accent */}
                <svg
                  aria-hidden
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9 C 60 2, 130 11, 200 5 C 240 1, 270 10, 298 6"
                    stroke="#3b82f6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.5"
                  />
                </svg>
              </span>
            </h2>
          </div>

          {/* Filter pills */}
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-2">
              {verticals.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setFilter(v)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all duration-200 ${
                    filter === v
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-800'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Result count */}
        <p className="text-slate-300 font-mono text-xs mb-6">
          {filtered.length} {filter === 'All' ? 'companies' : filter.toLowerCase()} &mdash; click any card for details
        </p>

        {/* ── Grid ── */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((company, i) => (
              <CompanyCard
                key={company.id}
                company={company}
                index={i}
                onClick={() => setSelected(company)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400 text-sm">
            No companies in this vertical yet.
          </div>
        )}

        {/* ── Bottom CTA strip ── */}
        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            Interested in partnering with one of our companies?
          </p>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
          >
            Get in Touch <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && (
          <CompanyModal company={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}