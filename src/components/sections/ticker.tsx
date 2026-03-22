const tickerItems = [
  "Making charges for silver",
  "1 Tola 1000 PKR",
  "5 Tola 1500 PKR",
  "10 Tola 2000 PKR",
  "with complete packing",
];

export function Ticker() {
  const repeatedItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-12 items-center overflow-hidden bg-dark">
      <div className="ticker-track whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center px-8 font-sans text-[11px] font-medium tracking-[0.12em] text-cream/65"
          >
            {repeatedItems.map((item, index) => (
              <span
                key={`${copy}-${item}-${index}`}
                className="inline-flex items-center"
              >
                <span
                  className={
                    index % tickerItems.length === 0
                      ? "text-gold/90"
                      : "text-cream/65"
                  }
                >
                  {item}
                </span>
                <span className="px-4 text-gold/35" aria-hidden>
                  •
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
