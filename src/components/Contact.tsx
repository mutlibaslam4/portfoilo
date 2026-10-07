"use client";

import { useState } from "react";
import { profile } from "@/data/site";
import { useT } from "@/i18n/useT";
import { prefillStore } from "@/lib/shared";
import { useStore } from "@/lib/store";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const field =
  "w-full rounded-xl border border-line bg-text/[0.03] px-4 py-3.5 outline-none transition placeholder:text-muted/60 focus:border-accent";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const { t } = useT();
  const prefill = useStore(prefillStore);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error();
      form.reset();
      prefillStore.set("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const wa = `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi! I'd like to discuss a project.")}`;
  const pill =
    "block rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent";

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-28">
      <div className="orbit-border grid gap-12 p-8 sm:p-14 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={t("contact.eyebrow")} title={t("contact.title")} />
          <Reveal delay={0.1}>
            <p className="mt-5 text-muted">{t("contact.sub")}</p>
            <a
              href={`mailto:${profile.email}`}
              dir="ltr"
              className="mt-8 inline-block break-all font-display text-xl font-semibold text-accent underline-offset-4 hover:underline sm:text-2xl"
            >
              {profile.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a href={wa} target="_blank" rel="noreferrer" className={pill}>
                  {t("cta.whatsapp")}
                </a>
              </Magnetic>
              {/* hidden until a real booking link (Cal.com / Calendly) is set in profile.bookingUrl
              <Magnetic>
                <a href={profile.bookingUrl} target="_blank" rel="noreferrer" className={pill}>
                  {t("cta.book")}
                </a>
              </Magnetic>
              */}
              <Magnetic>
                <a href={profile.cv} download className={pill}>
                  ↓ {t("cta.cv")}
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form onSubmit={onSubmit} className="space-y-4">
            <input name="name" required maxLength={80} placeholder={t("form.name")} className={field} />
            <input name="email" type="email" required maxLength={120} placeholder={t("form.email")} className={field} />
            <textarea
              key={prefill}
              name="message"
              required
              rows={5}
              maxLength={4000}
              defaultValue={prefill}
              placeholder={t("form.message")}
              className={field}
            />
            {/* honeypot: real visitors never fill this */}
            <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-accent py-3.5 font-semibold text-[#04120a] transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "sending" ? t("form.sending") : t("form.send")}
            </button>
            <p aria-live="polite" className={`text-sm ${status === "error" ? "text-red-400" : "text-accent"}`}>
              {status === "sent" && t("form.sent")}
              {status === "error" && t("form.error")}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
