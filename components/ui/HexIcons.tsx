import type { ComponentType } from "react";

// Line icons for the six Solution capabilities (the hexagon). Stroke-based,
// currentColor, matching the PillarIcons/BrandMark weight. Decorative only.
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// Kill-Web Architecture, a hub wired into a web of nodes.
function KillWebIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 12 12 4 M12 12 5 9 M12 12 19 9 M12 12 7 19 M12 12 17 19" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="4" r="1.4" />
      <circle cx="5" cy="9" r="1.4" />
      <circle cx="19" cy="9" r="1.4" />
      <circle cx="7" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </svg>
  );
}

// Multi-Domain & Scalable, four arrows expanding outward (all domains at once).
function ExpandIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 4 4 4 4 9 M15 4 20 4 20 9 M9 20 4 20 4 15 M15 20 20 20 20 15" />
      <path d="M4 4 9.5 9.5 M20 4 14.5 9.5 M4 20 9.5 14.5 M20 20 14.5 14.5" opacity="0.5" />
    </svg>
  );
}

// Inter-Operable, two plug prongs joining (legacy + next-gen).
function InteropIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 12 9 12 M21 12 15 12" />
      <path d="M9 8.5 9 15.5 a3 3 0 0 0 3 3 3 3 0 0 0 3-3 L15 8.5" />
      <path d="M11 5 11 8.5 M13 5 13 8.5" />
    </svg>
  );
}

// Speed of Decisions, a lightning bolt (months/days → minutes).
function BoltIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M13 3 5 13 11 13 10 21 19 10 13 10 Z" />
    </svg>
  );
}

// Strategic to Operational, a command tree, top tier down to execution.
function TreeIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="9.5" y="3" width="5" height="3.4" rx="0.6" />
      <rect x="3.5" y="17.6" width="5" height="3.4" rx="0.6" />
      <rect x="15.5" y="17.6" width="5" height="3.4" rx="0.6" />
      <path d="M12 6.4 12 12 M6 17.6 6 12 18 12 18 17.6 M12 12 12 12" />
    </svg>
  );
}

// Cross-Domain Clarity, an eye (commanders see what matters).
function EyeIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 12 C 6 6.5, 18 6.5, 21.5 12 C 18 17.5, 6 17.5, 2.5 12 Z" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  );
}

// Keyed to solution.capabilities[].key in content/site.ts.
export const hexIcons: Record<string, ComponentType<IconProps>> = {
  killweb: KillWebIcon,
  multidomain: ExpandIcon,
  interop: InteropIcon,
  speed: BoltIcon,
  strategic: TreeIcon,
  clarity: EyeIcon,
};
