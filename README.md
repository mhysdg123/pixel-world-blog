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
