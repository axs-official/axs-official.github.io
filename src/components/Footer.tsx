import Link from "next/link";
import { EmailLink } from "./EmailLink";
import { navLinks, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.02em]">axs</p>
          <p className="mt-3 max-w-[32ch] text-[13.5px] leading-relaxed text-muted">
            Small, privacy-first tools and automation. No analytics, no cookies, no trackers.
          </p>
          <EmailLink className="link mt-5 text-[13px]" />
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Pages</p>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[13.5px] text-muted transition hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Elsewhere</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="text-[13.5px] text-muted transition hover:text-ink"
              >
                GitHub ↗
              </a>
            </li>
            <li>
              <a
                href={site.repo}
                target="_blank"
                rel="noreferrer"
                className="text-[13.5px] text-muted transition hover:text-ink"
              >
                Site source ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-[var(--line)] py-5 font-mono text-[10px] uppercase tracking-[0.16em] text-dim sm:flex-row sm:items-center sm:justify-between">
        <p>© {site.year} axs</p>
        <p>No analytics · No cookies · Next.js on GitHub Pages</p>
      </div>
    </footer>
  );
}
