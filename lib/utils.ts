/**
 * @file General Utilities - Class merging helper (cn) and generic data transformation utilities.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function filterByPredicate<TItem>(
  items: readonly TItem[],
  predicate: (item: TItem, index: number) => boolean
): TItem[] {
  return items.filter(predicate);
}

export function indexByKey<TItem, TKey extends PropertyKey>(
  items: readonly TItem[],
  selector: (item: TItem) => TKey
): Record<TKey, TItem> {
  return items.reduce<Record<TKey, TItem>>(
    (acc, item) => {
      acc[selector(item)] = item;
      return acc;
    },
    {} as Record<TKey, TItem>
  );
}
