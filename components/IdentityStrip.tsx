export function IdentityStrip({ items }: { items: string[] }) {
  return (
    <section className="pixel-panel mt-6 rounded-pixel px-4 py-3 sm:px-5">
      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-mute sm:text-[11px]">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-2">
            {index > 0 ? <span className="font-pixel text-ink">|</span> : null}
            <span className="font-pixel text-ink">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
