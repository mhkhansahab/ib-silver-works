import { HeroSection } from "@/components/sections/hero";
import { ProductCarousel } from "@/components/sections/product-carousel";
import { AboutSection } from "@/components/sections/about";
import { SiteFooter } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <ProductCarousel />
        <AboutSection />
      </main>
      <SiteFooter />
    </div>
  );
}
