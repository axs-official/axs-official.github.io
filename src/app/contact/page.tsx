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
          This address is for business enquiries: a job you need built, fixed, or automated. Tell me
          what it is, when it&apos;s due, and roughly what it&apos;s worth, and I&apos;ll tell you
          honestly whether I can take it.
        </p>
        <p className="lede mt-4">
          It isn&apos;t a help desk. General questions, free debugging and &ldquo;how do
          I&hellip;&rdquo; belong in a GitHub issue, where the answer stays public and useful.
        </p>
      </header>

      <div className="mt-14">
        <ContactCard />
      </div>
    </div>
  );
}
