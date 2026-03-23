"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { tracks } from "@/data/music";
import type { LocalAudioTrack } from "@/types/blog";

type LibraryInfo = {
  available: boolean;
  ncmCount: number;
};

export default function MusicPage() {
  const [localTracks, setLocalTracks] = useState<LocalAudioTrack[]>([]);
  const [libraryInfo, setLibraryInfo] = useState<LibraryInfo | null>(null);

  useEffect(() => {
    async function loadData() {
      const [tracksRes, libraryRes] = await Promise.all([
        fetch("/api/music/tracks", { cache: "no-store" }),
        fetch("/api/music/library", { cache: "no-store" }),
      ]);

      const tracksData = (await tracksRes.json()) as { tracks?: LocalAudioTrack[] };
      const libraryData = (await libraryRes.json()) as LibraryInfo;

      setLocalTracks(tracksData.tracks ?? []);
      setLibraryInfo(libraryData);
    }

    loadData().catch(() => {
      setLocalTracks([]);
      setLibraryInfo(null);
    });
  }, []);

  return (
    <main className="paper-container pb-10">
      <Navbar />

      <section className="pixel-panel mt-6 rounded-pixel p-5 sm:p-7">
        <SectionTitle
          title="Music Lab"
          subtitle="Use the floating music widget to instantly play local songs and enjoy fresh recommendations."
        />

        <div className="space-y-4 rounded-pixel border-2 border-line bg-paper p-4">
          <h3 className="font-pixel text-[10px] uppercase tracking-[0.12em] text-ink">Widget Status</h3>

          <p className="text-sm text-mute">
            Playable tracks in widget: <span className="font-semibold text-ink">{localTracks.length}</span>
          </p>

          <p className="text-sm text-mute">
            Random picks per open: <span className="font-semibold text-ink">5 songs</span>
          </p>

          {libraryInfo?.available ? (
            <p className="text-sm text-mute">
              Local library synced: <span className="font-semibold text-ink">{libraryInfo.ncmCount}</span> tracks
            </p>
          ) : (
            <p className="text-sm text-mute">
              Local library not detected yet. Music features will appear automatically once songs are available.
            </p>
          )}
        </div>

        <div className="mt-5 space-y-3">
          <h3 className="font-pixel text-[11px] uppercase tracking-[0.14em] text-ink">
            Curated Links
          </h3>

          {tracks.map((track) => (
            <article
              key={track.id}
              className="flex flex-col gap-3 rounded-pixel border-2 border-line bg-paper p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-pixel text-[9px] uppercase tracking-[0.14em] text-ember">
                  {track.source}
                </p>
                <h3 className="mt-1 font-pixel text-[12px] uppercase tracking-[0.11em] text-ink">
                  {track.title}
                </h3>
                <p className="mt-1 text-sm text-mute">{track.artist}</p>
                <p className="mt-1 text-sm text-mute">Vibe: {track.vibe}</p>
              </div>

              <Link
                href={track.url}
                target="_blank"
                rel="noreferrer"
                className="pixel-tag w-fit px-3 py-2 text-[9px] tracking-[0.12em] hover:bg-white"
              >
                Open
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
