"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function PixelCharacter() {
  const t = useTranslations("pixelCharacter");

  return (
    <div className="pixel-panel relative mx-auto w-full max-w-[360px] rounded-pixel p-4 sm:p-6">
      <div className="absolute right-3 top-3 pixel-tag px-2 py-1 text-[8px]">{t("tag")}</div>
      <div className="relative mx-auto mt-6 overflow-hidden rounded-[16px] border-2 border-line bg-paper shadow-pixel-soft">
        <Image
          src="/avatar.jpg"
          alt={t("photoAlt")}
          width={900}
          height={1200}
          className="h-[420px] w-full object-cover"
          priority
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
      </div>
      <p className="mt-4 text-center text-sm text-mute">{t("caption")}</p>
    </div>
  );
}
