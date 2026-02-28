"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const testimonials = [
  {
    quote: "Finally, a tiffin service that tells me exactly what I'm eating. The food tastes like home.",
    name: "Priya S.",
    context: "Manish Nagar",
  },
  {
    quote: "Consistent quality every day. My lunch is sorted — I don't have to think about it anymore.",
    name: "Rahul M.",
    context: "Manish Nagar",
  },
  {
    quote: "The ingredients list is what convinced me. I have dietary restrictions and this transparency helps.",
    name: "Anita K.",
    context: "Manish Nagar",
  },
  {
    quote: "Hot, fresh, and on time. Three things that matter for a working professional.",
    name: "Vikram D.",
    context: "Mihan, Nagpur",
  },
];

export function Testimonials() {
  return (
    <section className="bg-surface py-24 md:py-32 lg:py-40">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 font-body text-[0.7rem] font-medium uppercase tracking-wide-caps text-muted"
        >
          Testimonials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16 font-display text-h2 font-bold leading-tight tracking-tight-display text-charcoal"
        >
          What people say.
        </motion.h2>
      </Container>

      {/* Horizontal scroll — editorial quote cards */}
      <div className="scroll-snap-x hide-scrollbar flex gap-6 overflow-x-auto px-6 pb-4 md:px-[calc((100vw-80rem)/2+1.5rem)]">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
            className="min-w-[320px] max-w-[420px] flex-shrink-0 border-t-2 border-charcoal bg-white p-8 md:min-w-[400px] md:p-10"
          >
            <p className="mb-8 font-serif text-xl italic leading-relaxed text-charcoal">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              {/* Avatar circle */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal font-body text-xs font-bold text-cream">
                {t.name[0]}
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-charcoal">
                  {t.name}
                </p>
                <p className="font-body text-xs text-muted">{t.context}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
