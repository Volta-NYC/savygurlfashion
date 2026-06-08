"use client";

import { useState } from "react";
import { ArrowRight } from "./icons";

const field = "w-full rounded-2xl border border-line bg-cream px-4 py-3.5 text-sm outline-none transition-colors focus:border-plum";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="card-surface flex flex-col items-center gap-3 p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-lilac text-2xl">💜</span>
        <h3 className="font-display text-2xl">Message sent!</h3>
        <p className="max-w-sm text-sm text-ink-soft">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours. For immediate help, call us at 347-669-1457.
        </p>
        <button onClick={() => setSent(false)} className="btn-outline mt-2">Send another</button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="card-surface flex flex-col gap-4 p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">First name *</span>
          <input required className={field} name="firstName" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">Last name</span>
          <input className={field} name="lastName" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">Email *</span>
        <input required type="email" className={field} name="email" />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">Message *</span>
        <textarea required rows={5} className={`${field} resize-none`} name="message" placeholder="How can we help?" />
      </label>
      <button className="btn-primary mt-1 self-start">
        Submit <ArrowRight className="h-4 w-4" />
      </button>
      <p className="text-xs text-ink-soft">Please allow up to 24 hours for a response.</p>
    </form>
  );
}
