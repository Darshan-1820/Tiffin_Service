"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { PRICING, CONTACT } from "@/lib/constants";

const meals = [
  {
    title: "Lunch",
    label: "Lunch Only",
    time: "8:00 AM – 12:00 PM",
    price: PRICING.lunch,
    items: "Dal, Sabzi, Rice, 4 Rotis",
    description:
      "A complete thali prepared fresh every morning. Every ingredient visible, every calorie counted.",
  },
  {
    title: "Dinner",
    label: "Dinner Only",
    time: "5:00 – 9:00 PM",
    price: PRICING.dinner,
    items: "Paneer/Sabzi, Rice, 4 Rotis, Raita",
    description:
      "Different menu every night. Same standard of freshness, transparency, and care.",
  },
];

export function WhatWeOffer() {
  return (
    <section className="bg-cream">
      {/* Marquee divider */}
      <div className="border-y border-charcoal/8 py-5">
        <Marquee
          items={[
            "Fresh Daily",
            "₹3,100/month",
            "Full Transparency",
            "Manish Nagar",
            "Lunch & Dinner",
            "Home-cooked",
          ]}
          className="text-charcoal/60"
        />
      </div>

      <div className="py-24 md:py-32 lg:py-40">
        <Container>
          {/* Section title */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 font-body text-[0.7rem] font-medium uppercase tracking-wide-caps text-muted"
          >
            What we offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="max-w-2xl font-display text-h2 font-bold leading-tight tracking-tight-display text-charcoal"
          >
            Two meals a day.
            <br />
            <span className="text-accent">Zero compromises.</span>
          </motion.h2>

          {/* Cards — editorial grid */}
          <div className="mt-16 grid gap-0 border-t border-charcoal/10 md:grid-cols-2">
            {meals.map((meal, i) => (
              <motion.div
                key={meal.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className={`border-b border-charcoal/10 p-8 md:p-12 ${
                  i === 0 ? "md:border-r" : ""
                }`}
              >
                <div className="mb-6 flex items-baseline justify-between">
                  <h3 className="font-display text-h3 font-bold text-charcoal">
                    {meal.title}
                  </h3>
                  <span className="font-body text-xs uppercase tracking-wide-caps text-muted">
                    {meal.time}
                  </span>
                </div>

                <p className="mb-4 font-serif text-lg italic text-charcoal/80">
                  {meal.items}
                </p>

                <p className="mb-8 font-body text-sm leading-relaxed text-muted">
                  {meal.description}
                </p>

                <p className="mb-2 font-body text-xs uppercase tracking-wide-caps text-muted">
                  {meal.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-none text-charcoal">
                    ₹{meal.price.toLocaleString("en-IN")}
                  </span>
                  <span className="font-body text-xs text-muted">/month</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Combined price */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="border-b border-charcoal/10 py-8 text-center md:py-12"
          >
            <p className="mb-2 font-body text-xs uppercase tracking-wide-caps text-accent">
              Lunch & Dinner
            </p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none text-charcoal">
                ₹{PRICING.both.toLocaleString("en-IN")}
              </span>
              <span className="font-body text-sm text-muted">/month</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <a
              href={`${CONTACT.whatsapp}?text=${encodeURIComponent(
                "Hi! I want to start a monthly tiffin plan."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fill btn-fill-accent inline-block"
            >
              <span>Start your plan</span>
            </a>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
