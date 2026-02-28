"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";
import { ArrowUpRight, Megaphone } from "lucide-react";

const features = ["Wash & Iron", "Timely Pickup", "Doorstep Delivery"];

export function LaundryService() {
  return (
    <section id="laundry" className="relative overflow-hidden bg-surface py-14 md:py-16 lg:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="relative bg-[#E8F0F2] p-5 sm:p-8 md:p-12"
        >
          {/* Large faded megaphone in background */}
          <Megaphone className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 -rotate-12 text-[#4A90A4]/[0.07] sm:h-40 sm:w-40 md:-right-2 md:-top-2 md:h-52 md:w-52" />

          <div className="relative flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-2 flex items-center gap-2"
              >
                <Megaphone className="h-3.5 w-3.5 text-[#4A90A4]" />
                <span className="font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-[#4A90A4]">
                  Also available
                </span>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="mb-3 font-display text-h3 font-bold text-charcoal"
              >
                Laundry Service
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-6 font-body text-sm leading-relaxed text-charcoal/60"
              >
                We handle your laundry so you can focus on what matters.
                Pickup from your door, delivered back fresh and clean.
              </motion.p>

              {/* Plain text features — separated by middot */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="font-body text-[0.7rem] font-semibold uppercase tracking-wide-caps text-charcoal/40"
              >
                {features.join("  ·  ")}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="flex shrink-0 flex-col items-start gap-2 lg:items-end"
            >
              <a
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent(
                  "Hi! I'd like to know about your laundry service."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-charcoal/20 px-6 py-3 font-body text-[0.7rem] font-semibold uppercase tracking-wide-caps text-charcoal transition-all duration-300 hover:border-charcoal hover:bg-charcoal hover:text-cream"
              >
                Enquire
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="font-body text-[0.65rem] text-charcoal/30">
                Message us on WhatsApp
              </span>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
