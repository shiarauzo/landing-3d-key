// The repeated section marker: a top hairline, [ 0X / 09 ] index on the left
// and the section name (mono, letter-spaced) offset to the right.
export function SectionHeader({
  index,
  name,
}: {
  index: string;
  name: string;
}) {
  return (
    <div className="border-t border-white/15 pt-4">
      <div className="flex items-start gap-16 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 sm:gap-24">
        <span>[ {index} / 06 ]</span>
        <span>{name}</span>
      </div>
    </div>
  );
}
