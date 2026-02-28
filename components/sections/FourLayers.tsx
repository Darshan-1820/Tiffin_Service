"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const dishes = [
  {
    number: "01",
    name: "Sabzi",
    subtitle: "Fresh vegetables, daily",
    detail:
      "Seasonal vegetables from the local market. Cooked in our own spice blends, never frozen, never repeated within a week. A different preparation every single day.",
    bg: "#1B4332",
    text: "#F5F2EC",
    accent: "#6EE7B7",
  },
  {
    number: "02",
    name: "Dal",
    subtitle: "Slow cooked lentils",
    detail:
      "Toor, moong, masoor. Rotating daily. Tempered with ghee, garlic, and whole spices. The kind your grandmother made. Never rushed, never bland.",
    bg: "#78350F",
    text: "#F5F2EC",
    accent: "#FCD34D",
  },
  {
    number: "03",
    name: "Rice",
    subtitle: "Steamed basmati",
    detail:
      "Long grain basmati, perfectly steamed. Plain rice, pulao, or flavoured. Depends on the day's menu. Every grain separated, every batch fresh.",
    bg: "#D6C9A8",
    text: "#2C1810",
    accent: "#78350F",
  },
  {
    number: "04",
    name: "Roti",
    subtitle: "Fresh off the tawa",
    detail:
      "Whole wheat, hand-rolled, cooked on iron tawa. Soft, warm, packed just before delivery. Five per tiffin. Not yesterday's leftovers. Never machine pressed.",
    bg: "#C84B28",
    text: "#F5F2EC",
    accent: "#F5F2EC",
  },
];

export function FourLayers() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Move the track left: 4 cards × 100vw = 400vw total, shift 300vw to reach last card
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-300vw"]);

  // Active card index for progress dots
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, 3]);

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Horizontal track */}
        <motion.div style={{ x }} className="flex h-full">
          {dishes.map((dish, i) => (
            <div
              key={dish.name}
              className="relative flex h-full w-screen flex-shrink-0 items-center"
              style={{ backgroundColor: dish.bg }}
            >
              {/* Large watermark text */}
              <span
                className="pointer-events-none absolute right-[4vw] top-1/2 -translate-y-1/2 select-none text-right font-display text-[clamp(8rem,18vw,14rem)] font-bold leading-none"
                style={{ color: dish.text, opacity: 0.06 }}
              >
                {dish.name}
              </span>

              {/* Content */}
              <div className="relative z-10 px-8 md:px-16 lg:px-24">
                {/* First card header */}
                {i === 0 && (
                  <p
                    className="mb-6 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps md:mb-8"
                    style={{ color: `${dish.text}50` }}
                  >
                    What&apos;s inside your tiffin
                  </p>
                )}

                <span
                  className="font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps"
                  style={{ color: dish.accent }}
                >
                  {dish.number}
                </span>

                <h2
                  className="mt-2 font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight-display"
                  style={{ color: dish.text }}
                >
                  {dish.name}
                </h2>

                <p
                  className="mt-3 font-body text-sm font-semibold uppercase tracking-wide-caps"
                  style={{ color: `${dish.text}60` }}
                >
                  {dish.subtitle}
                </p>

                <p
                  className="mt-6 max-w-sm font-body text-sm leading-relaxed md:max-w-md md:text-base"
                  style={{ color: `${dish.text}80` }}
                >
                  {dish.detail}
                </p>

                {/* Accent line */}
                <div
                  className="mt-8 h-[2px] w-12"
                  style={{ backgroundColor: dish.accent }}
                />
              </div>

              {/* Scroll hint on first card */}
              {i === 0 && (
                <div
                  className="absolute bottom-8 left-8 flex items-center gap-2 md:left-16 lg:left-24"
                  style={{ color: `${dish.text}30` }}
                >
                  <span className="font-body text-[0.6rem] uppercase tracking-wide-caps">
                    Scroll to explore
                  </span>
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Progress dots */}
        <ProgressDots activeIndex={activeIndex} total={dishes.length} />
      </div>
    </section>
  );
}

function ProgressDots({
  activeIndex,
  total,
}: {
  activeIndex: MotionValue<number>;
  total: number;
}) {
  return (
    <div className="absolute bottom-8 right-8 flex flex-col gap-2 md:right-16 lg:right-24">
      {Array.from({ length: total }).map((_, i) => (
        <DotItem key={i} index={i} activeIndex={activeIndex} />
      ))}
    </div>
  );
}

function DotItem({
  index,
  activeIndex,
}: {
  index: number;
  activeIndex: MotionValue<number>;
}) {
  const opacity = useTransform(
    activeIndex,
    [index - 0.5, index, index + 0.5],
    [0.2, 1, 0.2]
  );

  const scale = useTransform(
    activeIndex,
    [index - 0.5, index, index + 0.5],
    [1, 1.5, 1]
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="h-1.5 w-1.5 rounded-full bg-white"
    />
  );
}
