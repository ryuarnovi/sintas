/**
 * @file Landing Page Entry - Server Component assembling the full-viewport Hero and high-contrast SINTAS sections (Navbar and Footer are provided by RootLayout).
 */

import { AudienceSection } from "@/components/sections/AudienceSection";
import { AiScannerSection } from "@/components/sections/AiScannerSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PricingForecastSection } from "@/components/sections/PricingForecastSection";
import { ProblemSection } from "@/components/sections/ProblemSection";

export default function HomePage() {
  return (
    <main id="konten-utama" className="flex-1">
      <HeroSection />
      <HowItWorksSection />
      <AiScannerSection />
      <AudienceSection />
      <PricingForecastSection />
      <ProblemSection />
      <FaqSection />
    </main>
  );
}
