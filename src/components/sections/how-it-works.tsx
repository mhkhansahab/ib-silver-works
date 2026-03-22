"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Source",
    description:
      "We work directly with trusted refineries to procure investment-grade gold and silver bars with full chain-of-custody documentation.",
    accent: "gold" as const,
  },
  {
    num: "02",
    title: "Verify",
    description:
      "Every bar undergoes rigorous authentication — weight assay, purity testing, and serial registration in our immutable verification system.",
    accent: "pewter" as const,
  },
  {
    num: "03",
    title: "Own",
    description:
      "Complete your purchase with a clear record of bar details, provenance, and serial-level verification you can reference with confidence.",
    accent: "gold" as const,
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      data-section="How It Works"
      className="bg-ivory"
      style={{
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
      }}
    >
      <div className="section-shell">
        {/* Header — flush left */}
        <div className="mb-16 max-w-xl">
          <p className="font-accent text-sm italic text-gold">The Process</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-ink md:text-6xl">
            Three steps to
            <br />
            ownership
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`stagger-card ${visible ? "visible" : ""}`}
            >
              <div
                className="flex h-full flex-col p-8 md:p-10"
                style={{
                  border: `1px solid ${step.accent === "gold" ? "#C9A84C" : "#9BA3A8"}`,
                }}
              >
                <span
                  className="font-accent text-sm italic"
                  style={{
                    color: step.accent === "gold" ? "#C9A84C" : "#9BA3A8",
                  }}
                >
                  {step.num}
                </span>
                <h3 className="mt-4 font-display text-3xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-pewter">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
