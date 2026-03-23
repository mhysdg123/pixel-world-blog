import type { Post } from "@/components/PostCard";

export const posts: Post[] = [
  {
    slug: "shipping-a-blog-like-a-game",
    title: "Shipping a Blog Like a Game: Tiny Levels, Fast Wins",
    date: "Mar 18, 2026",
    readTime: "8 min read",
    summary: "How I split my writing workflow into tiny build loops so publishing feels closer to game progression than homework.",
    category: "Productivity",
  },
  {
    slug: "old-web-ui-that-still-feels-modern",
    title: "Old Web UI That Still Feels Modern",
    date: "Mar 11, 2026",
    readTime: "6 min read",
    summary: "A design note on combining retro borders, pixel typography, and modern spacing without making the page feel noisy.",
    category: "Design",
  },
  {
    slug: "small-tools-i-built-this-month",
    title: "Three Small Tools I Built This Month",
    date: "Feb 27, 2026",
    readTime: "5 min read",
    summary: "A practical changelog of tiny utilities for writing, screenshots, and weekly planning that now run my entire routine.",
    category: "Build Log",
  },
];
