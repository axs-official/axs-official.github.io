import { WorkCards } from "@/components/WorkCards";

export const metadata = {
  title: "Work",
  description:
    "Things A-XS has built: this portfolio, the animated GitHub profile cards, and private full-stack work.",
};

export default function WorkPage() {
  return (
    <div className="shell pb-24 pt-32">
      <header className="max-w-2xl">
        <p className="eyebrow">Work</p>
        <h1 className="mt-5 text-[clamp(2.2rem,6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
          Things I&apos;ve built.
        </h1>
        <p className="lede mt-6">
          Two projects are public; the rest is still private. If you want to see how I work, ask
          and I&apos;ll send you the code.
        </p>
      </header>

      <div className="mt-14">
        <WorkCards />
      </div>
    </div>
  );
}
