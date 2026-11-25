import Link from "next/link";
import { ContributionMap } from "./ContributionMap";
import { SocialLinks } from "./SocialLinks";
import { focus, principles } from "@/data/site";

const facts = [
  { label: "Role", value: "Full-stack developer" },
  { label: "Focus", value: "Privacy-first software" },
  { label: "Status", value: "Open to paid work" },
  { label: "Code", value: "github.com/axs-official" },
];

export function AboutCards() {
  return (
    <div className="space-y-14">
      <div className="grid gap-px overflow-hidden border border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-[rgba(255,255,255,0.02)] p-5">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-dim">{fact.label}</p>
            <p className="mt-2 text-[14.5px]">{fact.value}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="eyebrow">What I do</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {focus.map((item) => (
            <article key={item.index} className="card card--accent p-5">
              <span className="font-mono text-[10px] tracking-[0.2em] text-dim">{item.index}</span>
              <h3 className="mt-3 text-[16px] font-semibold">{item.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{item.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">How I work</p>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            A few rules I keep to. Everything I publish is held to them, this site included — it
            ships without analytics, cookies or third-party scripts.
          </p>
          <Link href="/contact" className="link mt-6 text-[13px]">
            Talk about paid work <span aria-hidden>→</span>
          </Link>
          <SocialLinks className="mt-6" />
        </div>
        <ol className="space-y-px overflow-hidden border-y border-[var(--line)]">
          {principles.map((item, index) => (
            <li
              key={item.title}
              className="grid gap-1 border-b border-[var(--line)] py-5 last:border-b-0 sm:grid-cols-[42px_1fr]"
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-accent">
                0{index + 1}
              </span>
              <div>
                <p className="text-[15px] font-medium">{item.title}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <p className="eyebrow">On GitHub</p>
        <div className="mt-6">
          <ContributionMap />
        </div>
      </div>
    </div>
  );
}
