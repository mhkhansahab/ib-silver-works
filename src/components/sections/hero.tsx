import Link from "next/link";

export function HeroSection() {
  return (
    <section
      data-section="The Weight of Value"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(15, 13, 10, 0.55)" }}
      />

      {/* Main content */}
      <div className="relative z-10 px-8 pb-[28vh] text-center">
        <h1
          className="font-display font-light leading-[0.95] text-ivory"
          style={{ fontSize: "var(--hero-size)" }}
        >
          Gold doesn&apos;t guess.
          <br />
          <em className="font-accent italic text-gold">It endures.</em>
        </h1>
        <p className="mx-auto mt-8 max-w-lg font-sans text-lg leading-relaxed text-cream/70">
          Physical precious metals, sourced with precision,
          <br className="hidden md:block" />
          verified with clarity.
        </p>
      </div>

      {/* 3D Gold Bar — acts as the CTA */}
      <Link
        href="/verify"
        className="group absolute bottom-28 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-5 transition-transform duration-200 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        aria-label="Verify your gold or silver bar"
      >
       

        {/* Label — pill CTA */}
        <span className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full border border-gold/40 bg-dark/60 px-8 py-3 font-display text-xl font-light italic text-gold/90 shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-md transition-[color,background-color,border-color,box-shadow] duration-300 ease-out group-hover:border-gold group-hover:bg-gold group-hover:text-dark group-hover:shadow-[0_12px_36px_rgba(201,168,76,0.3)]">
          Verify Your Bar
          <span
            className="mt-0.5 block h-px w-5 shrink-0 bg-current transition-[width] duration-300 ease-out group-hover:w-10"
            aria-hidden
          />
        </span>
      </Link>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream/50">
          Scroll
        </span>
        <div className="h-8 w-px bg-gold/40" />
      </div>
    </section>
  );
}
