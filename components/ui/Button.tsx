import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantMap: Record<ButtonVariant, string> = {
  primary: "border-line bg-accent text-milk hover:bg-[#264fa3] active:translate-y-[1px]",
  secondary: "border-line bg-paper text-ink hover:bg-white active:translate-y-[1px]",
  ghost: "border-line bg-transparent text-ink hover:bg-paper/70 active:translate-y-[1px]",
};

const sizeMap: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-[10px]",
  md: "px-4 py-3 text-[11px]",
};

const baseStyle = "inline-flex items-center justify-center rounded-pixel border-2 font-pixel uppercase tracking-[0.12em] transition-all duration-150 hover:-translate-y-[2px] hover:shadow-pixel";

export function Button({ children, href, variant = "primary", size = "md", className, ...props }: ButtonProps) {
  const classNames = cn(baseStyle, variantMap[variant], sizeMap[size], className);

  if (href) {
    return (
      <Link href={href} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
