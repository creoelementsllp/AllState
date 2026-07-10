import { useEffect, useRef, type ComponentType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as LucideIcons from 'lucide-react';
import Reveal from './ui/Reveal';
import { CORPORATE_OBJECTIVES } from '../data';

gsap.registerPlugin(ScrollTrigger);

function getIcon(name: string) {
  const Icon = (LucideIcons as Record<string, ComponentType<{ size?: number; className?: string }>>)[name];
  return Icon ? <Icon size={24} /> : null;
}
//  neews
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-mesh-light overflow-hidden"
      aria-label="Corporate Standards and Services"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <span className="section-label">The Allstate Standard</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mt-4 mb-4">
            Principles That <span className="text-gradient">Guide Us</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-muted max-w-2xl mb-16 text-lg">
            Four pillars of corporate excellence that define how every Allstate company operates — with integrity, quality, and long-term vision.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {CORPORATE_OBJECTIVES.map((obj) => (
            <div
              key={obj.id}
              className="service-card premium-card p-8 light-sweep group border-glow"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  {getIcon(obj.iconName)}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-secondary mb-3">{obj.title}</h3>
                  <p className="text-muted leading-relaxed">{obj.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 py-8 border-t border-border">
            {['ISO Certified', '100% Compliance', 'Pan-India Operations', 'Global Partnerships'].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 text-sm font-medium text-muted"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
                {badge}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
