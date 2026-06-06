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
