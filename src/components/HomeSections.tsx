import Link from "next/link";
import { ContributionMap } from "./ContributionMap";
import { EmailLink } from "./EmailLink";
import { SocialLinks } from "./SocialLinks";
import { builds, focus, signal, site, tools } from "@/data/site";
import { toolIcons } from "@/data/toolIcons";
import type { CSSProperties } from "react";

export function AboutSection() {
  return (
    <section id="about" className="sec shell">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow">About</p>
          <h2 className="h2 mt-5">
            I build the whole thing,
            <br />
            not a slice of it.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="link">
              More about me <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-[1.05rem] leading-[1.75] text-ink/90">
            I&apos;m A-XS. I work across the stack — React and Next.js on the front, Node or Python
            behind it, the database and the deploy included — and most of what I build starts as
            something I needed myself.
          </p>
          <p className="lede">
            Privacy shapes how it gets built: no analytics, no cookies, no trackers, and no
            accounts nobody asked for. The rest is doing the job well — fast pages, clear code,
            nothing left half-finished.
          </p>

          <div className="grid gap-px overflow-hidden border border-[var(--line)] sm:grid-cols-3">
            {focus.map((item) => (
              <article key={item.index} className="bg-[rgba(255,255,255,0.02)] p-5">
                <span className="font-mono text-[10px] tracking-[0.2em] text-dim">{item.index}</span>
                <h3 className="mt-2 text-[15px] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ items, reverse, offset = 0 }: { items: string[]; reverse?: boolean; offset?: number }) {
  const list = [...items.slice(offset), ...items.slice(0, offset)];
  return (
    <div className={`marquee ${reverse ? "marquee--reverse" : ""}`}>
      <div className="marquee__track">
        {[0, 1].map((copy) =>
          list.map((tool, index) => {
            const icon = toolIcons[tool];
            return (
              <span
                key={`${tool}-${copy}`}
                className="tool-chip shrink-0"
                style={
                  { "--brand": icon?.hex ?? "#d4d4d4", "--i": index } as CSSProperties
                }
                aria-hidden={copy === 1 || undefined}
              >
                {icon ? (
                  <svg
                    className="tool-chip__icon"
                    viewBox="0 0 24 24"
                    aria-hidden
                    focusable="false"
                  >
                    <path d={icon.path} fill="currentColor" />
                  </svg>
                ) : null}
                {tool}
              </span>
            );
          }),
        )}
      </div>
    </div>
  );
}

export function ToolchainSection() {
  return (
    <section className="border-y border-[var(--line)] py-14">
      <div className="shell">
        <p className="eyebrow">Tools I reach for</p>
      </div>
      <div className="mt-7 space-y-3">
        <Row items={tools} />
        <Row items={tools} offset={7} reverse />
      </div>
    </section>
  );
}

export function SignalSection() {
  return (
    <section className="sec shell">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">On GitHub</p>
          <h2 className="h2 mt-5">What I&apos;ve been building</h2>
        </div>
        <p className="max-w-[30ch] text-sm leading-relaxed text-muted">
          Pulled from my own GitHub activity, last synced {signal.synced}.
        </p>
      </div>
      <ContributionMap />
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section id="work" className="sec shell">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">Work</p>
          <h2 className="h2 mt-5">Things I&apos;ve built</h2>
        </div>
        <Link href="/work" className="link">
          All projects <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {builds.map((build) => {
          const content = (
            <>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                <span>{build.number}</span>
                <span className={build.status === "Live" ? "text-[var(--live)]" : "text-dim"}>
                  {build.status}
                </span>
              </div>
              <h3 className="mt-10 text-xl font-semibold tracking-[-0.02em]">{build.title}</h3>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-soft/80">
                {build.tag}
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{build.body}</p>
            </>
          );
          const className = "card card--accent flex h-full flex-col p-5";
          return build.href.startsWith("/") ? (
            <Link key={build.title} href={build.href} className={className}>
              {content}
            </Link>
          ) : (
            <a
              key={build.title}
              href={build.href}
              target="_blank"
              rel="noreferrer"
              className={className}
            >
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="sec shell">
      <div className="grid gap-8 border-t border-[var(--line)] pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="h2 mt-5">
            Have something
            <br />
            that needs building?
          </h2>
          <p className="lede mt-4 max-w-[46ch]">
            I take on paid work: building, fixing, or automating something that&apos;s slowing you
            down. Tell me what it is, when it&apos;s due, and roughly what it&apos;s worth — I&apos;ll
            be straight about whether I can help. General questions are better as GitHub issues.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
            Send it from the contact page · nothing is stored
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <EmailLink className="btn btn--solid justify-center text-[12.5px] sm:text-[13.5px]" />
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="btn justify-center"
          >
            github.com/axs-official ↗
          </a>
          <SocialLinks className="mt-1 sm:basis-full lg:mt-2" />
        </div>
      </div>
    </section>
  );
}
