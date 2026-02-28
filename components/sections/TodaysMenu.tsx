"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

const MENU = [
  { name: "Dal Tadka", ingredients: "Toor dal, tomato, onion, garlic, cumin, turmeric, ghee", cal: "180" },
  { name: "Aloo Gobi", ingredients: "Potato, cauliflower, tomato, ginger, green chili, coriander", cal: "165" },
  { name: "Rice", ingredients: "Basmati rice, ghee, bay leaf", cal: "210" },
  { name: "Tawa Roti", ingredients: "Whole wheat flour, water, ghee", cal: "80 each" },
  { name: "Mix Veg", ingredients: "Beans, carrot, peas, capsicum, onion, tomato", cal: "155" },
  { name: "Raita", ingredients: "Fresh curd, cucumber, cumin powder, salt", cal: "65" },
];

export function TodaysMenu() {
  return (
    <section id="menu" className="bg-cream py-16 md:py-20 lg:py-24">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-muted"
        >
          Today&apos;s menu
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mb-12 max-w-xl font-display text-h2 font-bold leading-tight tracking-tight-display text-charcoal"
        >
          What&apos;s cooking today.
        </motion.h2>

        <div className="border-t border-charcoal/10">
          {MENU.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group grid grid-cols-12 items-baseline border-b border-charcoal/8 py-4 transition-colors duration-300 hover:bg-charcoal/[0.02] md:py-5"
            >
              <span className="col-span-1 font-body text-sm font-bold text-charcoal/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="col-span-7 font-display text-sm font-bold text-charcoal transition-colors group-hover:text-accent sm:text-base md:col-span-3 md:text-lg">
                {item.name}
              </h3>
              <p className="col-span-6 hidden font-body text-sm text-muted md:block">
                {item.ingredients}
              </p>
              <span className="col-span-4 text-right font-body text-xs tabular-nums text-charcoal/60 sm:text-sm md:col-span-2">
                {item.cal} kcal
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="mt-8 flex justify-center"
        >
          <a
            href="/menu"
            className="group inline-flex items-center gap-3 border border-charcoal/20 px-6 py-3 font-body text-[0.7rem] font-semibold uppercase tracking-wide-caps text-charcoal transition-all duration-300 hover:border-charcoal hover:bg-charcoal hover:text-cream"
          >
            View full menu
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
