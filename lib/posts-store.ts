import { posts as seedPosts } from "@/data/posts";
import type { BlogPost } from "@/types/blog";

export const POSTS_STORAGE_KEY = "bobo_blog_posts_v1";
export const OWNER_SESSION_KEY = "bobo_owner_unlocked";

export function sortPosts(items: BlogPost[]) {
  return [...items].sort((a, b) => {
    const ad = new Date(a.updatedAt ?? a.date).getTime();
    const bd = new Date(b.updatedAt ?? b.date).getTime();
    return bd - ad;
  });
}

export function loadPostsFromStorage(): BlogPost[] {
  if (typeof window === "undefined") {
    return sortPosts(seedPosts);
  }

  try {
    const raw = window.localStorage.getItem(POSTS_STORAGE_KEY);
    if (!raw) {
      return sortPosts(seedPosts);
    }

    const parsed = JSON.parse(raw) as BlogPost[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return sortPosts(seedPosts);
    }

    return sortPosts(parsed);
  } catch {
    return sortPosts(seedPosts);
  }
}

export function persistPosts(items: BlogPost[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(sortPosts(items)));
  window.dispatchEvent(new Event("bobo-posts-updated"));
}

export function resetPostsToSeed() {
  persistPosts(seedPosts);
  return sortPosts(seedPosts);
}

export function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatReadableDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function createEmptyPostDraft(): BlogPost {
  return {
    id: "",
    slug: "",
    title: "",
    date: formatReadableDate(),
    readTime: "5 min read",
    summary: "",
    category: "Notes",
    content: "",
  };
}