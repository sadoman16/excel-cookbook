import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/ui/Sidebar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Excel Cookbook — Fix Excel Errors Fast ✓",
  description:
    "Step-by-step recipes for Excel formulas. Fix VLOOKUP, IF, XLOOKUP errors in minutes. Like a cookbook for spreadsheets.",
  openGraph: {
    title: "Excel Cookbook — Fix Excel Errors Fast ✓",
    description:
      "Step-by-step recipes for Excel formulas. Fix VLOOKUP, IF, XLOOKUP errors in minutes.",
    url: "https://excel-cookbook.com",
    siteName: "Excel Cookbook",
    type: "website",
    locale: "en_US",
  },
  verification: {
    google: 'dafbbd66d50260f2',
  },
  twitter: {
    card: "summary",
    title: "Excel Cookbook — Fix Excel Errors Fast ✓",
    description:
      "Step-by-step recipes for Excel formulas. Fix VLOOKUP, IF, XLOOKUP errors in minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://excel-cookbook.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://excel-cookbook.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Excel Cookbook",
              url: "https://excel-cookbook.com",
              description:
                "Stop Googling Excel formulas. Search by problem, copy the solution.",
              inLanguage: "en",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        {/* Skip Navigation — Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-excel-green"
        >
          Skip to main content
        </a>

        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">
            <div className="container mx-auto flex h-full max-w-7xl items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
              {/* Sidebar (Left) */}
              <Sidebar />

              {/* Main Content (Center) */}
              <main id="main-content" className="flex w-full flex-col overflow-hidden p-6">
                {children}
              </main>
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
