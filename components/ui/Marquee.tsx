"use client";

interface MarqueeProps {
  items: string[];
  separator?: string;
  className?: string;
}

export function Marquee({
  items,
  separator = "\u00B7",
  className,
}: MarqueeProps) {
  // Double the items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className={`marquee-container overflow-hidden ${className}`}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-16 font-display text-[clamp(1rem,2vw,1.5rem)] font-medium tracking-tight-display"
          >
            {item}
            <span className="text-accent/40">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
