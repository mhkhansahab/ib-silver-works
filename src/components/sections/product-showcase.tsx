export function ProductShowcase() {
  return (
    <section
      data-section="Product Showcase"
      className="bg-dark"
      style={{
        paddingTop: "calc(var(--section-gap) * 0.9)",
        paddingBottom: "calc(var(--section-gap) * 0.9)",
      }}
    >
      <div className="section-shell">
        <div className="mb-12 max-w-2xl">
          <p className="font-accent text-sm italic text-gold">
            Product Showcase
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-cream md:text-6xl">
            See the bar in hand
          </h2>
          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-pewter">
            A closer look at the bar&apos;s finish, presence, and detail through
            live footage.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-4xl border border-gold/20 bg-[#120f0b] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-5">
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(201,168,76,0.18), transparent 38%), radial-gradient(circle at bottom right, rgba(155,163,168,0.12), transparent 34%)",
            }}
          />

          <div className="relative overflow-hidden rounded-3xl border border-gold/15 bg-black/30">
            <video
              className="aspect-video w-full object-cover"
              src="/product-showcase.mp4"
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-dark via-dark/35 to-transparent px-6 py-6 md:px-8">
              <span className="inline-flex items-center gap-3 rounded-full border border-gold/25 bg-dark/65 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.22em] text-cream/80 backdrop-blur-sm">
                Gold Bar Footage
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl font-sans text-sm leading-relaxed text-pewter">
            A quiet product moment, focused on the scale and surface of the
            bar.
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-gold/60">
            Cinematic product view
          </p>
        </div>
      </div>
    </section>
  );
}
