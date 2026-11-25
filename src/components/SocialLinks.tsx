import { socials } from "@/data/site";
import { socialIcons } from "@/data/socialIcons";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}>
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
              <path d={socialIcons[social.label]} fill="currentColor" />
            </svg>
            {social.label}
            <span className="font-mono text-[10px] tracking-[0.08em] text-dim">
              {social.handle}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
