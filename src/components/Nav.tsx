"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/data/site";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--line)] bg-[#0a0a0a]/85 backdrop-blur-lg"
          : "border-b border-transparent"
      }`}
    >
      <nav className="shell flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2.5" aria-label="axs home">
          <span className="text-[15px] font-semibold tracking-[-0.02em]">axs</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-dim sm:block">
            developer
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13px] transition-colors ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
                )}
              </Link>
            );
          })}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-soft transition-colors hover:text-ink"
          >
            GitHub ↗
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="grid h-9 w-9 place-items-center border border-[var(--line)] md:hidden"
        >
          <span className="relative block h-2.5 w-4">
            <span
              className={`absolute left-0 h-px w-4 bg-current transition-all ${
                open ? "top-1 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-4 bg-current transition-all ${
                open ? "top-1 -rotate-45" : "top-2.5"
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-[var(--line)] bg-[#0a0a0a]/97 backdrop-blur-lg md:hidden"
          >
            <div className="shell flex flex-col py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-b border-[var(--line)] py-3.5 text-sm ${
                    pathname === link.href ? "text-ink" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 text-sm text-muted"
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
