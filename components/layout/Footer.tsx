import { Container } from "@/components/ui/Container";
import { SITE, CONTACT } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-cream pb-24 pt-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <span className="font-display text-sm font-bold text-charcoal">
            {SITE.name}
          </span>

          <div className="flex items-center gap-8">
            <a
              href="#menu"
              className="font-body text-xs uppercase tracking-wide-caps text-muted transition-colors hover:text-charcoal"
            >
              Menu
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs uppercase tracking-wide-caps text-muted transition-colors hover:text-charcoal"
            >
              WhatsApp
            </a>
          </div>

          <span className="font-body text-[0.65rem] font-bold text-accent">
            Crafted by Shiparaj Solutions Pvt Ltd
          </span>
        </div>
      </Container>
    </footer>
  );
}
