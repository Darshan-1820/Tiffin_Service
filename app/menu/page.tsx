import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { SITE, CONTACT } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Today's Menu",
  description: `See what's cooking today at ${SITE.name}. Fresh menu updated daily.`,
};

const MENU_DATA = {
  lunch: [
    { name: "Dal Tadka", ingredients: ["Toor dal", "Tomato", "Onion", "Garlic", "Cumin", "Turmeric", "Ghee"], cal: 180 },
    { name: "Aloo Gobi", ingredients: ["Potato", "Cauliflower", "Tomato", "Ginger", "Green chili", "Coriander"], cal: 165 },
    { name: "Rice", ingredients: ["Basmati rice", "Ghee", "Bay leaf"], cal: 210 },
    { name: "Tawa Roti (5 pcs)", ingredients: ["Whole wheat flour", "Water", "Ghee"], cal: 400 },
  ],
  dinner: [
    { name: "Paneer Butter Masala", ingredients: ["Paneer", "Tomato", "Butter", "Cream", "Cashew", "Fenugreek"], cal: 280 },
    { name: "Mix Veg", ingredients: ["Beans", "Carrot", "Peas", "Capsicum", "Onion", "Tomato"], cal: 155 },
    { name: "Steamed Rice", ingredients: ["Basmati rice"], cal: 200 },
    { name: "Butter Roti (5 pcs)", ingredients: ["Whole wheat flour", "Butter", "Water"], cal: 425 },
  ],
};

export default function MenuPage() {
  const totalLunch = MENU_DATA.lunch.reduce((s, i) => s + i.cal, 0);
  const totalDinner = MENU_DATA.dinner.reduce((s, i) => s + i.cal, 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero header */}
        <section className="bg-charcoal pb-16 pt-32 sm:pb-20 sm:pt-36 md:pb-24">
          <Container>
            <p className="mb-3 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-cream/30">
              Updated daily
            </p>
            <h1 className="font-display text-h1 font-bold leading-tight tracking-tight-display text-cream">
              Today&apos;s Menu
            </h1>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-cream/40">
              Every dish made fresh. Every ingredient listed.
              No shortcuts, no secrets.
            </p>
          </Container>
        </section>

        {/* Lunch */}
        <section className="bg-[#FBF7F2] py-12 sm:py-16 md:py-20">
          <Container>
            <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-baseline sm:gap-4">
              <h2 className="font-display text-h2 font-bold tracking-tight-display text-charcoal">
                Lunch
              </h2>
              <span className="font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-accent">
                8:00 AM to 12:00 PM
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {MENU_DATA.lunch.map((item, i) => (
                <div
                  key={item.name}
                  className="group border border-charcoal/8 bg-white p-5 transition-colors hover:border-accent/20 sm:p-6"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <span className="mb-1 block font-body text-[0.6rem] font-semibold uppercase tracking-wide-caps text-accent/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-lg font-bold text-charcoal sm:text-xl">
                        {item.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-2xl font-bold leading-none text-charcoal sm:text-3xl">
                        {item.cal}
                      </span>
                      <span className="ml-0.5 font-body text-[0.6rem] text-charcoal/30">kcal</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {item.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="bg-charcoal/[0.03] px-2 py-0.5 font-body text-[0.65rem] text-charcoal/50"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-charcoal/8 pt-4">
              <span className="font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-charcoal/40">
                Total per meal
              </span>
              <span className="font-display text-xl font-bold text-charcoal">
                ~{totalLunch} <span className="text-sm font-normal text-charcoal/40">kcal</span>
              </span>
            </div>
          </Container>
        </section>

        {/* Dinner */}
        <section className="bg-charcoal py-12 sm:py-16 md:py-20">
          <Container>
            <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-baseline sm:gap-4">
              <h2 className="font-display text-h2 font-bold tracking-tight-display text-cream">
                Dinner
              </h2>
              <span className="font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-accent">
                5:00 to 9:00 PM
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {MENU_DATA.dinner.map((item, i) => (
                <div
                  key={item.name}
                  className="group border border-cream/8 p-5 transition-colors hover:border-accent/20 sm:p-6"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <span className="mb-1 block font-body text-[0.6rem] font-semibold uppercase tracking-wide-caps text-accent/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-lg font-bold text-cream sm:text-xl">
                        {item.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-2xl font-bold leading-none text-cream sm:text-3xl">
                        {item.cal}
                      </span>
                      <span className="ml-0.5 font-body text-[0.6rem] text-cream/30">kcal</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {item.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="bg-cream/[0.04] px-2 py-0.5 font-body text-[0.65rem] text-cream/40"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-cream/8 pt-4">
              <span className="font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-cream/30">
                Total per meal
              </span>
              <span className="font-display text-xl font-bold text-cream">
                ~{totalDinner} <span className="text-sm font-normal text-cream/40">kcal</span>
              </span>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-surface py-12 sm:py-16 md:py-20">
          <Container className="text-center">
            <p className="mb-2 font-body text-[0.65rem] font-semibold uppercase tracking-wide-caps text-muted">
              Like what you see?
            </p>
            <h2 className="mx-auto max-w-md font-display text-h3 font-bold tracking-tight-display text-charcoal">
              Start your plan today.
            </h2>
            <p className="mx-auto mt-3 max-w-sm font-body text-sm leading-relaxed text-muted">
              One message on WhatsApp. Pick lunch, dinner, or both.
              We handle the rest.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
              <a
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Hi! I'd like to start a tiffin plan.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fill btn-fill-accent inline-flex items-center gap-3"
              >
                <span>Start on WhatsApp</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={`tel:${CONTACT.phone}`}
                className="font-body text-[0.7rem] font-semibold uppercase tracking-wide-caps text-muted transition-colors hover:text-charcoal"
              >
                Or call us directly
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
