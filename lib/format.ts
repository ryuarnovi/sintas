/**
 * @file Formatting & Pricing Engine Helpers - Indonesian currency/number formatters, price waterfall calculation, and AI grade decay evaluator.
 */

import type {
  CommodityPriceModel,
  Grade,
  PriceBreakdownResult,
  ScannerSample,
  ScannerSimulationState,
} from "@/types/landing";

const idNumberFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 0,
});

export function formatNumber(value: number): string {
  return idNumberFormatter.format(Math.round(value));
}

export function formatRupiah(value: number, withPrefix = true): string {
  const formatted = idNumberFormatter.format(Math.round(value));
  return withPrefix ? `Rp${formatted}` : formatted;
}

export function formatSignedPercent(value: number): string {
  const sign = value < 0 ? "−" : "+";
  return `${sign}${Math.abs(Math.round(value))}%`;
}

export function formatHours(hours: number): string {
  if (hours <= 0) return "Habis masa segar";
  return `${Math.round(hours)} jam`;
}

const GRADE_MULTIPLIERS: Readonly<Record<Grade, number>> = {
  A: 1.0,
  B: 0.74,
  C: 0.36,
  D: 0.16,
};

const NEXT_LOWER_GRADE: Readonly<Record<Grade, Grade>> = {
  A: "B",
  B: "C",
  C: "D",
  D: "D",
};

/**
 * Implements the canonical SINTAS pricing engine:
 * Harga pembeli = harga acuan × pengali grade × diskon kesegaran × faktor pasokan
 * Harga petani  = harga pembeli − estimasi antar − biaya platform − cadangan risiko
 * Final         = max(batas bawah, harga petani)
 */
export function calculatePriceBreakdown(
  model: CommodityPriceModel,
  grade: Grade,
  weightKg: number
): PriceBreakdownResult {
  const multiplier = GRADE_MULTIPLIERS[grade];
  const freshnessDiscount = model.freshnessDiscountByGrade[grade];
  const volumeAdjustment = weightKg >= 200 ? 0.97 : 1.0;

  const buyerPrice = Math.round(
    model.referencePrice * multiplier * freshnessDiscount * model.supplyFactor * volumeAdjustment
  );
  const deliveryEstimate = model.deliveryEstimatePerKg;
  const platformFee = Math.round(buyerPrice * model.platformFeeRate);
  const riskReserve = Math.round(buyerPrice * model.riskReserveRate);
  const netFarmerPrice = Math.max(0, buyerPrice - deliveryEstimate - platformFee - riskReserve);
  const floorCost = model.floorCostPerKg;
  const finalRecommendedPrice = Math.max(floorCost, netFarmerPrice);
  const marginAboveFloor = netFarmerPrice - floorCost;

  return {
    buyerPrice,
    deliveryEstimate,
    platformFee,
    riskReserve,
    netFarmerPrice,
    floorCost,
    finalRecommendedPrice,
    recommendation: netFarmerPrice >= floorCost ? "PANEN_SEKARANG" : "TUNDA_PANEN",
    marginAboveFloor,
  };
}

/**
 * Evaluates a sample lot at a given post-harvest hour and applies the SINTAS safety rule:
 * if AI confidence falls below 70%, automatically downgrade one tier.
 */
export function evaluateScannerLot(
  sample: ScannerSample,
  hoursSinceHarvest: number,
  forceLowConfidence = false
): Extract<ScannerSimulationState, { status: "evaluated" }> {
  const matchedRule =
    sample.thresholds.find((rule) => hoursSinceHarvest <= rule.maxHours) ??
    sample.thresholds[sample.thresholds.length - 1];

  const jitter = ((hoursSinceHarvest * 7) % 5) - 2;
  const rawConfidence = Math.max(
    58,
    Math.min(98, matchedRule.confidenceBase + jitter - (forceLowConfidence ? 24 : 0))
  );

  const downgradedBySafetyRule = rawConfidence < 70 && matchedRule.grade !== "D";
  const effectiveGrade = downgradedBySafetyRule
    ? NEXT_LOWER_GRADE[matchedRule.grade]
    : matchedRule.grade;

  const remainingFreshHours = Math.max(
    0,
    matchedRule.remainingFreshHours - Math.floor(hoursSinceHarvest * 0.35)
  );

  return {
    status: "evaluated",
    sampleId: sample.id,
    hoursSinceHarvest,
    rawGrade: matchedRule.grade,
    effectiveGrade,
    downgradedBySafetyRule,
    confidencePct: rawConfidence,
    remainingFreshHours,
    transitionNote: matchedRule.transitionNote,
    reasons: matchedRule.reasons,
    boxes: matchedRule.boxes,
  };
}
