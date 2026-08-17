import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";

// Bricolage Grotesque carries the display voice; Geist handles body and UI.
// The opsz axis is requested so the headline gets true optical sizing at display
// size rather than a scaled-up text cut.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PostPublish - Publish once, reply everywhere",
  description:
    "PostPublish schedules your posts, answers comments and DMs in your voice, and shows you which ones actually convert.",
  applicationName: "PostPublish",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
