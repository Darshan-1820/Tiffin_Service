"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

const benefits = [
  {
    number: "01",
    label: "Your goals, your menu",
    detail:
      "Tell us your fitness goal and we design meals around it. Muscle gain, weight loss, maintenance. You choose, we cook.",
  },
  {
    number: "02",
    label: "Nutrition focused cooking",
    detail:
      "Higher protein, controlled carbs, healthy fats. Adjusted per your needs. Not a generic diet plan.",
  },
  {
    number: "03",
    label: "Still tastes like home",
    detail:
      "No bland boiled food. Real Indian cooking, real flavour. Just calibrated for your body.",
  },
];

const macroRings = [
  { label: "Protein", value: 40, color: "#34d399" },
  { label: "Carbs", value: 35, color: "#6ee7b7" },
  { label: "Fats", value: 25, color: "#a7f3d0" },
];

/* Semi-circle arc graph */
function MacroRing({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  const size = 100;
  const r = (size - 8) / 2;
  const halfCircumference = Math.PI * r;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.76, 0, 0.24, 1] }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative" style={{ width: size, height: size / 2 + 8 }}>
        <svg
          width={size}
          height={size / 2 + 8}
          viewBox={`0 0 ${size} ${size / 2 + 8}`}
          className="overflow-visible"
        >
          {/* Background arc */}
          <path
            d={`M 4,${size / 2} A ${r},${r} 0 0,1 ${size - 4},${size / 2}`}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={3}
            strokeLinecap="round"
          />
          {/* Animated fill arc */}
          <motion.path
            d={`M 4,${size / 2} A ${r},${r} 0 0,1 ${size - 4},${size / 2}`}
            fill="none"
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={halfCircumference}
            initial={{ strokeDashoffset: halfCircumference }}
            whileInView={{
              strokeDashoffset: halfCircumference - (value / 100) * halfCircumference,
            }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.76, 0, 0.24, 1] }}
          />
        </svg>
        {/* Center value */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.6 }}
          className="absolute inset-0 flex items-end justify-center font-display text-xl font-bold text-cream"
        >
          {value}
          <span className="ml-0.5 text-[0.6rem] font-normal text-cream/30">%</span>
        </motion.span>
      </div>
      <span className="font-body text-[0.6rem] font-semibold uppercase tracking-wide-caps text-cream/30">
        {label}
      </span>
    </motion.div>
  );
}

export function FitBite() {
  return (
    <section id="fitbite" className="relative overflow-hidden bg-charcoal py-16 md:py-20 lg:py-24">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute -left-[15vw] top-[20%] h-[40vh] w-[40vw] rounded-full bg-emerald-500/6 blur-[160px]" />

      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — headline + macro rings */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-3"
            >
              <span className="font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-cream/30">
                For the health focused
              </span>
              <motion.span
                className="h-[1px] bg-emerald-400/40"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="mb-4 font-display text-h2 font-bold leading-tight tracking-tight-display text-cream"
            >
              Introducing{" "}
              <span className="text-emerald-400">Fit Bite.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="max-w-md font-body text-sm leading-relaxed text-cream/50"
            >
              Meals designed around your body. Gym regulars, athletes, or
              anyone with specific dietary goals. You tell us what you need,
              and we cook accordingly.
            </motion.p>

            {/* Macro arc graphs */}
            <div className="mt-10 flex items-end gap-4 sm:gap-6 md:gap-8">
              {macroRings.map((ring, i) => (
                <MacroRing
                  key={ring.label}
                  label={ring.label}
                  value={ring.value}
                  color={ring.color}
                  delay={0.3 + i * 0.12}
                />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="mt-8 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-6"
            >
              <a
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent(
                  "Hi! I'm interested in the Fit Bite plan. Can you share more details?"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-emerald-400/30 px-6 py-3.5 font-body text-[0.7rem] font-semibold uppercase tracking-wide-caps text-emerald-400 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-400/5"
              >
                Enquire about Fit Bite
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="font-body text-xs text-cream/20">
                Custom pricing based on your requirements
              </span>
            </motion.div>
          </div>

          {/* Right — numbered benefits */}
          <div className="border-t border-cream/8 lg:mt-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="border-b border-cream/8 py-6"
              >
                <div className="flex items-start gap-5">
                  <span className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-none text-cream/12">
                    {b.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="mb-1.5 font-display text-base font-bold text-cream">
                      {b.label}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-cream/40">
                      {b.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
