/**
 * @file AudienceTabs Component - High-contrast Farmer/Buyer role switcher & 10-segment buyer directory inside the #014F2F section using #FEFEFE white and #EBF4EC mint-sage cards.
 */

"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { GradeBadge } from "@/components/ui/GradeBadge";
import { HARVEST_LOTS } from "@/constants/lots";
import { BUYER_SEGMENTS } from "@/constants/segments";
import { formatRupiah } from "@/lib/format";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { BuyerSegmentId } from "@/types/landing";

type Audience = "petani" | "pembeli";

interface AudienceBenefit {
  readonly title: string;
  readonly description: string;
}

const TABS: Readonly<
  Record<
    Audience,
    {
      readonly label: string;
      readonly photo: string;
      readonly alt: string;
      readonly credit: string;
      readonly benefits: readonly AudienceBenefit[];
    }
  >
> = {
  petani: {
    label: "Untuk Petani & Kelompok Tani",
    photo: "/images/petani-kubis.webp",
    alt: "Petani merawat kebun kubis di lereng pegunungan Jawa",
    credit: "Foto: Doyanmoto / Wikimedia Commons, CC BY-SA 4.0",
    benefits: [
      {
        title: "Terhubung langsung ke konsumen Grade A, B, C, dan D",
        description:
          "Stok panen otomatis terlihat di peta oleh Restoran, Dapur MBG, Katering, UMKM olahan, Perorangan, Pengepul, hingga Peternak.",
      },
      {
        title: "Prediksi harga per grade & rekomendasi panen/tanam",
        description:
          "Ketahui proyeksi harga bersih per grade sebelum memanen serta jadwal tanam yang aman dari banjir pasokan.",
      },
      {
        title: "Taksiran mutu AI objektif dalam hitungan detik",
        description:
          "Cukup foto panen dari ponsel; AI SINTAS menentukan grade dan langsung menyalurkannya ke pembeli yang cocok.",
      },
    ],
  },
  pembeli: {
    label: "Untuk Konsumen (Resto, MBG, UMKM, Peternak)",
    photo: "/images/dapur-mbg.webp",
    alt: "Nampan sajian makan bergizi dengan sayur segar lokal",
    credit: "Foto: Fitrah_9131 / Wikimedia Commons, CC0",
    benefits: [
      {
        title: "Pilih stok sayur langsung dari tampilan berbasis peta",
        description:
          "Lihat titik kebun terdekat, kapasitas panen tersedia, grade AI (A–D), dan estimasi sisa jam kesegaran.",
      },
      {
        title: "Penyaluran tepat guna sesuai kebutuhan grade",
        description:
          "Restoran mendapat Grade A prima, Dapur MBG & Katering menyerap Grade A/B, UMKM mengolah Grade C, dan Peternak menyerap Grade D.",
      },
      {
        title: "Akses berlangganan untuk kepastian pasokan harian",
        description:
          "Langganan platform untuk akses peta stok real-time, filter grade otomatis, dan kecocokan rute logistik.",
      },
    ],
  },
};

export function AudienceTabs() {
  const [activeRole, setActiveRole] = useState<Audience>("petani");
  const [selectedSegmentId, setSelectedSegmentId] =
    useState<BuyerSegmentId>("dapur-mbg");

  const tab = TABS[activeRole];
  const activeSegment =
    BUYER_SEGMENTS.find((s) => s.id === selectedSegmentId) ?? BUYER_SEGMENTS[0];

  const matchingLots = useMemo(
    () =>
      HARVEST_LOTS.filter((lot) =>
        activeSegment.acceptedGrades.includes(lot.grade)
      ).slice(0, 3),
    [activeSegment]
  );

  return (
    <div className="mt-12 space-y-12">
      {/* Top Split: Role Switcher + Documentary Photograph */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <div
            role="tablist"
            aria-label="Pilih peran ekosistem"
            className="inline-flex flex-wrap rounded-xl border border-[#FEFEFE]/20 bg-[#072E1B] p-1"
          >
            {(Object.keys(TABS) as Audience[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={activeRole === key}
                onClick={() => setActiveRole(key)}
                className={cn(
                  "h-10 cursor-pointer rounded-lg px-4 text-xs sm:text-sm font-semibold transition-colors",
                  activeRole === key
                    ? "bg-[#65AF3E] text-[#FEFEFE]"
                    : "text-[#D6EBD9] hover:text-[#FEFEFE]"
                )}
              >
                {TABS[key].label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={activeRole}
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: duration.base, ease: ease.out }}
              className="mt-6 space-y-3.5"
            >
              {tab.benefits.map((b, idx) => (
                <li
                  key={b.title}
                  className="flex gap-4 rounded-2xl bg-[#072E1B]/70 border border-[#FEFEFE]/12 p-5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#65AF3E] font-mono text-xs font-bold text-[#FEFEFE]">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#FEFEFE]">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#D6EBD9]">
                      {b.description}
                    </p>
                  </div>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <figure className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#FEFEFE]/20 bg-[#072E1B] shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration.slow, ease: ease.out }}
                className="absolute inset-0"
              >
                <Image
                  src={tab.photo}
                  alt={tab.alt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 95vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <figcaption className="mt-2.5 flex items-center justify-between text-xs text-[#D6EBD9]">
            <span>{tab.credit}</span>
            <Link
              href="/login"
              className="inline-flex items-center gap-1 font-semibold text-[#8FD16A] hover:underline"
            >
              <span>Masuk Akun</span>
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </figcaption>
        </figure>
      </div>

      {/* Bottom: Crisp #FEFEFE White Card on #014F2F Forest Green for the 10-Segment Buyer Matrix */}
      <div className="rounded-3xl bg-[#FEFEFE] text-[#072E1B] p-6 sm:p-9 shadow-[0_28px_60px_-18px_rgba(7,46,27,0.45)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between pb-6 border-b border-[#C4DEC9]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#014F2F]">
              MATRIKS PENYALURAN OTOMATIS BY GRADE (A–D)
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-[#072E1B]">
              Pilih kategori konsumen untuk melihat stok di peta
            </h3>
          </div>
          <Link
            href="/peta"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#014F2F] hover:text-[#65AF3E]"
          >
            <span>Buka peta stok layar penuh</span>
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        {/* 10 Buyer Segment Buttons */}
        <div
          role="tablist"
          aria-label="Pilih segmen pembeli"
          className="mt-6 flex flex-wrap gap-2"
        >
          {BUYER_SEGMENTS.map((seg) => {
            const active = seg.id === selectedSegmentId;
            return (
              <button
                key={seg.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedSegmentId(seg.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                  active
                    ? "border-[#014F2F] bg-[#014F2F] text-[#FEFEFE] shadow-xs"
                    : "border-[#C4DEC9] bg-[#EBF4EC] text-[#072E1B] hover:border-[#014F2F]"
                )}
              >
                <span>{seg.shortLabel}</span>
                <span
                  className={cn(
                    "font-mono text-[11px]",
                    active ? "text-[#8FD16A]" : "text-[#355242]"
                  )}
                >
                  [{seg.acceptedGrades.join("/")}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Buyer Segment + 3 Matching Lots */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center pt-6 border-t border-[#C4DEC9]">
          <div className="lg:col-span-4 space-y-2">
            <div className="inline-block rounded-md bg-[#EBF4EC] border border-[#C4DEC9] px-2.5 py-1 font-mono text-xs font-bold text-[#014F2F]">
              Grade {activeSegment.acceptedGrades.join(" & ")} ·{" "}
              {activeSegment.volumeNote}
            </div>
            <h4 className="font-display text-xl font-bold text-[#072E1B]">
              {activeSegment.label}
            </h4>
            <p className="text-sm text-[#355242] leading-relaxed">
              {activeSegment.typicalUse}
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {matchingLots.map((lot) => (
              <Link
                key={lot.id}
                href="/peta"
                className="group flex flex-col justify-between rounded-2xl border border-[#C4DEC9] bg-[#EBF4EC] p-4 transition-all hover:border-[#014F2F] hover:bg-[#DCECE0]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-semibold text-[#355242]">
                    {lot.code}
                  </span>
                  <GradeBadge grade={lot.grade} size="sm" />
                </div>

                <div className="mt-3">
                  <div className="font-display text-base font-bold text-[#072E1B] group-hover:text-[#014F2F]">
                    {lot.commodityLabel}
                  </div>
                  <div className="mt-0.5 font-mono text-xs text-[#014F2F] font-bold">
                    {formatRupiah(lot.pricePerKg)}/kg · {lot.weightKg} kg
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#C4DEC9] flex items-center justify-between text-[11px] text-[#355242]">
                  <span className="inline-flex items-center gap-1 truncate">
                    <MapPin aria-hidden="true" className="size-3 text-[#014F2F]" />
                    <span className="truncate">{lot.regency.split(",")[0]}</span>
                  </span>
                  <span className="font-mono font-semibold">Sisa {lot.remainingHours}j</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
