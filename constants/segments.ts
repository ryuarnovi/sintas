/**
 * @file Buyer Segments Catalog - Definitions for all buyer tiers from Dapur MBG to Compost processors.
 */

import type { BuyerSegment, BuyerSegmentId } from "@/types/landing";

export const BUYER_SEGMENTS: readonly BuyerSegment[] = [
  {
    id: "dapur-mbg",
    label: "Dapur MBG (SPPG)",
    shortLabel: "Dapur MBG",
    icon: "CookingPot",
    acceptedGrades: ["A"],
    volumeNote: "Wajib ≥15 pemasok terverifikasi",
    typicalUse: "Menu harian siswa & penerima manfaat dengan bukti mutu terlampir.",
  },
  {
    id: "restoran",
    label: "Restoran & Kafe",
    shortLabel: "Restoran",
    icon: "ChefHat",
    acceptedGrades: ["A", "B"],
    volumeNote: "20–150 kg per pengiriman",
    typicalUse: "Lalapan segar, salad, dan sajian utama dengan standar visual tinggi.",
  },
  {
    id: "katering",
    label: "Katering & Dapur Industri",
    shortLabel: "Katering",
    icon: "UtensilsCrossed",
    acceptedGrades: ["A", "B"],
    volumeNote: "50–400 kg per siklus menu",
    typicalUse: "Olahan sayur matang dalam jumlah besar dengan kepastian harga.",
  },
  {
    id: "ritel",
    label: "Ritel & Pasar Segar",
    shortLabel: "Ritel",
    icon: "Store",
    acceptedGrades: ["A"],
    volumeNote: "Lot seragam berumur simpan panjang",
    typicalUse: "Etalase sayur segar dengan sisa masa simpan >30 jam.",
  },
  {
    id: "umkm",
    label: "Warung & UMKM Kuliner",
    shortLabel: "Warung & UMKM",
    icon: "Store",
    acceptedGrades: ["B"],
    volumeNote: "Lot fleksibel 10–60 kg",
    typicalUse: "Sayur layak masak dengan penghematan biaya bahan baku hingga 26%.",
  },
  {
    id: "perorangan",
    label: "Konsumen Perorangan & Komunitas",
    shortLabel: "Perorangan",
    icon: "User",
    acceptedGrades: ["A", "B"],
    volumeNote: "Belanja kolektif warga sekitar",
    typicalUse: "Kebutuhan dapur rumah tangga langsung dari petani terdekat di peta.",
  },
  {
    id: "pengolah",
    label: "Pengolah Pangan (Saus, Kering, Beku)",
    shortLabel: "Pengolah",
    icon: "Warehouse",
    acceptedGrades: ["B"],
    volumeNote: "100–800 kg untuk pasta & olahan",
    typicalUse: "Saus tomat, cabai giling, sayur kering, dan bumbu kemasan.",
  },
  {
    id: "pengepul",
    label: "Pengepul & Distribusi Regional",
    shortLabel: "Pengepul",
    icon: "Warehouse",
    acceptedGrades: ["B", "C"],
    volumeNote: "Penyerapan cepat kelebihan panen",
    typicalUse: "Agregasi stok lintas kabupaten dengan harga transparan.",
  },
  {
    id: "peternak",
    label: "Peternak & Budidaya Maggot",
    shortLabel: "Peternak & Maggot",
    icon: "Bug",
    acceptedGrades: ["C"],
    volumeNote: "Serapan biomassa harian murah",
    typicalUse: "Pakan hijauan ternak dan substrat biokonversi larva BSF.",
  },
  {
    id: "kompos",
    label: "Unit Kompos & Pupuk Cair",
    shortLabel: "Kompos & Pupuk",
    icon: "Recycle",
    acceptedGrades: ["D"],
    volumeNote: "Penutup siklus tanpa sisa",
    typicalUse: "Fermentasi pupuk organik cair dan kompos kembali ke kelompok tani.",
  },
] as const;

export const BUYER_SEGMENT_MAP: Readonly<Record<BuyerSegmentId, BuyerSegment>> =
  BUYER_SEGMENTS.reduce<Record<BuyerSegmentId, BuyerSegment>>(
    (acc, seg) => {
      acc[seg.id] = seg;
      return acc;
    },
    {} as Record<BuyerSegmentId, BuyerSegment>
  );
