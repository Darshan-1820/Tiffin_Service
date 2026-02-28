import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { SITE, CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Today's Menu",
  description: `See what's cooking today at ${SITE.name}. Fresh menu updated daily.`,
};

const MENU_DATA = {
  lunch: [
    { name: "Dal Tadka", ingredients: "Toor dal, tomato, onion, garlic, cumin, turmeric, ghee", cal: "180" },
    { name: "Aloo Gobi", ingredients: "Potato, cauliflower, tomato, ginger, green chili, coriander", cal: "165" },
    { name: "Jeera Rice", ingredients: "Basmati rice, cumin seeds, ghee, bay leaf", cal: "210" },
    { name: "Tawa Roti (4 pcs)", ingredients: "Whole wheat flour, water, ghee", cal: "240" },
  ],
  dinner: [
    { name: "Paneer Butter Masala", ingredients: "Paneer, tomato, butter, cream, cashew, fenugreek, garam masala", cal: "280" },
    { name: "Mix Veg", ingredients: "Beans, carrot, peas, capsicum, paneer, onion, tomato", cal: "155" },
    { name: "Steamed Rice", ingredients: "Basmati rice", cal: "200" },
    { name: "Butter Roti (4 pcs)", ingredients: "Whole wheat flour, butter, water", cal: "270" },
  ],
};

export default function MenuPage() {
  const totalLunch = MENU_DATA.lunch.reduce((s, i) => s + parseInt(i.cal), 0);
  const totalDinner = MENU_DATA.dinner.reduce((s, i) => s + parseInt(i.cal), 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pb-20 pt-32">
        <Container>
          <p className="mb-4 font-body text-[0.7rem] font-medium uppercase tracking-wide-caps text-muted">
            Updated daily
          </p>
          <h1 className="font-display text-h1 font-bold leading-tight tracking-tight-display text-charcoal">
            Today&apos;s Menu
          </h1>

          {/* Lunch */}
          <div className="mt-16">
            <div className="mb-6 flex items-baseline gap-4">
              <h2 className="font-display text-xl font-bold text-charcoal">Lunch</h2>
              <span className="font-body text-xs uppercase tracking-wide-caps text-muted">
                8:00 AM – 12:00 PM
              </span>
            </div>
            <div className="border-t border-charcoal/10">
              {MENU_DATA.lunch.map((item, i) => (
                <div
                  key={item.name}
                  className="grid grid-cols-12 items-baseline border-b border-charcoal/8 py-5"
                >
                  <span className="col-span-2 font-body text-sm font-semibold text-charcoal/70 md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="col-span-7 font-display text-base font-semibold text-charcoal md:col-span-3">
                    {item.name}
                  </h3>
                  <p className="col-span-6 hidden font-body text-sm text-muted md:block">
                    {item.ingredients}
                  </p>
                  <span className="col-span-3 text-right font-body text-sm tabular-nums text-charcoal/50 md:col-span-2">
                    {item.cal} kcal
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 font-body text-sm font-semibold text-charcoal/60">
              Total: ~{totalLunch} kcal per meal
            </p>
          </div>

          {/* Dinner */}
          <div className="mt-20">
            <div className="mb-6 flex items-baseline gap-4">
              <h2 className="font-display text-xl font-bold text-charcoal">Dinner</h2>
              <span className="font-body text-xs uppercase tracking-wide-caps text-muted">
                5:00 – 9:00 PM
              </span>
            </div>
            <div className="border-t border-charcoal/10">
              {MENU_DATA.dinner.map((item, i) => (
                <div
                  key={item.name}
                  className="grid grid-cols-12 items-baseline border-b border-charcoal/8 py-5"
                >
                  <span className="col-span-2 font-body text-sm font-semibold text-charcoal/70 md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="col-span-7 font-display text-base font-semibold text-charcoal md:col-span-3">
                    {item.name}
                  </h3>
                  <p className="col-span-6 hidden font-body text-sm text-muted md:block">
                    {item.ingredients}
                  </p>
                  <span className="col-span-3 text-right font-body text-sm tabular-nums text-charcoal/50 md:col-span-2">
                    {item.cal} kcal
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 font-body text-sm font-semibold text-charcoal/60">
              Total: ~{totalDinner} kcal per meal
            </p>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <p className="mb-6 font-body text-sm text-muted">
              Like what you see?
            </p>
            <a
              href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Hi! I'd like to start a tiffin plan.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fill btn-fill-accent inline-block"
            >
              <span>Start your plan</span>
            </a>
          </div>
        </Container>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
