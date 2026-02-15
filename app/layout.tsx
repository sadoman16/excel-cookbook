import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/ui/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Excel Cookbook - Copy-Paste Solutions for Spreadsheets",
  description: "Stop Googling Excel formulas. Search by problem, copy the solution. From VLOOKUP errors to advanced functions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Excel Cookbook",
              url: "https://sadoman16.github.io/excel-cookbook",
              description: "Stop Googling Excel formulas. Search by problem, copy the solution.",
              inLanguage: "en",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">
            <div className="container mx-auto flex h-full max-w-7xl items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr_240px]">
              {/* Sidebar (Left) */}
              <Sidebar />

              {/* Main Content (Center) */}
              <main className="flex w-full flex-col overflow-hidden p-6">
                {children}
              </main>

              {/* Ads/TOC (Right) - Hidden on smaller screens */}
              <aside className="hidden w-full flex-col border-l border-slate-200 bg-white p-6 dark:border-excel-dark dark:bg-slate-900 lg:flex">
                <div className="rounded-md bg-slate-100 p-4 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <p>AdSpace (300x250)</p>
                  <p className="mt-2 text-xs">Phase 4: Monetization</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
