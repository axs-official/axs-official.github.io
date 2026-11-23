"use client";

import { useState } from "react";
import { EmailLink } from "./EmailLink";
import { site } from "@/data/site";

const field =
  "w-full rounded-md border border-[var(--line)] bg-[rgba(255,255,255,0.03)] px-3.5 py-3 text-[14px] leading-relaxed text-ink outline-none transition-colors placeholder:text-[#5f5f5f] focus:border-accent focus:bg-[rgba(255,255,255,0.05)]";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `Work enquiry${name.trim() ? ` — ${name.trim()}` : ""}`;
    const body = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      "",
      message.trim(),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setReady(true);
  }

  return (
    <div className="card card--accent p-6 sm:p-7">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-name"
              className="mb-2 block text-[12.5px] font-medium text-ink"
            >
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={field}
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="mb-2 block text-[12.5px] font-medium text-ink"
            >
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={field}
            />
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="contact-message"
            className="mb-2 block text-[12.5px] font-medium text-ink"
          >
            What are you working on?
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="The job, the deadline, and what's in the way. A few lines is enough."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={`${field} min-h-[132px] resize-y`}
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          <button type="submit" className="btn btn--solid">
            Send message
          </button>
          <p className="text-[12.5px] text-dim">
            or email{" "}
            <EmailLink className="text-muted underline decoration-[rgba(255,255,255,0.28)] underline-offset-2 transition-colors hover:text-ink" />{" "}
            directly
          </p>
        </div>

        <p
          aria-live="polite"
          className={`mt-4 text-[12.5px] leading-relaxed ${ready ? "text-accent-soft" : "hidden"}`}
        >
          Your email app should be open with the message already written. If nothing happened, copy
          the address above and send it yourself.
        </p>
      </form>

      <p className="mt-6 border-t border-[var(--line)] pt-4 text-[12px] leading-relaxed text-dim">
        This box doesn&apos;t post anywhere. It opens your own email app with the message filled in,
        so nothing passes through a server and nothing is stored.
      </p>
    </div>
  );
}
