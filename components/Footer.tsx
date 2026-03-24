"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/components/LanguageProvider";
import { profile } from "@/data/profile";

export function Footer() {
  const { isChinese } = useLanguage();
  const t = useTranslations("footer");

  return (
    <footer className={`pixel-panel mt-8 rounded-pixel px-4 py-4 sm:px-5 ${isChinese ? "font-cn" : ""}`}>
      <div className="flex flex-col gap-3 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>(c) {new Date().getFullYear()} BOBO WORLD. {t("tagline")}</p>
        <div className="flex items-center gap-4">
          <Link href={profile.github} target="_blank" rel="noreferrer" className="hover:text-ink">
            {t("github")}
          </Link>
          <Link href={`mailto:${profile.email}`} className="hover:text-ink">
            {t("email")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
