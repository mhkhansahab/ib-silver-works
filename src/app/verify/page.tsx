import { VerifyForm } from "@/components/verify/verify-form";
import { SiteFooter } from "@/components/sections/footer";

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-dark pt-20">
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "calc(var(--section-gap) * 0.85)",
          paddingBottom: "calc(var(--section-gap) * 0.85)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(201,168,76,0.14), transparent 30%), radial-gradient(circle at bottom right, rgba(155,163,168,0.1), transparent 26%)",
          }}
        />

        <div className="section-shell relative">
          <p
            className="pointer-events-none absolute right-0 top-0 hidden select-none font-display font-light leading-none text-cream/6 lg:block"
            style={{ fontSize: "clamp(110px, 15vw, 220px)" }}
            aria-hidden="true"
          >
            Verify
          </p>

          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-center">
            <div className="max-w-xl">
              <p className="font-accent text-sm italic text-gold">
                Authenticity Check
              </p>
              <h1 className="mt-3 font-display text-5xl leading-[0.95] text-cream md:text-7xl">
                Verify your bar
              </h1>
              <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-pewter">
                Confirm the recorded details of your bar through its serial
                number. The verification result shows the registered weight,
                purity, and issue date in the same visual language as the rest
                of the site.
              </p>

              <div className="mt-10 grid gap-4 text-sm text-cream/80 sm:grid-cols-2">
                <div className="rounded-2xl border border-gold/15 bg-[#15110d] px-5 py-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-gold/65">
                    What you need
                  </p>
                  <p className="mt-2 font-sans leading-relaxed text-pewter">
                    The serial number engraved on the bar.
                  </p>
                </div>
                <div className="rounded-2xl border border-gold/15 bg-[#15110d] px-5 py-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-gold/65">
                    What you get
                  </p>
                  <p className="mt-2 font-sans leading-relaxed text-pewter">
                    Registered bar details and verification status.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-xl lg:justify-self-end">
              <VerifyForm />
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
