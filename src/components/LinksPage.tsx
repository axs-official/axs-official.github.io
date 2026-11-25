import Link from "next/link";
import { EmailLink } from "./EmailLink";
import { site, socials } from "@/data/site";
import { socialIcons } from "@/data/socialIcons";

const iconClass = "h-[18px] w-[18px]";

const icons = {
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={iconClass} aria-hidden>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={iconClass} aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.2 2.2 3.3 5 3.3 8s-1.1 5.8-3.3 8c-2.2-2.2-3.3-5-3.3-8S9.8 6.2 12 4Z" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={iconClass} aria-hidden>
      <rect x="4" y="4" width="7" height="7" rx="1.4" />
      <rect x="13" y="4" width="7" height="7" rx="1.4" />
      <rect x="4" y="13" width="7" height="7" rx="1.4" />
      <rect x="13" y="13" width="7" height="7" rx="1.4" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={iconClass} aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={iconClass} aria-hidden>
      <path d="M20 12a7.5 7.5 0 0 1-10.9 6.7L5 20l1.3-4A7.5 7.5 0 1 1 20 12Z" strokeLinejoin="round" />
    </svg>
  ),
};

const faq = [
  {
    q: "Are you taking work right now?",
    a: "Yes, paid projects. I take them one at a time, so tell me the deadline in the first message and I'll tell you straight whether it fits.",
  },
  {
    q: "What can you build?",
    a: "Full-stack: the interface, the API, the database and the deploy. Web apps, dashboards, internal tools and the automation around them.",
  },
  {
    q: "What does a project cost?",
    a: "Scope decides the number. Send the job, the deadline, and roughly what it's worth to you, and you'll get a yes, a no, or a price.",
  },
  {
    q: "What's your real full name?",
    a: "I keep that to myself. A-XS is the name I go by, and it's what clients use until we're actually working together — I'm not comfortable putting my full name in front of random people.",
  },
  {
    q: "Where are you based?",
    a: "Algeria, UTC+1. I work remotely, and I keep the address at country level on purpose.",
  },
  {
    q: "Does this site track me?",
    a: "No. There are no analytics, cookies, third-party scripts or external fonts. The message box only opens your own email app, so nothing is posted to a server.",
  },
];

function SocialRow({ social }: { social: (typeof socials)[number] }) {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer"
      className="card links-row links-in flex items-center gap-4 p-4"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-ink">
        <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" aria-hidden>
          <path d={socialIcons[social.label]} fill="currentColor" />
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] font-medium tracking-[-0.01em]">{social.label}</span>
        <span className="mt-0.5 block truncate font-mono text-[10.5px] tracking-[0.1em] text-dim">
          {social.handle}
        </span>
      </span>
      <span className="links-arrow shrink-0 text-[15px] text-accent-soft" aria-hidden>
        ↗
      </span>
    </a>
  );
}

export function LinksPage() {
  return (
    <div className="shell flex min-h-[100svh] max-w-[560px] flex-col pb-20 pt-28 sm:pt-32">
      <div className="links-in flex flex-col items-center text-center">
        <div className="relative h-[84px] w-[84px]">
          <span className="absolute inset-0 rounded-full border border-[var(--line)]" />
          <span className="absolute inset-[-7px] rounded-full border border-dashed border-[rgba(255,255,255,0.24)] [animation:links-spin_30s_linear_infinite]" />
          <span className="absolute inset-0 grid place-items-center rounded-full bg-[radial-gradient(circle_at_32%_24%,#2a2a2a,#0d0d0d_72%)] shadow-[0_20px_50px_-20px_rgba(255,255,255,0.38)]">
            <span className="grad-text text-[21px] font-semibold tracking-[-0.04em]">A-XS</span>
          </span>
        </div>

        <h1 className="mt-6 text-[26px] font-semibold tracking-[-0.035em]">{site.name}</h1>
        <p className="mt-2 max-w-[36ch] text-[14px] leading-relaxed text-muted">
          Full-stack developer. Privacy-first web apps and automation — useful software, no
          tracking, no noise.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--live)] shadow-[0_0_9px_rgba(74,222,128,0.75)]" />
          {site.availability}
        </p>
      </div>

      <div className="links-list mt-10 space-y-3">
        <a
          href={site.url}
          target="_blank"
          rel="noreferrer"
          className="card links-row links-in flex items-center gap-4 p-4"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-ink">
            {icons.globe}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14.5px] font-medium tracking-[-0.01em]">Website</span>
            <span className="mt-0.5 block truncate font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
              axs-official.github.io
            </span>
          </span>
          <span className="links-arrow shrink-0 text-[15px] text-accent-soft" aria-hidden>
            ↗
          </span>
        </a>

        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="card links-row links-in flex items-center gap-4 p-4"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-ink">
            {icons.code}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14.5px] font-medium tracking-[-0.01em]">GitHub</span>
            <span className="mt-0.5 block truncate font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
              @axs-official
            </span>
          </span>
          <span className="links-arrow shrink-0 text-[15px] text-accent-soft" aria-hidden>
            ↗
          </span>
        </a>

        <Link href="/work" className="card links-row links-in flex items-center gap-4 p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-ink">
            {icons.grid}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14.5px] font-medium tracking-[-0.01em]">Work</span>
            <span className="mt-0.5 block truncate font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
              This site / profile / private work
            </span>
          </span>
          <span className="links-arrow shrink-0 text-[15px] text-accent-soft" aria-hidden>
            →
          </span>
        </Link>

        {socials.map((social) => (
          <SocialRow key={social.label} social={social} />
        ))}

        <Link href="/contact" className="card links-row links-in flex items-center gap-4 p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-ink">
            {icons.chat}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14.5px] font-medium tracking-[-0.01em]">Send a message</span>
            <span className="mt-0.5 block truncate font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
              Opens your mail app / nothing stored
            </span>
          </span>
          <span className="links-arrow shrink-0 text-[15px] text-accent-soft" aria-hidden>
            →
          </span>
        </Link>

        <EmailLink className="card links-row links-in flex items-center gap-4 p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-ink">
            {icons.mail}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block break-all text-[14.5px] font-medium tracking-[-0.01em]">
              {site.email}
            </span>
            <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
              Paid work only
            </span>
          </span>
          <span className="links-arrow shrink-0 text-[15px] text-accent-soft" aria-hidden>
            ↗
          </span>
        </EmailLink>
      </div>

      <section className="links-in mt-12" style={{ animationDelay: "0.36s" }}>
        <p className="eyebrow">Questions</p>
        <div className="mt-5 border-t border-[var(--line)]">
          {faq.map((item) => (
            <details key={item.q} className="faq border-b border-[var(--line)]">
              <summary className="flex items-center justify-between gap-4 py-4 text-[13.5px] text-muted transition-colors hover:text-ink">
                {item.q}
                <span className="faq-plus shrink-0 font-mono text-[15px] leading-none text-dim">+</span>
              </summary>
              <p className="max-w-[52ch] pb-4 pr-6 text-[13px] leading-relaxed text-dim">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="links-in mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-6" style={{ animationDelay: "0.44s" }}>
        <Link href="/" className="link text-[13px]">
          Full site <span aria-hidden>→</span>
        </Link>
        <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-dim">
          No analytics / no cookies
        </p>
      </div>
    </div>
  );
}
