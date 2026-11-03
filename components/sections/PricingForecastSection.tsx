/**
 * @file PricingForecastSection Component - Minimalist harvest economics & AI price forecast studio in #FEFEFE white and #014F2F forest green.
 */

"use client";

import NumberFlow from "@number-flow/react";
import { Check, Clock } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GradeBadge } from "@/components/ui/GradeBadge";
import { SourceNote } from "@/components/ui/SourceNote";
import { GRADE_ORDER, GRADES } from "@/constants/grades";
import { COMMODITY_PRICE_MODELS, PLANTING_WINDOWS } from "@/constants/prices";
import { calculatePriceBreakdown, formatRupiah } from "@/lib/format";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Grade, ScannerCommodityId } from "@/types/landing";

const COMMODITY_TABS: readonly {
  readonly id: ScannerCommodityId;
  readonly label: string;
}[] = [
  { id: "tomat", label: "Tomat Apel" },
  { id: "selada", label: "Selada Keriting" },
  { id: "sawi", label: "Sawi Hijau" },
  { id: "cabai", label: "Cabai Keriting" },
] as const;

export function PricingForecastSection() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedCommodity, setSelectedCommodity] =
    useState<ScannerCommodityId>("tomat");
  const [selectedGrade, setSelectedGrade] = useState<Grade>("A");
  const [lotWeightKg, setLotWeightKg] = useState<number>(120);
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number>(4);

  const model = COMMODITY_PRICE_MODELS[selectedCommodity];
  const breakdown = useMemo(
    () => calculatePriceBreakdown(model, selectedGrade, lotWeightKg),
    [model, selectedGrade, lotWeightKg]
  );

  const chartGeometry = useMemo(() => {
    const width = 640;
    const height = 220;
    const padLeft = 54;
    const padRight = 24;
    const padTop = 24;
    const padBottom = 32;
    const innerW = width - padLeft - padRight;
    const innerH = height - padTop - padBottom;

    const allGradeAPrices = model.series.map(
      (pt) => pt.forecastBand?.high ?? pt.pricesByGrade.A
    );
    const maxPrice = Math.max(...allGradeAPrices) * 1.08;

    const xForIndex = (idx: number) =>
      padLeft + (idx / (model.series.length - 1)) * innerW;
    const yForPrice = (price: number) =>
      padTop + innerH - (price / maxPrice) * innerH;

    const buildPath = (grade: Grade, forecastOnly: boolean) => {
      const points = model.series
        .map((pt, idx) => ({ pt, idx }))
        .filter(({ pt, idx }) =>
          forecastOnly ? pt.isForecast || idx === 4 : !pt.isForecast
        );
      return points
        .map(
          ({ pt, idx }, i) =>
            `${i === 0 ? "M" : "L"} ${xForIndex(idx).toFixed(1)} ${yForPrice(
              pt.pricesByGrade[grade]
            ).toFixed(1)}`
        )
        .join(" ");
    };

    const forecastIndices = [4, 5, 6, 7];
    const upperBand = forecastIndices.map((idx) => {
      const pt = model.series[idx];
      const high = pt.forecastBand?.high ?? pt.pricesByGrade.A;
      return `${xForIndex(idx).toFixed(1)},${yForPrice(high).toFixed(1)}`;
    });
    const lowerBand = [...forecastIndices].reverse().map((idx) => {
      const pt = model.series[idx];
      const low = pt.forecastBand?.low ?? pt.pricesByGrade.A;
      return `${xForIndex(idx).toFixed(1)},${yForPrice(low).toFixed(1)}`;
    });
    const bandPolygon = [...upperBand, ...lowerBand].join(" ");
    const floorY = yForPrice(model.floorCostPerKg);

    return {
      width,
      height,
      maxPrice,
      xForIndex,
      yForPrice,
      buildPath,
      bandPolygon,
      floorY,
    };
  }, [model]);

  const activePoint = model.series[hoveredPointIdx] ?? model.series[4];

  return (
    <section
      id="harga"
      className="relative bg-[#EBF4EC] text-[#072E1B] py-20 sm:py-24 border-y border-[#C4DEC9]"
    >
      <div className="mx-auto max-w-[1560px] px-6 sm:px-10 lg:px-16">
        {/* Header + Commodity Selector */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="PREDIKSI HARGA AI BY GRADE, PANEN & TANAM"
            title={
              <>
                Prediksi harga per grade dan{" "}
                <span className="text-[#65AF3E]">waktu panen/tanam terbaik.</span>
              </>
            }
            description="Simulasikan proyeksi harga pasar per Grade A–D, perhitungan ongkos bersih petani, serta rekomendasi AI kapan waktu terbaik untuk memanen atau menanam."
          />

          <div
            role="tablist"
            aria-label="Pilih komoditas"
            className="inline-flex flex-wrap gap-1.5 rounded-xl border border-[#C4DEC9] bg-[#FEFEFE] p-1.5 shrink-0 shadow-2xs"
          >
            {COMMODITY_TABS.map((tab) => {
              const active = selectedCommodity === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCommodity(tab.id)}
                  className={cn(
                    "h-9 rounded-full px-4 text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                    active
                      ? "bg-[#014F2F] text-[#FEFEFE]"
                      : "text-[#4A6155] hover:text-[#012A19]"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 12-Column Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left (7 cols): Multi-Grade Price Forecast Chart */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6 rounded-3xl border border-[#014F2F]/12 bg-[#FEFEFE] p-6 sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#014F2F]">
                  Riwayat H-20 & Proyeksi AI 14 Hari
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-[#012A19]">
                  {model.name}: trayektori harga Grade A–D
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {GRADE_ORDER.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGrade(g)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 transition-all cursor-pointer",
                      selectedGrade === g
                        ? "border-[#014F2F] bg-[#014F2F] text-[#FEFEFE] font-semibold"
                        : "border-[#014F2F]/15 bg-[#F6F9F7] text-[#4A6155]"
                    )}
                  >
                    <span>Grade {g}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clean SVG Chart on #F6F9F7 */}
            <div className="relative overflow-x-auto rounded-2xl border border-[#014F2F]/10 bg-[#F6F9F7] p-4">
              <svg
                viewBox={`0 0 ${chartGeometry.width} ${chartGeometry.height}`}
                className="h-56 min-w-[34rem] sm:h-64 w-full overflow-visible select-none"
                role="img"
                aria-label={`Grafik riwayat dan prediksi harga ${model.name}`}
              >
                {[0.25, 0.5, 0.75, 1].map((ratio) => {
                  const priceVal =
                    Math.round((chartGeometry.maxPrice * ratio) / 500) * 500;
                  const y = chartGeometry.yForPrice(priceVal);
                  return (
                    <g key={ratio}>
                      <line
                        x1="50"
                        y1={y}
                        x2="616"
                        y2={y}
                        stroke="#014F2F"
                        strokeOpacity="0.1"
                        strokeDasharray="3 4"
                      />
                      <text
                        x="44"
                        y={y + 3}
                        textAnchor="end"
                        className="font-mono tabular-nums text-[9.5px] fill-[#4A6155]"
                      >
                        {(priceVal / 1000).toFixed(0)}rb
                      </text>
                    </g>
                  );
                })}

                {/* Divider at Hari Ini */}
                <line
                  x1={chartGeometry.xForIndex(4)}
                  y1="18"
                  x2={chartGeometry.xForIndex(4)}
                  y2="192"
                  stroke="#014F2F"
                  strokeOpacity="0.4"
                  strokeDasharray="4 4"
                />
                <text
                  x={chartGeometry.xForIndex(4) + 6}
                  y="28"
                  className="font-mono text-[9.5px] font-semibold fill-[#014F2F]"
                >
                  PREDIKSI AI 14 HARI →
                </text>

                {/* Farmer Floor Cost Line */}
                <line
                  x1="54"
                  y1={chartGeometry.floorY}
                  x2="616"
                  y2={chartGeometry.floorY}
                  stroke="#012A19"
                  strokeOpacity="0.45"
                  strokeWidth="1.25"
                  strokeDasharray="6 4"
                />
                <text
                  x="612"
                  y={chartGeometry.floorY - 5}
                  textAnchor="end"
                  className="font-mono text-[9px] fill-[#012A19]"
                >
                  Batas bawah biaya petani ({formatRupiah(model.floorCostPerKg)})
                </text>

                {/* Confidence Band */}
                <polygon
                  points={chartGeometry.bandPolygon}
                  fill="#014F2F"
                  fillOpacity="0.12"
                />

                {GRADE_ORDER.map((grade) => {
                  const color = GRADES[grade].hexColor;
                  const isFocused = selectedGrade === grade;
                  return (
                    <g
                      key={grade}
                      style={{ opacity: isFocused ? 1 : 0.35 }}
                      className="transition-opacity duration-200"
                    >
                      <motion.path
                        key={`hist-${selectedCommodity}-${grade}`}
                        d={chartGeometry.buildPath(grade, false)}
                        fill="none"
                        stroke={color}
                        strokeWidth={isFocused ? 3 : 1.75}
                        strokeLinecap="round"
                        initial={prefersReducedMotion ? false : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: duration.slower, ease: ease.out }}
                      />
                      <path
                        d={chartGeometry.buildPath(grade, true)}
                        fill="none"
                        stroke={color}
                        strokeWidth={isFocused ? 2.75 : 1.5}
                        strokeDasharray="5 4"
                        strokeLinecap="round"
                      />
                    </g>
                  );
                })}

                {model.series.map((pt, idx) => {
                  const x = chartGeometry.xForIndex(idx);
                  const isHovered = idx === hoveredPointIdx;
                  return (
                    <g
                      key={pt.dayLabel}
                      onClick={() => setHoveredPointIdx(idx)}
                      onMouseEnter={() => setHoveredPointIdx(idx)}
                      className="cursor-pointer"
                    >
                      <rect
                        x={x - 24}
                        y="16"
                        width="48"
                        height="185"
                        fill="transparent"
                      />
                      {GRADE_ORDER.map((g) => (
                        <circle
                          key={g}
                          cx={x}
                          cy={chartGeometry.yForPrice(pt.pricesByGrade[g])}
                          r={isHovered ? 4.5 : 3}
                          fill={GRADES[g].hexColor}
                          stroke="#FEFEFE"
                          strokeWidth="1.5"
                        />
                      ))}
                      <text
                        x={x}
                        y="208"
                        textAnchor="middle"
                        className={cn(
                          "font-mono tabular-nums text-[10px]",
                          isHovered
                            ? "fill-[#012A19] font-bold"
                            : "fill-[#4A6155]"
                        )}
                      >
                        {pt.dayLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="mt-3 pt-3 border-t border-[#014F2F]/10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <span className="font-semibold text-[#014F2F]">
                  {activePoint.dayLabel}{" "}
                  {activePoint.isForecast ? "(Prediksi AI)" : "(Aktual)"}
                </span>
                <div className="flex flex-wrap items-center gap-3 text-[#012A19]">
                  {GRADE_ORDER.map((g) => (
                    <span key={g}>
                      <strong>{g}:</strong> {formatRupiah(activePoint.pricesByGrade[g])}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-[#4A6155] leading-relaxed">
              {model.harvestAdviceNote}
            </p>
          </div>

          {/* Right (5 cols): Minimalist "Panen atau Tunda?" Calculator */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 rounded-3xl border border-[#014F2F]/12 bg-[#FEFEFE] p-6 sm:p-9">
            <div className="space-y-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#014F2F]">
                  Kalkulator Transparansi Harga
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-[#012A19]">
                  Hitung harga bersih petani
                </h3>
              </div>

              {/* Grade & Volume Controls */}
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-1.5 rounded-xl bg-[#F6F9F7] p-1 border border-[#014F2F]/10">
                  {GRADE_ORDER.map((g) => {
                    const active = selectedGrade === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setSelectedGrade(g)}
                        className={cn(
                          "h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                          active
                            ? "bg-[#014F2F] text-[#FEFEFE]"
                            : "text-[#4A6155] hover:text-[#012A19]"
                        )}
                      >
                        Grade {g}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <label
                    htmlFor="calc-weight-slider"
                    className="flex justify-between font-mono text-xs text-[#4A6155]"
                  >
                    <span>Volume Panen</span>
                    <strong className="text-[#012A19]">{lotWeightKg} kg</strong>
                  </label>
                  <input
                    id="calc-weight-slider"
                    type="range"
                    min={40}
                    max={300}
                    step={20}
                    value={lotWeightKg}
                    onChange={(e) => setLotWeightKg(Number(e.target.value))}
                    className="mt-2 h-2 w-full accent-[#014F2F] cursor-pointer"
                  />
                </div>
              </div>

              {/* Clean Ledger Breakdown */}
              <div className="divide-y divide-[#014F2F]/10 border-y border-[#014F2F]/12 py-2 font-mono text-xs">
                <div className="flex items-center justify-between py-2.5">
                  <span className="font-sans text-[#4A6155]">Harga Pembeli</span>
                  <strong className="text-sm text-[#012A19] tabular-nums">
                    Rp
                    <NumberFlow value={breakdown.buyerPrice} />
                    /kg
                  </strong>
                </div>
                <div className="flex justify-between py-2 text-[#4A6155]">
                  <span className="font-sans">− Estimasi Ongkos Antar</span>
                  <span>{formatRupiah(breakdown.deliveryEstimate)}</span>
                </div>
                <div className="flex justify-between py-2 text-[#4A6155]">
                  <span className="font-sans">− Biaya Platform (5%)</span>
                  <span>{formatRupiah(breakdown.platformFee)}</span>
                </div>
                <div className="flex justify-between py-2 text-[#4A6155]">
                  <span className="font-sans">− Cadangan Risiko (4%)</span>
                  <span>{formatRupiah(breakdown.riskReserve)}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="font-sans font-semibold text-[#012A19]">
                    Harga Bersih Petani
                  </span>
                  <strong className="text-base font-bold text-[#014F2F] tabular-nums">
                    Rp
                    <NumberFlow value={breakdown.netFarmerPrice} />
                    /kg
                  </strong>
                </div>
                <div className="flex items-center justify-between py-2 text-[11px] text-[#4A6155]">
                  <span className="font-sans">Batas Bawah Biaya Pokok</span>
                  <span>{formatRupiah(breakdown.floorCost)}/kg</span>
                </div>
              </div>
            </div>

            {/* Recommendation Decision Box */}
            <div
              aria-live="polite"
              className={cn(
                "rounded-2xl border p-5",
                breakdown.recommendation === "PANEN_SEKARANG"
                  ? "border-[#014F2F] bg-[#014F2F] text-[#FEFEFE]"
                  : "border-[#014F2F]/20 bg-[#F6F9F7] text-[#012A19]"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider opacity-80">
                  Saran Keputusan AI
                </span>
                <GradeBadge grade={selectedGrade} size="sm" />
              </div>

              {breakdown.recommendation === "PANEN_SEKARANG" ? (
                <div className="mt-2">
                  <div className="inline-flex items-center gap-2 font-display text-xl font-semibold">
                    <Check aria-hidden="true" className="size-5 text-[#65AF3E]" />
                    <span>Panen Sekarang</span>
                  </div>
                  <p className="mt-1 text-xs text-[#FEFEFE]/85 leading-relaxed">
                    Harga bersih petani berada{" "}
                    <strong>+{formatRupiah(breakdown.marginAboveFloor)}/kg</strong> di
                    atas batas bawah biaya panen dan kemas.
                  </p>
                </div>
              ) : (
                <div className="mt-2">
                  <div className="inline-flex items-center gap-2 font-display text-xl font-semibold text-[#012A19]">
                    <Clock aria-hidden="true" className="size-5 text-[#014F2F]" />
                    <span>Tunda Panen / Alihkan</span>
                  </div>
                  <p className="mt-1 text-xs text-[#4A6155] leading-relaxed">
                    Di bawah batas bawah ({formatRupiah(breakdown.floorCost)}/kg).
                    Disarankan alihkan ke pembeli pakan/kompos tanpa biaya kemas ritel.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom 6-Highlight Seasonal Planting Strip */}
        <div className="mt-8 rounded-3xl border border-[#014F2F]/12 bg-[#FEFEFE] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#014F2F]/10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#014F2F]">
                Rekomendasi Kalender Tanam
              </p>
              <h3 className="mt-0.5 font-display text-xl font-semibold text-[#012A19]">
                Jendela tanam dengan serapan pasar tertinggi
              </h3>
            </div>
            <SourceNote>
              Rekomendasi harga dan jadwal tanam bersifat panduan terbuka, bukan penetapan sepihak.
            </SourceNote>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {PLANTING_WINDOWS.filter((_, i) => i % 2 === 0 || PLANTING_WINDOWS[i].highlight)
              .slice(0, 6)
              .map((win) => (
                <div
                  key={win.month}
                  className="rounded-2xl border border-[#014F2F]/10 bg-[#F6F9F7] p-4"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-semibold text-[#012A19]">{win.month}</span>
                    <span className="text-[#014F2F]">Indeks {win.demandIndex}</span>
                  </div>
                  <div className="mt-2 font-display text-sm font-semibold text-[#012A19]">
                    {win.recommendedCrop}
                  </div>
                  <p className="mt-1 text-xs text-[#4A6155] leading-snug">
                    {win.weatherNote}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
