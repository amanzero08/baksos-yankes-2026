import type { Metadata, Viewport } from "next";
import NextTopLoader from 'nextjs-toploader';
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yankes.amanzero.space'),
  title: "Bakti Sosial Lintas Sinodal 2026",
  description: "Aplikasi Donasi dan Informasi Bakti Sosial Yayasan Kesehatan GPIB & GMIM",
  openGraph: {
    title: "Bakti Sosial Lintas Sinodal 2026",
    description: "Aplikasi Donasi dan Informasi Bakti Sosial Yayasan Kesehatan GPIB & GMIM",
    url: 'https://yankes.amanzero.space',
    siteName: 'Baksos Lintas Sinodal 2026',
    locale: 'id_ID',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${playfair.variable} h-full antialiased scroll-smooth dark`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextTopLoader color="#f59e0b" showSpinner={false} />
        <Navbar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
