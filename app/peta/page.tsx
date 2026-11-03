/**
 * @file Peta Page - Dedicated full-page harvest stock map with floating navbar.
 */

import type { Metadata } from "next";
import { NavbarPill } from "@/components/common/NavbarPill";
import { StockMapExplorer } from "@/components/sections/StockMapExplorer";

export const metadata: Metadata = {
  title: "Peta Stok Panen | SINTAS",
  description: "Peta stok sayur Pulau Jawa dengan grade AI, sisa jam segar, dan rincian harga. Data simulasi.",
};

export default function PetaPage() {
  return (
    <>
      <NavbarPill />
      <main id="konten-utama">
        <StockMapExplorer />
      </main>
    </>
  );
}
