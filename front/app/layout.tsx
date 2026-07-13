import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { NotificationCenter } from "@/components/NotificationCenter";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Capital Ledger — Fund Console",
  description: "Track capital deployed and available across the fund.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} font-sans antialiased`}
      >
        <header className="border-b border-line bg-panel">
          <div className="mx-auto flex max-w-5xl items-baseline justify-between px-6 py-5">
            <a href="/" className="group">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl italic tracking-tight text-ink">
                  Capital Ledger
                </span>
              </div>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-muted">
                Fund Console — Book I
              </p>
            </a>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              No. {new Date().getFullYear()}
            </span>
          </div>
        </header>
        <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
          {children}
        </main>
        <footer className="border-t border-line px-6 py-6 text-center text-[11px] uppercase tracking-[0.18em] text-muted">
          Entries recorded in USD · For internal fund tracking use
        </footer>
        <NotificationCenter />
      </body>
    </html>
  );
}
