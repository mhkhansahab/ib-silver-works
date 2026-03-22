"use client";

import { useEffect, useRef, useState } from "react";

const credentials = [
  "Clear provenance across every bar",
  "Transparent serial-level verification",
  "Independent third-party assay verification",
  "Allocated & segregated storage",
  "24/7 portfolio access",
];

export function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
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
      ref={sectionRef}
      data-section="Trust"
      className="bg-dark"
      style={{
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
      }}
    >
      <div className="section-shell">
        {/* Large watermark */}
        <p
          className="font-display font-light leading-none text-cream/6"
          style={{ fontSize: "clamp(80px, 18vw, 240px)" }}
        >
          Verified
        </p>

        <div className="mt-12 grid gap-16 md:grid-cols-2">
          {/* Silver bar visual */}
          <div className="flex items-center justify-center">
            <div className={`trust-fade ${visible ? "visible" : ""}`}>
              <div
                className="h-20 w-72 rounded bg-pewter md:h-24 md:w-80"
                style={{
                  boxShadow:
                    "inset 0 -4px 0 rgba(0,0,0,0.2), inset 0 4px 0 rgba(255,255,255,0.1)",
                }}
              />
              <p className="mt-4 text-center font-accent text-xs italic text-pewter/60">
                999.9 Fine Silver
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-col justify-center">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-pewter">
              Certifications & Trust
            </p>
            <h3 className="mt-4 font-display text-3xl text-cream md:text-4xl">
              Standards you can trace
            </h3>
            <ul className="mt-8 space-y-4">
              {credentials.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-sans text-sm leading-relaxed text-cream/60"
                >
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
