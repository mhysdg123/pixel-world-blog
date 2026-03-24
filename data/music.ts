export type CuratedTrack = {
  id: string;
  title: string;
  artist: string;
  vibe: string;
  vibeZh?: string;
  source: "spotify" | "youtube" | "local";
  url: string;
};

export const tracks: CuratedTrack[] = [
  {
    id: "t1",
    title: "Still Corners - The Trip",
    artist: "Still Corners",
    vibe: "Late-night shipping",
    vibeZh: "\u6df1\u591c\u8d76\u5de5",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=Bhk7cjjLVXI",
  },
  {
    id: "t2",
    title: "HOME - Resonance",
    artist: "HOME",
    vibe: "Retro coding",
    vibeZh: "\u590d\u53e4\u7f16\u7801",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=8GW6sLrK40k",
  },
  {
    id: "t3",
    title: "Nujabes - Aruarian Dance",
    artist: "Nujabes",
    vibe: "Writing flow",
    vibeZh: "\u5199\u4f5c\u6d41",
    source: "spotify",
    url: "https://open.spotify.com/track/5a2J5x7wY2f7R8Q9k5xN0v",
  },
];
