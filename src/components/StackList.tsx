import { stackGroups } from "@/data/site";

export function StackList() {
  return (
    <div className="border-t border-[var(--line)]">
      {stackGroups.map((group) => (
        <section
          key={group.index}
          className="grid gap-5 border-b border-[var(--line)] py-8 sm:grid-cols-[64px_180px_1fr] sm:items-start"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
            {group.index}
          </span>
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.02em]">{group.label}</h2>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent/90">
              {group.level}
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
