"use client";

import { useTranslations } from "next-intl";
import { PixelCharacter } from "@/components/PixelCharacter";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="mt-6 grid items-stretch gap-6 lg:grid-cols-[1.1fr,0.9fr]">
      <div className="pixel-panel rounded-pixel p-5 sm:p-7">
        <p className="inline-flex items-center border-2 border-line bg-paper px-3 py-2 font-pixel text-[9px] uppercase tracking-[0.14em] text-mute sm:text-[10px]">
          {t("badge")}
        </p>
        <h1 className="mt-5 space-y-2 font-pixel text-[20px] uppercase leading-[1.5] tracking-[0.14em] text-ink sm:text-[28px]">
          <span className="block">{t("writing")}</span>
          <span className="block">{t("thinking")}</span>
          <span className="block">{t("building")}</span>
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-7 text-mute">{t("description")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="#posts">{t("start")}</Button>
          <Button href="#about" variant="secondary">
            {t("about")}
          </Button>
        </div>
        <p className="mt-7 font-pixel text-[10px] uppercase tracking-[0.2em] text-ember">{t("footer")}</p>
      </div>
      <PixelCharacter />
    </section>
  );
}
