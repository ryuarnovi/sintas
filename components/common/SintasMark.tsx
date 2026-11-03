/**
 * @file SintasMark Component - Renders the official SINTAS brand icon (/brand/sintas-ikon.png).
 */

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types/common";

export interface SintasMarkProps extends WithClassName {
  readonly size?: number;
  readonly inverted?: boolean;
}

export function SintasMark({ size = 36, className }: SintasMarkProps) {
  return (
    <span
      style={{ width: size, height: size }}
      className={cn("relative inline-block shrink-0 select-none", className)}
    >
      <Image
        src="/brand/sintas-ikon.png"
        alt="Logo SINTAS"
        fill
        sizes={`${size * 2}px`}
        className="object-contain"
      />
    </span>
  );
}
