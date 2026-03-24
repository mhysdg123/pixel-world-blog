# BOBO WORLD (Next.js 16)

Retro pixel-inspired personal blog homepage built with Next.js + TypeScript + Tailwind.

## Run

```bash
npm install
npm run dev
```

## Owner Studio (write/edit/delete on website)

1. Open homepage and unlock `Owner Studio`.
2. Create / edit / delete posts directly in browser.
3. Changes are stored in browser localStorage (`bobo_blog_posts_v1`).

## NCM Music Import

Convert local NCM files into playable mp3 for widget:

```bash
npm run music:import
```

Optional limit (example: convert first 20 files only):

```bash
node scripts/import-ncm.mjs "D:\CloudMusic\VipSongsDownload" 20
```

Default source folder:

`D:\CloudMusic\VipSongsDownload`

## Remote Music Library (Object Storage)

If you don't want to commit `public/music`, host audio files in object storage and let the site read a remote manifest.

### 1. Generate local mp3 files (optional)

```bash
npm run music:import
```

### 2. Upload mp3 files to object storage

Upload files from `public/music` to a public bucket path, for example:

`https://cdn.example.com/music/<filename>.mp3`

Make sure CORS/public read allows audio playback from your site domain.

### 3. Generate a remote manifest

```bash
npm run music:manifest -- "https://cdn.example.com/music" "public/music" "music-manifest.json"
```

Then upload `music-manifest.json` to your bucket/CDN (for example `https://cdn.example.com/music-manifest.json`).

### 4. Configure deployment env var

Set this environment variable in your deployment platform:

`MUSIC_REMOTE_MANIFEST_URL=https://cdn.example.com/music-manifest.json`

When this variable is present, `/api/music/tracks` will load remote tracks first.
