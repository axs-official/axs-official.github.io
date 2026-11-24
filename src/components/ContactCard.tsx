import { ContactForm } from "./ContactForm";
import { EmailLink } from "./EmailLink";
import { site } from "@/data/site";

const help = [
  "Automation scripts and internal tools",
  "A site or a dashboard that isn't a template",
  "Cleaning up or fixing an existing front end",
  "AI-assisted workflows, local or over an API",
];

export function ContactCard() {
  return (
    <div className="space-y-14">
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <ContactForm />

        <div className="flex flex-col gap-4">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-dim">
            Or reach me directly
          </p>
          <div className="card card--accent p-5">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-dim">Email</p>
            <EmailLink className="mt-3 block break-all text-[14px] font-medium tracking-[-0.01em] transition-colors hover:text-accent-soft" />
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
              {site.emailNote}. Tell me the job, the deadline, and what&apos;s in the way.
            </p>
          </div>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="card card--accent block p-5"
          >
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-dim">GitHub</p>
            <p className="mt-3 text-[14px] font-medium tracking-[-0.01em]">@axs-official</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
              Public repos, the profile cards, and the code for this site.
            </p>
          </a>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">What I can help with</p>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            I work on my own, so I keep the scope clear: one job, done properly, with the code
            handed over at the end. No retainers, no lock-in, and your data stays with you.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Not paid work? Open an issue on GitHub instead. I answer those in public, so the next
            person with the same problem finds it.
          </p>
        </div>
        <ul className="border-t border-[var(--line)]">
          {help.map((item) => (
            <li
              key={item}
              className="border-b border-[var(--line)] py-3.5 text-[14px] text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
        {site.availability} · Remote work
      </p>
      <p className="max-w-[64ch] text-[12.5px] leading-relaxed text-dim">
        No analytics, no cookies, no trackers on this page. The address is written out so you can
        copy it, and the mail link is assembled in the browser rather than sitting in the HTML for
        scrapers.
      </p>
    </div>
  );
}
