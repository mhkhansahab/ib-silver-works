export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-white py-12">
      <div className="section-shell mx-auto flex max-w-6xl flex-col gap-8 px-6 text-sm text-[var(--slate)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--ink)]">
            IB Silver Works
          </p>
          <p className="mt-2 text-[var(--slate)]">
            Premium Silver Bars Built on Purity and Trust.
          </p>
        </div>
        <p className="text-[var(--slate)]/60">
          © {new Date().getFullYear()} IB Silver Works
        </p>
      </div>
    </footer>
  );
}
