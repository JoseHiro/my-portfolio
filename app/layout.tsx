import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "My Portfolio | Design & Development",
    template: "%s | My Portfolio",
  },
  description:
    "A modern portfolio built with Next.js, TypeScript, and Tailwind CSS. Building digital experiences, websites, AI-powered products, and custom features.",
  keywords: ["portfolio", "developer", "next.js", "typescript", "web development", "AI products"],
  authors: [{ name: "Portfolio Author", url: SITE_URL }],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ja_JP",
    siteName: "My Portfolio",
    title: "My Portfolio | Design & Development",
    description: "Building digital experiences with modern web and AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Portfolio | Design & Development",
    description: "Building digital experiences with modern web and AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
