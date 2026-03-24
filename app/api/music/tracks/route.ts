import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { fallbackAudioTracks } from "@/data/fallback-audio";
import type { LocalAudioTrack } from "@/types/blog";

const PLAYABLE_EXT = new Set([".mp3", ".wav", ".ogg", ".m4a", ".flac"]);
const UNKNOWN_ARTIST = "Unknown Artist";
const REMOTE_PREFIX = "remote-";
const LOCAL_PREFIX = "local-";

type RemoteManifestTrack = {
  id?: string;
  filename?: string;
  name?: string;
  title?: string;
  artist?: string;
  url?: string;
};

type RemoteManifestPayload =
  | RemoteManifestTrack[]
  | {
      tracks?: RemoteManifestTrack[];
    };

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseTrackMeta(filename: string) {
  const base = path.parse(filename).name.replace(/\s+/g, " ").trim();
  const separators = ["-", "–", "—"];

  let splitIndex = -1;
  for (let i = 0; i < base.length; i += 1) {
    if (separators.includes(base[i])) {
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

function normalizeRemoteTracks(payload: RemoteManifestPayload): LocalAudioTrack[] {
  const list = Array.isArray(payload) ? payload : payload.tracks ?? [];

  return list
    .map((track, index) => {
      const rawUrl = normalizeText(track.url);
      if (!rawUrl) {
        return null;
      }

      const filename = normalizeText(track.filename) || normalizeText(track.name);
      const parsed = filename ? parseTrackMeta(filename) : null;
      const title = normalizeText(track.title) || parsed?.title || `Track ${index + 1}`;
      const artist = normalizeText(track.artist) || parsed?.artist || UNKNOWN_ARTIST;

      return {
        id: normalizeText(track.id) || `${REMOTE_PREFIX}${index}`,
        filename: filename || `${title}.mp3`,
        title,
        artist,
        url: rawUrl,
      };
    })
    .filter((item): item is LocalAudioTrack => item !== null);
}

async function loadRemoteTracks(manifestUrl: string) {
  try {
    const response = await fetch(manifestUrl, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as RemoteManifestPayload;
    const tracks = normalizeRemoteTracks(payload);
    return tracks.length ? tracks : null;
  } catch {
    return null;
  }
}

async function loadLocalTracks() {
  const musicDir = path.join(process.cwd(), "public", "music");
  const items = await fs.readdir(musicDir, { withFileTypes: true });

  return items
    .filter((item) => item.isFile())
    .map((item) => item.name)
    .filter((name) => PLAYABLE_EXT.has(path.extname(name).toLowerCase()))
    .map((name, index) => {
      const meta = parseTrackMeta(name);

      return {
        id: `${LOCAL_PREFIX}${index}`,
        filename: name,
        title: meta.title,
        artist: meta.artist,
        url: `/music/${encodeURIComponent(name)}`,
      };
    });
}

export async function GET() {
  const manifestUrl = process.env.MUSIC_REMOTE_MANIFEST_URL?.trim();

  if (manifestUrl) {
    const remoteTracks = await loadRemoteTracks(manifestUrl);
    if (remoteTracks?.length) {
      return NextResponse.json({ tracks: remoteTracks, source: "remote" });
    }
  }

  try {
    const localTracks = await loadLocalTracks();
    if (localTracks.length) {
      return NextResponse.json({ tracks: localTracks, source: "local" });
    }
  } catch {
    // Ignore and fallback to demo tracks.
  }

  return NextResponse.json({ tracks: fallbackAudioTracks, source: "demo" });
}
