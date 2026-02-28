"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

const MENU = [
  { name: "Dal Tadka", ingredients: "Toor dal, tomato, onion, garlic, cumin, turmeric, ghee", cal: "180" },
  { name: "Aloo Gobi", ingredients: "Potato, cauliflower, tomato, ginger, green chili, coriander", cal: "165" },
  { name: "Jeera Rice", ingredients: "Basmati rice, cumin seeds, ghee, bay leaf", cal: "210" },
  { name: "Tawa Roti", ingredients: "Whole wheat flour, water, ghee", cal: "80 each" },
  { name: "Mix Veg", ingredients: "Beans, carrot, peas, capsicum, onion, tomato", cal: "155" },
  { name: "Raita", ingredients: "Fresh curd, cucumber, cumin powder, salt", cal: "65" },
];

export function TodaysMenu() {
  return (
    <section id="menu" className="bg-cream py-24 md:py-32 lg:py-40">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 font-body text-[0.7rem] font-medium uppercase tracking-wide-caps text-muted"
        >
          Today&apos;s menu
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16 max-w-xl font-display text-h2 font-bold leading-tight tracking-tight-display text-charcoal"
        >
          What&apos;s cooking today.
        </motion.h2>

        {/* Menu list — editorial table style */}
        <div className="border-t border-charcoal/10">
          {MENU.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group grid grid-cols-12 items-baseline border-b border-charcoal/8 py-5 transition-colors duration-300 hover:bg-charcoal/[0.02] md:py-6"
            >
              {/* Number */}
              <span className="col-span-2 font-body text-sm font-semibold text-charcoal/70 md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Name */}
              <h3 className="col-span-7 font-display text-base font-semibold text-charcoal transition-colors group-hover:text-accent md:col-span-3 md:text-xl">
                {item.name}
              </h3>

              {/* Ingredients */}
              <p className="col-span-6 hidden font-body text-sm text-muted md:block">
                {item.ingredients}
              </p>

              {/* Calories */}
              <span className="col-span-3 text-right font-body text-sm tabular-nums text-charcoal/60 md:col-span-2">
                {item.cal} kcal
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-end"
        >
          <a href="/menu" className="link-arrow text-muted hover:text-charcoal">
            Full menu
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
