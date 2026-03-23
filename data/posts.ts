import type { BlogPost } from "@/types/blog";

export const posts: BlogPost[] = [
  {
    id: "post-1",
    slug: "shipping-a-blog-like-a-game",
    title: "Shipping a Blog Like a Game: Tiny Levels, Fast Wins",
    date: "Mar 18, 2026",
    readTime: "8 min read",
    summary:
      "How I split my writing workflow into tiny build loops so publishing feels closer to game progression than homework.",
    category: "Productivity",
    content:
      "I stopped treating writing as one giant task and started treating it like small game levels.\n\nEach post now has checkpoints: idea, rough outline, draft, and final polish. Finishing one checkpoint gives immediate momentum for the next.\n\nThis approach reduced my resistance to publishing and helped me ship consistently without burning out.",
  },
  {
    id: "post-2",
    slug: "old-web-ui-that-still-feels-modern",
    title: "Old Web UI That Still Feels Modern",
    date: "Mar 11, 2026",
    readTime: "6 min read",
    summary:
      "A design note on combining retro borders, pixel typography, and modern spacing without making the page feel noisy.",
    category: "Design",
    content:
      "Retro styling works best when the layout discipline is modern.\n\nI keep the color palette tight, reserve heavy borders for key modules, and use whitespace to avoid visual fatigue.\n\nThe result feels nostalgic without losing readability on mobile screens.",
  },
  {
    id: "post-3",
    slug: "small-tools-i-built-this-month",
    title: "Three Small Tools I Built This Month",
    date: "Feb 27, 2026",
    readTime: "5 min read",
    summary:
      "A practical changelog of tiny utilities for writing, screenshots, and weekly planning that now run my entire routine.",
    category: "Build Log",
    content:
      "This month I built three tiny tools: a prompt polisher, a focus board, and a notes sync helper.\n\nNone of them are huge products, but together they remove repeated friction from my day.\n\nSmall tools are often the fastest way to upgrade your creative system.",
  },
];