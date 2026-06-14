import Image from "next/image";
import Link from "next/link";
import { footer, nav } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-canvas py-12">
      <div className="mx-auto flex max-w-container flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-12">
        <div className="flex items-center gap-2">
          <Image src="/logo-mark.png" alt="" width={56} height={47} className="h-[16px] w-auto" />
          <Image src="/logo-wordmark.png" alt="Aurelius" width={104} height={27} />
        </div>
        <div className="flex flex-wrap justify-end gap-6">
          {nav.links.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap font-display text-[11px] font-bold uppercase tracking-[0.15em] text-dark-mid transition-colors hover:text-dark-hi">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="font-body text-xs text-dark-low">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
