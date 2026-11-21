import { Nav } from "@/components/Nav";
import { AboutCards } from "@/components/AboutCards";
import Link from "next/link";

export const dynamic = 'force-static';
export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="relative pt-24">
        <section className="mx-auto max-w-6xl px-5 pb-20 text-center sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6AAED4]">about</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight">
            <span className="gradient-text">A-XS</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Developer & automation builder from Algeria. I build software that
            runs quietly in the background — pipelines, agents, interfaces, and
            the glue that holds them together.
          </p>
        </section>
        <AboutCards />
      </main>
    </>
  );
}
