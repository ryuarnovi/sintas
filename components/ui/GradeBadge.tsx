/**
 * @file GradeBadge Primitive - Canonical Grade A-D visual badge with guaranteed WCAG AA contrast and letter label.
 */

import { GRADES } from "@/constants/grades";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types/common";
import type { Grade } from "@/types/landing";

export interface GradeBadgeProps extends WithClassName {
  readonly grade: Grade;
  readonly size?: "sm" | "md" | "lg";
  readonly withLabel?: boolean;
  readonly showLabel?: boolean;
  readonly prefix?: string;
}

export function GradeBadge({
  grade,
  size = "md",
  withLabel = false,
  showLabel = false,
  prefix = "Grade",
  className,
}: GradeBadgeProps) {
  const meta = GRADES[grade];
  const displayLabel = withLabel || showLabel;

  if (size === "lg" && !displayLabel) {
    return (
      <span
        className={cn(
          "inline-flex size-14 shrink-0 items-center justify-center rounded-2xl font-mono text-2xl font-bold tracking-tight shadow-soft",
          meta.badgeClass,
          className
        )}
        title={`Grade ${grade}: ${meta.label}`}
      >
        {grade}
      </span>
    );
  }

  const sizeClasses =
    size === "sm"
      ? "h-6 px-2.5 text-xs gap-1.5"
      : size === "lg"
        ? "h-10 px-4 text-sm gap-2"
        : "h-7 px-3 text-xs gap-1.5";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-mono font-semibold tracking-tight whitespace-nowrap",
        sizeClasses,
        meta.badgeClass,
        className
      )}
    >
      <span>{prefix ? `${prefix} ${grade}` : grade}</span>
      {displayLabel ? (
        <>
          <span aria-hidden="true" className="opacity-45">
            ·
          </span>
          <span className="font-sans font-medium">{meta.label}</span>
        </>
      ) : null}
    </span>
  );
}
