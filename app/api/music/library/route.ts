import { promises as fs } from "node:fs";
import { NextResponse } from "next/server";

const DEFAULT_NCM_DIR = "D:/CloudMusic/VipSongsDownload";

export async function GET() {
  const sourceDir = process.env.NCM_LIBRARY_DIR ?? DEFAULT_NCM_DIR;

  try {
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });
    const ncmFiles = entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".ncm"))
      .map((entry) => entry.name);

    return NextResponse.json({
      available: true,
      ncmCount: ncmFiles.length,
    });
  } catch {
    return NextResponse.json({
      available: false,
      ncmCount: 0,
    });
  }
}
