import Link from "next/link";
import { AboutCards } from "@/components/AboutCards";
import { site } from "@/data/site";

export const metadata = {
  title: "About",
  description:
    "axs builds privacy-first software and small automations — tools that stay useful without collecting your data.",
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
          I build small, focused software with privacy and quality at the center. Most of it
          starts with a problem I&apos;ve run into myself, or a tool that was closed, overpriced,
          or quietly collecting data.
        </p>
        <p className="lede mt-4">
          {site.mission} Privacy isn&apos;t a setting I add later: no analytics, no cookies, no
          trackers, and no accounts nobody asked for.

        </p>
        <p className="lede mt-4">
          I&apos;d rather show code than make claims. There are no client logos or invented numbers here —
          the only figures come from my own GitHub activity, and I&apos;m happy to explain where
          they came from.
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
