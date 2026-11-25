import Link from "next/link";
import { AboutCards } from "@/components/AboutCards";
import { site } from "@/data/site";

export const metadata = {
  title: "About",
  description:
    "A-XS is a full-stack developer building privacy-first web apps and automation, end to end.",
};

export default function AboutPage() {
  return (
    <div className="shell pb-24 pt-32">
      <header className="max-w-2xl">
        <p className="eyebrow">About</p>
        <h1 className="mt-5 text-[clamp(2.2rem,6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
          I&apos;m A-XS.
        </h1>
        <p className="lede mt-6">
          Full-stack developer. I take a project from the database and the API up to the
          interface, then keep it running after it ships.
        </p>
        <p className="lede mt-4">
          Privacy is part of the build, not a setting I add later: no analytics, no cookies, no
          trackers, and no accounts nobody asked for.
        </p>
        <p className="lede mt-4">
          The figures on this site come from my own GitHub activity. No client logos, no invented
          numbers — ask and I&apos;ll show you where each one came from.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/work" className="btn btn--solid">
            See the work
          </Link>
          <Link href="/contact" className="btn">
            {site.availability}
          </Link>
        </div>
      </header>

      <div className="mt-16">
        <AboutCards />
      </div>
    </div>
  );
}
