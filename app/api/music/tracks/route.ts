import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { fallbackAudioTracks } from "@/data/fallback-audio";
import type { LocalAudioTrack } from "@/types/blog";

const PLAYABLE_EXT = new Set([".mp3", ".wav", ".ogg", ".m4a", ".flac"]);
const UNKNOWN_ARTIST = "Unknown Artist";

function parseTrackMeta(filename: string) {
  const base = path.parse(filename).name.replace(/\s+/g, " ").trim();

  let splitIndex = -1;
  for (let i = 0; i < base.length; i += 1) {
    const char = base[i];
    if (char === "-" || char === "–" || char === "—") {
      splitIndex = i;
    }
  }

  if (splitIndex > 0 && splitIndex < base.length - 1) {
    const title = base.slice(0, splitIndex).trim();
    const artist = base.slice(splitIndex + 1).trim();

    if (title && artist) {
      return { title, artist };
    }
  }

  return {
    title: base,
    artist: UNKNOWN_ARTIST,
  };
}

export async function GET() {
  const musicDir = path.join(process.cwd(), "public", "music");

  try {
    const items = await fs.readdir(musicDir, { withFileTypes: true });

    const tracks: LocalAudioTrack[] = items
      .filter((item) => item.isFile())
      .map((item) => item.name)
      .filter((name) => PLAYABLE_EXT.has(path.extname(name).toLowerCase()))
      .map((name, index) => {
        const meta = parseTrackMeta(name);

        return {
          id: `local-${index}`,
          filename: name,
          title: meta.title,
          artist: meta.artist,
          url: `/music/${encodeURIComponent(name)}`,
        };
      });

    if (!tracks.length) {
      return NextResponse.json({ tracks: fallbackAudioTracks, source: "demo" });
    }

    return NextResponse.json({ tracks, source: "local" });
  } catch {
    return NextResponse.json({ tracks: fallbackAudioTracks, source: "demo" });
  }
}
