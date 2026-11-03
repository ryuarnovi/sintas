/**
 * @file PriceCrashChart Component - Minimalist editorial price collapse trajectory in #FEFEFE and #014F2F paired with documentary market photography.
 */

"use client";

import NumberFlow from "@number-flow/react";
import { RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { duration, ease } from "@/lib/motion";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

interface CrashCaseStudy {
  readonly id: string;
  readonly commodity: string;
  readonly location: string;
  readonly dateLabel: string;
  readonly publisher: string;
  readonly normalPrice: number;
  readonly crashPrice: number;
  readonly floorCost: number;
  readonly dropPercent: string;
  readonly contextNote: string;
  readonly curvePath: string;
  readonly areaPath: string;
}

const CRASH_CASES: readonly CrashCaseStudy[] = [
  {
    id: "magetan",
    commodity: "Selada Keriting",
    location: "Pasar Plaosan, Magetan",
    dateLabel: "25 Des 2025",
    publisher: "Beritajatim",
    normalPrice: 35000,
    crashPrice: 2000,
    floorCost: 5400,
    dropPercent: "−94%",
    contextNote:
      "Pasokan panen raya melimpah serempak sementara serapan pasar lokal stagnan; harga jatuh jauh di bawah ongkos petik dan kemas.",
    curvePath: "M 16 24 C 120 24, 190 28, 260 36 C 330 44, 380 126, 460 136 L 620 138",
    areaPath:
      "M 16 24 C 120 24, 190 28, 260 36 C 330 44, 380 126, 460 136 L 620 138 L 620 156 L 16 156 Z",
  },
  {
    id: "bengkulu",
    commodity: "Buncis & Tomat Segar",
    location: "Tingkat Petani, Bengkulu",
    dateLabel: "11 Apr 2025",
    publisher: "Antara Bengkulu",
    normalPrice: 6000,
    crashPrice: 500,
    floorCost: 2800,
    dropPercent: "−92%",
    contextNote:
      "Harga buncis dan tomat terjun ke Rp500/kg hingga gubernur meminta ASN membeli sayur petani yang tidak terserap tengkulak.",
    curvePath: "M 16 32 C 140 32, 210 42, 290 60 C 350 78, 410 132, 490 140 L 620 142",
    areaPath:
      "M 16 32 C 140 32, 210 42, 290 60 C 350 78, 410 132, 490 140 L 620 142 L 620 156 L 16 156 Z",
  },
  {
    id: "batu",
    commodity: "Selada Dataran Tinggi",
    location: "Bumiaji, Kota Batu",
    dateLabel: "23 Jan 2026",
    publisher: "JatimTIMES",
    normalPrice: 18000,
    crashPrice: 1500,
    floorCost: 4800,
    dropPercent: "−91%",
    contextNote:
      "Tanpa akses langsung ke katering dan dapur institusi lintas kota, petani hanya bergantung pada 1–2 pengepul lokal.",
    curvePath: "M 16 28 C 110 30, 180 35, 250 52 C 320 75, 390 128, 470 136 L 620 139",
    areaPath:
      "M 16 28 C 110 30, 180 35, 250 52 C 320 75, 390 128, 470 136 L 620 139 L 620 156 L 16 156 Z",
  },
] as const;

export function PriceCrashChart() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [crashed, setCrashed] = useState(true);

  const handleReplay = () => {
    setCrashed(false);
    window.setTimeout(() => {
      setCrashed(true);
    }, 450);
  };

  const activeCase = CRASH_CASES[selectedCaseIndex] ?? CRASH_CASES[0];
  const displayedPrice = crashed ? activeCase.crashPrice : activeCase.normalPrice;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
      {/* Left Interactive Data Trajectory (7 cols) */}
      <div className="lg:col-span-7 rounded-3xl border border-[#C4DEC9] bg-[#EBF4EC] p-6 sm:p-9 flex flex-col justify-between gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#014F2F]/10">
          <div
            role="tablist"
            aria-label="Pilih studi kasus kejatuhan harga panen"
            className="flex flex-wrap items-center gap-1.5"
          >
            {CRASH_CASES.map((item, idx) => {
              const isSelected = idx === selectedCaseIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedCaseIndex(idx);
                    setCrashed(true);
                  }}
                  className={cn(
                    "h-9 rounded-full px-4 text-xs font-semibold transition-all cursor-pointer",
                    isSelected
                      ? "bg-[#014F2F] text-[#FEFEFE]"
                      : "bg-[#F6F9F7] text-[#4A6155] hover:text-[#012A19]"
                  )}
                >
                  {item.location.split(",")[1]?.trim() ?? item.location} ({item.dropPercent})
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#014F2F]/15 bg-[#FEFEFE] px-3.5 text-xs font-medium text-[#012A19] transition-colors hover:bg-[#F6F9F7] cursor-pointer"
          >
            <RotateCcw aria-hidden="true" className="size-3.5 text-[#014F2F]" />
            <span>Ulangi Animasi</span>
          </button>
        </div>

        {/* Commodity Title + Live Price Readout */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#4A6155]">
              Studi Kasus Lapangan · {activeCase.location}
            </p>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#012A19]">
              {activeCase.commodity}
            </h3>
            <p className="mt-1.5 text-sm text-[#4A6155] max-w-md leading-relaxed">
              {activeCase.contextNote}
            </p>
          </div>

          <div
            aria-live="polite"
            className="shrink-0 rounded-2xl border border-[#014F2F]/12 bg-[#F6F9F7] px-5 py-3.5 text-left sm:text-right"
          >
            <div className="flex sm:justify-end items-center gap-2 font-mono text-xs text-[#4A6155]">
              <span className="line-through">
                {formatRupiah(activeCase.normalPrice)}/kg
              </span>
              <span className="rounded-full bg-[#014F2F] px-2 py-0.5 text-[10px] font-semibold text-[#FEFEFE]">
                {activeCase.dropPercent}
              </span>
            </div>
            <div className="mt-1 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#012A19] tabular-nums">
              Rp
              <NumberFlow
                value={displayedPrice}
                format={{ useGrouping: true }}
              />
              <span className="text-sm font-mono font-normal text-[#4A6155]">/kg</span>
            </div>
          </div>
        </div>

        {/* Minimalist Architectural SVG Curve */}
        <div className="relative overflow-hidden rounded-2xl border border-[#014F2F]/10 bg-[#F6F9F7] p-4 sm:p-5">
          <svg
            viewBox="0 0 640 164"
            className="h-40 sm:h-44 w-full overflow-visible"
            role="img"
            aria-label={`Grafik kejatuhan harga ${activeCase.commodity} dari ${formatRupiah(activeCase.normalPrice)} menjadi ${formatRupiah(activeCase.crashPrice)} per kilogram`}
          >
            <defs>
              <linearGradient id="agritechCrashFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#014F2F" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#014F2F" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {[32, 76, 120].map((y) => (
              <line
                key={y}
                x1="16"
                y1={y}
                x2="624"
                y2={y}
                stroke="#014F2F"
                strokeOpacity="0.08"
                strokeDasharray="3 3"
              />
            ))}

            {/* Farmer Floor Cost Threshold */}
            <line
              x1="16"
              y1="96"
              x2="624"
              y2="96"
              stroke="#014F2F"
              strokeOpacity="0.45"
              strokeWidth="1.25"
              strokeDasharray="6 4"
            />
            <text
              x="24"
              y="88"
              className="font-mono text-[10px] font-semibold fill-[#014F2F]"
            >
              Batas bawah biaya pokok petani ({formatRupiah(activeCase.floorCost)}/kg)
            </text>

            <motion.path
              key={`area-${activeCase.id}`}
              d={activeCase.areaPath}
              fill="url(#agritechCrashFill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: crashed ? 1 : 0.15 }}
              transition={{ duration: duration.slow, ease: ease.out }}
            />

            <motion.path
              key={`curve-${activeCase.id}`}
              d={activeCase.curvePath}
              fill="none"
              stroke="#014F2F"
              strokeWidth="3"
              strokeLinecap="round"
              initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0.22 }}
              animate={{ pathLength: crashed ? 1 : 0.28 }}
              transition={{ duration: 0.9, ease: ease.out }}
            />

            <circle cx="24" cy="26" r="4.5" fill="#65AF3E" />
            <text
              x="36"
              y="30"
              className="font-mono text-[10px] font-semibold fill-[#012A19]"
            >
              Harga Normal ({formatRupiah(activeCase.normalPrice)})
            </text>

            {crashed ? (
              <g>
                <circle cx="614" cy="138" r="5.5" fill="#014F2F" />
                <text
                  x="600"
                  y="126"
                  textAnchor="end"
                  className="font-mono text-[11px] font-bold fill-[#012A19]"
                >
                  Panen Raya: {formatRupiah(activeCase.crashPrice)}/kg
                </text>
              </g>
            ) : null}
          </svg>

          <div className="mt-2 pt-2.5 border-t border-[#014F2F]/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#4A6155]">
            <span>
              Sumber: {activeCase.publisher}, {activeCase.dateLabel}
            </span>
            <span className="font-medium text-[#014F2F]">
              Di bawah titik impas biaya petik & kemas
            </span>
          </div>
        </div>
      </div>

      {/* Right Documentary Editorial Photo & Supply Paradox (5 cols) */}
      <figure className="lg:col-span-5 relative overflow-hidden rounded-3xl border border-[#014F2F]/12 bg-[#012A19] min-h-[24rem] flex flex-col justify-end">
        <Image
          src="/images/pasar-sayur.webp"
          alt="Pedagang sayur lokal di pasar tradisional dengan tumpukan panen segar"
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#012A19]/92 via-[#012A19]/35 to-transparent"
        />

        <figcaption className="relative z-10 p-6 sm:p-8 text-[#FEFEFE] space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#A3D487]">
            Paradoks Rantai Pasok
          </p>
          <h3 className="font-display text-2xl font-semibold leading-snug">
            Di lahan membusuk, di dapur kekurangan pemasok.
          </h3>
          <p className="text-sm text-[#FEFEFE]/80 leading-relaxed">
            Sekitar 80 dapur MBG di Solo Raya baru melibatkan 1–5 pemasok lokal
            (Tirto, 8 Mar 2026), padahal Badan Gizi Nasional mewajibkan minimal 15
            pemasok per dapur. Masalahnya bukan ketiadaan sayur, melainkan ketiadaan
            peta stok dan kepastian mutu.
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
