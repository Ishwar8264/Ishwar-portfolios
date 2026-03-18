import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navigation";
import { navbarConfig } from "@/content/navigation";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ishwar Sahani | Frontend Engineer",
  description:
    "Modern portfolio of Ishwar Sahani, frontend engineer focused on performant and scalable UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar config={navbarConfig} />
        <div className="pt-20 md:pt-24">{children}</div>
      </body>
    </html>
  );
}
