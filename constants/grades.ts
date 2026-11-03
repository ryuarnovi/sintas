/**
 * @file Canonical Grade Metadata - Single source of truth for Grade A-D definitions using #65AF3E, #014F2F, and warm earth tones.
 */

import type { Grade, GradeMeta } from "@/types/landing";

export const GRADE_ORDER: readonly Grade[] = ["A", "B", "C", "D"] as const;

export const GRADES: Readonly<Record<Grade, GradeMeta>> = {
  A: {
    grade: "A",
    label: "Segar Prima",
    shortCondition: "Utuh, baru petik, warna & turgor optimal",
    detailDescription:
      "Mutu tertinggi dari panen pagi. Permukaan mulus, kelembapan terjaga, dan siap memenuhi standar dapur MBG, restoran, serta ritel segar.",
    destinations: ["Dapur MBG", "Restoran & Kafe", "Ritel Segar", "Katering"],
    segmentIds: ["dapur-mbg", "restoran", "ritel", "katering"],
    badgeClass: "bg-[#65AF3E] text-[#FEFEFE]",
    textLightClass: "text-[#65AF3E]",
    textDarkClass: "text-[#7BC056]",
    borderClass: "border-[#65AF3E]",
    hexColor: "#65AF3E",
    priceMultiplier: 1.0,
    narrative: "Disalurkan langsung ke Dapur MBG, restoran, dan ritel segar dengan harga terbaik.",
  },
  B: {
    grade: "B",
    label: "Layak Masak",
    shortCondition: "Segar layak olah, ukuran tak seragam / lewat jam puncak",
    detailDescription:
      "Masih segar dan aman diolah menjadi masakan matang, tumisan, sambal, atau bahan katering, dengan harga lebih hemat bagi warung dan UMKM.",
    destinations: ["Warung & UMKM", "Katering", "Perorangan", "Pengolah Pangan", "Pengepul"],
    segmentIds: ["umkm", "katering", "perorangan", "pengolah", "pengepul"],
    badgeClass: "bg-[#014F2F] text-[#FEFEFE]",
    textLightClass: "text-[#014F2F]",
    textDarkClass: "text-[#A3D487]",
    borderClass: "border-[#014F2F]",
    hexColor: "#014F2F",
    priceMultiplier: 0.74,
    narrative: "Dialihkan otomatis ke warung makan, katering, dan pabrik olahan saus/bumbu.",
  },
  C: {
    grade: "C",
    label: "Pakan & Maggot",
    shortCondition: "Memar berat / lewat umur simpan dapur manusia",
    detailDescription:
      "Tidak lagi memenuhi standar konsumsi manusia, namun kaya nutrisi organik untuk pakan ternak unggas, ruminansia, dan budidaya maggot BSF.",
    destinations: ["Peternak", "Budidaya Maggot BSF", "Pengepul Pakan"],
    segmentIds: ["peternak", "pengepul"],
    badgeClass: "bg-[#D48C2A] text-[#FEFEFE]",
    textLightClass: "text-[#B87314]",
    textDarkClass: "text-[#EAB354]",
    borderClass: "border-[#D48C2A]",
    hexColor: "#D48C2A",
    priceMultiplier: 0.36,
    narrative: "Diserap peternak lokal dan unit biokonversi maggot sebelum sempat membusuk.",
  },
  D: {
    grade: "D",
    label: "Kompos Organik",
    shortCondition: "Rusak lanjut, siap olah kembali ke tanah",
    detailDescription:
      "Jaringan sayur sudah terurai atau berfermentasi. Dialihkan ke unit kompos dan pupuk organik cair agar kembali menyuburkan lahan petani.",
    destinations: ["Unit Kompos", "Pupuk Organik Cair"],
    segmentIds: ["kompos"],
    badgeClass: "bg-[#8C5A3C] text-[#FEFEFE]",
    textLightClass: "text-[#8C5A3C]",
    textDarkClass: "text-[#D4A383]",
    borderClass: "border-[#8C5A3C]",
    hexColor: "#8C5A3C",
    priceMultiplier: 0.16,
    narrative: "Menutup siklus tanpa sisa: diolah menjadi kompos dan pupuk cair organik.",
  },
} as const;
