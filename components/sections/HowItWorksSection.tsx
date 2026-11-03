/**
 * @file HowItWorksSection Component - SINTAS 4 AI Pillars with custom micro-visuals & varied agritech green surfaces, Ecosystem Banner, and Smartphone AI Grader + Map-Based Consumer Dashboard showcase.
 */

"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Compass,
  Layers,
  LineChart,
  MapPin,
  MoreHorizontal,
  Radar,
  Route,
  ScanLine,
  Store,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const SINTAS_METRICS = [
  {
    id: "grade-tier",
    value: "Grade A–D",
    label: "Klasifikasi Mutu & Alokasi Otomatis",
    icon: Layers,
  },
  {
    id: "mitra-konsumen",
    value: "7+ Kategori",
    label: "Resto, MBG, Katering, UMKM, Pengepul, Peternak",
    icon: Store,
  },
  {
    id: "map-sync",
    value: "Real-Time",
    label: "Pemantauan Titik Kebun Berbasis Peta",
    icon: Radar,
  },
  {
    id: "price-ai",
    value: "Prediksi AI",
    label: "Estimasi Harga per Grade & Kalender Tanam",
    icon: TrendingUp,
  },
] as const;

const PHONE_AI_SCORES = [
  {
    label: "Hasil Taksir AI",
    status: "Grade A • Segar Prima",
    percent: 94,
  },
  {
    label: "Kecocokan Mitra",
    status: "Restoran & Dapur MBG",
    percent: 92,
  },
  {
    label: "Sinyal Waktu Panen",
    status: "Panen Sekarang (+18%)",
    percent: 89,
  },
] as const;

const BUYER_GRADE_CHANNELS = [
  {
    grade: "A",
    badgeBg: "bg-[#65AF3E] text-[#FEFEFE]",
    buyers: "Restoran, Hotel & Perorangan",
    volume: "620 kg tersedia • Lembang",
  },
  {
    grade: "B",
    badgeBg: "bg-[#0B6B3A] text-[#FEFEFE]",
    buyers: "Dapur MBG, Katering & Pengepul",
    volume: "840 kg tersedia • Ciwidey",
  },
  {
    grade: "C",
    badgeBg: "bg-[#D48C2A] text-[#FEFEFE]",
    buyers: "UMKM Saus, Sambal & Olahan",
    volume: "410 kg tersedia • Pangalengan",
  },
  {
    grade: "D",
    badgeBg: "bg-[#8C5A3C] text-[#FEFEFE]",
    buyers: "Peternak, Pakan BSF & Kompos",
    volume: "190 kg tersedia • Garut",
  },
] as const;

const PREDICTED_PRICES_BY_GRADE = [
  {
    crop: "Grade A • Resto & Ritel",
    price: "Rp 14.500",
    unit: "/ kg",
  },
  {
    crop: "Grade B • MBG & Katering",
    price: "Rp 11.200",
    unit: "/ kg",
  },
  {
    crop: "Grade C • UMKM Olahan",
    price: "Rp 7.800",
    unit: "/ kg",
  },
] as const;

function MiniRingGauge({ percent }: { readonly percent: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <div className="relative flex items-center justify-center size-11 shrink-0">
      <svg className="size-11 -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
        <circle
          cx="20"
          cy="20"
          r={r}
          stroke="#DCECE0"
          strokeWidth="3.5"
          fill="transparent"
        />
        <circle
          cx="20"
          cy="20"
          r={r}
          stroke="#65AF3E"
          strokeWidth="3.5"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-[#072E1B]">
        {percent}%
      </span>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section
      id="cara-kerja"
      aria-labelledby="cara-kerja-heading"
      className="relative bg-[#FEFEFE] pt-20 sm:pt-24 overflow-hidden"
    >
      {/* PART 1 & 2 Container on Crisp #FEFEFE White */}
      <div className="mx-auto max-w-[1560px] px-6 sm:px-10 lg:px-16 pb-20">
        <SectionHeader
          eyebrow="SOLUSI INTI SINTAS"
          align="center"
          title={
            <span id="cara-kerja-heading">
              Teknologi AI & Peta Stok untuk Ekosistem Sayur Tanpa Sisa
            </span>
          }
          description="Menghubungkan hasil panen petani langsung ke konsumen Grade A, B, C, hingga D melalui taksiran mutu otomatis, peta real-time, dan prediksi harga."
        />

        {/* 4 Varied Feature Cards with Custom Micro-Visuals */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: AI Penentu Grade Sayur (Deep Forest Green #014F2F + Live Grade A-D Chip Bar) */}
          <article className="rounded-3xl bg-[#014F2F] border border-[#014F2F] p-7 text-[#FEFEFE] shadow-[0_22px_48px_-14px_rgba(1,79,47,0.35)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#65AF3E] text-[#FEFEFE]">
                  <ScanLine className="size-6 stroke-[1.9]" />
                </span>
                <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#8FD16A]">
                  01 / AI VISION
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-[#FEFEFE] tracking-tight">
                Penentu Grade Sayur AI (A–D)
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#D6EBD9]">
                Kamera AI menganalisis warna, tekstur, dan kesegaran panen untuk
                menetapkan Grade A, B, C, atau D secara objektif dalam 3 detik.
              </p>
            </div>

            {/* Micro-Visual: 4 Grade Confidence Pills */}
            <div className="mt-6 pt-4 border-t border-[#FEFEFE]/15">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#8FD16A] mb-2">
                Klasifikasi Otomatis
              </p>
              <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[11px] font-bold">
                <span className="rounded-lg bg-[#65AF3E] py-1.5 text-[#FEFEFE]">
                  A·94%
                </span>
                <span className="rounded-lg bg-[#0B6B3A] border border-[#8FD16A]/30 py-1.5 text-[#FEFEFE]">
                  B·88%
                </span>
                <span className="rounded-lg bg-[#D48C2A] py-1.5 text-[#FEFEFE]">
                  C·81%
                </span>
                <span className="rounded-lg bg-[#8C5A3C] py-1.5 text-[#FEFEFE]">
                  D·74%
                </span>
              </div>
            </div>
          </article>

          {/* Card 2: Penyaluran Otomatis by Grade (Mint-Sage #EBF4EC + S-Flow Routing Diagram) */}
          <article className="rounded-3xl bg-[#EBF4EC] border border-[#C4DEC9] p-7 text-[#072E1B] flex flex-col justify-between transition-all hover:border-[#65AF3E]">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#FEFEFE] border border-[#C4DEC9] text-[#014F2F]">
                  <Route className="size-6 stroke-[1.9]" />
                </span>
                <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#014F2F]">
                  02 / S-FLOW SYNC
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-[#072E1B] tracking-tight">
                Penyaluran Otomatis by Grade
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#355242]">
                Sistem S-Flow langsung menyalurkan tiap grade ke konsumen yang
                tepat: Restoran (A), MBG & Katering (B), UMKM (C), hingga
                Peternak (D).
              </p>
            </div>

            {/* Micro-Visual: Grade-to-Consumer Routing Chips */}
            <div className="mt-6 pt-4 border-t border-[#C4DEC9] space-y-1.5">
              <div className="flex items-center justify-between rounded-lg bg-[#FEFEFE] px-3 py-1.5 text-[11px] border border-[#C4DEC9]">
                <span className="font-bold text-[#014F2F]">Grade A & B</span>
                <span className="text-[#355242]">→ Resto, MBG, Katering</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[#FEFEFE] px-3 py-1.5 text-[11px] border border-[#C4DEC9]">
                <span className="font-bold text-[#8C5A3C]">Grade C & D</span>
                <span className="text-[#355242]">→ UMKM, Pengepul, Ternak</span>
              </div>
            </div>
          </article>

          {/* Card 3: Peta Stok Interaktif Konsumen (Crisp White #FEFEFE with Top Canopy Accent + Live Radar Strip) */}
          <article className="rounded-3xl bg-[#FEFEFE] border-2 border-[#C4DEC9] p-7 text-[#072E1B] shadow-soft flex flex-col justify-between transition-all hover:border-[#014F2F]">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#014F2F] text-[#FEFEFE]">
                  <Compass className="size-6 stroke-[1.9]" />
                </span>
                <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#65AF3E]">
                  03 / MAP-BASED
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-[#072E1B] tracking-tight">
                Peta Stok Interaktif Konsumen
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#355242]">
                Konsumen memantau lokasi kebun, volume per grade, dan sisa jam
                kesegaran secara langsung melalui tampilan berbasis peta.
              </p>
            </div>

            {/* Micro-Visual: Live Map Pin Preview */}
            <div className="mt-6 pt-4 border-t border-[#C4DEC9]">
              <div className="rounded-xl bg-[#072E1B] p-3 text-[#FEFEFE] flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <MapPin className="size-3.5 text-[#65AF3E]" />
                  Radius 15 km
                </span>
                <span className="rounded-md bg-[#65AF3E] px-2 py-0.5 font-mono text-[10px] font-bold">
                  12 Lot Segar
                </span>
              </div>
            </div>
          </article>

          {/* Card 4: Prediksi Harga, Panen & Tanam (Canopy Green #0B6B3A + Sparkline Curve) */}
          <article className="rounded-3xl bg-[#0B6B3A] border border-[#014F2F] p-7 text-[#FEFEFE] shadow-[0_20px_44px_-14px_rgba(1,79,47,0.28)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#FEFEFE]/15 border border-[#FEFEFE]/20 text-[#8FD16A]">
                  <LineChart className="size-6 stroke-[1.9]" />
                </span>
                <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#8FD16A]">
                  04 / FORECAST AI
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-[#FEFEFE] tracking-tight">
                Prediksi Harga, Panen & Tanam
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#D6EBD9]">
                AI memproyeksikan harga pasar per grade serta memberi rekomendasi
                waktu panen atau jadwal tanam agar tidak terjadi banjir pasokan.
              </p>
            </div>

            {/* Micro-Visual: Price Trend Sparkline */}
            <div className="mt-6 pt-4 border-t border-[#FEFEFE]/15 flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#8FD16A]">
                  Sinyal Panen AI
                </p>
                <p className="text-xs font-bold text-[#FEFEFE] mt-0.5">
                  Panen H+2 (+18%)
                </p>
              </div>
              <svg
                aria-hidden="true"
                viewBox="0 0 88 28"
                className="h-7 w-22 shrink-0"
              >
                <path
                  d="M 2 24 Q 22 22 36 15 T 66 9 T 86 3"
                  fill="none"
                  stroke="#8FD16A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="86" cy="3" r="3" fill="#FEFEFE" />
              </svg>
            </div>
          </article>
        </div>

        {/* PART 2: Solid Deep Forest Green (#014F2F -> #072E1B) Ecosystem Banner */}
        <div className="mt-14 relative rounded-3xl bg-gradient-to-r from-[#072E1B] via-[#014F2F] to-[#0B6B3A] text-[#FEFEFE] py-10 px-6 sm:px-10 shadow-[0_24px_50px_-16px_rgba(1,79,47,0.35)] overflow-hidden">
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#FEFEFE]/15">
            {SINTAS_METRICS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="flex flex-col items-center text-center px-4"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#FEFEFE]/10 border border-[#FEFEFE]/15">
                    <Icon className="size-6 text-[#8FD16A] stroke-[1.9]" />
                  </div>
                  <p className="mt-3.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#FEFEFE]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-[#D6EBD9] font-medium max-w-[22ch]">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PART 3: Mint-Sage Tinted Band (#EBF4EC) so Crisp #FEFEFE Phone & Map Dashboard Cards Stand Out */}
      <div className="bg-[#EBF4EC] border-y border-[#C4DEC9] py-20 sm:py-24">
        <div className="mx-auto max-w-[1560px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: SINTAS Sync Narrative (Clean Horizontal-Rule Kicker) */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-[2px] w-7 rounded-full bg-[#65AF3E]"
                />
                <span className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-[#014F2F]">
                  SINKRONISASI PETANI & KONSUMEN
                </span>
              </div>

              <h2 className="mt-4 font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#072E1B]">
                Dari kamera petani langsung ke{" "}
                <span className="text-[#65AF3E]">peta konsumen</span>
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#355242]">
                Begitu petani memotret hasil panen, AI SINTAS menentukan Grade
                A–D, memperbarui titik stok di peta, dan menyalurkannya ke
                restoran, dapur MBG, katering, UMKM, pengepul, hingga peternak.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Penentuan Grade A, B, C, D otomatis beserta estimasi jam segar",
                  "Konsumen memilih titik panen terdekat langsung di peta interaktif",
                  "Prediksi harga per grade serta rekomendasi waktu panen & tanam",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm sm:text-base font-medium text-[#072E1B]"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 fill-[#014F2F] text-[#FEFEFE]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <ButtonLink
                  href="/login"
                  variant="primary"
                  size="lg"
                  trailingIcon={<ArrowRight className="size-4 text-[#65AF3E]" />}
                >
                  Masuk Sekarang
                </ButtonLink>
                <ButtonLink
                  href="#ai"
                  variant="secondary"
                  size="lg"
                  className="bg-[#FEFEFE] border-[#C4DEC9]"
                >
                  Coba Simulasi AI
                </ButtonLink>
              </div>
            </div>

            {/* Right Column: Smartphone AI Grader + Consumer Map-Based Dashboard Card */}
            <div className="lg:col-span-7">
              <div className="flex flex-col md:flex-row items-center md:items-stretch gap-5">
                {/* Smartphone Mockup: SINTAS Petani AI Camera Grader */}
                <div className="w-full max-w-[270px] shrink-0 rounded-[2.25rem] border-[6px] border-[#072E1B] bg-[#FEFEFE] p-3.5 shadow-[0_24px_48px_-12px_rgba(7,46,27,0.22)] flex flex-col justify-between">
                  <div>
                    {/* Phone Notch & Status Bar */}
                    <div className="flex items-center justify-between px-2 pt-1 pb-2.5">
                      <span className="text-[10px] font-bold text-[#072E1B]">
                        09:41
                      </span>
                      <div className="h-3.5 w-16 rounded-full bg-[#072E1B]" />
                      <Bell className="size-3.5 text-[#014F2F]" />
                    </div>

                    {/* App Header + Vegetable Scan Preview */}
                    <div className="rounded-xl bg-[#014F2F] p-2.5 text-[#FEFEFE] flex items-center gap-2.5">
                      <div className="relative size-11 shrink-0 rounded-lg overflow-hidden bg-[#FEFEFE]">
                        <Image
                          src="/images/studio/tomat-a.webp"
                          alt="Scan AI Tomat Grade A"
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="inline-block rounded bg-[#65AF3E] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#FEFEFE]">
                          AI Grader Aktif
                        </span>
                        <p className="text-xs font-bold text-[#FEFEFE] truncate mt-0.5">
                          Lot #204 • Tomat Apel
                        </p>
                      </div>
                    </div>

                    {/* 3 SINTAS AI Score Cards with Circular #65AF3E Rings */}
                    <div className="mt-3 space-y-2">
                      {PHONE_AI_SCORES.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl bg-[#EBF4EC] border border-[#C4DEC9] p-2.5 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-[11px] font-bold text-[#072E1B]">
                              {item.label}
                            </p>
                            <p className="text-[11px] font-medium text-[#355242] mt-0.5">
                              {item.status}
                            </p>
                          </div>
                          <MiniRingGauge percent={item.percent} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Auto-Sync Status at Bottom of Phone */}
                  <div className="mt-3 rounded-xl bg-[#014F2F] p-2.5 text-[#FEFEFE]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8FD16A]">
                      Status Penyaluran S-Flow
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#FEFEFE]">
                        Tersinkron ke Peta Stok
                      </span>
                      <span className="text-[10px] font-semibold text-[#8FD16A]">
                        4 Mitra
                      </span>
                    </div>
                  </div>
                </div>

                {/* Web Dashboard Card: Peta Stok Konsumen & Alokasi Grade A-D */}
                <div className="w-full flex-1 rounded-2xl bg-[#FEFEFE] border border-[#C4DEC9] p-5 shadow-[0_24px_52px_-16px_rgba(1,79,47,0.16)] flex flex-col justify-between">
                  <div>
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-[#C4DEC9]">
                      <div>
                        <h3 className="font-display text-base font-bold text-[#072E1B]">
                          Peta Stok Konsumen & Penyaluran Grade A–D
                        </h3>
                        <p className="text-xs text-[#355242]">
                          Pantau titik panen, sisa jam segar, dan kecocokan mitra pembeli
                        </p>
                      </div>
                      <MoreHorizontal className="size-5 text-[#355242]" />
                    </div>

                    {/* Interactive Map Visualization + Grade A/B/C/D Buyer Channels */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-stretch">
                      {/* Left: Stylized Map-Based Radar View of Harvest Lots */}
                      <div className="sm:col-span-6 relative min-h-[185px] rounded-xl overflow-hidden bg-[#072E1B] border border-[#014F2F] p-3 flex flex-col justify-between">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 260 160"
                          className="absolute inset-0 h-full w-full opacity-90"
                        >
                          <defs>
                            <pattern
                              id="sintas-map-grid"
                              width="26"
                              height="26"
                              patternUnits="userSpaceOnUse"
                            >
                              <path
                                d="M 26 0 L 0 0 0 26"
                                fill="none"
                                stroke="rgba(143,209,106,0.12)"
                                strokeWidth="1"
                              />
                            </pattern>
                          </defs>
                          <rect width="260" height="160" fill="url(#sintas-map-grid)" />
                          <circle
                            cx="130"
                            cy="80"
                            r="58"
                            fill="none"
                            stroke="rgba(101,175,62,0.22)"
                            strokeDasharray="4 4"
                          />
                          <circle
                            cx="130"
                            cy="80"
                            r="32"
                            fill="rgba(101,175,62,0.08)"
                            stroke="rgba(101,175,62,0.35)"
                          />
                          <path
                            d="M 62 48 Q 110 55 130 80 T 205 52"
                            fill="none"
                            stroke="#65AF3E"
                            strokeWidth="2"
                            strokeDasharray="3 3"
                          />
                          <path
                            d="M 74 115 Q 112 98 130 80 T 196 116"
                            fill="none"
                            stroke="#8FD16A"
                            strokeWidth="1.5"
                          />
                          <circle cx="62" cy="48" r="7" fill="#65AF3E" />
                          <text
                            x="62"
                            y="51"
                            textAnchor="middle"
                            className="fill-[#FEFEFE] text-[8px] font-bold"
                          >
                            A
                          </text>
                          <circle cx="130" cy="80" r="8" fill="#0B6B3A" stroke="#8FD16A" strokeWidth="1.5" />
                          <text
                            x="130"
                            y="83"
                            textAnchor="middle"
                            className="fill-[#FEFEFE] text-[8px] font-bold"
                          >
                            B
                          </text>
                          <circle cx="205" cy="52" r="7" fill="#D48C2A" />
                          <text
                            x="205"
                            y="55"
                            textAnchor="middle"
                            className="fill-[#FEFEFE] text-[8px] font-bold"
                          >
                            C
                          </text>
                          <circle cx="196" cy="116" r="7" fill="#8C5A3C" />
                          <text
                            x="196"
                            y="119"
                            textAnchor="middle"
                            className="fill-[#FEFEFE] text-[8px] font-bold"
                          >
                            D
                          </text>
                        </svg>

                        <div className="relative z-10 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 rounded-md bg-[#014F2F]/90 border border-[#FEFEFE]/15 px-2 py-0.5 text-[10px] font-semibold text-[#8FD16A]">
                            <MapPin className="size-3 text-[#65AF3E]" /> Jawa Barat
                          </span>
                          <span className="rounded-md bg-[#65AF3E] px-2 py-0.5 text-[10px] font-bold text-[#FEFEFE]">
                            Live Map
                          </span>
                        </div>

                        <div className="relative z-10 rounded-lg bg-[#014F2F]/90 backdrop-blur-xs border border-[#FEFEFE]/15 px-2.5 py-1.5 flex items-center justify-between text-[10px] text-[#FEFEFE]">
                          <span>Total Stok: 2,06 Ton</span>
                          <span className="font-mono text-[#8FD16A]">4 Titik Kebun</span>
                        </div>
                      </div>

                      {/* Right: 4 Grade Channels (Restoran, MBG, UMKM, Peternak) */}
                      <div className="sm:col-span-6 flex flex-col justify-between gap-2">
                        {BUYER_GRADE_CHANNELS.map((ch) => (
                          <div
                            key={ch.grade}
                            className="rounded-lg bg-[#EBF4EC] border border-[#C4DEC9] px-2.5 py-1.5 flex items-center gap-2.5"
                          >
                            <span
                              className={cn(
                                "flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                                ch.badgeBg
                              )}
                            >
                              {ch.grade}
                            </span>
                            <div className="min-w-0">
                              <p className="text-[11px] font-bold text-[#072E1B] truncate">
                                {ch.buyers}
                              </p>
                              <p className="text-[10px] text-[#355242] truncate">
                                {ch.volume}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Sub-Grid: Auto-Routing Activity + AI Price Forecast by Grade */}
                  <div className="mt-4 pt-3.5 border-t border-[#C4DEC9] grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-[#072E1B] mb-2">
                        Penyaluran Otomatis Terkini
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg bg-[#EBF4EC] px-2.5 py-2 text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-[#65AF3E]" />
                            <div>
                              <p className="font-semibold text-[#072E1B]">
                                Grade B → Dapur MBG
                              </p>
                              <p className="text-[10px] text-[#355242]">
                                480 kg • SPPG Bandung
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-semibold text-[#014F2F]">
                            Tersalur
                          </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-[#EBF4EC] px-2.5 py-2 text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-[#D48C2A]" />
                            <div>
                              <p className="font-semibold text-[#072E1B]">
                                Grade C → UMKM Saus
                              </p>
                              <p className="text-[10px] text-[#355242]">
                                310 kg • Mitra Kuliner
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-semibold text-[#014F2F]">
                            Tersalur
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#072E1B] mb-2">
                        Prediksi Harga AI per Grade
                      </p>
                      <div className="space-y-1.5">
                        {PREDICTED_PRICES_BY_GRADE.map((mp) => (
                          <div
                            key={mp.crop}
                            className="flex items-center justify-between rounded-lg bg-[#EBF4EC] px-2.5 py-1.5 text-[11px]"
                          >
                            <span className="font-medium text-[#355242] truncate pr-2">
                              {mp.crop}
                            </span>
                            <span className="inline-flex items-center gap-0.5 font-mono font-bold text-[#014F2F] shrink-0">
                              {mp.price}
                              <span className="text-[9px] font-sans font-normal text-[#355242]">
                                {mp.unit}
                              </span>
                              <ArrowUpRight className="size-3 text-[#65AF3E]" />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
