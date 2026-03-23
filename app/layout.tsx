import type { Metadata } from "next";
import { IBM_Plex_Sans, Press_Start_2P, ZCOOL_QingKe_HuangYou } from "next/font/google";
import type { ReactNode } from "react";
import { MarioBackdrop } from "@/components/MarioBackdrop";
import { MusicWidget } from "@/components/MusicWidget";
import "./globals.css";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const cn = ZCOOL_QingKe_HuangYou({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cn",
});

export const metadata: Metadata = {
  title: "BOBO WORLD | Retro Personal Blog",
  description:
    "An old-web inspired personal blog homepage for writing, thinking, and building.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${pixel.variable} ${body.variable} ${cn.variable} relative overflow-x-hidden bg-paper font-body text-ink antialiased`}
      >
        <MarioBackdrop />
        <div className="relative z-10">{children}</div>
        <MusicWidget />
      </body>
    </html>
  );
}
