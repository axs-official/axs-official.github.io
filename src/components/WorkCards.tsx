import Link from "next/link";
import { builds, site } from "@/data/site";

export function WorkCards() {
  return (
    <div className="border-t border-[var(--line)]">
      {builds.map((build) => {
        const body = (
          <>
            <div className="flex items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
              <span>{build.number}</span>
              <span className={build.status === "Live" ? "text-accent" : ""}>{build.status}</span>
            </div>
            <h2 className="mt-8 text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.03em]">
              {build.title}
            </h2>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-soft/80">
              {build.tag}
            </p>
            <p className="mt-3 max-w-[62ch] text-[14px] leading-relaxed text-muted">{build.body}</p>
            <p className="mt-6 text-[13px] text-accent-soft">
              {build.href.startsWith("/") ? "Ask me about it →" : "Open on GitHub ↗"}
            </p>
          </>
        );
        return build.href.startsWith("/") ? (
          <Link
            key={build.title}
            href={build.href}
            className="group grid gap-6 border-b border-[var(--line)] py-10 transition-colors hover:bg-[rgba(255,255,255,0.02)] sm:grid-cols-[80px_1fr] sm:px-6"
          >
            {body}
          </Link>
        ) : (
          <a
            key={build.title}
            href={build.href}
            target="_blank"
            rel="noreferrer"
            className="group grid gap-6 border-b border-[var(--line)] py-10 transition-colors hover:bg-[rgba(255,255,255,0.02)] sm:grid-cols-[80px_1fr] sm:px-6"
          >
            {body}
          </a>
        );
      })}

      <div className="grid gap-6 border-b border-[var(--line)] py-10 sm:grid-cols-[80px_1fr] sm:px-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">04</span>
        <div>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.03em]">
            The private ones
          </h2>
          <p className="mt-3 max-w-[62ch] text-[14px] leading-relaxed text-muted">
            The rest of my work sits in private repos: automation scripts, private apps, unfinished
            ideas. I don&apos;t publish a client list or numbers I can&apos;t back up. If you want to
            see how I work, ask and I&apos;ll show you the code.
          </p>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="link mt-5 text-[13px]"
          >
            github.com/axs-official ↗
          </a>
        </div>
      </div>
    </div>
  );
}
