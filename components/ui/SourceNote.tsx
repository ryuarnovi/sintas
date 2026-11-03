/**
 * @file SourceNote & IllustrationTag & LotCard & StatCard & Marquee - Updated for crisp white startup visual system.
 */

import { Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types/common";

export interface SourceNoteProps extends WithClassName {
  readonly children: ReactNode;
  readonly tone?: "default" | "dark" | "lime";
}

export function SourceNote({ children, tone = "default", className }: SourceNoteProps) {
  const toneClass =
    tone === "dark"
      ? "text-slate-300"
      : tone === "lime"
        ? "text-slate-700"
        : "text-slate-500";

  return (
    <p className={cn("inline-flex items-start gap-1.5 text-xs leading-relaxed", toneClass, className)}>
      <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-slate-400" strokeWidth={1.75} />
      <span>{children}</span>
    </p>
  );
}
