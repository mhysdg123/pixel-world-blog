export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  titleZh?: string;
  date: string;
  dateZh?: string;
  readTime: string;
  readTimeZh?: string;
  summary: string;
  summaryZh?: string;
  category: string;
  categoryZh?: string;
  content: string;
  contentZh?: string;
  updatedAt?: string;
};

export type LocalAudioTrack = {
  id: string;
  title: string;
  url: string;
  filename: string;
};
