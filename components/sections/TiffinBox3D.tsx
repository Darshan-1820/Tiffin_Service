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
  { text: "Dal Tadka", position: "left" as const },
  { text: "Aloo Gobi", position: "right" as const },
  { text: "Jeera Rice", position: "left" as const },
  { text: "4 Fresh Rotis", position: "right" as const },
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

  if (reducedMotion) {
    return (
      <section className="bg-charcoal py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="mb-4 font-body text-[0.7rem] font-medium uppercase tracking-wide-caps text-cream/30">
            The tiffin
          </p>
          <h2 className="font-display text-h2 font-bold tracking-tight-display text-accent">
            Every Dish. Fresh. Daily.
          </h2>
          <div className="mx-auto mt-12 grid max-w-lg gap-px bg-cream/8">
            {tierLabels.map((tier, i) => (
              <div
                key={i}
                className="bg-charcoal px-6 py-4 font-body text-sm text-cream/70"
              >
                {tier.text}
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
        className="sticky top-0 flex h-screen items-center overflow-hidden bg-charcoal"
      >
        {/* Warm glow behind tiffin */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/6 blur-[120px]" />

        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <TiffinSceneWrapper progress={progress} />
        </div>

        {/* Labels */}
        <div className="pointer-events-none absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
            <div className="z-10 max-w-xs space-y-10">
              {tierLabels
                .filter((t) => t.position === "left")
                .map((tier, i) => (
                  <TierLabel
                    key={i}
                    text={tier.text}
                    progress={progress}
                    threshold={0.25 + i * 0.2}
                  />
                ))}
            </div>
            <div className="flex-1" />
            <div className="z-10 max-w-xs space-y-10">
              {tierLabels
                .filter((t) => t.position === "right")
                .map((tier, i) => (
                  <TierLabel
                    key={i}
                    text={tier.text}
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
          className="absolute bottom-16 left-0 right-0 text-center"
          style={{ opacity: headlineOpacity }}
        >
          <h2 className="font-display text-h2 font-bold tracking-tight-display text-accent">
            Every Dish. Fresh. Daily.
          </h2>
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
  progress,
  threshold,
  align = "left",
}: {
  text: string;
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
        "font-display text-lg font-bold text-cream md:text-xl",
        align === "right" && "text-right"
      )}
    >
      {text}
      <div
        className="mt-1.5 h-[1.5px] w-10 bg-accent"
        style={{ marginLeft: align === "right" ? "auto" : 0 }}
      />
    </motion.div>
  );
}
