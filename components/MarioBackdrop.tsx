const clouds = Array.from({ length: 10 }, (_, idx) => idx);
const blocks = Array.from({ length: 16 }, (_, idx) => idx);

export function MarioBackdrop() {
  return (
    <div aria-hidden className="mario-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="mario-cloud-layer mario-cloud-layer--slow">
        {clouds.map((cloud) => (
          <span key={`slow-${cloud}`} className="mario-cloud" />
        ))}
      </div>

      <div className="mario-cloud-layer mario-cloud-layer--fast">
        {clouds.map((cloud) => (
          <span key={`fast-${cloud}`} className="mario-cloud mario-cloud--small" />
        ))}
      </div>

      <div className="mario-blocks">
        {blocks.map((block) => (
          <span
            key={`block-${block}`}
            className={`mario-block ${block % 4 === 1 ? "mario-block--question" : ""}`}
          />
        ))}
      </div>

      <div className="mario-hills" />
      <div className="mario-ground" />
      <div className="mario-runner" />
    </div>
  );
}