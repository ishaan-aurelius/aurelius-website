import { hero } from "@/content/site";
import { WorldPlexus } from "@/components/ui/WorldPlexus";
import { landPoints, mapViewBox } from "@/lib/worldMap";

export function Hero() {
  return (
    <header className="relative flex min-h-screen items-center overflow-hidden bg-dark-canvas">
      {/* living world plexus, continents formed purely by a dense edge mesh (no dots).
          Shimmers, slowly flows within continental bounds, and carries signal pulses.
          Fades out below the fold so it reads as the hero's own backdrop. */}
      <WorldPlexus
        points={landPoints}
        mapAspect={mapViewBox.width / mapViewBox.height}
        className="[mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_60%,transparent_94%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_60%,transparent_94%)]"
      />
      {/* legibility scrim, washes the canvas navy back in behind the headline so the
          network reads as backdrop, not competition. Strongest behind the text, gone by the edges. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 64% 50% at 50% 48%, rgba(14,20,31,0.88) 0%, rgba(14,20,31,0.55) 44%, rgba(14,20,31,0) 78%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-container px-6 pt-24 text-center md:px-12">
        <h1 className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-6 font-display text-[clamp(44px,5vw,76px)] font-bold leading-[1.04] tracking-tight text-dark-hi">
          {hero.headPre}
          <span className="text-gold">{hero.headGold}</span>
          {hero.headPost}
        </h1>
        <p className="mx-auto mt-7 max-w-[80ch] font-body text-[clamp(19px,1.9vw,24px)] leading-relaxed text-dark-mid">{hero.sub}<br />{hero.sub2}</p>
      </div>
    </header>
  );
}
