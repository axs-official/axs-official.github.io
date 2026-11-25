import { StackList } from "@/components/StackList";

export const metadata = {
  title: "Stack",
  description:
    "What A-XS builds with: TypeScript, React, Next.js, Node, Python, SQLite, GitHub Actions and a bit of Rust.",
};

export default function StackPage() {
  return (
    <div className="shell pb-24 pt-32">
      <header className="max-w-2xl">
        <p className="eyebrow">Stack</p>
        <h1 className="mt-5 text-[clamp(2.2rem,6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
          What I use.
        </h1>
        <p className="lede mt-6">
          Not everything here is a strength, and the levels are honest: what I use most days, what
          I&apos;m comfortable with, and what I&apos;m still learning.
        </p>
      </header>

      <div className="mt-14">
        <StackList />
      </div>

      <p className="mt-12 max-w-[60ch] text-[13.5px] leading-relaxed text-muted">
        I pick tools based on what the job needs, not what&apos;s trending. If something is missing
        from this list, I&apos;ll learn it — that&apos;s how most of this list got here.
      </p>
    </div>
  );
}
