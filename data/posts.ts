import type { BlogPost } from "@/types/blog";

export const posts: BlogPost[] = [
  {
    id: "post-1",
    slug: "shipping-a-blog-like-a-game",
    title: "Shipping a Blog Like a Game: Tiny Levels, Fast Wins",
    titleZh: "\u50cf\u505a\u6e38\u620f\u4e00\u6837\u5199\u535a\u5ba2\uff1a\u5c0f\u5173\u5361\uff0c\u5feb\u53cd\u9988",
    date: "Mar 18, 2026",
    dateZh: "2026\u5e743\u670818\u65e5",
    readTime: "8 min read",
    readTimeZh: "8 \u5206\u949f\u9605\u8bfb",
    summary:
      "How I split my writing workflow into tiny build loops so publishing feels closer to game progression than homework.",
    summaryZh:
      "\u6211\u628a\u5199\u4f5c\u6d41\u7a0b\u62c6\u6210\u5f88\u5c0f\u7684\u6784\u5efa\u5faa\u73af\uff0c\u8ba9\u53d1\u5e03\u66f4\u50cf\u6253\u5173\u5347\u7ea7\uff0c\u800c\u4e0d\u662f\u5199\u4f5c\u4e1a\u3002",
    category: "Productivity",
    categoryZh: "\u6548\u7387",
    content:
      "I stopped treating writing as one giant task and started treating it like small game levels.\n\nEach post now has checkpoints: idea, rough outline, draft, and final polish. Finishing one checkpoint gives immediate momentum for the next.\n\nThis approach reduced my resistance to publishing and helped me ship consistently without burning out.",
    contentZh:
      "\u6211\u4e0d\u518d\u628a\u5199\u4f5c\u5f53\u6210\u4e00\u4e2a\u5e9e\u5927\u4efb\u52a1\uff0c\u800c\u662f\u628a\u5b83\u62c6\u6210\u4e00\u4e2a\u4e2a\u5c0f\u5173\u5361\u3002\n\n\u73b0\u5728\u6bcf\u7bc7\u6587\u7ae0\u90fd\u6709\u68c0\u67e5\u70b9\uff1a\u60f3\u6cd5\u3001\u7c97\u63d0\u7eb2\u3001\u521d\u7a3f\u3001\u6700\u540e\u6da6\u8272\u3002\u6bcf\u5b8c\u6210\u4e00\u4e2a\u68c0\u67e5\u70b9\uff0c\u90fd\u4f1a\u7ed9\u4e0b\u4e00\u4e2a\u9636\u6bb5\u5e26\u6765\u5373\u65f6\u52a8\u529b\u3002\n\n\u8fd9\u4e2a\u65b9\u6cd5\u964d\u4f4e\u4e86\u6211\u5bf9\u53d1\u5e03\u7684\u5fc3\u7406\u963b\u529b\uff0c\u4e5f\u8ba9\u6211\u53ef\u4ee5\u5728\u4e0d\u900f\u652f\u7cbe\u529b\u7684\u524d\u63d0\u4e0b\u6301\u7eed\u4ea7\u51fa\u3002",
  },
  {
    id: "post-2",
    slug: "old-web-ui-that-still-feels-modern",
    title: "Old Web UI That Still Feels Modern",
    titleZh: "\u590d\u53e4\u7f51\u9875 UI\uff0c\u4f9d\u7136\u53ef\u4ee5\u5f88\u73b0\u4ee3",
    date: "Mar 11, 2026",
    dateZh: "2026\u5e743\u670811\u65e5",
    readTime: "6 min read",
    readTimeZh: "6 \u5206\u949f\u9605\u8bfb",
    summary:
      "A design note on combining retro borders, pixel typography, and modern spacing without making the page feel noisy.",
    summaryZh:
      "\u4e00\u4efd\u8bbe\u8ba1\u7b14\u8bb0\uff1a\u5982\u4f55\u628a\u590d\u53e4\u8fb9\u6846\u3001\u50cf\u7d20\u5b57\u548c\u73b0\u4ee3\u7559\u767d\u7ed3\u5408\u8d77\u6765\uff0c\u540c\u65f6\u4e0d\u8ba9\u9875\u9762\u663e\u5f97\u6742\u4e71\u3002",
    category: "Design",
    categoryZh: "\u8bbe\u8ba1",
    content:
      "Retro styling works best when the layout discipline is modern.\n\nI keep the color palette tight, reserve heavy borders for key modules, and use whitespace to avoid visual fatigue.\n\nThe result feels nostalgic without losing readability on mobile screens.",
    contentZh:
      "\u590d\u53e4\u98ce\u683c\u6700\u6709\u6548\u7684\u65f6\u5019\uff0c\u5f80\u5f80\u5efa\u7acb\u5728\u73b0\u4ee3\u6392\u7248\u7eaa\u5f8b\u4e4b\u4e0a\u3002\n\n\u6211\u4f1a\u63a7\u5236\u914d\u8272\u6570\u91cf\uff0c\u628a\u91cd\u8fb9\u6846\u7559\u7ed9\u5173\u952e\u6a21\u5757\uff0c\u5e76\u901a\u8fc7\u7559\u767d\u51cf\u5c11\u89c6\u89c9\u75b2\u52b3\u3002\n\n\u6700\u7ec8\u6548\u679c\u65e2\u6709\u6000\u65e7\u611f\uff0c\u4e5f\u4e0d\u4f1a\u727a\u7272\u79fb\u52a8\u7aef\u7684\u53ef\u8bfb\u6027\u3002",
  },
  {
    id: "post-3",
    slug: "small-tools-i-built-this-month",
    title: "Three Small Tools I Built This Month",
    titleZh: "\u8fd9\u4e2a\u6708\u6211\u505a\u7684\u4e09\u4e2a\u5c0f\u5de5\u5177",
    date: "Feb 27, 2026",
    dateZh: "2026\u5e742\u670827\u65e5",
    readTime: "5 min read",
    readTimeZh: "5 \u5206\u949f\u9605\u8bfb",
    summary:
      "A practical changelog of tiny utilities for writing, screenshots, and weekly planning that now run my entire routine.",
    summaryZh:
      "\u4e00\u4efd\u5b9e\u7528\u66f4\u65b0\u65e5\u5fd7\uff0c\u8bb0\u5f55\u4e86\u5199\u4f5c\u3001\u622a\u56fe\u548c\u5468\u8ba1\u5212\u4e09\u4e2a\u5c0f\u5de5\u5177\u5982\u4f55\u63a5\u7ba1\u4e86\u6211\u7684\u65e5\u5e38\u6d41\u7a0b\u3002",
    category: "Build Log",
    categoryZh: "\u6784\u5efa\u65e5\u5fd7",
    content:
      "This month I built three tiny tools: a prompt polisher, a focus board, and a notes sync helper.\n\nNone of them are huge products, but together they remove repeated friction from my day.\n\nSmall tools are often the fastest way to upgrade your creative system.",
    contentZh:
      "\u8fd9\u4e2a\u6708\u6211\u505a\u4e86\u4e09\u4e2a\u5c0f\u5de5\u5177\uff1a\u63d0\u793a\u8bcd\u4f18\u5316\u5668\u3001\u4e13\u6ce8\u770b\u677f\u548c\u7b14\u8bb0\u540c\u6b65\u52a9\u624b\u3002\n\n\u5b83\u4eec\u90fd\u4e0d\u662f\u5927\u4ea7\u54c1\uff0c\u4f46\u7ec4\u5408\u5728\u4e00\u8d77\u540e\uff0c\u660e\u663e\u51cf\u5c11\u4e86\u6211\u6bcf\u5929\u91cd\u590d\u6d88\u8017\u7684\u963b\u529b\u3002\n\n\u5f88\u591a\u65f6\u5019\uff0c\u5c0f\u5de5\u5177\u624d\u662f\u5347\u7ea7\u4e2a\u4eba\u521b\u4f5c\u7cfb\u7edf\u6700\u5feb\u7684\u65b9\u5f0f\u3002",
  },
];
