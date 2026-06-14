import type { ComponentType } from "react";

// Distinct line icons for the four Solution pillars, stroke-based, currentColor,
// matching the BrandMark weight so they read as one set. Decorative only.
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

// Kill-Web Architected, central hub wired to a ring of nodes (the network problem)
function KillWebIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 12 12 4 M12 12 4.5 13 M12 12 19.5 13 M12 12 12 20" />
      <path d="M12 4 4.5 13 12 20 19.5 13 Z" opacity="0.45" />
      <circle cx="12" cy="12" r="1.9" />
      <circle cx="12" cy="4" r="1.5" />
      <circle cx="4.5" cy="13" r="1.5" />
      <circle cx="19.5" cy="13" r="1.5" />
      <circle cx="12" cy="20" r="1.5" />
    </svg>
  );
}

// Zero Legacy, AI-First, stacked layers (on-prem / cloud / edge data architecture)
function LayersIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 21 7.5 12 12 3 7.5 Z" />
      <path d="M3 12 12 16.5 21 12" />
      <path d="M3 16.5 12 21 21 16.5" />
    </svg>
  );
}

// Human-in-the-Loop, a figure held inside a closed decision loop
function HumanLoopIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M19.5 12a7.5 7.5 0 1 1-2.3-5.4" />
      <path d="M17.6 3.4 17.6 6.9 14.1 6.9" />
      <circle cx="12" cy="10.5" r="1.9" />
      <path d="M8.7 16.2a3.4 3.4 0 0 1 6.6 0" />
    </svg>
  );
}

// Strategic to Operational, tiered scale, theater-level down to in-mission
function TiersIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 6.5 20.5 6.5" />
      <path d="M6.5 12 17.5 12" />
      <path d="M9.5 17.5 14.5 17.5" />
      <path d="M12 6.5 12 17.5" opacity="0.4" />
    </svg>
  );
}

// Indexed to the solution.pillars order in content/site.ts
export const pillarIcons: ComponentType<IconProps>[] = [
  KillWebIcon,
  LayersIcon,
  HumanLoopIcon,
  TiersIcon,
];
