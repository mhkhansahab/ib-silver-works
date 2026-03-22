"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const visible = !isHome || scrolled;

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 ${visible ? "nav-visible" : "nav-hidden"}`}
    >
      <div
        className="border-b border-gold/10"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          backgroundColor: "rgba(245, 240, 232, 0.85)",
        }}
      >
        <div className="section-shell flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/15 bg-dark shadow-[0_10px_30px_rgba(15,13,10,0.18)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="IB Metal Works"
                width={160}
                height={160}
                className="h-12 w-12 object-contain"
              />
            </span>
            <span className="font-display text-xl font-semibold text-ink">
              IB Metal Works
            </span>
          </Link>

          <div className="flex items-center">
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 border border-ink px-3 py-2 font-sans text-[10px] uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-ivory md:px-5 md:py-2.5 md:text-xs"
            >
              Verify Bar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
