import {
  FaShip,
  FaFighterJet,
  FaPlane,
  FaSatellite,
  FaSatelliteDish,
  FaRocket,
  FaHelicopter,
  FaBroadcastTower,
  FaCrosshairs,
} from "react-icons/fa";
import type { IconType } from "react-icons";

// Ambient military-asset silhouettes scattered behind the Scale stats, ships, jets,
// missiles, a satellite, a radar mast, echoing the source slide. Decorative texture
// only (aria-hidden, pointer-events none). Tinted teal / faint red per user decision
// 2026-06-14 (overrides the spec's teal=data / red=status rule for this layer).
//
// These double as the NODES of the KillWeb network: each asset's `x`/`y` (fractions of
// the section box, 0..1) is also fed to <KillWeb anchors={...}> so the network's edges
// terminate ON the icons. AssetField and KillWeb share this one list as the single
// source of truth for positions, same fraction → same pixel in both layers.
const TEAL = "#4AAFB8";
const RED = "#D44040";

export type Asset = {
  Icon: IconType;
  x: number; // fraction of section width (0..1)
  y: number; // fraction of section height (0..1)
  size: number; // px
  rot: number; // deg
  color: string;
  opacity: number;
};

// Clustered like the source slide: a dense air swarm across the top, naval columns down
// the left, a right flank, and corner groups, not an even scatter. Kept off the exact
// center (the gold reticle) and away from sitting squarely on the big numbers.
export const ASSETS: Asset[] = [
  // upper-left air swarm, jets / planes / missiles
  { Icon: FaFighterJet, x: 0.05, y: 0.03, size: 24, rot: 18, color: TEAL, opacity: 0.34 },
  { Icon: FaPlane, x: 0.12, y: 0.02, size: 18, rot: 10, color: TEAL, opacity: 0.28 },
  { Icon: FaFighterJet, x: 0.18, y: 0.06, size: 22, rot: 28, color: TEAL, opacity: 0.32 },
  { Icon: FaPlane, x: 0.25, y: 0.04, size: 16, rot: 8, color: TEAL, opacity: 0.26 },
  { Icon: FaRocket, x: 0.08, y: 0.11, size: 22, rot: -48, color: RED, opacity: 0.28 },
  { Icon: FaFighterJet, x: 0.15, y: 0.13, size: 20, rot: 22, color: TEAL, opacity: 0.3 },
  { Icon: FaPlane, x: 0.22, y: 0.11, size: 16, rot: 14, color: TEAL, opacity: 0.24 },
  { Icon: FaHelicopter, x: 0.03, y: 0.16, size: 22, rot: 0, color: TEAL, opacity: 0.3 },
  { Icon: FaRocket, x: 0.29, y: 0.13, size: 18, rot: -48, color: RED, opacity: 0.24 },
  // upper-center air
  { Icon: FaFighterJet, x: 0.33, y: 0.06, size: 20, rot: 24, color: TEAL, opacity: 0.28 },
  { Icon: FaRocket, x: 0.39, y: 0.03, size: 18, rot: -50, color: RED, opacity: 0.24 },
  { Icon: FaPlane, x: 0.41, y: 0.11, size: 16, rot: 10, color: TEAL, opacity: 0.22 },
  // upper-right, radar mast, satellite, air
  { Icon: FaSatelliteDish, x: 0.6, y: 0.04, size: 20, rot: 0, color: TEAL, opacity: 0.26 },
  { Icon: FaPlane, x: 0.66, y: 0.09, size: 16, rot: -8, color: TEAL, opacity: 0.24 },
  { Icon: FaFighterJet, x: 0.71, y: 0.05, size: 20, rot: -22, color: TEAL, opacity: 0.3 },
  { Icon: FaPlane, x: 0.8, y: 0.1, size: 16, rot: 6, color: TEAL, opacity: 0.22 },
  { Icon: FaBroadcastTower, x: 0.92, y: 0.03, size: 28, rot: 0, color: RED, opacity: 0.3 },
  { Icon: FaSatellite, x: 0.97, y: 0.07, size: 26, rot: -15, color: TEAL, opacity: 0.32 },
  // left naval column
  { Icon: FaShip, x: 0.04, y: 0.25, size: 28, rot: 0, color: TEAL, opacity: 0.32 },
  { Icon: FaShip, x: 0.11, y: 0.28, size: 24, rot: 0, color: TEAL, opacity: 0.28 },
  { Icon: FaShip, x: 0.02, y: 0.34, size: 22, rot: 0, color: RED, opacity: 0.26 },
  { Icon: FaShip, x: 0.09, y: 0.37, size: 24, rot: 0, color: TEAL, opacity: 0.28 },
  // left-mid naval row
  { Icon: FaShip, x: 0.12, y: 0.47, size: 24, rot: 0, color: TEAL, opacity: 0.3 },
  { Icon: FaShip, x: 0.19, y: 0.45, size: 22, rot: 0, color: TEAL, opacity: 0.28 },
  { Icon: FaShip, x: 0.23, y: 0.49, size: 20, rot: 0, color: RED, opacity: 0.24 },
  { Icon: FaFighterJet, x: 0.16, y: 0.53, size: 18, rot: -14, color: TEAL, opacity: 0.24 },
  // right flank
  { Icon: FaPlane, x: 0.8, y: 0.22, size: 18, rot: 4, color: TEAL, opacity: 0.26 },
  { Icon: FaFighterJet, x: 0.9, y: 0.27, size: 22, rot: 158, color: RED, opacity: 0.26 },
  { Icon: FaShip, x: 0.96, y: 0.33, size: 24, rot: 0, color: TEAL, opacity: 0.3 },
  { Icon: FaPlane, x: 0.84, y: 0.37, size: 16, rot: 170, color: TEAL, opacity: 0.22 },
  { Icon: FaShip, x: 0.93, y: 0.48, size: 20, rot: 0, color: TEAL, opacity: 0.26 },
  // bottom-left
  { Icon: FaCrosshairs, x: 0.08, y: 0.8, size: 26, rot: 0, color: TEAL, opacity: 0.28 },
  { Icon: FaShip, x: 0.04, y: 0.9, size: 22, rot: 0, color: TEAL, opacity: 0.26 },
  { Icon: FaRocket, x: 0.2, y: 0.85, size: 20, rot: -32, color: RED, opacity: 0.24 },
  { Icon: FaFighterJet, x: 0.27, y: 0.92, size: 18, rot: 30, color: TEAL, opacity: 0.24 },
  // bottom-right
  { Icon: FaShip, x: 0.88, y: 0.84, size: 22, rot: 0, color: TEAL, opacity: 0.28 },
  { Icon: FaFighterJet, x: 0.79, y: 0.91, size: 18, rot: 26, color: TEAL, opacity: 0.24 },
  { Icon: FaRocket, x: 0.95, y: 0.92, size: 20, rot: -28, color: RED, opacity: 0.24 },
  { Icon: FaCrosshairs, x: 0.72, y: 0.88, size: 20, rot: 0, color: RED, opacity: 0.2 },
  // central body, woven through the numbers / captions / punch lines (lower opacity so
  // the copy stays legible). Skirts the exact center where the gold reticle sits.
  { Icon: FaPlane, x: 0.28, y: 0.3, size: 16, rot: 8, color: TEAL, opacity: 0.2 },
  { Icon: FaFighterJet, x: 0.47, y: 0.25, size: 18, rot: 26, color: TEAL, opacity: 0.2 },
  { Icon: FaRocket, x: 0.53, y: 0.33, size: 16, rot: -44, color: RED, opacity: 0.18 },
  { Icon: FaPlane, x: 0.7, y: 0.29, size: 16, rot: -6, color: TEAL, opacity: 0.2 },
  { Icon: FaShip, x: 0.31, y: 0.41, size: 18, rot: 0, color: TEAL, opacity: 0.2 },
  { Icon: FaFighterJet, x: 0.72, y: 0.43, size: 16, rot: 150, color: TEAL, opacity: 0.18 },
  { Icon: FaShip, x: 0.38, y: 0.55, size: 18, rot: 0, color: TEAL, opacity: 0.22 },
  { Icon: FaPlane, x: 0.45, y: 0.49, size: 14, rot: 10, color: TEAL, opacity: 0.18 },
  { Icon: FaRocket, x: 0.59, y: 0.53, size: 16, rot: -36, color: RED, opacity: 0.18 },
  { Icon: FaFighterJet, x: 0.65, y: 0.58, size: 16, rot: 20, color: TEAL, opacity: 0.2 },
  { Icon: FaShip, x: 0.5, y: 0.63, size: 18, rot: 0, color: TEAL, opacity: 0.2 },
  { Icon: FaCrosshairs, x: 0.34, y: 0.62, size: 18, rot: 0, color: TEAL, opacity: 0.18 },
  { Icon: FaPlane, x: 0.68, y: 0.5, size: 14, rot: -8, color: TEAL, opacity: 0.18 },
  { Icon: FaFighterJet, x: 0.41, y: 0.71, size: 16, rot: 28, color: TEAL, opacity: 0.2 },
  { Icon: FaShip, x: 0.57, y: 0.72, size: 18, rot: 0, color: TEAL, opacity: 0.2 },
  { Icon: FaRocket, x: 0.46, y: 0.77, size: 16, rot: -30, color: RED, opacity: 0.18 },
  { Icon: FaPlane, x: 0.62, y: 0.68, size: 14, rot: 6, color: TEAL, opacity: 0.18 },
];

export function AssetField({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {ASSETS.map((a, i) => (
        <a.Icon
          key={i}
          className="absolute"
          style={{
            top: `${a.y * 100}%`,
            left: `${a.x * 100}%`,
            width: a.size,
            height: a.size,
            color: a.color,
            opacity: a.opacity,
            transform: `translate(-50%, -50%) rotate(${a.rot}deg)`,
          }}
        />
      ))}
    </div>
  );
}
