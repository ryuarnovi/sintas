/**
 * @file Root Layout - Configures Bricolage Grotesque, Geist, and Geist Mono fonts, global Navbar & Footer, smooth scroll provider, and SINTAS tokens.
 */

import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/common/Footer";
import { LenisProvider } from "@/components/common/LenisProvider";
import { NavbarPill } from "@/components/common/NavbarPill";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { ToasterProvider } from "@/components/feedback/ToasterProvider";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sintas.nirsisa.id"),
  title: "SINTAS — Panen Selamat, Tanpa Sisa | Platform Peta & AI Penyaluran Sayur",
  description:
    "SINTAS (Sistem Informasi Niaga, Taksir, Alokasi Sayur) adalah webapp berbasis AI dari Nirsisa yang mempertemukan petani sayur dengan dapur MBG, restoran, katering, UMKM, hingga peternak lewat peta stok real-time dan penyaluran berjenjang Grade A–D.",
  keywords: [
    "SINTAS",
    "Nirsisa",
    "Panen Selamat",
    "Agritech Indonesia",
    "AI Pertanian",
    "Dapur MBG",
    "SPPG",
    "Food Waste Indonesia",
    "Peta Panen Sayur",
  ],
  openGraph: {
    title: "SINTAS — Panen Selamat, Tanpa Sisa",
    description:
      "Platform web + AI yang menilai mutu panen sayur (Grade A–D), menampilkan stok di peta, dan menyalurkan sisa ke warung, pakan, hingga kompos.",
    locale: "id_ID",
    type: "website",
    siteName: "SINTAS by Nirsisa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${bricolage.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FEFEFE] text-[#072E1B]">
        <LenisProvider>
          <NavbarPill />
          <ScrollProgress />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          <ToasterProvider />
        </LenisProvider>
      </body>
    </html>
  );
}
