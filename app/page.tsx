import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { Hero } from "@/components/sections/Hero";
import { ProblemStatement } from "@/components/sections/ProblemStatement";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";
import { FitBite } from "@/components/sections/FitBite";
import { FourLayers } from "@/components/sections/FourLayers";
import { Ingredients } from "@/components/sections/Ingredients";
import { TodaysMenu } from "@/components/sections/TodaysMenu";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { LaundryService } from "@/components/sections/LaundryService";
import { FooterCTA } from "@/components/sections/FooterCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hook → Tension → Solution */}
        <Hero />
        <ProblemStatement />
        <WhatWeOffer />
        <FitBite />

        {/* Experience → Proof */}
        <FourLayers />
        <Ingredients />
        <TodaysMenu />

        {/* Trust → Action */}
        <HowItWorks />
        <Testimonials />
        <LaundryService />
        <FooterCTA />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
