import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Method - Master the message",
  description: "GPT-powered dating co-pilot for college-aged men. Master texting, escalation, and reading social cues with clarity and self-awareness.",
  keywords: ["dating", "texting", "communication", "social skills", "dating coach"],
  openGraph: {
    title: "Method - Master the message",
    description: "GPT-powered dating co-pilot for college-aged men. Master texting, escalation, and reading social cues with clarity and self-awareness.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{backgroundColor: '#121212'}}>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logos/favicons/16white.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logos/favicons/32white.png" />
      </head>
      <body className="antialiased" style={{backgroundColor: '#121212'}}>{children}</body>
    </html>
  );
}