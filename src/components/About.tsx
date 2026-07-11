import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MapPin, Calendar, Users, Globe } from 'lucide-react';
import { ALLSTATE_METRICS } from '../data';

gsap.registerPlugin(ScrollTrigger);

/* ─── Inline styles as constants to keep JSX clean ─── */
const ACCENT = '#1d4ed8';      // rich blue
const ACCENT_LIGHT = '#eff6ff'; // blue-50
const INK = '#0f172a';         // slate-900
const MUTED = '#64748b';       // slate-500
const RULE = '#e2e8f0';        // slate-200

const TIMELINE = [
  { year: '1958', event: 'Founded with Gorakhram Haribux — first automobile A/C in India' },
  { year: '1975', event: 'Expanded into cold-chain refrigeration solutions' },
  { year: '1994', event: 'Partnered with global leaders Honeywell & Chemours' },
  { year: '2008', event: 'Manufacturing hub in Silvassa, Pune & Umbergaon launched' },
  { year: '2020', event: 'Nine-company conglomerate fully operational' },
];

const VALUES = [
  { icon: '◈', label: 'Integrity', detail: 'Six decades of trusted relationships' },
  { icon: '◉', label: 'Innovation', detail: 'Pioneering technologies for India' },
  { icon: '◍', label: 'Impact', detail: 'National footprint, global standards' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#ffffff' }}
      aria-label="About Allstate Group"
    >
      {/* ── Top hairline ── */}
      <div style={{ height: 1, background: RULE }} />

        {/* hiui */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-0">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-start">

          {/* Left — text column */}
          <div>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ color: ACCENT, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 20 }}
            >
              About Allstate Group
            </motion.p>

            {/* Headline — two-line with oversized year stamp */}
            <div className="relative">
              {/* Signature: giant ghosted year behind headline */}
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -28,
                  left: -8,
                  fontSize: 'clamp(80px, 14vw, 160px)',
                  fontWeight: 900,
                  color: 'transparent',
                  WebkitTextStroke: `1px ${RULE}`,
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                1958
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.07 }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: 'clamp(32px, 5vw, 58px)',
                  fontWeight: 900,
                  color: INK,
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  marginBottom: 28,
                }}
              >
                Seven Decades of<br />
                <span style={{ color: ACCENT }}>Industrial Leadership</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              style={{ color: MUTED, fontSize: 17, lineHeight: 1.75, marginBottom: 20 }}
            >
              Founded in 1958, Allstate Group has grown from pioneering automobile air conditioning in
              India into a diversified conglomerate of nine specialized companies — spanning cold chains,
              power transformers, enterprise software, and more.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.22 }}
              style={{ color: MUTED, fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}
            >
              Headquartered at Nariman Point, Mumbai, with manufacturing plants in Silvassa, Pune, and
              Umbergaon, our national footprint reflects decades of trusted partnerships with FUJIFILM,
              Honeywell, and Chemours.
            </motion.p>

            {/* Location chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.28 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}
            >
              {[
                { icon: MapPin, label: 'Nariman Point, Mumbai' },
                { icon: Globe, label: 'Global Partners' },
                { icon: Calendar, label: 'Est. 1958' },
                { icon: Users, label: '9 Companies' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '7px 14px',
                    borderRadius: 999,
                    border: `1px solid ${RULE}`,
                    fontSize: 13,
                    color: MUTED,
                    background: '#f8fafc',
                    fontWeight: 500,
                  }}
                >
                  <Icon size={13} color={ACCENT} />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Value pills — horizontal, each with small symbol */}
            {/* <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.33 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {VALUES.map((v, i) => (
                <div
                  key={v.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '14px 20px',
                    borderRadius: 14,
                    border: `1px solid ${RULE}`,
                    background: '#fafafa',
                  }}
                >
                  <span style={{ fontSize: 22, color: ACCENT, lineHeight: 1 }}>{v.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, color: INK, fontSize: 14, margin: 0 }}>{v.label}</p>
                    <p style={{ color: MUTED, fontSize: 12, margin: 0 }}>{v.detail}</p>
                  </div>
                </div>
              ))}
            </motion.div> */}
          </div>

          {/* Right — visual card */}
          <div ref={imageRef} style={{ position: 'relative' }}>
            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                border: `1px solid ${RULE}`,
                boxShadow: '0 24px 64px -12px rgba(0,0,0,0.08)',
                background: ACCENT_LIGHT,
                aspectRatio: '4/5',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              {/* Blueprint-style diagonal lines background */}
              <svg
                aria-hidden
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="diag" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="32" stroke={ACCENT} strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diag)" />
              </svg>

              {/* Large year */}
              <div style={{ padding: '32px 32px 0', position: 'relative', zIndex: 1 }}>
                <p style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', color: ACCENT, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>
                  Founded
                </p>
                <p style={{ fontSize: 96, fontWeight: 900, color: ACCENT, lineHeight: 1, margin: 0, letterSpacing: '-0.04em' }}>
                  1958
                </p>
              </div>

              {/* Bottom info strip */}
              <div
                style={{
                  margin: 24,
                  borderRadius: 16,
                  padding: '20px 24px',
                  background: '#ffffff',
                  border: `1px solid ${RULE}`,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <p style={{ fontWeight: 700, color: INK, fontSize: 16, marginBottom: 4 }}>Legacy Established</p>
                <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  Introduced automobile air conditioning to India — the beginning of a 67-year journey.
                </p>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.35 }}
              style={{
                position: 'absolute',
                top: -16,
                right: -16,
                background: INK,
                color: '#fff',
                borderRadius: 16,
                padding: '12px 18px',
                fontSize: 13,
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(0,0,0,0.16)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              9 Active Companies
            </motion.div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          PART 2 — TIMELINE STRIP
      ════════════════════════════════════ */}
  

      {/* ════════════════════════════════════
          PART 3 — METRICS
      ════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{ fontFamily: 'monospace', fontSize: 11, color: MUTED, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 40, fontWeight: 600 }}
        >
          By the Numbers
        </motion.p>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: RULE, border: `1px solid ${RULE}`, borderRadius: 20, overflow: 'hidden' }}>
          {ALLSTATE_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group"
              style={{
                background: '#ffffff',
                padding: '40px 36px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
              }}
            >
              {/* Hover fill */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: ACCENT_LIGHT,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                className="group-hover:opacity-100"
              />

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p
                  style={{
                    fontSize: 'clamp(36px, 5vw, 52px)',
                    fontWeight: 900,
                    color: ACCENT,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    marginBottom: 12,
                  }}
                >
                  {metric.value}
                </p>
                <p style={{ fontWeight: 700, color: INK, fontSize: 16, marginBottom: 8 }}>{metric.label}</p>
                <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.65 }}>{metric.description}</p>
                <ArrowUpRight
                  size={18}
                  style={{ marginTop: 20, color: ACCENT, opacity: 0, transition: 'opacity 0.25s ease' }}
                  className="group-hover:opacity-100"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom hairline */}
      <div style={{ height: 1, background: RULE }} />
    </section>
  );
}