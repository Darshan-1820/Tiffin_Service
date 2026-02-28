"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Browse the menu",
    description: "Check our website or WhatsApp broadcast for today's lunch and dinner.",
  },
  {
    number: "02",
    title: "Message us",
    description: "One WhatsApp message to start your monthly plan. Lunch, dinner, or both.",
  },
  {
    number: "03",
    title: "Eat well",
    description: "Hot, fresh meals at your door in Manish Nagar. On time, every single day.",
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="bg-surface py-16 md:py-20 lg:py-24">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-muted"
        >
          Process
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mb-12 max-w-xl font-display text-h2 font-bold leading-tight tracking-tight-display text-charcoal"
        >
          Three steps to{" "}
          <span className="text-accent">better meals.</span>
        </motion.h2>

        <div className="grid gap-0 border-t border-charcoal/10 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.76, 0, 0.24, 1],
              }}
              className={`border-b border-charcoal/10 p-6 md:border-b-0 md:p-8 ${
                i < 2 ? "md:border-r" : ""
              }`}
            >
              <span className="mb-6 block font-display text-[clamp(3rem,7vw,5.5rem)] font-bold leading-none text-charcoal/15">
                {step.number}
              </span>
              <h3 className="mb-2 font-display text-lg font-bold text-charcoal">
                {step.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
