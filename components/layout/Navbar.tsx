"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, CONTACT, SITE } from "@/lib/constants";
import { X } from "lucide-react";

// Premium nav link — text slides up on hover, duplicate slides in
function NavLink({
  label,
  href,
  hoveredIndex,
  index,
  onHover,
  onLeave,
}: {
  label: string;
  href: string;
  hoveredIndex: number | null;
  index: number;
  onHover: (i: number) => void;
  onLeave: () => void;
}) {
  const isBlurred = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.a
      href={href}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      animate={{
        opacity: isBlurred ? 0.3 : 1,
        filter: isBlurred ? "blur(2px)" : "blur(0px)",
      }}
      transition={{ duration: 0.3 }}
      className="group relative block overflow-hidden py-1"
    >
      {/* Original text — slides up on hover */}
      <span className="block font-body text-[0.8rem] font-medium uppercase tracking-wide-caps text-charcoal transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {label}
      </span>
      {/* Duplicate — slides up into view */}
      <span className="absolute left-0 top-full block font-body text-[0.8rem] font-medium uppercase tracking-wide-caps text-charcoal transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {label}
      </span>
    </motion.a>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="fixed left-0 right-0 top-0 z-50 bg-cream/40 py-6 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <a href="#home" className="font-display text-lg font-bold text-charcoal">
            {SITE.name}
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.href}
                label={link.label}
                href={link.href}
                hoveredIndex={hoveredIndex}
                index={i}
                onHover={setHoveredIndex}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fill btn-fill-light ml-2"
            >
              <span>Get Started</span>
            </a>
          </div>

          {/* Mobile — custom hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col gap-[5px] md:hidden"
            aria-label="Open menu"
          >
            <span className="block h-[1.5px] w-6 bg-charcoal" />
            <span className="block h-[1.5px] w-4 bg-charcoal" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-charcoal p-8"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="mb-16 self-end text-cream/60"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex flex-1 flex-col justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.08,
                    duration: 0.5,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="font-display text-[clamp(2rem,8vw,4rem)] font-bold leading-display text-cream"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fill btn-fill-light inline-block"
              >
                <span>Get Started</span>
              </a>
              <p className="mt-4 font-body text-xs text-cream/30">
                {CONTACT.address}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
