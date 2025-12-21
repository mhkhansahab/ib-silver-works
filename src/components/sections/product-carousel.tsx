"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const catalog = [
  {
    name: "1kg Apex Reserve",
    description: "Premium investment grade silver bar with mirror finish.",
    weight: "1000g",
    purity: "99.99%",
  },
  {
    name: "500g Sentinel",
    description: "Compact treasury bar, perfect for diverse portfolios.",
    weight: "500g",
    purity: "99.95%",
  },
  {
    name: "250g Heritage",
    description: "Limited edition bar featuring classic design elements.",
    weight: "250g",
    purity: "99.90%",
  },
];

export function ProductCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % catalog.length),
      5000,
    );
    return () => clearInterval(timer);
  }, []);

  const active = catalog[index];

  return (
    <section id="products" className="bg-[var(--dark-gray)]/20 px-6 py-16 md:py-24">
      <div className="section-shell mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-medium text-[var(--light-silver)] md:text-4xl">
            Our Collection
          </h2>
          <p className="mt-4 text-[var(--silver)]">
            Explore our range of verified silver bullion.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-[var(--charcoal)] shadow-sm border border-[var(--border)]">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center p-8 md:p-12 bg-[var(--dark-gray)]/30">
              <span className="mb-2 text-sm font-medium text-[var(--silver)] uppercase tracking-wider">
                Featured Item
              </span>
              <h3 className="mb-4 text-3xl font-medium text-[var(--light-silver)]">
                {active.name}
              </h3>
              <p className="mb-8 text-[var(--silver)] text-lg leading-relaxed">
                {active.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-[var(--silver)] uppercase tracking-wide">Weight</div>
                  <div className="text-xl font-medium text-[var(--light-silver)]">{active.weight}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--silver)] uppercase tracking-wide">Purity</div>
                  <div className="text-xl font-medium text-[var(--light-silver)]">{active.purity}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center border-t border-[var(--border)] p-8 md:border-l md:border-t-0 md:p-12">
              <div className="space-y-2">
                {catalog.map((product, idx) => (
                  <button
                    key={product.name}
                    onClick={() => setIndex(idx)}
                    className={cn(
                      "w-full rounded-xl p-4 text-left transition-all duration-300",
                      idx === index
                        ? "bg-[var(--dark-gray)] border-transparent"
                        : "hover:bg-[var(--dark-gray)]/50 text-[var(--silver)]"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={cn("font-medium", idx === index ? "text-[var(--light-silver)]" : "")}>
                        {product.name}
                      </span>
                      {idx === index && (
                        <span className="h-2 w-2 rounded-full bg-[var(--silver)]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <Button
                  variant="secondary"
                  onClick={() => setIndex((prev) => (prev - 1 + catalog.length) % catalog.length)}
                  className="h-10 w-10 rounded-full p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setIndex((prev) => (prev + 1) % catalog.length)}
                  className="h-10 w-10 rounded-full p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
