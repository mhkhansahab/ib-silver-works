import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      className="bg-dark pb-20"
      style={{ paddingTop: "var(--section-gap)" }}
      data-section="Contact"
    >
      <div className="section-shell">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-16">
          <div className="max-w-md">
            <div className="flex items-center gap-5">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.75rem] border border-gold/15 bg-[#17120d] shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="IB Metal Works"
                  width={160}
                  height={160}
                  className="h-16 w-16 object-contain"
                />
              </span>
              <p className="font-display text-3xl text-cream">IB Metal Works</p>
            </div>
            <p className="mt-4 font-sans text-sm leading-relaxed text-pewter/85">
              We&apos;re building a modern way to buy physical gold and silver:
              clear sourcing, serial-level verification, and transparent
              ownership records.
            </p>
            <p className="mt-5 font-sans text-xs uppercase tracking-[0.2em] text-pewter">
              IB
            </p>
          </div>
          <div className="flex flex-col gap-6 md:items-end md:text-right">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-pewter">
              On this site
            </p>
            <nav className="flex flex-col gap-3 font-sans text-sm text-cream/90 md:items-end">
              <Link
                href="/verify"
                className="w-fit transition-colors hover:text-gold"
              >
                Verify a bar
              </Link>
              <Link
                href="/admin"
                className="w-fit transition-colors hover:text-gold"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
        <hr className="my-12 border-gold/10" />
        <div className="flex flex-col gap-2 font-sans text-xs tracking-wider text-pewter/45 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} IB Metal Works. All
            rights reserved.
          </p>
          <p className="md:text-right">
            Physical metals only—not investment advice.
          </p>
        </div>
      </div>

      {/* Spacer for fixed ticker */}
      <div className="h-12" />
    </footer>
  );
}
