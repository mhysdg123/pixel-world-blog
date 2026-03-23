"use client";

import { useEffect, useMemo, useState } from "react";
import { PostCard } from "@/components/PostCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  OWNER_SESSION_KEY,
  createEmptyPostDraft,
  createSlug,
  formatReadableDate,
  loadPostsFromStorage,
  persistPosts,
  resetPostsToSeed,
  sortPosts,
} from "@/lib/posts-store";
import type { BlogPost } from "@/types/blog";

const OWNER_CODE = process.env.NEXT_PUBLIC_OWNER_CODE ?? "bobo-2026";

export function LatestPosts({ posts: seedPosts }: { posts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(sortPosts(seedPosts));
  const [draft, setDraft] = useState<BlogPost>(createEmptyPostDraft());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showStudio, setShowStudio] = useState(false);
  const [ownerCodeInput, setOwnerCodeInput] = useState("");
  const [ownerUnlocked, setOwnerUnlocked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setPosts(loadPostsFromStorage());

    if (window.sessionStorage.getItem(OWNER_SESSION_KEY) === "1") {
      setOwnerUnlocked(true);
    }

    const syncPosts = () => setPosts(loadPostsFromStorage());
    window.addEventListener("bobo-posts-updated", syncPosts);
    return () => window.removeEventListener("bobo-posts-updated", syncPosts);
  }, []);

  const [featuredPost, ...restPosts] = useMemo(() => posts, [posts]);

  function unlockOwnerStudio() {
    if (ownerCodeInput.trim() !== OWNER_CODE) {
      setError("Owner code is incorrect.");
      return;
    }

    window.sessionStorage.setItem(OWNER_SESSION_KEY, "1");
    setOwnerUnlocked(true);
    setError("");
    setOwnerCodeInput("");
  }

  function startCreate() {
    setEditingId(null);
    setDraft(createEmptyPostDraft());
    setError("");
  }

  function startEdit(post: BlogPost) {
    setEditingId(post.id);
    setDraft(post);
    setError("");
  }
  function saveDraft() {
    if (!draft.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!draft.summary.trim()) {
      setError("Summary is required.");
      return;
    }

    if (!draft.content.trim()) {
      setError("Content is required.");
      return;
    }

    const generatedSlug = createSlug(draft.slug.trim() || draft.title);

    if (!generatedSlug) {
      setError("Slug could not be generated. Use letters and numbers in title.");
      return;
    }

    const duplicate = posts.find(
      (item) => item.slug === generatedSlug && item.id !== editingId
    );

    if (duplicate) {
      setError("Slug already exists. Use a different title or slug.");
      return;
    }

    const now = new Date().toISOString();

    const nextPost: BlogPost = {
      ...draft,
      id: editingId ?? `post-${Date.now()}`,
      slug: generatedSlug,
      date: draft.date || formatReadableDate(),
      readTime: draft.readTime || "5 min read",
      updatedAt: now,
    };

    const nextPosts = editingId
      ? posts.map((item) => (item.id === editingId ? nextPost : item))
      : [nextPost, ...posts];

    persistPosts(nextPosts);
    setPosts(sortPosts(nextPosts));
    setEditingId(nextPost.id);
    setDraft(nextPost);
    setError("");
  }

  function deletePost(id: string) {
    const target = posts.find((item) => item.id === id);
    if (!target) {
      return;
    }

    const confirmDelete = window.confirm(`Delete post "${target.title}"?`);
    if (!confirmDelete) {
      return;
    }

    const nextPosts = posts.filter((item) => item.id !== id);
    persistPosts(nextPosts);
    setPosts(sortPosts(nextPosts));

    if (editingId === id) {
      startCreate();
    }
  }

  function resetAllPosts() {
    const confirmReset = window.confirm(
      "Reset to seed posts? This will overwrite browser-local edits."
    );

    if (!confirmReset) {
      return;
    }

    const next = resetPostsToSeed();
    setPosts(next);
    startCreate();
  }

  return (
    <section id="posts" className="pixel-panel rounded-pixel p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <SectionTitle
          title="Latest Posts"
          subtitle="Write, edit, and delete directly on-site in Owner Studio."
        />

        {!ownerUnlocked ? (
          <div className="rounded-pixel border-2 border-line bg-paper p-3">
            <p className="font-pixel text-[9px] uppercase tracking-[0.12em] text-ink">
              Owner Studio
            </p>
            <div className="mt-2 flex gap-2">
              <input
                type="password"
                value={ownerCodeInput}
                onChange={(event) => setOwnerCodeInput(event.target.value)}
                placeholder="owner code"
                className="w-28 rounded-pixel border-2 border-line bg-milk px-2 py-1 text-xs outline-none"
              />
              <button
                type="button"
                onClick={unlockOwnerStudio}
                className="pixel-tag px-2 py-1 text-[9px]"
              >
                unlock
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowStudio((prev) => !prev)}
            className="pixel-tag px-3 py-2 text-[9px] hover:bg-white"
          >
            {showStudio ? "Hide Studio" : "Open Studio"}
          </button>
        )}
      </div>

      {error ? <p className="mb-3 text-sm text-ember">{error}</p> : null}
      {ownerUnlocked && showStudio ? (
        <div className="mb-5 grid gap-4 rounded-pixel border-2 border-line bg-paper p-4 lg:grid-cols-[260px,1fr]">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={startCreate}
                className="pixel-tag px-2 py-1 text-[9px] hover:bg-white"
              >
                new post
              </button>
              <button
                type="button"
                onClick={resetAllPosts}
                className="pixel-tag px-2 py-1 text-[9px] hover:bg-white"
              >
                reset seed
              </button>
            </div>

            <div className="max-h-[360px] space-y-2 overflow-auto pr-1">
              {posts.map((post) => (
                <article key={post.id} className="rounded-pixel border-2 border-line bg-milk p-2">
                  <p className="line-clamp-1 text-sm font-semibold text-ink">{post.title}</p>
                  <p className="mt-1 text-xs text-mute">/{post.slug}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(post)}
                      className="pixel-tag px-2 py-1 text-[9px] hover:bg-white"
                    >
                      edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deletePost(post.id)}
                      className="pixel-tag px-2 py-1 text-[9px] hover:bg-white"
                    >
                      delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                value={draft.title}
                onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="Title"
                className="rounded-pixel border-2 border-line bg-milk px-3 py-2 text-sm outline-none"
              />
              <input
                value={draft.slug}
                onChange={(event) => setDraft((prev) => ({ ...prev, slug: event.target.value }))}
                placeholder="Slug (optional)"
                className="rounded-pixel border-2 border-line bg-milk px-3 py-2 text-sm outline-none"
              />
              <input
                value={draft.category}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, category: event.target.value }))
                }
                placeholder="Category"
                className="rounded-pixel border-2 border-line bg-milk px-3 py-2 text-sm outline-none"
              />
              <input
                value={draft.readTime}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, readTime: event.target.value }))
                }
                placeholder="Read time"
                className="rounded-pixel border-2 border-line bg-milk px-3 py-2 text-sm outline-none"
              />
            </div>

            <textarea
              value={draft.summary}
              onChange={(event) => setDraft((prev) => ({ ...prev, summary: event.target.value }))}
              placeholder="Summary"
              rows={3}
              className="w-full rounded-pixel border-2 border-line bg-milk px-3 py-2 text-sm outline-none"
            />

            <textarea
              value={draft.content}
              onChange={(event) => setDraft((prev) => ({ ...prev, content: event.target.value }))}
              placeholder="Post content (supports paragraph breaks with blank lines)"
              rows={10}
              className="w-full rounded-pixel border-2 border-line bg-milk px-3 py-2 text-sm leading-6 outline-none"
            />

            <button
              type="button"
              onClick={saveDraft}
              className="pixel-tag px-3 py-2 text-[9px] hover:bg-white"
            >
              {editingId ? "save changes" : "publish post"}
            </button>
          </div>
        </div>
      ) : null}

      {featuredPost ? <PostCard post={featuredPost} featured /> : null}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {restPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
