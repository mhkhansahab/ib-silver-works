export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--charcoal)] py-12">
      <div className="section-shell mx-auto flex max-w-6xl flex-col gap-8 px-6 text-sm text-[var(--silver)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--light-silver)]">
            IB Gold & Silver Works
          </p>
          <p className="mt-2 text-[var(--silver)]">
            Premium Silver Bars Built on Purity and Trust.
          </p>
        </div>
        <p className="text-[var(--silver)]/60">
          © {new Date().getFullYear()} IB Gold & Silver Works
        </p>
      </div>
    </footer>
  );
}
