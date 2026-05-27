import type { Metadata } from "next";
import { Barlow_Condensed, Figtree } from "next/font/google";
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastViewport } from "@/components/ui/ToastViewport";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RepFlow",
  description: "RepFlow application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${figtree.variable}`}>
      <body className="min-h-screen antialiased"><ThemeProvider>{children}<ToastViewport /></ThemeProvider></body>
    </html>
  );
}
