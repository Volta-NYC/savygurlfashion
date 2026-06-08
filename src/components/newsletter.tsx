"use client";

import { useState } from "react";
import { ArrowRight } from "./icons";

export function Newsletter({ variant = "panel" }: { variant?: "panel" | "inline" }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  if (variant === "inline") {
    return (
      <form onSubmit={submit} className="w-full">
        {done ? (
          <p className="text-sm text-paper/90">You&apos;re in! Watch your inbox for early access. 💜</p>
        ) : (
          <div className="flex items-center gap-2 rounded-full border border-paper/30 bg-paper/10 p-1.5 pl-5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              className="flex-1 bg-transparent text-sm text-paper outline-none placeholder:text-paper/60"
            />
            <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper text-plum transition-transform hover:scale-105" aria-label="Subscribe">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </form>
    );
  }

  return (
    <div className="grain relative overflow-hidden rounded-4xl bg-plum px-6 py-14 text-center text-paper sm:px-12 sm:py-20">
      <div className="relative z-10 mx-auto max-w-xl">
        <p className="eyebrow text-orchid">The SavyGurl List</p>
        <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight">
          Get exclusive drops & treats in your inbox
        </h2>
        <p className="mt-3 text-paper/75">
          Early access to new arrivals, members-only sales, and a little style inspo. No spam — promise.
        </p>
        <form onSubmit={submit} className="mx-auto mt-7 max-w-md">
          {done ? (
            <p className="rounded-full bg-paper/15 px-6 py-4 text-sm">You&apos;re on the list! Check your inbox for a welcome treat. 💜</p>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-paper/25 sm:bg-paper/10 sm:p-1.5 sm:pl-6">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                className="flex-1 rounded-full bg-paper/10 px-6 py-4 text-sm text-paper outline-none placeholder:text-paper/60 sm:bg-transparent sm:px-0 sm:py-0"
              />
              <button className="rounded-full bg-paper px-7 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-plum transition-transform hover:scale-[1.02]">
                Join
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orchid/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-berry/20 blur-3xl" />
    </div>
  );
}
