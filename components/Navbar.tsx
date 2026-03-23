import Link from "next/link";
import { Button } from "@/components/ui/Button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Photography", href: "/photography" },
  { label: "Tool", href: "/tool" },
  { label: "Music", href: "/music" },
];

export function Navbar() {
  return (
    <header className="pixel-panel mt-6 rounded-pixel px-4 py-4 sm:px-5">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="font-pixel text-[11px] uppercase tracking-[0.16em] text-ink sm:text-xs"
        >
          BOBO WORLD
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-mute transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button size="sm" href="mailto:hello@bobo.world" className="shrink-0">
          Contact
        </Button>
      </div>
      <nav className="mt-4 flex flex-wrap gap-2 md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="pixel-tag px-2.5 py-1 text-[9px] tracking-[0.12em]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}