import Link from "next/link";

const socials = [
  { label: "GitHub", href: "#" },
  { label: "X", href: "#" },
  { label: "Email", href: "mailto:hello@pixelworld.dev" },
];

export function Footer() {
  return (
    <footer className="pixel-panel mt-8 rounded-pixel px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-3 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>漏 {new Date().getFullYear()} PIXEL WORLD. Built one post at a time.</p>
        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <Link key={social.label} href={social.href} className="hover:text-ink">{social.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
