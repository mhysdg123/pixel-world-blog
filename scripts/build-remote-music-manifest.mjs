import fs from "node:fs/promises";
import path from "node:path";

const PLAYABLE_EXT = new Set([".mp3", ".wav", ".ogg", ".m4a", ".flac"]);
const UNKNOWN_ARTIST = "Unknown Artist";

const baseUrl = process.argv[2];
const sourceDir = process.argv[3] ?? path.join(process.cwd(), "public", "music");
const outputFile = process.argv[4] ?? path.join(process.cwd(), "music-manifest.json");

if (!baseUrl) {
  console.error("Usage: node scripts/build-remote-music-manifest.mjs <baseUrl> [sourceDir] [outputFile]");
  process.exit(1);
}

function parseTrackMeta(filename) {
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

function joinUrl(base, filename) {
  return `${base.replace(/\/+$/, "")}/${encodeURIComponent(filename)}`;
}

async function run() {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  const tracks = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((filename) => PLAYABLE_EXT.has(path.extname(filename).toLowerCase()))
    .map((filename, index) => {
      const meta = parseTrackMeta(filename);

      return {
        id: `remote-${index}`,
        filename,
        title: meta.title,
        artist: meta.artist,
        url: joinUrl(baseUrl, filename),
      };
    });

  if (!tracks.length) {
    console.error(`No playable audio files found in: ${sourceDir}`);
    process.exit(1);
  }

  await fs.writeFile(outputFile, `${JSON.stringify({ tracks }, null, 2)}\n`, "utf8");

  console.log(`Manifest generated: ${outputFile}`);
  console.log(`Tracks: ${tracks.length}`);
  console.log(`Base URL: ${baseUrl}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
