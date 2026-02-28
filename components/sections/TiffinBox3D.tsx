"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const TiffinScene = dynamic(
  () => import("@/components/three/TiffinScene").then((m) => m.TiffinScene),
  { ssr: false }
);

const tierLabels = [
  {
    text: "Dal",
    detail: "Slow cooked with fresh spices. Like your mother's kitchen.",
    position: "left" as const,
  },
  {
    text: "Sabji",
    detail: "Seasonal vegetables, never frozen, always local.",
    position: "right" as const,
  },
  {
    text: "Rice",
    detail: "Steamed basmati, cumin tempered, grain by grain.",
    position: "left" as const,
  },
  {
    text: "5 Rotis",
    detail: "Made fresh on tawa. Never machine pressed.",
    position: "right" as const,
  },
];

export function TiffinBox3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const progress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const topTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  if (reducedMotion) {
    return (
      <section className="bg-charcoal py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="mb-3 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-cream/30">
            The tiffin
          </p>
          <h2 className="font-display text-h2 font-bold tracking-tight-display text-cream">
            Four layers of care.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-sm text-cream/40">
            Every tier in your tiffin is a different dish, cooked separately,
            packed with intention.
          </p>
          <div className="mx-auto mt-10 grid max-w-lg gap-px bg-cream/8">
            {tierLabels.map((tier, i) => (
              <div key={i} className="bg-charcoal px-6 py-4">
                <span className="font-display text-sm font-bold text-cream">{tier.text}</span>
                <span className="ml-3 font-body text-xs text-cream/40">{tier.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <motion.div
        style={{ opacity }}
        className="sticky top-0 flex h-[100dvh] items-center overflow-hidden bg-charcoal"
      >
        {/* Warm glow behind tiffin */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/6 blur-[120px]" />

        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <TiffinSceneWrapper progress={progress} />
        </div>

        {/* Top text — visible at start, fades as you scroll */}
        <motion.div
          className="absolute left-6 right-6 top-6 z-10 md:left-auto md:right-12 md:top-10 md:max-w-xs md:text-right"
          style={{ opacity: topTextOpacity }}
        >
          <p className="font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-cream/30">
            The tiffin experience
          </p>
          <h2 className="mt-2 font-display text-h3 font-bold tracking-tight-display text-cream">
            Four layers. One purpose.
          </h2>
          <p className="mt-2 font-body text-xs text-cream/25">
            Scroll to explore each tier.
          </p>
        </motion.div>

        {/* Tier labels — desktop */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
            <div className="z-10 max-w-xs space-y-8">
              {tierLabels
                .filter((t) => t.position === "left")
                .map((tier, i) => (
                  <TierLabel
                    key={i}
                    text={tier.text}
                    detail={tier.detail}
                    progress={progress}
                    threshold={0.25 + i * 0.2}
                  />
                ))}
            </div>
            <div className="flex-1" />
            <div className="z-10 max-w-xs space-y-8">
              {tierLabels
                .filter((t) => t.position === "right")
                .map((tier, i) => (
                  <TierLabel
                    key={i}
                    text={tier.text}
                    detail={tier.detail}
                    progress={progress}
                    threshold={0.35 + i * 0.2}
                    align="right"
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Bottom headline */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 text-center md:bottom-16"
          style={{ opacity: headlineOpacity }}
        >
          <h2 className="font-display text-h2 font-bold tracking-tight-display text-accent">
            Every Dish. Fresh. Daily.
          </h2>
          <p className="mx-auto mt-2 max-w-xs font-body text-xs text-cream/30">
            No shortcuts. No compromises. That is the Tiffin Kart standard.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function TiffinSceneWrapper({ progress }: { progress: MotionValue<number> }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const unsub = progress.on("change", (v: number) => setValue(v));
    return () => unsub();
  }, [progress]);
  return <TiffinScene progress={value} />;
}

function TierLabel({
  text,
  detail,
  progress,
  threshold,
  align = "left",
}: {
  text: string;
  detail: string;
  progress: MotionValue<number>;
  threshold: number;
  align?: "left" | "right";
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const unsub = progress.on("change", (v: number) => setVisible(v >= threshold));
    return () => unsub();
  }, [progress, threshold]);

  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -20 : 20 }}
      animate={
        visible
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: align === "left" ? -20 : 20 }
      }
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className={cn(
        align === "right" && "text-right"
      )}
    >
      <span className="font-display text-lg font-bold text-cream md:text-xl">
        {text}
      </span>
      <p className="mt-1 font-body text-xs text-cream/35">
        {detail}
      </p>
      <div
        className="mt-2 h-[1.5px] w-8 bg-accent"
        style={{ marginLeft: align === "right" ? "auto" : 0 }}
      />
    </motion.div>
  );
}
