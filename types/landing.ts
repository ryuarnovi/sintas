/**
 * @file Landing Page Domain Types - Domain contracts for grades, harvest lots, AI scanner, pricing engine, and navigation.
 */

import type { AsyncState, ThemeTone } from "./common";

export type Grade = "A" | "B" | "C" | "D";

export type CommodityId = "tomat" | "selada" | "sawi" | "cabai" | "wortel" | "kubis";

export type ScannerCommodityId = Extract<CommodityId, "tomat" | "selada" | "sawi" | "cabai">;

export type BuyerSegmentId =
  | "dapur-mbg"
  | "restoran"
  | "katering"
  | "ritel"
  | "umkm"
  | "perorangan"
  | "pengolah"
  | "pengepul"
  | "peternak"
  | "kompos";

export type IconName =
  | "Camera"
  | "ScanSearch"
  | "ScanLine"
  | "Sparkles"
  | "MapPin"
  | "Map"
  | "Workflow"
  | "ArrowRightLeft"
  | "Route"
  | "Recycle"
  | "CornerRightDown"
  | "Tag"
  | "Receipt"
  | "ChartSpline"
  | "TrendingUp"
  | "TrendingDown"
  | "Sprout"
  | "Wheat"
  | "Leaf"
  | "Timer"
  | "Clock"
  | "ShieldCheck"
  | "BadgeCheck"
  | "FingerprintPattern"
  | "Tractor"
  | "CookingPot"
  | "UtensilsCrossed"
  | "ChefHat"
  | "Store"
  | "User"
  | "Warehouse"
  | "Bug"
  | "Egg"
  | "Shovel"
  | "CircleCheck"
  | "CircleX"
  | "ArrowRight"
  | "ArrowUpRight"
  | "Users"
  | "FileQuestionMark"
  | "CalendarClock"
  | "Ban"
  | "Truck"
  | "Wallet"
  | "Cpu"
  | "AtSign"
  | "Info";

export interface GradeMeta {
  readonly grade: Grade;
  readonly label: string;
  readonly shortCondition: string;
  readonly detailDescription: string;
  readonly destinations: readonly string[];
  readonly segmentIds: readonly BuyerSegmentId[];
  readonly badgeClass: string;
  readonly textLightClass: string;
  readonly textDarkClass: string;
  readonly borderClass: string;
  readonly hexColor: string;
  readonly priceMultiplier: number;
  readonly narrative: string;
}

export interface BuyerSegment {
  readonly id: BuyerSegmentId;
  readonly label: string;
  readonly shortLabel: string;
  readonly icon: IconName;
  readonly acceptedGrades: readonly Grade[];
  readonly volumeNote: string;
  readonly typicalUse: string;
}

export interface HarvestLot {
  readonly id: string;
  readonly code: string;
  readonly commodity: CommodityId;
  readonly commodityLabel: string;
  readonly variety: string;
  readonly grade: Grade;
  readonly weightKg: number;
  readonly pricePerKg: number;
  readonly floorPricePerKg: number;
  readonly remainingHours: number;
  readonly nextGradeAt: string;
  readonly farmerName: string;
  readonly farmerGroup: string;
  readonly regency: string;
  readonly coordinates: readonly [number, number]; // [lng, lat]
  readonly distanceKm: number;
  readonly confidencePct: number;
  readonly imageUrl: string;
  readonly verifiedTimestamp: string;
  readonly matchedBuyer: string;
}

export interface BoundingBoxAnnotation {
  readonly id: string;
  readonly label: string;
  readonly metric: string;
  readonly xPct: number;
  readonly yPct: number;
  readonly widthPct: number;
  readonly heightPct: number;
  readonly status: "optimal" | "warning" | "degraded";
}

export interface ScannerThresholdRule {
  readonly maxHours: number;
  readonly grade: Grade;
  readonly confidenceBase: number;
  readonly remainingFreshHours: number;
  readonly transitionNote: string;
  readonly reasons: readonly {
    readonly text: string;
    readonly positive: boolean;
  }[];
  readonly boxes: readonly BoundingBoxAnnotation[];
}

export interface ScannerSample {
  readonly id: ScannerCommodityId;
  readonly name: string;
  readonly cultivar: string;
  readonly originRegency: string;
  readonly lotWeightKg: number;
  readonly baseReferencePrice: number;
  readonly imagesByGrade: Readonly<Record<Grade, string>>;
  readonly thresholds: readonly ScannerThresholdRule[];
}

export type ScannerSimulationState =
  | { readonly status: "scanning"; readonly progress: number; readonly sampleId: ScannerCommodityId }
  | {
      readonly status: "evaluated";
      readonly sampleId: ScannerCommodityId;
      readonly hoursSinceHarvest: number;
      readonly rawGrade: Grade;
      readonly effectiveGrade: Grade;
      readonly downgradedBySafetyRule: boolean;
      readonly confidencePct: number;
      readonly remainingFreshHours: number;
      readonly transitionNote: string;
      readonly reasons: readonly { readonly text: string; readonly positive: boolean }[];
      readonly boxes: readonly BoundingBoxAnnotation[];
    };

export interface PriceSeriesPoint {
  readonly dayLabel: string;
  readonly dayOffset: number;
  readonly isForecast: boolean;
  readonly pricesByGrade: Readonly<Record<Grade, number>>;
  readonly forecastBand?: {
    readonly low: number;
    readonly high: number;
  };
}

export interface CommodityPriceModel {
  readonly id: ScannerCommodityId;
  readonly name: string;
  readonly unit: "kg";
  readonly referencePrice: number;
  readonly deliveryEstimatePerKg: number;
  readonly platformFeeRate: number;
  readonly riskReserveRate: number;
  readonly floorCostPerKg: number;
  readonly supplyFactor: number;
  readonly freshnessDiscountByGrade: Readonly<Record<Grade, number>>;
  readonly harvestAdviceNote: string;
  readonly series: readonly PriceSeriesPoint[];
}

export interface PriceBreakdownResult {
  readonly buyerPrice: number;
  readonly deliveryEstimate: number;
  readonly platformFee: number;
  readonly riskReserve: number;
  readonly netFarmerPrice: number;
  readonly floorCost: number;
  readonly finalRecommendedPrice: number;
  readonly recommendation: "PANEN_SEKARANG" | "TUNDA_PANEN";
  readonly marginAboveFloor: number;
}

export interface PlantingWindow {
  readonly month: string;
  readonly demandIndex: number; // 0-100
  readonly recommendedCrop: string;
  readonly weatherNote: string;
  readonly highlight: boolean;
}

export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: `#${string}` | `/${string}`;
  readonly theme: ThemeTone;
}

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly category: "umum" | "ai" | "harga" | "operasional";
}

export interface CitationSource {
  readonly id: string;
  readonly claim: string;
  readonly publisher: string;
  readonly dateLabel: string;
  readonly note?: string;
}

export interface ContactFormPayload {
  readonly fullName: string;
  readonly email: string;
  readonly role: "petani" | "pembeli" | "lainnya";
  readonly message: string;
}

export interface ContactReceipt {
  readonly referenceCode: string;
  readonly fullName: string;
}

export type ContactSubmissionState = AsyncState<ContactReceipt>;
