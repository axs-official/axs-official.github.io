'use client';
import { FaCodeBranch, FaRocket, FaServer, FaPuzzlePiece } from "react-icons/fa";
import { motion } from "framer-motion";

const cards = [
  { name: "CLI Contracts", tag: "Automation · Rust", icon: <FaServer className="h-4 w-4" />, body: "Small CLIs that validate and generate project contracts, run in CI, fail fast." },
  { name: "AI Pipelines", tag: "AI · Python", icon: <FaRocket className="h-4 w-4" />, body: "Event-driven pipelines that route prompts, tools, and results with retries and idempotency." },
  { name: "Interface Kit", tag: "Web · TypeScript", icon: <FaPuzzlePiece className="h-4 w-4" />, body: "A design system of accessible components, dark-first, with motion tokens and a monochrome palette." },
];

export function WorkCards() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-6">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6AAED4]">work</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Selected work</h2>
        <p className="mx-auto mt-2 max-w-lg text-white/55 text-sm">
          A small sample of things I build — mostly behind closed doors, most of it
          automation-first.
        </p>
      </div>

      <div className="mt-9 grid gap-4 sm:grid-cols-2">
        {cards.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card flex gap-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#6AAED4]">
              {c.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{c.name}</h3>
              <p className="text-[11px] text-white/45 uppercase tracking-[0.12em]">{c.tag}</p>
              <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{c.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href="https://github.com/axs-official?tab=repositories&q=&type=all&sort=stargazers" target="_blank" rel="noreferrer">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/80 transition hover:bg-white/10">
            <FaCodeBranch className="h-4 w-4" /> View all repositories
          </span>
        </a>
      </div>
    </section>
  );
}
