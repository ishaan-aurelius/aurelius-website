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

// Every land-dot coordinate (normalized to 0..1 of the viewBox), rounded to 4 dp to
// trim bytes. The hero plexus meshes ALL of these into a dense edge network — the
// continents are formed by edge density, not by the dots themselves — so we keep the
// full ~3000-point cloud rather than sampling it down.
export const landPoints: { x: number; y: number }[] = map.getPoints().map((p) => ({
  x: Math.round((p.x / mapViewBox.width) * 1e4) / 1e4,
  y: Math.round((p.y / mapViewBox.height) * 1e4) / 1e4,
}));
