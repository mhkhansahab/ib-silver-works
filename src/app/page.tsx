import { HeroSection } from "@/components/sections/hero";
import { SplitScroll } from "@/components/sections/split-scroll";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { HowItWorks } from "@/components/sections/how-it-works";
import { TrustSection } from "@/components/sections/trust-section";
import { Ticker } from "@/components/sections/ticker";
import { SiteFooter } from "@/components/sections/footer";
import { SectionLabel } from "@/components/ui/section-label";

export default function Home() {
  return (
    <>
      <SectionLabel />
      <main>
        <HeroSection />
        <hr className="section-rule" />
        <SplitScroll />
        <hr className="section-rule" />
        <ProductShowcase />
        <hr className="section-rule" />
        <HowItWorks />
        <TrustSection />
        <SiteFooter />
      </main>
      <Ticker />
    </>
  );
}
