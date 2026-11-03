/**
 * @file Verified Citations & Claims - All statistical sources required by DESIGN.md §12.
 */

import type { CitationSource } from "@/types/landing";

export const CITATION_SOURCES: Readonly<Record<string, CitationSource>> = {
  seladaMagetan: {
    id: "seladaMagetan",
    claim: "Selada turun dari Rp35.000 ke Rp2.000/kg di Pasar Plaosan, Magetan saat panen raya",
    publisher: "Beritajatim",
    dateLabel: "25 Des 2025",
  },
  buncisBengkulu: {
    id: "buncisBengkulu",
    claim: "Buncis turun dari Rp6.000 menjadi Rp500/kg dan tomat Rp500/kg di tingkat petani",
    publisher: "Antara Bengkulu",
    dateLabel: "11 Apr 2025",
  },
  bappenasWaste: {
    id: "bappenasWaste",
    claim: "23–48 juta ton pangan hilang & terbuang per tahun; kerugian ekonomi Rp213–551 triliun (4–5% PDB)",
    publisher: "Bappenas",
    dateLabel: "Kajian FLW",
    note: "Angka Bappenas mencakup seluruh jenis pangan nasional.",
  },
  bgnSuppliers: {
    id: "bgnSuppliers",
    claim: "Setiap dapur MBG (SPPG) wajib melibatkan minimal 15 pemasok lokal",
    publisher: "Badan Gizi Nasional (BGN)",
    dateLabel: "25 Feb 2026",
  },
  tirtoSoloRaya: {
    id: "tirtoSoloRaya",
    claim: "Sekitar 80 dapur MBG di Solo Raya baru melibatkan 1–5 pemasok",
    publisher: "Tirto",
    dateLabel: "8 Mar 2026",
  },
  bgnDapurOperasi: {
    id: "bgnDapurOperasi",
    claim: "27.486 dapur MBG (SPPG) telah beroperasi melayani 57 juta penerima",
    publisher: "BGN",
    dateLabel: "30 Sep 2026",
  },
  kenResearchMarket: {
    id: "kenResearchMarket",
    claim: "Pasar Agritech Indonesia mencapai USD 1,15 miliar (2025) dengan pertumbuhan 18,7% CAGR (2026–2031)",
    publisher: "Ken Research",
    dateLabel: "2025",
  },
} as const;
