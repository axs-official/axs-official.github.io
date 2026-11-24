import { ContactCard } from "@/components/ContactCard";

export const metadata = {
  title: "Contact",
  description:
    "Email axs about paid work or a business enquiry. The message box opens your own mail app. No analytics, no data collection.",
};

export default function ContactPage() {
  return (
    <div className="shell pb-24 pt-32">
      <header className="max-w-2xl">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-5 text-[clamp(2.2rem,6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
          For paid work.
        </h1>
        <p className="lede mt-6">
          I use this address for paid work: something you need built, fixed, or automated. Tell me
          what it is, when it&apos;s due, and roughly what it&apos;s worth, and I&apos;ll tell you
          honestly whether I can take it.
        </p>
        <p className="lede mt-4">
          For general questions or a quick &ldquo;how do
          I&hellip;&rdquo;, a GitHub issue is the better place — the answer stays up for anyone with the same problem.
        </p>
      </header>

      <div className="mt-14">
        <ContactCard />
      </div>
    </div>
  );
}
