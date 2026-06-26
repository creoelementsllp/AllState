interface AnimatedGridProps {
  className?: string;
  dark?: boolean;
}

export default function AnimatedGrid({ className = '', dark = false }: AnimatedGridProps) {
  return (
    <div
      className={`absolute inset-0 animated-grid grid-animate pointer-events-none ${className}`}
      style={{
        opacity: dark ? 0.4 : 0.6,
        backgroundImage: dark
          ? `linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px),
             linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px)`
          : undefined,
      }}
      aria-hidden="true"
    />
  );
}
