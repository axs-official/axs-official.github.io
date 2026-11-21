'use client';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGithub, FaWindows, FaLinux, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const groups = [
  { title: "Languages", items: ["TypeScript", "Python", "Rust", "C++", "JavaScript", "Go", "Bash"] },
  { title: "Web & Frontend", items: ["React", "Next.js", "Tailwind CSS", "Three.js", "Framer Motion", "HTML / CSS"] },
  { title: "Infra & DevOps", items: ["GitHub Actions", "Linux", "Windows", "Docker", "NGINX", "CI / CD"] },
  { title: "Data & AI", items: ["LLM agents", "REST & GraphQL APIs", "PostgreSQL", "SQLite", "pandas", "OpenAI API"] },
];

export function StackList() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-6">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6AAED4]">stack</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Tools & stack</h2>
        <p className="mx-auto mt-2 max-w-lg text-white/55 text-sm">
          The toolchain I reach for when building something that has to stay up.
        </p>
      </div>

      <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, gi) => (
          <div key={g.title} className="card">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{g.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-3 py-1 text-[12px] text-white/75 transition hover:border-white/20"
                >
                  {item}
                  <FaChevronRight className="h-3 w-3 text-white/35" />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href="https://github.com/axs-official?tab=repositories&q=&type=all&sort=stargazers" target="_blank" rel="noreferrer">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/80 transition hover:bg-white/10">
            <FaGithub className="h-4 w-4" /> View all on GitHub
          </span>
        </a>
      </div>
    </section>
  );
}
