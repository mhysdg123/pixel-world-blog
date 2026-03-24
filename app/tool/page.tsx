"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { tools } from "@/data/tools";

const statusClass: Record<string, string> = {
  public: "text-accent",
  beta: "text-ember",
  private: "text-mute",
};

export default function ToolPage() {
  const { isChinese } = useLanguage();
  const t = useTranslations("toolPage");

  function getStatusLabel(status: "public" | "private" | "beta") {
    if (status === "public") {
      return t("status.public");
    }
    if (status === "beta") {
      return t("status.beta");
    }
    return t("status.private");
  }

  return (
    <main className="paper-container pb-10">
      <Navbar />

      <section className="pixel-panel mt-6 rounded-pixel p-5 sm:p-7">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-4 md:grid-cols-2">
          {tools.map((tool) => {
            const name = isChinese ? tool.nameZh ?? tool.name : tool.name;
            const summary = isChinese ? tool.summaryZh ?? tool.summary : tool.summary;
            const usage = isChinese ? tool.usageZh ?? tool.usage : tool.usage;

            return (
              <article key={tool.slug} className="rounded-pixel border-2 border-line bg-paper p-4">
                <p className={`font-pixel text-[9px] uppercase tracking-[0.14em] ${statusClass[tool.status]}`}>
                  {getStatusLabel(tool.status)}
                </p>
                <h3 className="mt-3 font-pixel text-[12px] uppercase tracking-[0.11em] text-ink">
                  {name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-mute">{summary}</p>
                <p className="mt-3 text-sm leading-6 text-mute">
                  <span className="font-semibold text-ink">{t("howToUse")}</span> {usage}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tool.stack.map((tech) => (
                    <span key={tech} className="pixel-tag px-2 py-1 text-[9px] tracking-[0.12em]">
                      {tech}
                    </span>
                  ))}
                </div>
                {tool.link ? (
                  <Link href={tool.link} className="mt-4 inline-block text-sm text-accent hover:underline">
                    {t("openTool")}
                  </Link>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
