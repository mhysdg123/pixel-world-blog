"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { tracks } from "@/data/music";
import type { LocalAudioTrack } from "@/types/blog";

type LibraryInfo = {
  available: boolean;
  ncmCount: number;
};

type TrackSource = "local" | "demo" | "remote";

export default function MusicPage() {
  const { isChinese } = useLanguage();
  const t = useTranslations("musicPage");

  const [localTracks, setLocalTracks] = useState<LocalAudioTrack[]>([]);
  const [libraryInfo, setLibraryInfo] = useState<LibraryInfo | null>(null);
  const [trackSource, setTrackSource] = useState<TrackSource>("local");

  useEffect(() => {
    async function loadData() {
      const [tracksRes, libraryRes] = await Promise.all([
        fetch("/api/music/tracks", { cache: "no-store" }),
        fetch("/api/music/library", { cache: "no-store" }),
      ]);

      const tracksData = (await tracksRes.json()) as {
        tracks?: LocalAudioTrack[];
        source?: TrackSource;
      };
      const libraryData = (await libraryRes.json()) as LibraryInfo;

      setLocalTracks(tracksData.tracks ?? []);
      setTrackSource(
        tracksData.source === "remote"
          ? "remote"
          : tracksData.source === "demo"
            ? "demo"
            : "local",
      );
      setLibraryInfo(libraryData);
    }

    loadData().catch(() => {
      setLocalTracks([]);
      setTrackSource("demo");
      setLibraryInfo(null);
    });
  }, []);

  function sourceLabel(source: "spotify" | "youtube" | "local") {
    if (source === "youtube") {
      return t("source.youtube");
    }
    if (source === "spotify") {
      return t("source.spotify");
    }
    return t("source.local");
  }

  function librarySourceLabel(source: TrackSource) {
    if (source === "remote") {
      return t("librarySource.remote");
    }
    if (source === "demo") {
      return t("librarySource.demo");
    }
    return t("librarySource.local");
  }

  return (
    <main className="paper-container pb-10">
      <Navbar />

      <section className="pixel-panel mt-6 rounded-pixel p-5 sm:p-7">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="space-y-4 rounded-pixel border-2 border-line bg-paper p-4">
          <h3 className="font-pixel text-[10px] uppercase tracking-[0.12em] text-ink">{t("widgetStatus")}</h3>

          <p className="text-sm text-mute">
            {t("playableTracks")}: <span className="font-semibold text-ink">{localTracks.length}</span>
          </p>

          <p className="text-sm text-mute">
            {t("trackSource")}: <span className="font-semibold text-ink">{librarySourceLabel(trackSource)}</span>
          </p>

          <p className="text-sm text-mute">
            {t("randomPicks")}: <span className="font-semibold text-ink">5 {t("songs")}</span>
          </p>

          {libraryInfo?.available ? (
            <p className="text-sm text-mute">
              {t("localLibrarySynced")}:{" "}
              <span className="font-semibold text-ink">{libraryInfo.ncmCount}</span> {t("tracks")}
            </p>
          ) : (
            <p className="text-sm text-mute">{t("localLibraryMissing")}</p>
          )}
        </div>

        <div className="mt-5 space-y-3">
          <h3 className="font-pixel text-[11px] uppercase tracking-[0.14em] text-ink">{t("curatedLinks")}</h3>

          {tracks.map((track) => {
            const vibe = isChinese ? track.vibeZh ?? track.vibe : track.vibe;
            return (
              <article
                key={track.id}
                className="flex flex-col gap-3 rounded-pixel border-2 border-line bg-paper p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-pixel text-[9px] uppercase tracking-[0.14em] text-ember">
                    {sourceLabel(track.source)}
                  </p>
                  <h3 className="mt-1 font-pixel text-[12px] uppercase tracking-[0.11em] text-ink">
                    {track.title}
                  </h3>
                  <p className="mt-1 text-sm text-mute">{track.artist}</p>
                  <p className="mt-1 text-sm text-mute">
                    {t("vibe")}: {vibe}
                  </p>
                </div>

                <Link
                  href={track.url}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-tag w-fit px-3 py-2 text-[9px] tracking-[0.12em] hover:bg-white"
                >
                  {t("open")}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
