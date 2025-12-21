import { ShieldCheck, Zap, Lock } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Guaranteed Authenticity",
    description: "Every bar is rigorously checked and logged for your peace of mind.",
  },
  {
    icon: Zap,
    title: "Instant Verification",
    description: "Check any serial number in seconds to view its complete history.",
  },
  {
    icon: Lock,
    title: "Secure Records",
    description: "Our centralized database ensures that product details are immutable.",
  },
];

export function AboutSection() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="section-shell mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-[var(--dark-gray)]/50 px-4 py-1.5 text-sm font-medium text-[var(--silver)]">
            Why Choose Us
          </span>
          <h2 className="text-3xl font-medium text-[var(--light-silver)] md:text-5xl">
            Trust built into every bar
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-3xl border border-[var(--border)] bg-[var(--charcoal)] p-8 text-center transition-all hover:shadow-md"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--dark-gray)]/50 text-[var(--silver)]">
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-medium text-[var(--light-silver)]">
                {benefit.title}
              </h3>
              <p className="text-[var(--silver)] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
