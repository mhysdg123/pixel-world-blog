"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { profile } from "@/data/profile";

export function Footer() {
  const { isChinese } = useLanguage();

  const copy = useMemo(
    () =>
      isChinese
        ? {
            tagline: "\u6bcf\u4e00\u7bc7\u90fd\u6162\u6162\u5199\uff0c\u4e00\u70b9\u70b9\u6784\u5efa\u3002",
            github: "GitHub \u4e3b\u9875",
            email: "\u90ae\u7bb1",
          }
        : {
            tagline: "Built one post at a time.",
            github: "GitHub",
            email: "Email",
          },
    [isChinese],
  );

  return (
    <footer className={`pixel-panel mt-8 rounded-pixel px-4 py-4 sm:px-5 ${isChinese ? "font-cn" : ""}`}>
      <div className="flex flex-col gap-3 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>(c) {new Date().getFullYear()} BOBO WORLD. {copy.tagline}</p>
        <div className="flex items-center gap-4">
          <Link href={profile.github} target="_blank" rel="noreferrer" className="hover:text-ink">
            {copy.github}
          </Link>
          <Link href={`mailto:${profile.email}`} className="hover:text-ink">
            {copy.email}
          </Link>
        </div>
      </div>
    </footer>
  );
}

