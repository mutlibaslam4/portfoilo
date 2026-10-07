"use client";

import { profile } from "@/data/site";
import { useT } from "@/i18n/useT";

export default function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. {t("footer.rights")}
        </p>
        <div className="flex gap-5" dir="ltr">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="transition hover:text-accent">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
