/**
 * @file Navigation & Section Theme Configuration - Top header navigation items and section theme registry.
 */

import type { ThemeTone } from "@/types/common";
import type { NavItem } from "@/types/landing";

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "beranda", label: "Beranda", href: "#beranda", theme: "light" },
  { id: "cara-kerja", label: "Solusi", href: "#cara-kerja", theme: "light" },
  { id: "ai", label: "AI Grade", href: "#ai", theme: "light" },
  { id: "untuk-siapa", label: "Ekosistem", href: "#untuk-siapa", theme: "dark" },
  { id: "harga", label: "Harga", href: "#harga", theme: "mist" },
  { id: "masalah", label: "Dampak", href: "#masalah", theme: "light" },
  { id: "faq", label: "FAQ", href: "#faq", theme: "mist" },
] as const;

export interface SectionThemeEntry {
  readonly id: string;
  readonly theme: ThemeTone;
}

export const SECTION_THEME_REGISTRY: readonly SectionThemeEntry[] = [
  { id: "beranda", theme: "light" },
  { id: "cara-kerja", theme: "light" },
  { id: "ai", theme: "light" },
  { id: "untuk-siapa", theme: "dark" },
  { id: "harga", theme: "mist" },
  { id: "masalah", theme: "light" },
  { id: "faq", theme: "mist" },
] as const;
