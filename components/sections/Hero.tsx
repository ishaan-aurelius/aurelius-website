import { hero } from "@/content/site";
import { KillWeb } from "@/components/ui/KillWeb";
import { worldMapSvg } from "@/lib/worldMap";

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
      {/* kill-web — decorative, animated; same living-network treatment as the Why Now
          section, masked to the upper-right so the headline stays clean */}
      <KillWeb className="opacity-70 [mask-image:radial-gradient(ellipse_at_72%_42%,black_0%,black_34%,transparent_72%)] [-webkit-mask-image:radial-gradient(ellipse_at_72%_42%,black_0%,black_34%,transparent_72%)]" />
      {/* legibility scrim — washes the canvas navy back in around the headline so the
          network reads as backdrop, not competition. Strongest behind the text, gone by the edges. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 72% 56% at 50% 50%, rgba(14,20,31,0.85) 0%, rgba(14,20,31,0.5) 42%, rgba(14,20,31,0) 76%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-container px-6 pt-24 text-center md:px-12">
        <h1 className="mx-auto max-w-[24ch] font-display text-[clamp(44px,6vw,76px)] font-bold leading-[1.04] tracking-tight text-dark-hi">
          {hero.headPre}
          <span className="text-gold">{hero.headGold}</span>
          {hero.headPost}
        </h1>
        <p className="mx-auto mt-7 max-w-[60ch] font-body text-[clamp(17px,1.7vw,21px)] leading-relaxed text-dark-mid">{hero.sub}</p>
      </div>
    </header>
  );
}
