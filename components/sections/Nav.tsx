"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur transition-colors ${
        scrolled ? "bg-dark-canvas/90 border-b border-dark-border" : "bg-dark-canvas/40"
      }`}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-4 md:px-12">
        <Link href="#" className="flex items-center gap-3" aria-label="Aurelius — home">
          <Image src="/logo-mark.png" alt="" width={36} height={30} priority />
          <Image src="/logo-wordmark.png" alt="Aurelius" width={104} height={27} priority />
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {nav.links.map((l) => (
            <Link key={l.href} href={l.href} className="font-body text-sm text-dark-mid transition-colors hover:text-dark-hi">
              {l.label}
            </Link>
          ))}
          <Link href={nav.secondary.href} className="font-body text-sm text-dark-mid transition-colors hover:text-dark-hi">
            {nav.secondary.label}
          </Link>
          <Button href={nav.primary.href} variant="primary">
            {nav.primary.label}
          </Button>
        </div>
        <button className="text-2xl leading-none text-dark-hi lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          ☰
        </button>
      </div>
      {open && (
        <div className="border-t border-dark-border bg-dark-canvas px-6 py-4 lg:hidden">
          {nav.links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 font-body text-dark-mid">
              {l.label}
            </Link>
          ))}
          <div className="mt-3">
            <Button href={nav.primary.href} variant="primary">
              {nav.primary.label}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
