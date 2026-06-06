import Image from "next/image";
import Link from "next/link";
import { footer, nav } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-canvas py-12">
      <div className="mx-auto flex max-w-container flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-12">
        <Image src="/logo-wordmark.png" alt="Aurelius" width={104} height={27} />
        <div className="flex flex-wrap gap-6">
          {nav.links.map((l) => (
            <Link key={l.href} href={l.href} className="font-body text-sm text-dark-low transition-colors hover:text-dark-mid">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="font-body text-xs text-dark-low">
          {footer.copyright} · {footer.tagline}
        </div>
      </div>
    </footer>
  );
}
