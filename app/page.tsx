/**
 * @file Landing Page Entry - Server Component assembling the top SINTAS header, full-viewport Hero, and high-contrast SINTAS sections + compact Nirsisa footer.
 */

import { Footer } from "@/components/common/Footer";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { NavbarPill } from "@/components/common/NavbarPill";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { AiScannerSection } from "@/components/sections/AiScannerSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PricingForecastSection } from "@/components/sections/PricingForecastSection";
import { ProblemSection } from "@/components/sections/ProblemSection";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <NavbarPill />
      <main id="konten-utama" className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <AiScannerSection />
        <AudienceSection />
        <PricingForecastSection />
        <ProblemSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
