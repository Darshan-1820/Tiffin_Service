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
    quote: "Consistent quality every day. My lunch is sorted and I don't have to think about it anymore.",
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
  {
    quote: "I switched from another service after seeing their menu transparency. The dal and sabji quality is genuinely good.",
    name: "Sneha T.",
    context: "Manish Nagar",
  },
];

export function Testimonials() {
  return (
    <section className="bg-cream py-16 md:py-20 lg:py-24">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-muted"
        >
          Testimonials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mb-12 font-display text-h2 font-bold leading-tight tracking-tight-display text-charcoal"
        >
          What people say.
        </motion.h2>
      </Container>

      <div className="scroll-snap-x hide-scrollbar flex gap-5 overflow-x-auto px-6 pb-2 md:px-[calc((100vw-80rem)/2+1.5rem)]">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] }}
            className="min-w-[260px] max-w-[380px] flex-shrink-0 border-t-2 border-charcoal bg-white p-5 sm:min-w-[300px] sm:p-6 md:min-w-[360px] md:p-8"
          >
            <p className="mb-6 font-serif text-lg italic leading-relaxed text-charcoal">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal font-body text-[0.65rem] font-bold text-cream">
                {t.name[0]}
              </div>
              <div>
                <p className="font-body text-sm font-bold text-charcoal">
                  {t.name}
                </p>
                <p className="font-body text-[0.65rem] text-muted">{t.context}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
