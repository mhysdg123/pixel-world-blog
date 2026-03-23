const artRows = [
  "0000001111000000",
  "0000013333100000",
  "0000132222310000",
  "0001322222231000",
  "0013222222223100",
  "0013221111223100",
  "0013221331223100",
  "0013221111223100",
  "0013222222223100",
  "0001322332231000",
  "0000132332310000",
  "0000013333100000",
  "0000044444400000",
  "0000440440440000",
  "0004400000044000",
  "0044000000004400",
];

const colorMap: Record<string, string> = {
  "0": "transparent",
  "1": "#1f1d1a",
  "2": "#ffd9b1",
  "3": "#2f65c9",
  "4": "#d8682e",
};

export function PixelCharacter() {
  return (
    <div className="pixel-panel relative mx-auto w-full max-w-[360px] rounded-pixel p-4 sm:p-6">
      <div className="absolute right-3 top-3 pixel-tag px-2 py-1 text-[8px]">8-bit mode</div>
      <div className="mx-auto mt-6 grid w-fit gap-[1px] rounded-pixel border-2 border-line bg-paper p-3 shadow-pixel-soft" style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}>
        {artRows.flatMap((row, rowIndex) => row.split("").map((cell, colIndex) => (
          <span key={`${rowIndex}-${colIndex}`} className="block h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ backgroundColor: colorMap[cell] }} />
        )))}
      </div>
      <p className="mt-4 text-center text-sm text-mute">Indie builder sprite, ready for late-night coding quests.</p>
    </div>
  );
}
