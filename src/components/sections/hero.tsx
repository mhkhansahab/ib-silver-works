import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="px-6 py-12 md:py-24">
      <div className="section-shell mx-auto max-w-4xl text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--sand)]/50 px-4 py-1.5 text-sm font-medium text-[var(--slate)]">
            <Sparkles className="h-4 w-4 text-[var(--accent)]" />
            <span>Premium Silver Bars Built on Purity and Trust</span>
          </div>
          
          <h1 className="text-4xl font-medium leading-tight text-[var(--ink)] md:text-6xl">
            Crafted for Value. <br className="hidden md:block" />
            <span className="text-[var(--accent)]">Designed to Shine.</span>
          </h1>

          <div className="mx-auto max-w-2xl">
            <p className="text-lg text-[var(--slate)] md:text-xl">
              Discover the unmatched beauty of pure silver. Each bar is crafted with precision, purity, and lasting value. Whether you’re investing for the future, expanding your collection, or simply captivated by the shine of real silver, our bars are designed to elevate your portfolio with timeless elegance.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link 
              href="/verify" 
              className={buttonStyles({ 
                className: "min-w-[200px] px-8 py-6 text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300" 
              })}
            >
              Verify Bar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="pt-8">
            <div className="grid grid-cols-2 gap-8 border-t border-[var(--border)] pt-8 sm:grid-cols-3">
              {[
                { label: "Verified Bars", value: "12k+" },
                { label: "Partners", value: "18" },
                { label: "Speed", value: "Instant" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-semibold text-[var(--ink)]">{stat.value}</div>
                  <div className="text-sm text-[var(--slate)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
