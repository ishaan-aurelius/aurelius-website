import DottedMap from "dotted-map";

// Computed once at module load (server side). Returns an inline SVG string of the
// world rendered as a dot grid — decorative backdrop only, not real/live data.
const map = new DottedMap({ height: 60, grid: "diagonal" });

export const worldMapSvg = map.getSVG({
  radius: 0.22,
  color: "#A0B8C8",
  shape: "circle",
  backgroundColor: "transparent",
});

// The SVG renders inside this viewBox; nodes placed on the map use the same space.
export const mapViewBox = { width: 119, height: 60 };

// Land-dot coordinates (normalized to 0..1 of the viewBox), sampled down from the
// full ~3000 dots to keep the client bundle light. The hero network picks a random
// subset of these so its nodes always sit on actual landmasses.
export const landPoints: { x: number; y: number }[] = (() => {
  const all = map.getPoints();
  const stride = Math.ceil(all.length / 500);
  return all
    .filter((_, i) => i % stride === 0)
    .map((p) => ({ x: p.x / mapViewBox.width, y: p.y / mapViewBox.height }));
})();
