import { Container } from "@/components/ui/Container";
import { SITE, CONTACT } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-cream pb-20 pt-6">
      <Container>
        <div className="flex flex-col items-center gap-6">
          {/* Top row — brand + links */}
          <div className="flex w-full flex-col items-center gap-6 md:flex-row md:justify-between">
            {/* Brand */}
            <div className="text-center md:text-left">
              <span className="block font-display text-sm font-bold text-charcoal">
                {SITE.name}
              </span>
              <span className="mt-1 block font-body text-[0.65rem] text-muted">
                {CONTACT.address}
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 sm:gap-8">
              <a
                href="#menu"
                className="py-2 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-muted transition-colors hover:text-charcoal"
              >
                Menu
              </a>
              <a
                href={`tel:${CONTACT.phone}`}
                className="py-2 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-muted transition-colors hover:text-charcoal"
              >
                Call
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-muted transition-colors hover:text-charcoal"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Bottom — centered credit + copyright */}
          <div className="border-t border-charcoal/8 pt-5 text-center">
            <span className="block font-body text-[0.6rem] font-bold text-accent">
              Crafted by Shiparaj Solutions Pvt Ltd
            </span>
            <span className="mt-1 block font-body text-[0.6rem] text-muted/50">
              &copy; {new Date().getFullYear()} {SITE.name}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
