"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

const navItems = [
  { key: "home", href: "/" },
  { key: "write", href: "/write" },
  { key: "photography", href: "/photography" },
  { key: "tool", href: "/tool" },
  { key: "music", href: "/music" },
] as const;

export function Navbar() {
  const [contactOpen, setContactOpen] = useState(false);
  const { isChinese, toggleLanguage } = useLanguage();
  const t = useTranslations("navbar");

  const labels = {
    home: t("home"),
    write: t("write"),
    photography: t("photography"),
    tool: t("tool"),
    music: t("music"),
  };

  return (
    <header className={`pixel-panel mt-6 rounded-pixel px-4 py-4 sm:px-5 ${isChinese ? "font-cn" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="font-pixel text-[11px] uppercase tracking-[0.16em] text-ink sm:text-xs"
        >
          BOBO WORLD
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm text-mute transition-colors hover:text-ink"
            >
              {labels[item.key]}
            </Link>
          ))}
        </nav>

        <div className="relative flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            type="button"
            onClick={toggleLanguage}
            className={isChinese ? "font-cn text-xs normal-case tracking-[0.08em]" : "text-[9px]"}
          >
            {t("languageSwitch")}
          </Button>

          <Button
            size="sm"
            type="button"
            onClick={() => setContactOpen((prev) => !prev)}
            className={isChinese ? "font-cn text-xs normal-case tracking-[0.08em]" : ""}
          >
            {t("contact")}
          </Button>

          {contactOpen ? (
            <div className="pixel-panel absolute right-0 top-[calc(100%+8px)] z-30 min-w-[220px] rounded-pixel bg-paper p-3">
              <div className="space-y-2 text-sm">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-mute transition-colors hover:text-ink"
                >
                  {t("github")}: {profile.github.replace("https://", "")}
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="block text-mute transition-colors hover:text-ink"
                >
                  {t("email")}: {profile.email}
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <nav className="mt-4 flex flex-wrap gap-2 md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="pixel-tag px-2.5 py-1 text-[9px] tracking-[0.12em]"
          >
            {labels[item.key]}
          </Link>
        ))}
      </nav>
    </header>
  );
}
