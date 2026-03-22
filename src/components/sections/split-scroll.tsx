"use client";

import { useEffect, useRef, useState } from "react";

const goldSpecs = [
  { label: "Purity", value: "99.99%" },
  { label: "Available", value: "1g — 1kg" },
  { label: "Standard", value: "Investment grade" },
  { label: "Ownership", value: "Allocated" },
];

const silverSpecs = [
  { label: "Purity", value: "999.9 Fine" },
  { label: "Available", value: "1oz — 1kg" },
  { label: "Allocated", value: "Segregated" },
  { label: "Verified", value: "Instant SKU" },
];

export function SplitScroll() {
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
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="Gold & Silver"
      className="flex min-h-[90vh] flex-col md:flex-row"
    >
      {/* ── Gold Panel ── */}
      <div
        className="relative flex w-full flex-col justify-between overflow-hidden bg-ivory px-10 py-16 md:w-1/2 md:px-16 md:py-20 lg:px-20"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0s",
          willChange: "opacity",
        }}
      >
        {/* Chemical symbol watermark */}
        <span
          className="pointer-events-none absolute right-[-0.1em] top-[-0.15em] select-none font-display font-light leading-none text-ink/4"
          style={{ fontSize: "clamp(160px, 22vw, 320px)" }}
          aria-hidden="true"
        >
          Au
        </span>

        {/* Top label */}
        <p className="font-accent text-sm italic tracking-wider text-gold">
          01 &mdash; Gold
        </p>

        {/* Centre content */}
        <div className="relative z-10 my-auto py-12">
          <h2
            className="font-display font-light leading-none text-ink"
            style={{ fontSize: "clamp(64px, 8vw, 110px)" }}
          >
            Gold
          </h2>
          <p className="mt-6 max-w-xs font-sans text-base leading-relaxed text-pewter">
            The eternal standard. Physical gold bars sourced directly from
            trusted refineries, with clear provenance and allocated ownership.
          </p>

          {/* Specs grid */}
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
            {goldSpecs.map((s) => (
              <div key={s.label}>
                <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-pewter/60">
                  {s.label}
                </dt>
                <dd className="mt-1 font-sans text-sm font-medium text-ink">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CSS gold bar */}
        <div className="relative z-10 flex flex-col gap-2">
          <div
            className="h-10 w-40 rounded-sm bg-gold md:h-12 md:w-48"
            style={{
              boxShadow:
                "inset 0 -3px 0 rgba(0,0,0,0.14), inset 0 3px 0 rgba(255,255,255,0.10)",
            }}
          />
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-pewter/50">
            999.9 Fine Gold
          </p>
        </div>
      </div>

      {/* 1px vertical divider */}
      <div className="hidden w-px shrink-0 self-stretch bg-gold/20 md:block" />

      {/* ── Silver Panel ── */}
      <div
        className="relative flex w-full flex-col justify-between overflow-hidden bg-dark px-10 py-16 md:w-1/2 md:px-16 md:py-20 lg:px-20"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          willChange: "opacity",
        }}
      >
        {/* Chemical symbol watermark */}
        <span
          className="pointer-events-none absolute right-[-0.1em] top-[-0.15em] select-none font-display font-light leading-none text-cream/4"
          style={{ fontSize: "clamp(160px, 22vw, 320px)" }}
          aria-hidden="true"
        >
          Ag
        </span>

        {/* Top label */}
        <p className="font-accent text-sm italic tracking-wider text-pewter">
          02 &mdash; Silver
        </p>

        {/* Centre content */}
        <div className="relative z-10 my-auto py-12">
          <h2
            className="font-display font-light leading-none text-cream"
            style={{ fontSize: "clamp(64px, 8vw, 110px)" }}
          >
            Silver
          </h2>
          <p className="mt-6 max-w-xs font-sans text-base leading-relaxed text-pewter">
            Industrial strength, investment grace. Pure silver bars with
            verified provenance and clear, segregated allocation.
          </p>

          {/* Specs grid */}
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
            {silverSpecs.map((s) => (
              <div key={s.label}>
                <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-pewter/50">
                  {s.label}
                </dt>
                <dd className="mt-1 font-sans text-sm font-medium text-cream/80">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CSS silver bar */}
        <div className="relative z-10 flex flex-col gap-2">
          <div
            className="h-10 w-40 rounded-sm bg-pewter md:h-12 md:w-48"
            style={{
              boxShadow:
                "inset 0 -3px 0 rgba(0,0,0,0.20), inset 0 3px 0 rgba(255,255,255,0.12)",
            }}
          />
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-pewter/40">
            999.9 Fine Silver
          </p>
        </div>
      </div>
    </section>
  );
}
