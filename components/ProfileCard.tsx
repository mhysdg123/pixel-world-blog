import Image from "next/image";

type Profile = {
  name: string;
  bio: string;
  intro: string;
  tags: string[];
};

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <aside id="about" className="pixel-panel h-fit rounded-pixel p-4 sm:p-5">
      <div className="relative overflow-hidden rounded-pixel border-2 border-line bg-paper">
        <Image
          src="/avatar-user.jpg"
          alt="Profile avatar"
          width={500}
          height={500}
          className="h-auto w-full object-cover"
          priority
        />
      </div>
      <h3 className="mt-4 font-pixel text-[12px] uppercase tracking-[0.15em] text-ink sm:text-[13px]">
        {profile.name}
      </h3>
      <p className="mt-2 text-sm text-mute">{profile.intro}</p>
      <p className="mt-3 text-sm leading-6 text-mute">{profile.bio}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {profile.tags.map((tag) => (
          <span key={tag} className="pixel-tag text-[9px] tracking-[0.12em]">
            {tag}
          </span>
        ))}
      </div>
    </aside>
  );
}