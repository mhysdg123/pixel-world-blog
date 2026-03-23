"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { posts as seedPosts } from "@/data/posts";
import { loadPostsFromStorage } from "@/lib/posts-store";
import type { BlogPost } from "@/types/blog";

export default function PostDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(params.slug);

  const [allPosts, setAllPosts] = useState<BlogPost[]>(seedPosts);

  useEffect(() => {
    setAllPosts(loadPostsFromStorage());

    const syncPosts = () => setAllPosts(loadPostsFromStorage());
    window.addEventListener("bobo-posts-updated", syncPosts);
    return () => window.removeEventListener("bobo-posts-updated", syncPosts);
  }, []);

  const post = useMemo(
    () => allPosts.find((item) => item.slug === slug),
    [allPosts, slug]
  );

  if (!post) {
    return (
      <main className="paper-container py-8">
        <article className="pixel-panel rounded-pixel p-6">
          <p className="text-sm text-mute">Post not found.</p>
          <Link
            href="/"
            className="mt-4 inline-flex rounded-pixel border-2 border-line bg-paper px-4 py-2 font-pixel text-[10px] uppercase tracking-[0.12em] hover:-translate-y-[2px] hover:shadow-pixel"
          >
            Back Home
          </Link>
        </article>
      </main>
    );
  }

  const paragraphs = post.content
    .split(/\n\s*\n/g)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <main className="paper-container py-8">
      <article className="pixel-panel rounded-pixel p-5 sm:p-7">
        <p className="font-pixel text-[10px] uppercase tracking-[0.15em] text-ember">
          {post.category}
        </p>

        <h1 className="mt-4 font-pixel text-[16px] uppercase leading-relaxed tracking-[0.12em] sm:text-[20px]">
          {post.title}
        </h1>

        <p className="mt-3 text-sm text-mute">
          {post.date} / {post.readTime}
          {post.updatedAt ? ` / updated ${new Date(post.updatedAt).toLocaleString()}` : ""}
        </p>

        <div className="mt-6 space-y-4 text-[15px] leading-7 text-mute">
          {paragraphs.map((paragraph, index) => (
            <p key={`${post.id}-${index}`}>{paragraph}</p>
          ))}
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-pixel border-2 border-line bg-paper px-4 py-2 font-pixel text-[10px] uppercase tracking-[0.12em] hover:-translate-y-[2px] hover:shadow-pixel"
        >
          Back Home
        </Link>
      </article>
    </main>
  );
}