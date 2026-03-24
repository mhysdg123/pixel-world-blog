"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/cn";
import type { BlogPost } from "@/types/blog";

export function PostCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const { isChinese } = useLanguage();
  const t = useTranslations("postCard");

  const category = isChinese ? (post.categoryZh ?? post.category) : post.category;
  const title = isChinese ? (post.titleZh ?? post.title) : post.title;
  const summary = isChinese ? (post.summaryZh ?? post.summary) : post.summary;
  const date = isChinese ? (post.dateZh ?? post.date) : post.date;
  const readTime = isChinese ? (post.readTimeZh ?? post.readTime) : post.readTime;

  return (
    <article
      className={cn(
        "pixel-panel pixel-link-hover rounded-pixel p-4 sm:p-5",
        featured ? "md:flex md:items-start md:gap-5" : "",
      )}
    >
      <div className={cn(featured ? "md:flex-1" : "")}>
        <p className="font-pixel text-[9px] uppercase tracking-[0.14em] text-ember sm:text-[10px]">
          {category}
        </p>
        <h3 className="mt-3 font-pixel text-[12px] uppercase leading-relaxed tracking-[0.11em] text-ink sm:text-[14px]">
          <Link href={`/posts/${post.slug}`} className="hover:text-accent">
            {title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-mute">{summary}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.08em] text-mute">
          {date} / {readTime}
        </p>
      </div>
      {featured ? (
        <div className="mt-4 border-2 border-line bg-paper p-3 md:mt-0 md:w-[180px]">
          <p className="font-pixel text-[9px] uppercase tracking-[0.14em] text-ink">
            {t("featuredTitle")}
          </p>
          <p className="mt-2 text-xs leading-5 text-mute">{t("featuredDesc")}</p>
        </div>
      ) : null}
    </article>
  );
}
