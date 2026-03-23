export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="font-pixel text-[12px] uppercase tracking-[0.16em] text-ink sm:text-[13px]">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-mute">{subtitle}</p> : null}
    </div>
  );
}
