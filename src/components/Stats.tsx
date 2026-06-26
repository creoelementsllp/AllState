import Reveal from './ui/Reveal';
import { StatCounter } from './ui/AnimatedText';
import { HOME_STATS } from '../data';

export default function Stats() {
  return (
    <section
      className="relative py-20 md:py-28 bg-secondary overflow-hidden"
      aria-label="Key Statistics"
    >
      <div className="absolute inset-0 animated-grid opacity-20" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="section-label section-label-light">By The Numbers</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-4">
              Trusted Across <span className="text-gradient-light">Generations</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {HOME_STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="glass-dark rounded-2xl p-8 border-glow">
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  description={stat.description}
                  dark
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
