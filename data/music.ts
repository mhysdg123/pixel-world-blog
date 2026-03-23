export type CuratedTrack = {
  id: string;
  title: string;
  artist: string;
  vibe: string;
  source: "spotify" | "youtube" | "local";
  url: string;
};

export const tracks: CuratedTrack[] = [
  {
    id: "t1",
    title: "Still Corners - The Trip",
    artist: "Still Corners",
    vibe: "Late-night shipping",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=Bhk7cjjLVXI",
  },
  {
    id: "t2",
    title: "HOME - Resonance",
    artist: "HOME",
    vibe: "Retro coding",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=8GW6sLrK40k",
  },
  {
    id: "t3",
    title: "Nujabes - Aruarian Dance",
    artist: "Nujabes",
    vibe: "Writing flow",
    source: "spotify",
    url: "https://open.spotify.com/track/5a2J5x7wY2f7R8Q9k5xN0v",
  },
];