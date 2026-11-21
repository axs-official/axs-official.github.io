'use client';
import { FaGithub, FaEnvelope, FaLink, FaPaperclip } from "react-icons/fa";
import { motion } from "framer-motion";

const items = [
  { label: "GitHub", icon: <FaGithub className="h-4 w-4" />, value: "@axs-official", href: "https://github.com/axs-official", external: true },
  { label: "Email", icon: <FaEnvelope className="h-4 w-4" />, value: "axs.official@gmail.com", href: "mailto:axs.official@gmail.com" },
  { label: "Location", icon: <FaLink className="h-4 w-4" />, value: "Algeria", href: undefined },
  { label: "Tags", icon: <FaLink className="h-4 w-4" />, value: "automation · AI · interfaces", href: undefined },
];

export function ContactCard() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-6">
      <div className="card p-6 sm:p-8">
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <div className="flex gap-2">
            {items.map((i) => (
              <a
                key={i.label}
                href={i.href || i.value}
                target={i.external ? "_blank" : undefined}
                rel={i.external ? "noreferrer" : undefined}
                className="flex flex-col items-center gap-1 rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-white/60 transition hover:border-[#6AAED4]/30 hover:text-[#6AAED4]"
              >
                <span className="text-sm">{i.icon}</span>
                <span className="text-xs font-medium">{i.value}</span>
              </a>
            ))}
          </div>
          <div className="pt-4 sm:pt-0 text-center sm:text-left">
            <p className="text-sm text-white/45 uppercase tracking-[0.16em]">availability</p>
            <p className="text-lg font-medium text-white">Open to build</p>
            <p className="mt-1 text-sm text-white/55">
              I'm taking select build contracts and freelance projects.
            </p>
            <a
              href="mailto:axs.official@gmail.com?subject=Build%20inquiry"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#6AAED4]/30 bg-[#6AAED4]/10 px-4 py-2 text-sm text-[#6AAED4] transition hover:bg-[#6AAED4]/20"
            >
              <FaPaperclip className="h-3.5 w-3.5" /> Start a conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
