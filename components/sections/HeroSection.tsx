/**
 * @file HeroSection Component - Full-viewport SINTAS hero featuring Indonesian farmer & agritech coordinator inspecting graded vegetable crates, architectural typography, and frosted-glass AI Grade card.
 */

"use client";

import {
  ArrowRight,
  MapPin,
  Route,
  ScanLine,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { GRADE_ORDER } from "@/constants/grades";
import { cn } from "@/lib/utils";
import type { Grade } from "@/types/landing";

interface HeroTelemetryData {
  readonly id: Grade;
  readonly qualityStatus: string;
  readonly allocationTarget: string;
  readonly aiScore: number;
  readonly shelfLife: string;
  readonly priceEst: string;
}

const HERO_TELEMETRY_BY_GRADE: Readonly<Record<Grade, HeroTelemetryData>> = {
  A: {
    id: "A",
    qualityStatus: "Grade A • Segar Prima",
    allocationTarget: "Restoran, Horeka & Ritel",
    aiScore: 94,
    shelfLife: "Sisa Segar ±36 Jam",
    priceEst: "Rp 14.500/kg",
  },
  B: {
    id: "B",
    qualityStatus: "Grade B • Layak Masak",
    allocationTarget: "Dapur SPPG (MBG) & Katering",
    aiScore: 88,
    shelfLife: "Sisa Segar ±28 Jam",
    priceEst: "Rp 11.200/kg",
  },
  C: {
    id: "C",
    qualityStatus: "Grade C • Bahan Olahan",
    allocationTarget: "UMKM Saus, Keripik & Kuliner",
    aiScore: 81,
    shelfLife: "Siap Olah ±16 Jam",
    priceEst: "Rp 7.800/kg",
  },
  D: {
    id: "D",
    qualityStatus: "Grade D • Non-Konsumsi",
    allocationTarget: "Peternak, Maggot BSF & Kompos",
    aiScore: 74,
    shelfLife: "Salur Cepat <6 Jam",
    priceEst: "Rp 2.600/kg",
  },
};

export function HeroSection() {
  const [selectedGrade, setSelectedGrade] = useState<Grade>("A");
  const activeTelemetry = HERO_TELEMETRY_BY_GRADE[selectedGrade];

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (activeTelemetry.aiScore / 100) * circumference;

  return (
    <section
      id="beranda"
      aria-labelledby="hero-heading"
      className="relative min-h-[min(100dvh,1080px)] w-full overflow-hidden bg-[#FEFEFE] flex items-center"
    >
      {/* Full-Viewport SINTAS Harvest & AI Grading Photograph */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-sintas.webp"
          alt="Koordinator SINTAS dan petani sayur Indonesia menaksir mutu panen tomat, selada, dan cabai menggunakan tablet AI di sentra panen dataran tinggi"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[76%_center] lg:object-[70%_center]"
        />
        {/* Clean crisp white gradient fade on the left for typography legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#FEFEFE] via-[#FEFEFE]/92 via-38% to-transparent lg:via-[#FEFEFE]/82 lg:via-43%"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-16 pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-28 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          {/* Left Column: Editorial Kicker, Headline, Copy, and CTAs */}
          <div className="lg:col-span-6 max-w-[660px] lg:pb-8">
            {/* Architectural Horizontal-Rule Kicker (No Pill Box, No Dot) */}
            <div className="inline-flex items-center gap-3 mb-5">
              <span
                aria-hidden="true"
                className="h-[2px] w-8 rounded-full bg-[#65AF3E]"
              />
              <span className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-[#014F2F]">
                AI Penentu Grade • Peta Stok • Penyaluran S-Flow
              </span>
            </div>

            {/* Two-Tone Display Headline */}
            <h1
              id="hero-heading"
              className="font-display text-[clamp(2.4rem,4.3vw,3.9rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#072E1B]"
            >
              Sinkronkan Panen.
              <span className="block text-[#65AF3E] mt-1.5">
                Salurkan Tanpa Sisa.
              </span>
            </h1>

            {/* SINTAS Core Value Proposition */}
            <p className="mt-5 font-sans text-base sm:text-lg leading-relaxed text-[#355242] max-w-[52ch]">
              SINTAS mempertemukan petani sayur dengan pembeli{" "}
              <strong className="font-semibold text-[#072E1B]">
                Grade A, B, C, hingga D
              </strong>{" "}
              — mulai dari restoran, dapur MBG, katering, UMKM olahan, pengepul,
              hingga peternak — dalam satu peta stok interaktif dengan taksiran
              mutu AI dan prediksi harga panen.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink
                href="/login"
                variant="primary"
                size="lg"
                trailingIcon={<ArrowRight className="size-4 text-[#65AF3E]" />}
              >
                Masuk
              </ButtonLink>
              <ButtonLink
                href="#cara-kerja"
                variant="secondary"
                size="lg"
                className="border-[#C4DEC9] bg-[#FEFEFE]/95 hover:bg-[#EBF4EC]"
                trailingIcon={<ArrowRight className="size-4 text-[#014F2F]" />}
              >
                Jelajahi Solusi
              </ButtonLink>
            </div>
          </div>

          {/* Right Column: Floating Frosted-Glass SINTAS AI Grade & Routing Card (Positioned at Bottom-Left of Right Column so Farmer & Vegetable Crates are Fully Visible) */}
          <div className="lg:col-span-6 flex lg:justify-start lg:pl-4">
            <div className="w-full max-w-[420px] rounded-2xl bg-[#072E1B]/76 backdrop-blur-md border border-[#FEFEFE]/25 p-5 text-[#FEFEFE] shadow-[0_28px_60px_-14px_rgba(7,46,27,0.55)]">
              {/* Top Bar: Location & Interactive Grade A-D Selector */}
              <div className="flex items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-[#FEFEFE]/15">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8FD16A]">
                  <MapPin className="size-3.5 text-[#65AF3E]" />
                  Sentra Panen • Lembang
                </span>
                <div
                  role="tablist"
                  aria-label="Pilih Grade Sayur A sampai D"
                  className="inline-flex items-center gap-1 rounded-lg bg-[#014F2F]/70 p-1 border border-[#FEFEFE]/15"
                >
                  {GRADE_ORDER.map((gradeId) => {
                    const active = selectedGrade === gradeId;
                    return (
                      <button
                        key={gradeId}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedGrade(gradeId)}
                        className={cn(
                          "px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer",
                          active
                            ? "bg-[#65AF3E] text-[#FEFEFE] shadow-xs"
                            : "text-[#FEFEFE]/75 hover:text-[#FEFEFE]"
                        )}
                      >
                        {gradeId}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2-Column Telemetry Body */}
              <div className="grid grid-cols-12 gap-3.5 items-center">
                <div className="col-span-7 space-y-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FEFEFE]/15 border border-[#FEFEFE]/25 text-[#8FD16A]">
                      <ScanLine className="size-4" />
                    </span>
                    <div>
                      <p className="text-[11px] text-[#D6EBD9] font-medium">
                        Taksiran Kamera AI
                      </p>
                      <p className="text-sm font-bold text-[#FEFEFE] leading-tight mt-0.5">
                        {activeTelemetry.qualityStatus}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FEFEFE]/15 border border-[#FEFEFE]/25 text-[#8FD16A]">
                      <Route className="size-4" />
                    </span>
                    <div>
                      <p className="text-[11px] text-[#D6EBD9] font-medium">
                        Mitra Penyaluran Otomatis
                      </p>
                      <p className="text-sm font-bold text-[#FEFEFE] leading-tight mt-0.5">
                        {activeTelemetry.allocationTarget}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Circular AI Score Gauge */}
                <div className="col-span-5 flex flex-col items-center justify-center border-l border-[#FEFEFE]/15 pl-3">
                  <div className="relative flex items-center justify-center size-22">
                    <svg
                      className="size-22 -rotate-90"
                      viewBox="0 0 88 88"
                      aria-hidden="true"
                    >
                      <circle
                        cx="44"
                        cy="44"
                        r={radius}
                        stroke="rgba(254, 254, 254, 0.18)"
                        strokeWidth="6.5"
                        fill="transparent"
                      />
                      <circle
                        cx="44"
                        cy="44"
                        r={radius}
                        stroke="#65AF3E"
                        strokeWidth="6.5"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-display text-xl font-bold text-[#FEFEFE] leading-none">
                        {activeTelemetry.aiScore}%
                      </span>
                      <span className="text-[9px] font-medium text-[#D6EBD9] mt-0.5">
                        Keyakinan AI
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Price Prediction & Freshness Bar */}
              <div className="mt-3.5 pt-3 border-t border-[#FEFEFE]/15 flex items-center justify-between text-xs text-[#D6EBD9]">
                <span>{activeTelemetry.shelfLife}</span>
                <span className="font-mono font-bold text-[#8FD16A]">
                  Prediksi: {activeTelemetry.priceEst}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
