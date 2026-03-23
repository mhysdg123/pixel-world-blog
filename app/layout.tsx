import type { Metadata } from "next";
import { IBM_Plex_Sans, Press_Start_2P } from "next/font/google";
import type { ReactNode } from "react";
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

export const metadata: Metadata = {
  title: "PIXEL WORLD | Retro Personal Blog",
  description:
    "An old-web inspired personal blog homepage for writing, thinking, and building.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${pixel.variable} ${body.variable} bg-paper text-ink font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
