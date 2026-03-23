import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { IdentityStrip } from "@/components/IdentityStrip";
import { LatestPosts } from "@/components/LatestPosts";
import { Navbar } from "@/components/Navbar";
import { ProfileCard } from "@/components/ProfileCard";
import { posts } from "@/data/posts";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <main className="paper-container pb-10">
      <Navbar />
      <Hero />
      <IdentityStrip items={profile.keywords} />
      <section className="mt-8 grid gap-6 lg:grid-cols-[300px,1fr]">
        <ProfileCard profile={profile} />
        <LatestPosts posts={posts} />
      </section>
      <Footer />
    </main>
  );
}
