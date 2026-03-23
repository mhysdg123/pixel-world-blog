import Link from "next/link";
import { cn } from "@/lib/cn";

export type Post = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  category: string;
};

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article className={cn("pixel-panel pixel-link-hover rounded-pixel p-4 sm:p-5", featured ? "md:flex md:items-start md:gap-5" : "")}>
      <div className={cn(featured ? "md:flex-1" : "")}>
        <p className="font-pixel text-[9px] uppercase tracking-[0.14em] text-ember sm:text-[10px]">{post.category}</p>
        <h3 className="mt-3 font-pixel text-[12px] uppercase leading-relaxed tracking-[0.11em] text-ink sm:text-[14px]">
          <Link href={`/posts/${post.slug}`} className="hover:text-accent">{post.title}</Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-mute">{post.summary}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.08em] text-mute">{post.date} / {post.readTime}</p>
      </div>
      {featured ? (
        <div className="mt-4 border-2 border-line bg-paper p-3 md:mt-0 md:w-[180px]">
          <p className="font-pixel text-[9px] uppercase tracking-[0.14em] text-ink">Featured Read</p>
          <p className="mt-2 text-xs leading-5 text-mute">A long-form note with practical examples and build logs.</p>
        </div>
      ) : null}
    </article>
  );
}
