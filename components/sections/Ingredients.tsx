"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const dishes = [
  {
    name: "Dal Tadka",
    ingredients: ["Toor dal", "Tomato", "Onion", "Garlic", "Cumin", "Turmeric", "Ghee"],
    cal: 180, protein: 9, carbs: 28, fat: 4,
  },
  {
    name: "Aloo Gobi",
    ingredients: ["Potato", "Cauliflower", "Tomato", "Ginger", "Green chili", "Coriander"],
    cal: 165, protein: 4, carbs: 22, fat: 7,
  },
  {
    name: "Rice",
    ingredients: ["Basmati rice", "Ghee", "Bay leaf"],
    cal: 210, protein: 4, carbs: 42, fat: 3,
  },
  {
    name: "Tawa Roti",
    ingredients: ["Whole wheat flour", "Water", "Ghee"],
    cal: 80, protein: 3, carbs: 15, fat: 1,
  },
];

export function Ingredients() {
  return (
    <section id="about" className="bg-charcoal py-16 md:py-20 lg:py-24">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-cream/30"
        >
          Full transparency
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mb-3 max-w-2xl font-display text-h2 font-bold leading-tight tracking-tight-display text-cream"
        >
          What goes in your food.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-12 max-w-md font-body text-sm leading-relaxed text-cream/40"
        >
          We show you everything. Because you deserve to know exactly
          what you&apos;re putting in your body.
        </motion.p>

        <div className="grid gap-px bg-cream/8 sm:grid-cols-2">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
              className="bg-charcoal p-6 md:p-8"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="font-display text-lg font-bold text-cream">
                  {dish.name}
                </h3>
                <span className="font-display text-[clamp(1.5rem,4vw,2.25rem)] font-bold leading-none text-accent/80">
                  {dish.cal}
                  <span className="ml-1 text-[0.6rem] font-normal text-cream/30">
                    kcal
                  </span>
                </span>
              </div>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="border border-cream/10 px-2.5 py-1 font-body text-[0.65rem] text-cream/50 transition-colors hover:border-accent/30 hover:text-cream/70"
                  >
                    {ing}
                  </span>
                ))}
              </div>

              <div className="flex gap-5 border-t border-cream/8 pt-3">
                {[
                  { label: "Protein", value: dish.protein },
                  { label: "Carbs", value: dish.carbs },
                  { label: "Fat", value: dish.fat },
                ].map((m) => (
                  <div key={m.label}>
                    <span className="block font-display text-base font-bold text-cream">
                      {m.value}
                      <span className="text-[0.6rem] font-normal text-cream/30">g</span>
                    </span>
                    <span className="font-body text-[0.6rem] uppercase tracking-wide-caps text-cream/25">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-center font-body text-[0.65rem] text-cream/20"
        >
          Nutrition values are approximate per serving
        </motion.p>
      </Container>
    </section>
  );
}
