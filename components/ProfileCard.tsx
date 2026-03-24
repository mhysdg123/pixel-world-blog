"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/components/LanguageProvider";

type Profile = {
  name: string;
  avatar?: string;
  bio: string;
  bioZh?: string;
  intro: string;
  introZh?: string;
  tags: string[];
  tagsZh?: string[];
};

export function ProfileCard({ profile }: { profile: Profile }) {
  const { isChinese } = useLanguage();
  const t = useTranslations("profileCard");
  const intro = isChinese ? (profile.introZh ?? profile.intro) : profile.intro;
  const bio = isChinese ? (profile.bioZh ?? profile.bio) : profile.bio;
  const tags = isChinese ? (profile.tagsZh ?? profile.tags) : profile.tags;

  return (
    <aside id="about" className="pixel-panel h-fit rounded-pixel p-4 sm:p-5">
      <div className="relative overflow-hidden rounded-pixel border-2 border-line bg-paper">
        <Image
          src={profile.avatar ?? "/avatar-user.jpg"}
          alt={t("avatarAlt")}
          width={500}
          height={500}
          className="h-auto w-full object-cover"
          priority
        />
      </div>
      <h3 className="mt-4 font-pixel text-[12px] uppercase tracking-[0.15em] text-ink sm:text-[13px]">
        {profile.name}
      </h3>
      <p className="mt-2 text-sm text-mute">{intro}</p>
      <p className="mt-3 text-sm leading-6 text-mute">{bio}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="pixel-tag text-[9px] tracking-[0.12em]">
            {tag}
          </span>
        ))}
      </div>
    </aside>
  );
}
