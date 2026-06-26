import { useMemo } from 'react';
import { motion } from 'motion/react';
import { useCountUp } from '../../hooks/useCountUp';

export function SplitText({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const chars = useMemo(() => text.split(''), [text]);

  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: delay + i * 0.03,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
        </motion.span>
      ))}
    </span>
  );
}

export function StatCounter({
  value,
  suffix = '',
  label,
  description,
  dark = false,
}: {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
  dark?: boolean;
}) {
  const { ref, display } = useCountUp(value, 2200, true, suffix);

  return (
    <div ref={ref} className="text-center group">
      <div className={`font-display text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums transition-transform duration-500 group-hover:scale-105 ${dark ? 'text-gradient-light' : 'text-gradient'}`}>
        {display}
      </div>
      <div className={`mt-3 font-semibold text-lg ${dark ? 'text-white' : 'text-secondary'}`}>{label}</div>
      {description && <div className={`mt-1 text-sm ${dark ? 'text-white/50' : 'text-muted'}`}>{description}</div>}
      <div className="mx-auto mt-4 h-0.5 w-12 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
