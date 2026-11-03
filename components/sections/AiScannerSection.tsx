/**
 * @file AiScannerSection Component - High-contrast SINTAS AI Grade A-D visual inspection & automatic buyer routing console (#FEFEFE background, #EBF4EC studio frame, and #014F2F Deep Forest Green telemetry panel).
 */

"use client";

import NumberFlow from "@number-flow/react";
import { Check, Clock, CornerRightDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GradeBadge } from "@/components/ui/GradeBadge";
import { GRADE_ORDER, GRADES } from "@/constants/grades";
import { SCANNER_SAMPLE_MAP, SCANNER_SAMPLES } from "@/constants/scanner";
import { evaluateScannerLot, formatHours, formatRupiah } from "@/lib/format";
import { duration } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Grade, ScannerCommodityId } from "@/types/landing";

const GRADE_HOUR_MAP: Readonly<Record<Grade, number>> = {
  A: 6,
  B: 32,
  C: 68,
  D: 90,
};

export function AiScannerSection() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<ScannerCommodityId>("tomat");
  const [hoursSinceHarvest, setHoursSinceHarvest] = useState<number>(6);
  const [simulateDoubt, setSimulateDoubt] = useState<boolean>(false);

  const sample = SCANNER_SAMPLE_MAP[selectedId];
  const evaluation = evaluateScannerLot(sample, hoursSinceHarvest, simulateDoubt);
  const gradeMeta = GRADES[evaluation.effectiveGrade];
  const currentImage = sample.imagesByGrade[evaluation.rawGrade];
  const estimatedPrice = Math.round(
    sample.baseReferencePrice * gradeMeta.priceMultiplier
  );

  return (
    <section
      id="ai"
      className="relative bg-[#FEFEFE] text-[#072E1B] py-20 sm:py-24 border-b border-[#C4DEC9]"
    >
      <div className="mx-auto max-w-[1560px] px-6 sm:px-10 lg:px-16">
        {/* Top Header + Commodity Selector Pills */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="PENENTU GRADE AI & ALOKASI S-FLOW"
            title={
              <>
                Satu foto panen. Satu grade jujur.{" "}
                <span className="text-[#65AF3E]">Satu tujuan pasti.</span>
              </>
            }
            description="Geser jam pascapanen atau pilih tingkat Grade A–D untuk melihat bagaimana AI SINTAS menentukan mutu sayur dan langsung menyalurkannya ke kategori konsumen yang tepat."
          />

          {/* Commodity Tabs on Mint-Sage Tray */}
          <div
            role="tablist"
            aria-label="Pilih komoditas sayur"
            className="inline-flex flex-wrap gap-1.5 rounded-xl border border-[#C4DEC9] bg-[#EBF4EC] p-1.5 shrink-0"
          >
            {SCANNER_SAMPLES.map((item) => {
              const active = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    "h-9 rounded-lg px-4 text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                    active
                      ? "bg-[#014F2F] text-[#FEFEFE] shadow-xs"
                      : "text-[#355242] hover:text-[#072E1B]"
                  )}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 12-Column Studio Showcase */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column (6 cols): Mint-Sage Studio Frame + 4-Stage Tray Strip */}
          <div className="lg:col-span-6 rounded-3xl bg-[#EBF4EC] border border-[#C4DEC9] p-5 sm:p-6 flex flex-col justify-between gap-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#C4DEC9] bg-[#FEFEFE] shadow-soft">
              <Image
                key={`${sample.id}-${evaluation.rawGrade}`}
                src={currentImage}
                alt={`Foto studio ${sample.name} kondisi Grade ${evaluation.rawGrade}`}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className={cn(
                  "object-cover transition-all duration-300",
                  simulateDoubt && "blur-[1.5px] opacity-90"
                )}
              />

              {/* Corner Crosshairs */}
              <svg
                aria-hidden="true"
                viewBox="0 0 400 300"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <path
                  d="M 20 40 V 20 H 40 M 360 20 H 380 V 40 M 380 260 V 280 H 360 M 40 280 H 20 V 260"
                  fill="none"
                  stroke="#014F2F"
                  strokeWidth="2"
                  strokeOpacity="0.55"
                />
              </svg>

              {/* Top Metadata Strip */}
              <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="rounded-lg border border-[#C4DEC9] bg-[#FEFEFE]/95 px-3 py-1 font-mono font-semibold text-[#072E1B] shadow-2xs">
                  {sample.originRegency} · {sample.lotWeightKg} kg
                </span>
                <span className="rounded-lg bg-[#014F2F] px-3 py-1 font-mono font-semibold text-[#FEFEFE]">
                  +{hoursSinceHarvest} jam pascapanen
                </span>
              </div>

              {/* Bounding Boxes */}
              {evaluation.boxes.map((box, idx) => (
                <motion.div
                  key={`${box.id}-${evaluation.rawGrade}`}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, scale: 0.96 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: duration.base,
                    delay: prefersReducedMotion ? 0 : 0.1 + idx * 0.1,
                  }}
                  style={{
                    left: `${box.xPct}%`,
                    top: `${box.yPct}%`,
                    width: `${box.widthPct}%`,
                    height: `${box.heightPct}%`,
                  }}
                  className="pointer-events-none absolute rounded-xl border-2 border-[#65AF3E] bg-[#65AF3E]/10"
                >
                  <div className="absolute -top-6 left-0 whitespace-nowrap rounded-md bg-[#014F2F] px-2 py-0.5 font-mono text-[10px] font-medium text-[#FEFEFE]">
                    {box.label} · {box.metric}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 4-Stage Studio Comparison Strip */}
            <div className="grid grid-cols-4 gap-2.5">
              {GRADE_ORDER.map((g) => {
                const isSelected = evaluation.rawGrade === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setHoursSinceHarvest(GRADE_HOUR_MAP[g])}
                    className={cn(
                      "group flex flex-col overflow-hidden rounded-xl border p-2 text-left transition-all cursor-pointer",
                      isSelected
                        ? "border-[#014F2F] bg-[#014F2F] text-[#FEFEFE] shadow-sm"
                        : "border-[#C4DEC9] bg-[#FEFEFE] text-[#072E1B] hover:border-[#65AF3E]"
                    )}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#FEFEFE]">
                      <Image
                        src={sample.imagesByGrade[g]}
                        alt={`${sample.name} Grade ${g}`}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between px-0.5">
                      <span
                        className={cn(
                          "font-display text-xs font-bold",
                          isSelected ? "text-[#FEFEFE]" : "text-[#072E1B]"
                        )}
                      >
                        Grade {g}
                      </span>
                      <span
                        className={cn(
                          "font-mono text-[10px]",
                          isSelected ? "text-[#8FD16A]" : "text-[#355242]"
                        )}
                      >
                        +{GRADE_HOUR_MAP[g]}j
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (6 cols): Solid Deep Forest Green (#014F2F) AI Telemetry & S-Flow Panel */}
          <div
            aria-live="polite"
            className="lg:col-span-6 rounded-3xl bg-[#014F2F] text-[#FEFEFE] p-7 sm:p-9 flex flex-col justify-between space-y-6 shadow-[0_24px_52px_-16px_rgba(1,79,47,0.3)]"
          >
            {/* Header: Grade Title & Confidence */}
            <div className="flex items-start justify-between gap-4 border-b border-[#FEFEFE]/15 pb-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#8FD16A]">
                  Hasil Taksir AI · {sample.cultivar}
                </p>
                <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-[#FEFEFE]">
                  Grade {evaluation.effectiveGrade} — {gradeMeta.label}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-[#D6EBD9]">
                  <span className="rounded-md bg-[#FEFEFE]/10 px-2.5 py-1">
                    Keyakinan AI:{" "}
                    <strong className="text-[#8FD16A]">
                      <NumberFlow value={evaluation.confidencePct} />%
                    </strong>
                  </span>
                  <span className="rounded-md bg-[#FEFEFE]/10 px-2.5 py-1">
                    Sisa segar:{" "}
                    <strong className="text-[#FEFEFE]">
                      ± {formatHours(evaluation.remainingFreshHours)}
                    </strong>
                  </span>
                  <span className="rounded-md bg-[#FEFEFE]/10 px-2.5 py-1">
                    Prediksi:{" "}
                    <strong className="text-[#8FD16A]">
                      {formatRupiah(estimatedPrice)}/kg
                    </strong>
                  </span>
                </div>
              </div>

              <GradeBadge grade={evaluation.effectiveGrade} size="lg" />
            </div>

            {/* Post-Harvest Time Slider */}
            <div className="rounded-2xl bg-[#072E1B]/55 border border-[#FEFEFE]/12 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <label
                  htmlFor="scanner-hours-slider"
                  className="font-semibold text-[#FEFEFE]"
                >
                  Simulasi Jam Sejak Panen
                </label>
                <span className="font-mono font-bold text-[#8FD16A] tabular-nums">
                  +{hoursSinceHarvest} jam
                </span>
              </div>
              <input
                id="scanner-hours-slider"
                type="range"
                min={0}
                max={96}
                step={2}
                value={hoursSinceHarvest}
                onChange={(e) => setHoursSinceHarvest(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#FEFEFE]/20 accent-[#65AF3E]"
              />
              <div className="flex justify-between font-mono text-[11px] text-[#D6EBD9]">
                <span>0j (Baru petik)</span>
                <span>24j</span>
                <span>48j</span>
                <span>72j</span>
                <span>96j (Pakan/Kompos)</span>
              </div>
            </div>

            {/* Safety Downgrade Rule Notice / Toggle */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 rounded-2xl border border-[#FEFEFE]/15 bg-[#FEFEFE]/8 p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simulateDoubt}
                  onChange={(e) => setSimulateDoubt(e.target.checked)}
                  className="mt-0.5 size-4 rounded accent-[#65AF3E] cursor-pointer"
                />
                <div className="text-xs leading-relaxed">
                  <strong className="font-semibold text-[#FEFEFE] block">
                    Uji aturan pengaman: “Bila AI ragu (&lt;70%) → turun 1 tingkat”
                  </strong>
                  <span className="text-[#D6EBD9]">
                    Simulasikan foto kurang cahaya untuk melihat sistem otomatis
                    menurunkan grade demi menjaga kepercayaan konsumen.
                  </span>
                </div>
              </label>

              {evaluation.downgradedBySafetyRule ? (
                <div className="flex items-start gap-2.5 rounded-xl border border-[#8FD16A]/40 bg-[#072E1B] p-3.5 text-xs text-[#FEFEFE]">
                  <CornerRightDown
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-[#8FD16A]"
                  />
                  <span>
                    <strong>Aturan pengaman aktif:</strong> Karena keyakinan di bawah
                    70%, lot diturunkan dari Grade {evaluation.rawGrade} menjadi{" "}
                    <strong className="text-[#8FD16A]">
                      Grade {evaluation.effectiveGrade}
                    </strong>
                    .
                  </span>
                </div>
              ) : null}
            </div>

            {/* Physical Reasons & Automatic Grade Allocation */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-4 border-t border-[#FEFEFE]/15">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#8FD16A]">
                  Indikator Fisik Terbaca
                </p>
                <ul className="mt-3 space-y-2 text-xs text-[#FEFEFE]">
                  {evaluation.reasons.map((reason) => (
                    <li key={reason.text} className="flex items-start gap-2">
                      {reason.positive ? (
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-3.5 shrink-0 text-[#8FD16A]"
                        />
                      ) : (
                        <Clock
                          aria-hidden="true"
                          className="mt-0.5 size-3.5 shrink-0 text-[#D6EBD9]"
                        />
                      )}
                      <span>{reason.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#8FD16A]">
                  Konsumen Tujuan Otomatis
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#D6EBD9]">
                  {evaluation.transitionNote}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {gradeMeta.destinations.map((dest) => (
                    <span
                      key={dest}
                      className="rounded-lg bg-[#FEFEFE] px-3 py-1 text-xs font-bold text-[#014F2F]"
                    >
                      {dest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
