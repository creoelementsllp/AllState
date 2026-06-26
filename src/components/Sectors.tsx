import { useEffect, useRef, type ComponentType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as LucideIcons from 'lucide-react';
import Reveal from './ui/Reveal';
import { SECTOR_FOCUS_AREAS } from '../data';

gsap.registerPlugin(ScrollTrigger);

function getIcon(name: string) {
  const Icon = (LucideIcons as Record<string, ComponentType<{ size?: number; className?: string }>>)[name];
  return Icon ? <Icon size={28} /> : null;
}

export default function Sectors() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = track.querySelectorAll('.sector-card');
    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.9, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'left 90%',
              end: 'left 50%',
              scrub: true,
              horizontal: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sectors"
      ref={sectionRef}
      className="relative bg-secondary overflow-hidden"
      aria-label="Sector Focus Areas"
    >
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
          <Reveal>
            <span className="section-label section-label-light">Sector Focus</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4">
              Industries We <span className="text-gradient-light">Power</span>
            </h2>
          </Reveal>
        </div>

        <div ref={trackRef} className="flex gap-6 px-6 lg:px-8 w-max pb-8">
          {SECTOR_FOCUS_AREAS.map((sector, i) => (
            <div
              key={sector.id}
              className="sector-card flex-shrink-0 w-[340px] md:w-[420px]"
            >
              <div className="glass-dark rounded-3xl p-8 h-full border-glow hover:glow-accent transition-all duration-500 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                  {getIcon(sector.iconName)}
                </div>
                <span className="text-xs font-mono text-accent/70 uppercase tracking-widest">
                  Sector {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl font-bold text-white mt-3 mb-4">{sector.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{sector.description}</p>
                <div className="mt-6 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
