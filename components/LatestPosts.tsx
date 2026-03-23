import { PostCard, type Post } from "@/components/PostCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function LatestPosts({ posts }: { posts: Post[] }) {
  const [featuredPost, ...restPosts] = posts;

  return (
    <section id="posts" className="pixel-panel rounded-pixel p-4 sm:p-5">
      <SectionTitle title="Latest Posts" subtitle="Fresh notes from shipping, learning, and making things on the internet." />
      {featuredPost ? <PostCard post={featuredPost} featured /> : null}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {restPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
