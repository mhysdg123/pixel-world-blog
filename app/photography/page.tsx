import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function PhotographyPage() {
  return (
    <main className="paper-container pb-10">
      <Navbar />

      <section className="pixel-panel mt-6 rounded-pixel p-5 sm:p-7">
        <SectionTitle
          title="Photography"
          subtitle="A quiet wall for shots, textures, and moments from daily life."
        />

        <div className="rounded-pixel border-2 border-line bg-paper p-6 text-sm leading-7 text-mute">
          Gallery module coming next: grid albums, EXIF details, and monthly photo notes.
        </div>
      </section>

      <Footer />
    </main>
  );
}