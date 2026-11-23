import Link from "next/link";
import { AboutCards } from "@/components/AboutCards";
import { site } from "@/data/site";

export const metadata = {
  title: "About",
  description:
    "axs is a privacy-focused developer in Algeria. I build tools and automations that don't collect data.",
};

export default function AboutPage() {
  return (
    <div className="shell pb-24 pt-32">
      <header className="max-w-2xl">
        <p className="eyebrow">About</p>
        <h1 className="mt-5 text-[clamp(2.2rem,6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
          I&apos;m axs.
        </h1>
        <p className="lede mt-6">
          A developer in Algeria. I build software for problems I&apos;ve run into myself, or that
          frustrated me because the closed version was paid, locked down, or quietly collecting
          data.
        </p>
        <p className="lede mt-4">
          {site.mission} Privacy, security and quality are the parts I don&apos;t trade away: no
          analytics, no cookies, no trackers, no accounts you didn&apos;t ask for. Next stretch is
          data analysis, where the same rules apply.
        </p>
        <p className="lede mt-4">
          I write code, not claims. There are no client logos or invented numbers on this site —
          only figures pulled from my own GitHub activity, and I&apos;ll show where they came from
          if you ask.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/work" className="btn btn--solid">
            See the work
          </Link>
          <Link href="/contact" className="btn">
            Paid work
          </Link>
        </div>
      </header>

      <div className="mt-16">
        <AboutCards />
      </div>
    </div>
  );
}
