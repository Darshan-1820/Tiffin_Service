"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { PRICING, CONTACT } from "@/lib/constants";

const meals = [
  {
    title: "Lunch",
    label: "Lunch Only",
    time: "8 AM to 12 PM",
    price: PRICING.lunch,
    items: "Dal, 1 Sabji, Rice, 5 Rotis",
    description:
      "A complete thali prepared fresh every morning with seasonal vegetables. The dish changes daily, the quality stays the same.",
  },
  {
    title: "Dinner",
    label: "Dinner Only",
    time: "5 to 9 PM",
    price: PRICING.dinner,
    items: "Dal, 1 Sabji, Rice, 5 Rotis",
    description:
      "A different menu every evening. Same fresh ingredients, same care. Never a repeat of lunch.",
  },
];

const savingsAmount = PRICING.lunch + PRICING.dinner - PRICING.both;

export function WhatWeOffer() {
  return (
    <section className="bg-cream">
      {/* Marquee divider */}
      <div className="border-y border-charcoal/8 py-4">
        <Marquee
          items={[
            "Fresh Daily",
            "From ₹2,500/month",
            "Full Transparency",
            "Manish Nagar",
            "Lunch & Dinner",
            "Fit Bite",
            "Laundry Service",
          ]}
          className="text-charcoal/50"
        />
      </div>

      <div className="py-16 md:py-20 lg:py-24">
        <Container>
          {/* Section title */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-muted"
          >
            What we offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="max-w-2xl font-display text-h2 font-bold leading-tight tracking-tight-display text-charcoal"
          >
            Two meals a day.
            <br />
            <span className="text-accent">Zero compromises.</span>
          </motion.h2>

          {/* Cards */}
          <div className="mt-12 grid gap-0 border-t border-charcoal/10 md:grid-cols-2">
            {meals.map((meal, i) => (
              <motion.div
                key={meal.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className={`border-b border-charcoal/10 p-6 md:p-10 ${
                  i === 0 ? "md:border-r" : ""
                }`}
              >
                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="font-display text-h3 font-bold text-charcoal">
                    {meal.title}
                  </h3>
                  <span className="font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-muted">
                    {meal.time}
                  </span>
                </div>

                <p className="mb-3 font-serif text-base italic text-charcoal/80">
                  {meal.items}
                </p>

                <p className="mb-6 font-body text-sm leading-relaxed text-muted">
                  {meal.description}
                </p>

                <p className="mb-1.5 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-muted">
                  {meal.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-none text-charcoal">
                    ₹{meal.price.toLocaleString("en-IN")}
                  </span>
                  <span className="font-body text-xs text-muted">/month</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Combined price */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            className="border-b border-charcoal/10 py-6 text-center md:py-8"
          >
            <div className="mb-2 flex items-center justify-center gap-3">
              <p className="font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-accent">
                Lunch & Dinner
              </p>
              <span className="inline-block bg-accent/10 px-3 py-1 font-body text-[0.6rem] font-bold uppercase tracking-wide-caps text-accent">
                Save ₹{savingsAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-none text-charcoal">
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
            transition={{ delay: 0.2 }}
            className="mt-8 text-center"
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
