import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jarlnelson.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jarl Nelson",
    template: "%s",
  },
  description:
    "Jarl Nelson. I build investment-management technology. Most recently, INDATA Nexus — a production AI agent for buy-side firms, built solo with Claude Code. Three decades in the industry.",
  applicationName: "Jarl Nelson",
  authors: [{ name: "Jarl Nelson" }],
  creator: "Jarl Nelson",
  openGraph: {
    title: "Jarl Nelson",
    description:
      "Investment-management technology. Three decades. Most recently: INDATA Nexus, a production AI agent built solo with Claude Code.",
    url: SITE_URL,
    siteName: "Jarl Nelson",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jarl Nelson",
    description:
      "Investment-management technology. Three decades. Most recently: INDATA Nexus, a production AI agent built solo with Claude Code.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
