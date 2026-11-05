/**
 * @file Skeleton & Loading Feedback - Minimalist loading placeholder and official SINTAS branded loading screen on pure #FEFEFE white.
 */

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types/common";

export interface SkeletonProps extends WithClassName {
  readonly label?: string;
}

export function Skeleton({
  label = "Memuat komponen...",
  className,
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "animate-pulse rounded-2xl bg-[#EBF4EC] border border-[#C4DEC9] flex items-center justify-center p-8 text-xs font-mono font-bold text-[#014F2F]",
        className
      )}
    >
      <span>{label}</span>
    </div>
  );
}

export function SintasLoadingView() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Memuat SINTAS"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FEFEFE]"
    >
      <div className="animate-sintas-loader-in flex items-center gap-3.5 select-none">
        <div className="animate-sintas-brand-pulse relative size-12 sm:size-14 shrink-0">
          <Image
            src="/brand/sintas-ikon.png"
            alt="Logo SINTAS"
            fill
            priority
            sizes="56px"
            className="object-contain"
          />
        </div>
        <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#014F2F]">
          SINTAS
        </span>
      </div>
    </div>
  );
}
