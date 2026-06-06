import { hero } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { worldMapSvg } from "@/lib/worldMap";

export function Hero() {
  return (
    <header className="relative flex min-h-screen items-center overflow-hidden bg-dark-canvas">
      {/* dotted world map — decorative, masked + dimmed */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(ellipse_at_65%_45%,black_0%,transparent_70%)] [-webkit-mask-image:radial-gradient(ellipse_at_65%_45%,black_0%,transparent_70%)]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(worldMapSvg)}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      {/* radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 72% 32%, rgba(26,40,56,.7) 0%, rgba(13,20,32,1) 62%)" }}
        aria-hidden="true"
      />
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
