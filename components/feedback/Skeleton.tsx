/**
 * @file Skeleton Feedback Component - Accessible loading placeholder for lazy-loaded maps and visual panels.
 */

import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types/common";

export interface SkeletonProps extends WithClassName {
  readonly label?: string;
}

export function Skeleton({ label = "Memuat komponen...", className }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "animate-pulse rounded-card bg-surface-muted border border-border flex items-center justify-center p-8 text-sm font-mono text-fg-muted",
        className
      )}
    >
      <span>{label}</span>
    </div>
  );
}
