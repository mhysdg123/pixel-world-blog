# Content Workflow (BOBO WORLD)

## Write / Edit / Delete Posts On Website

1. Open homepage.
2. In `Latest Posts`, unlock `Owner Studio`.
3. Create, edit, or delete posts directly in the panel.
4. Changes are stored in browser localStorage key `bobo_blog_posts_v1`.

## Music Workflow (NCM -> MP3)

1. Keep source files in `D:\CloudMusic\VipSongsDownload`.
2. Run `npm run music:import`.
3. Converted tracks appear in `public/music`.
4. Floating `BOBO Player` widget auto-loads these local tracks.

## Tools / Curated Music Links

- Edit `data/tools.ts` for tool cards.
- Edit `data/music.ts` for external curated links.

## Why Visitors Stay Read-Only

- No public write API exists for content.
- `proxy.ts` blocks non-GET/HEAD/OPTIONS requests.
- Owner Studio writes only to the current browser's localStorage.