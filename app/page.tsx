import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { Hero } from "@/components/sections/Hero";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";
import { TiffinBox3D } from "@/components/sections/TiffinBox3D";
import { TodaysMenu } from "@/components/sections/TodaysMenu";
import { Ingredients } from "@/components/sections/Ingredients";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FooterCTA } from "@/components/sections/FooterCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatWeOffer />
        <TiffinBox3D />
        <TodaysMenu />
        <Ingredients />
        <HowItWorks />
        <Testimonials />
        <FooterCTA />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
