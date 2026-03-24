"use client";

import { useTranslations } from "next-intl";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function PhotographyPage() {
  const t = useTranslations("photographyPage");

  return (
    <main className="paper-container pb-10">
      <Navbar />

      <section className="pixel-panel mt-6 rounded-pixel p-5 sm:p-7">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="rounded-pixel border-2 border-line bg-paper p-6 text-sm leading-7 text-mute">
          {t("placeholder")}
        </div>
      </section>

      <Footer />
    </main>
  );
}
