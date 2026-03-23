export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  category: string;
  content: string;
  updatedAt?: string;
};

export type LocalAudioTrack = {
  id: string;
  title: string;
  url: string;
  filename: string;
};