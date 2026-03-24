"use client";

import { useTranslations } from "next-intl";
import { Footer } from "@/components/Footer";
import { LatestPosts } from "@/components/LatestPosts";
import { Navbar } from "@/components/Navbar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { posts } from "@/data/posts";

export default function WritePage() {
  const t = useTranslations("latestPosts");

  return (
    <main className="paper-container pb-10">
      <Navbar />

      <section className="pixel-panel mt-6 rounded-pixel p-5 sm:p-7">
        <SectionTitle title={t("newPost")} subtitle={t("subtitle")} />
        <p className="mb-5 text-sm text-mute">{t("ownerStudio")}</p>
        <LatestPosts posts={posts} />
      </section>

      <Footer />
    </main>
  );
}
