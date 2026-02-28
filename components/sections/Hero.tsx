"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CONTACT } from "@/lib/constants";
import { ArrowDownRight } from "lucide-react";

function CharReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const chars = text.split("");
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.03,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[85dvh] overflow-hidden bg-charcoal md:min-h-[90dvh]"
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm glow */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -right-[20vw] -top-[10vh] h-[80vh] w-[60vw] rounded-full bg-accent/8 blur-[180px]"
      />

      {/* Content — vertically centered */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-20 flex min-h-[85dvh] flex-col justify-center px-6 py-20 md:min-h-[90dvh] md:py-24"
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-6 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-cream/40"
          >
            Manish Nagar, Nagpur
          </motion.p>

          {/* Main headline */}
          <h1 className="overflow-hidden">
            <CharReveal
              text="Fresh from"
              delay={0.8}
              className="block font-display text-display font-bold leading-display tracking-tight-display text-cream"
            />
          </h1>
          <h1 className="overflow-hidden">
            <CharReveal
              text="Home."
              delay={1.2}
              className="block font-display text-display font-bold leading-display tracking-tight-display text-cream"
            />
          </h1>
          <h1 className="overflow-hidden">
            <CharReveal
              text="Delivered."
              delay={1.6}
              className="block font-display text-display font-bold leading-display tracking-tight-display text-accent"
            />
          </h1>

          {/* Bottom bar — tighter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-cream/10 pt-6 md:flex-row md:items-end"
          >
            <p className="max-w-xs font-body text-[0.8rem] leading-relaxed text-cream/40">
              Lunch and dinner with full ingredient transparency.
              Every calorie counted. Every dish from scratch.
            </p>

            <div className="flex items-center gap-5">
              <a
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Hi! I'd like to start a tiffin plan.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fill btn-fill-light"
              >
                <span>Start your plan</span>
              </a>
              <a href="#menu" className="link-arrow text-cream/40 hover:text-cream">
                Explore
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2.6, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-6 z-20 h-16 w-[1px] origin-top bg-gradient-to-b from-accent/50 to-transparent md:left-12"
      />
    </section>
  );
}
