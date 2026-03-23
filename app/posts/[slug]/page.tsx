import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="paper-container py-8">
      <article className="pixel-panel rounded-pixel p-5 sm:p-7">
        <p className="font-pixel text-[10px] uppercase tracking-[0.15em] text-ember">{post.category}</p>
        <h1 className="mt-4 font-pixel text-[16px] uppercase leading-relaxed tracking-[0.12em] sm:text-[20px]">{post.title}</h1>
        <p className="mt-3 text-sm text-mute">{post.date} / {post.readTime}</p>
        <div className="mt-6 space-y-4 text-[15px] leading-7 text-mute">
          <p>{post.summary}</p>
          <p>This is a starter post page in the same retro visual language. You can replace this with MDX or CMS content.</p>
        </div>
        <Link href="/" className="mt-8 inline-flex rounded-pixel border-2 border-line bg-paper px-4 py-2 font-pixel text-[10px] uppercase tracking-[0.12em] hover:-translate-y-[2px] hover:shadow-pixel">
          Back Home
        </Link>
      </article>
    </main>
  );
}
