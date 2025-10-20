import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
  title: "Nodestrich – A community for node runners using Nostr",
  description: "A community for node runners using Nostr. Users of all levels are welcome to join, open channels, share knowledge, and build the Nostr circular economy.",
  openGraph: {
    title: "Nodestrich – A community for node runners using Nostr",
    description: "A community for node runners using Nostr. Users of all levels are welcome to join, open channels, share knowledge, and build the Nostr circular economy.",
    images: ["/social_preview.jpg"],
    url: "https://nodestrich.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nodestrich – A community for node runners using Nostr",
    description: "A community for node runners using Nostr. Users of all levels are welcome to join, open channels, share knowledge, and build the Nostr circular economy.",
    images: ["/social_preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#282828] text-gray-300 min-h-screen flex flex-col`}
      >
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
