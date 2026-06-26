import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE } from '../data';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#1d4ed8';
const INK    = '#0f172a';
const MUTED  = '#64748b';
const RULE   = '#e2e8f0';

export default function Timeline() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const fillRef     = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const dotRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* 1 ── Grow the vertical track line on enter */
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      }

      /* 2 ── Scroll-scrubbed fill that grows down the track */
      if (fillRef.current) {
        gsap.fromTo(
          fillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 60%',
              scrub: 0.5,
            },
          }
        );
      }

      /* 3 ── Each item: slide in from alternating sides */
      gsap.utils.toArray<HTMLElement>('.tl-item').forEach((item, i) => {
        const fromLeft = i % 2 === 0;

        /* Card */
        gsap.from(item.querySelector('.tl-card')!, {
          x: fromLeft ? -56 : 56,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 86%',
            onEnter: () => setActiveIdx((prev) => Math.max(prev, i)),
          },
        });

        /* Year badge */
        gsap.from(item.querySelector('.tl-badge')!, {
          scale: 0.6,
          opacity: 0,
          duration: 0.45,
          delay: 0.15,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: item,
            start: 'top 86%',
          },
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      style={{ background: '#ffffff', position: 'relative', overflow: 'hidden' }}
      aria-label="Company History Timeline"
    >
      {/* Top rule */}
      <div style={{ height: 1, background: RULE }} />

      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          <p style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: 16 }}>
            Our History
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: INK, lineHeight: 1.06, letterSpacing: '-0.025em', marginBottom: 20 }}>
            Milestones That<br />
            <span style={{ color: ACCENT }}>Define Us</span>
          </h2>
          <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.75, maxWidth: 520 }}>
            From a single pioneering venture in 1958 to a diversified group of nine companies —
            our journey mirrors India's industrial evolution.
          </p>
        </div>
      </div>

      {/* ── Track + items ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-28 relative">

        {/* Centre vertical line — ghost track */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 2,
            transform: 'translateX(-50%)',
            background: RULE,
            zIndex: 0,
          }}
          aria-hidden
        />

        {/* Blue scroll-fill on top of track */}
        <div
          ref={fillRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 2,
            transform: 'translateX(-50%)',
            background: ACCENT,
            transformOrigin: 'top center',
            scaleY: 0,
            zIndex: 1,
          }}
          aria-hidden
        />

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {TIMELINE.map((item, i) => {
            const isLeft = i % 2 === 0;
            const isActive = i <= activeIdx;

            return (
              <div
                key={item.year}
                className="tl-item"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 1fr',
                  alignItems: 'center',
                  gap: 0,
                  paddingBottom: 72,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {/* Left slot */}
                <div style={{ paddingRight: 40, display: 'flex', justifyContent: 'flex-end' }}>
                  {isLeft && (
                    <div
                      className="tl-card"
                      style={{
                        background: '#fff',
                        border: `1px solid ${RULE}`,
                        borderRadius: 18,
                        padding: '24px 28px',
                        maxWidth: 320,
                        boxShadow: '0 4px 24px -4px rgba(0,0,0,0.07)',
                        position: 'relative',
                      }}
                    >
                      {/* Connector arrow */}
                      <div style={{
                        position: 'absolute',
                        right: -9,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 16,
                        height: 16,
                        background: '#fff',
                        border: `1px solid ${RULE}`,
                        borderLeft: 'none',
                        borderBottom: 'none',
                        rotate: '45deg',
                      }} />
                      <p style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: 8 }}>
                        {item.highlight}
                      </p>
                      <h3 style={{ fontWeight: 800, color: INK, fontSize: 17, lineHeight: 1.3, marginBottom: 10 }}>
                        {item.title}
                      </h3>
                      <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Centre — year badge + dot */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  {/* Outer ring dot */}
                  <div
                    ref={(el) => { dotRefs.current[i] = el; }}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `3px solid ${isActive ? ACCENT : RULE}`,
                      background: isActive ? ACCENT : '#fff',
                      transition: 'all 0.4s ease',
                      boxShadow: isActive ? `0 0 0 5px rgba(29,78,216,0.12)` : 'none',
                      flexShrink: 0,
                    }}
                  />
                  {/* Year badge below dot */}
                  <div
                    className="tl-badge"
                    style={{
                      background: isActive ? ACCENT : '#f1f5f9',
                      color: isActive ? '#fff' : MUTED,
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: 13,
                      borderRadius: 8,
                      padding: '5px 10px',
                      transition: 'all 0.4s ease',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.year}
                  </div>
                </div>

                {/* Right slot */}
                <div style={{ paddingLeft: 40 }}>
                  {!isLeft && (
                    <div
                      className="tl-card"
                      style={{
                        background: '#fff',
                        border: `1px solid ${RULE}`,
                        borderRadius: 18,
                        padding: '24px 28px',
                        maxWidth: 320,
                        boxShadow: '0 4px 24px -4px rgba(0,0,0,0.07)',
                        position: 'relative',
                      }}
                    >
                      {/* Connector arrow */}
                      <div style={{
                        position: 'absolute',
                        left: -9,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 16,
                        height: 16,
                        background: '#fff',
                        border: `1px solid ${RULE}`,
                        borderRight: 'none',
                        borderTop: 'none',
                        rotate: '45deg',
                      }} />
                      <p style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: 8 }}>
                        {item.highlight}
                      </p>
                      <h3 style={{ fontWeight: 800, color: INK, fontSize: 17, lineHeight: 1.3, marginBottom: 10 }}>
                        {item.title}
                      </h3>
                      <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile layout — single column */}
      <style>{`
        @media (max-width: 640px) {
          .tl-item {
            grid-template-columns: 40px 1fr !important;
            grid-template-rows: auto;
          }
          .tl-item > div:first-child { display: none !important; }
          .tl-item > div:nth-child(2) {
            grid-column: 1;
            padding: 0 !important;
          }
          .tl-item > div:last-child {
            grid-column: 2;
            padding-left: 20px !important;
          }
          .tl-item > div:last-child .tl-card {
            max-width: 100% !important;
          }
          /* show right card for even items too on mobile */
          .tl-item > div:last-child { display: block !important; }
        }
      `}</style>

      {/* Bottom rule */}
      <div style={{ height: 1, background: RULE }} />
    </section>
  );
}