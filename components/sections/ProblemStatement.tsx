"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const painPoints = [
  {
    number: "₹200 to 300",
    label: "per meal on apps",
    detail: "That is ₹6,000 to ₹9,000 a month. Just for lunch.",
  },
  {
    number: "0%",
    label: "ingredient clarity",
    detail: "No idea what oils, preservatives, or shortcuts go into your food.",
  },
  {
    number: "365",
    label: "days of this cycle",
    detail: "Order. Eat. Regret. Repeat. Every single day.",
  },
];

export function ProblemStatement() {
  return (
    <section className="bg-surface py-16 md:py-20 lg:py-24">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-muted"
        >
          The reality
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="max-w-2xl font-display text-h2 font-bold leading-tight tracking-tight-display text-charcoal"
        >
          You are spending more and{" "}
          <span className="text-accent">eating worse.</span>
        </motion.h2>

        {/* Pain point grid */}
        <div className="mt-12 grid gap-px bg-charcoal/8 md:mt-16 md:grid-cols-3">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="bg-surface p-6 md:p-8"
            >
              <span className="block font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none text-charcoal">
                {point.number}
              </span>
              <span className="mt-1 block font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-accent">
                {point.label}
              </span>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                {point.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Transition */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center font-serif text-base italic text-charcoal/50 md:text-lg"
        >
          There is a better way to eat every day.
        </motion.p>
      </Container>
    </section>
  );
}
