import fs from "node:fs/promises";
import fsNative from "node:fs";
import path from "node:path";
import { convertNcm } from "ncm2mp3";

const sourceDir = process.argv[2] ?? "D:\\CloudMusic\\VipSongsDownload";
const rawLimit = process.argv[3];
const limit = rawLimit ? Number.parseInt(rawLimit, 10) : Number.POSITIVE_INFINITY;
const hasLimit = Number.isFinite(limit) && limit > 0;
const outputDir = path.join(process.cwd(), "public", "music");

function sanitizeWindowsBasename(name) {
  const cleaned = name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").replace(/[. ]+$/g, "");
  return cleaned || "untitled";
}

function sanitizeOutputPath(filePath) {
  const parsed = path.parse(filePath);
  const safeBase = `${sanitizeWindowsBasename(parsed.name)}${parsed.ext}`;
  return path.join(parsed.dir, safeBase);
}

async function run() {
  await fs.mkdir(outputDir, { recursive: true });

  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const allNcmFiles = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".ncm"))
    .map((entry) => path.join(sourceDir, entry.name));

  const ncmFiles = hasLimit ? allNcmFiles.slice(0, limit) : allNcmFiles;

  if (!ncmFiles.length) {
    console.log("No .ncm files found.");
    return;
  }

  if (rawLimit && !hasLimit) {
    console.log(`Invalid limit "${rawLimit}", converting all files instead.`);
  }

  console.log(`Converting ${ncmFiles.length} .ncm files...`);

  let success = 0;
  const rewrittenOutputPaths = new Map();
  const originalOpen = fsNative.promises.open.bind(fsNative.promises);

  fsNative.promises.open = async (targetPath, flags, ...rest) => {
    if (typeof targetPath === "string" && typeof flags === "string" && flags.includes("w")) {
      const safePath = sanitizeOutputPath(targetPath);
      if (safePath !== targetPath) {
        rewrittenOutputPaths.set(targetPath, safePath);
        targetPath = safePath;
      }
    }

    return originalOpen(targetPath, flags, ...rest);
  };

  try {
    for (const file of ncmFiles) {
      try {
        const outputPath = await convertNcm(file, `${outputDir}${path.sep}`);
        const finalOutputPath = rewrittenOutputPaths.get(outputPath) ?? outputPath;
        const suffix = finalOutputPath === outputPath ? "" : " (sanitized filename)";
        console.log(`OK: ${file} -> ${finalOutputPath}${suffix}`);
        success += 1;
      } catch (error) {
        console.error(`FAIL: ${file}`);
        console.error(error instanceof Error ? error.message : String(error));
      }
    }
  } finally {
    fsNative.promises.open = originalOpen;
  }

  console.log(`Done. ${success}/${ncmFiles.length} converted.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
