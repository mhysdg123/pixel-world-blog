import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { fallbackAudioTracks } from "@/data/fallback-audio";
import type { LocalAudioTrack } from "@/types/blog";

const PLAYABLE_EXT = new Set([".mp3", ".wav", ".ogg", ".m4a", ".flac"]);

export async function GET() {
  const musicDir = path.join(process.cwd(), "public", "music");

  try {
    const items = await fs.readdir(musicDir, { withFileTypes: true });

    const tracks: LocalAudioTrack[] = items
      .filter((item) => item.isFile())
      .map((item) => item.name)
      .filter((name) => PLAYABLE_EXT.has(path.extname(name).toLowerCase()))
      .map((name, index) => ({
        id: `local-${index}`,
        filename: name,
        title: path.parse(name).name,
        url: `/music/${encodeURIComponent(name)}`,
      }));

    if (!tracks.length) {
      return NextResponse.json({ tracks: fallbackAudioTracks, source: "demo" });
    }

    return NextResponse.json({ tracks, source: "local" });
  } catch {
    return NextResponse.json({ tracks: fallbackAudioTracks, source: "demo" });
  }
}
