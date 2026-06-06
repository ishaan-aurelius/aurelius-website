import { hero } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { SignalNetwork } from "@/components/ui/SignalNetwork";
import { worldMapSvg, landPoints, mapViewBox } from "@/lib/worldMap";

export function Hero() {
  return (
    <header className="relative flex min-h-screen items-center overflow-hidden bg-dark-canvas">
      {/* dotted world map — decorative, masked + dimmed; weighted to the right so the
          left (behind the headline) stays plain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.26] [mask-image:radial-gradient(ellipse_at_72%_42%,black_0%,black_28%,transparent_70%)] [-webkit-mask-image:radial-gradient(ellipse_at_72%_42%,black_0%,black_28%,transparent_70%)]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(worldMapSvg)}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      {/* radial glow — base depth; opaque navy at the edges focuses the eye on the upper-right */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 72% 32%, rgba(26,40,56,.7) 0%, rgba(13,20,32,1) 62%)" }}
        aria-hidden="true"
      />
      {/* abstract signal network — decorative, animated; nodes pinned to real land dots */}
      <SignalNetwork points={landPoints} mapAspect={mapViewBox.width / mapViewBox.height} />
      <div className="relative mx-auto w-full max-w-container px-6 pt-24 md:px-12">
        <Kicker>{hero.kicker}</Kicker>
        <h1 className="mt-7 max-w-[16ch] font-display text-[clamp(44px,6vw,76px)] font-bold leading-[1.04] tracking-tight text-dark-hi">
          {hero.headPre}
          <span className="text-gold">{hero.headGold}</span>
          {hero.headPost}
        </h1>
        <p className="mt-7 max-w-[60ch] font-body text-[clamp(17px,1.7vw,21px)] leading-relaxed text-dark-mid">{hero.sub}</p>
        <div className="mt-11 flex flex-wrap gap-4">
          <Button href={hero.primary.href} variant="primary">
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} variant="secondary">
            {hero.secondary.label}
          </Button>
        </div>
      </div>
    </header>
  );
}
