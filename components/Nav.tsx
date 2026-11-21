'use client';
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Stack", href: "/stack" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#05050c]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 h-16">
        <Link href="/" className="text-sm font-semibold tracking-[0.22em] uppercase text-white/90">
          A-XS
        </Link>
        <div className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-white/60 hover:text-white/95"
            >
              {l.label}
              <span className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full bg-[#6AAED4] scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
