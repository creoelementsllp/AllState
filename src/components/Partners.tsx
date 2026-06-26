import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame } from 'motion/react';
import { ALLIANCE_PARTNERS } from '../data';

const ACCENT   = '#1d4ed8';
const INK      = '#0f172a';
const MUTED    = '#64748b';
const RULE     = '#e2e8f0';
const BG       = '#ffffff';

/* Row speeds — two rows scrolling in opposite directions */
const ROW_SPEED = [0.4, 0.35];

function MarqueeRow({
  partners,
  reverse = false,
  speed = 0.4,
}: {
  partners: typeof ALLIANCE_PARTNERS;
  reverse?: boolean;
  speed?: number;
}) {
  const trackRef  = useRef<HTMLDivElement>(null);
  const xRef      = useRef(0);
  const pausedRef = useRef(false);
  const items     = [...partners, ...partners, ...partners]; // triple for seamless loop

  useAnimationFrame(() => {
    const el = trackRef.current;
    if (!el || pausedRef.current) return;
    const singleW = el.scrollWidth / 3;
    xRef.current += reverse ? speed : -speed;
    if (!reverse && xRef.current <= -singleW) xRef.current += singleW;
    if (reverse  && xRef.current >= 0)        xRef.current -= singleW;
    el.style.transform = `translateX(${xRef.current}px)`;
  });

  return (
    <div
      style={{ overflow: 'hidden', position: 'relative' }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div
        ref={trackRef}
        style={{ display: 'flex', gap: 16, width: 'max-content', willChange: 'transform' }}
      >
        {items.map((p, i) => (
          <PartnerCard key={`${p.id}-${i}`} partner={p} />
        ))}
      </div>
    </div>
  );
}

function PartnerCard({ partner }: { partner: typeof ALLIANCE_PARTNERS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 220,
        borderRadius: 20,
        border: `1px solid ${hovered ? ACCENT : RULE}`,
        background: hovered ? `${ACCENT}08` : BG,
        padding: '22px 24px',
        cursor: 'default',
        transition: 'border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
        boxShadow: hovered
          ? `0 8px 32px -8px rgba(29,78,216,0.15)`
          : '0 2px 12px -4px rgba(0,0,0,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent corner flash on hover */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 40,
        height: 40,
        borderBottomLeftRadius: 20,
        background: hovered ? ACCENT : 'transparent',
        opacity: 0.08,
        transition: 'background 0.25s ease',
      }} />

      {/* Logo text */}
      <p style={{
        fontWeight: 900,
        fontSize: 18,
        color: hovered ? ACCENT : INK,
        letterSpacing: '-0.02em',
        marginBottom: 10,
        transition: 'color 0.25s ease',
        lineHeight: 1,
      }}>
        {partner.logoText}
      </p>

      {/* Thin rule */}
      <div style={{ height: 1, background: hovered ? `${ACCENT}30` : RULE, marginBottom: 10, transition: 'background 0.25s ease' }} />

      {/* Description */}
      <p style={{
        color: MUTED,
        fontSize: 12,
        lineHeight: 1.65,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        margin: 0,
      }}>
        {partner.description}
      </p>
    </div>
  );
}

export default function Partners() {
  const row1 = ALLIANCE_PARTNERS;
  const row2 = [...ALLIANCE_PARTNERS].reverse();

  /* Count metric */
  const count = ALLIANCE_PARTNERS.length;

  return (
    <section
      style={{ background: BG, position: 'relative', overflow: 'hidden' }}
      aria-label="Alliance Partners"
    >
      <div style={{ height: 1, background: RULE }} />

      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-14">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: 18 }}
          >
            Global Alliances
          </motion.p>

          {/* Headline row — text left, stat right */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.07 }}
              style={{
                fontSize: 'clamp(30px, 5vw, 54px)',
                fontWeight: 900,
                color: INK,
                lineHeight: 1.06,
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              Trusted by<br />
              <span style={{ color: ACCENT }}>World Leaders</span>
            </motion.h2>

            {/* Live count badge — the signature element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 112,
                height: 112,
                borderRadius: '50%',
                border: `2px solid ${ACCENT}`,
                background: `${ACCENT}08`,
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 36, fontWeight: 900, color: ACCENT, lineHeight: 1, letterSpacing: '-0.04em' }}>
                {count}
              </span>
              <span style={{ fontSize: 11, color: MUTED, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>
                Partners
              </span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ color: MUTED, fontSize: 16, lineHeight: 1.75, maxWidth: 500, marginTop: 20 }}
          >
            Strategic partnerships with global technology leaders powering
            innovation across our group companies.
          </motion.p>

          {/* Pause hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 }}
            style={{ fontFamily: 'monospace', fontSize: 11, color: `${MUTED}80`, marginTop: 10 }}
          >
            Hover any card to pause ·
          </motion.p>
        </div>
      </div>

      {/* ── Marquee rows ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 80, position: 'relative'  }}>

        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to right, ${BG}, transparent)`, zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to left, ${BG}, transparent)`, zIndex: 10, pointerEvents: 'none' }} />

        {/* Row 1 — left */}
        <MarqueeRow partners={row1} speed={ROW_SPEED[0]} />

        {/* Row 2 — right */}
        <MarqueeRow partners={row2} reverse speed={ROW_SPEED[1]} />
      </div>

      {/* ── Partner logos bar — static grid of all names ── */}
      {/* <div style={{ borderTop: `1px solid ${RULE}`, background: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <p style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTED, marginBottom: 16, opacity: 0.6 }}>
            All partners
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
            {ALLIANCE_PARTNERS.map((p) => (
              <span
                key={p.id}
                style={{ fontSize: 13, fontWeight: 700, color: INK, letterSpacing: '-0.01em', opacity: 0.45 }}
              >
                {p.logoText}
              </span>
            ))}
          </div>
        </div>
      </div> */}

      <div style={{ height: 1, background: RULE }} />
    </section>
  );
}