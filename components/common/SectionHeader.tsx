/**
 * @file SectionHeader Component - Architectural editorial section header with clean horizontal rule kicker (no pill badges, no circle dots, no plant icons).
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types/common";

export interface SectionHeaderProps extends WithClassName {
  readonly index?: string;
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly align?: "left" | "center";
  readonly pulseDot?: boolean;
  readonly dotTone?: "leaf" | "emerald" | "amber" | "forest";
  readonly badgeColor?: "emerald" | "sky" | "rose" | "indigo" | "amber" | "slate";
  readonly inverted?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3.5",
        isCenter ? "items-center text-center mx-auto max-w-3xl" : "items-start text-left max-w-3xl",
        className
      )}
    >
      <div className="inline-flex items-center gap-3">
        <span
          aria-hidden="true"
          className="h-[2px] w-7 rounded-full bg-[#65AF3E] shrink-0"
        />
        <span
          className={cn(
            "font-mono text-xs font-bold tracking-[0.18em] uppercase",
            inverted ? "text-[#8FD16A]" : "text-[#014F2F]"
          )}
        >
          {eyebrow}
        </span>
        {isCenter ? (
          <span
            aria-hidden="true"
            className="h-[2px] w-7 rounded-full bg-[#65AF3E] shrink-0"
          />
        ) : null}
      </div>

      <h2
        className={cn(
          "font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-balance",
          inverted ? "text-[#FEFEFE]" : "text-[#072E1B]"
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "font-sans text-base sm:text-lg leading-relaxed text-pretty max-w-[60ch]",
            inverted ? "text-[#D6EBD9]" : "text-[#355242]"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
