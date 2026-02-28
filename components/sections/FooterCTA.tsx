"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export function FooterCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  return (
    <section id="contact" ref={ref} className="bg-cream px-4 py-4 md:px-6 md:py-6">
      <motion.div
        style={{ scale }}
        className="relative overflow-hidden bg-charcoal px-6 py-24 md:py-32 lg:py-40"
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -right-[10vw] top-[10vh] h-[50vh] w-[40vw] rounded-full bg-accent/8 blur-[150px]" />

        <Container className="relative text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 font-body text-[0.7rem] font-medium uppercase tracking-wide-caps text-cream/30"
          >
            Get started
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="mx-auto max-w-3xl font-display text-h1 font-bold leading-display tracking-tight-display text-cream"
          >
            Ready to eat
            <br />
            <span className="text-accent">better?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-sm font-body text-sm leading-relaxed text-cream/35"
          >
            One message on WhatsApp. That&apos;s all it takes to start
            your monthly tiffin plan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="mt-12 inline-flex items-center gap-6"
          >
            <a
              href={`${CONTACT.whatsapp}?text=${encodeURIComponent(
                "Hi! I'd like to start a tiffin plan."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fill btn-fill-light"
            >
              <span>Start on WhatsApp</span>
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="link-arrow text-cream/30 hover:text-cream"
            >
              Call us
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-20 space-y-1 font-body text-xs text-cream/15"
          >
            <p>{CONTACT.address}</p>
            <p>{CONTACT.hours}</p>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
