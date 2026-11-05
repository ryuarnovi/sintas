/**
 * @file Root Error Boundary - Client error recovery boundary styled with SINTAS #FEFEFE, #014F2F, and #65AF3E tokens.
 */

"use client";

import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#FEFEFE] px-6 text-center text-[#072E1B]">
      <div className="max-w-lg rounded-3xl border border-[#C4DEC9] bg-[#EBF4EC]/60 p-8 sm:p-10 shadow-[0_20px_50px_-20px_rgba(1,79,47,0.15)]">
        <div className="inline-flex items-center gap-2.5">
          <span aria-hidden="true" className="h-[2px] w-5 bg-[#65AF3E]" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#014F2F]">
            GANGGUAN PEMUATAN
          </span>
          <span aria-hidden="true" className="h-[2px] w-5 bg-[#65AF3E]" />
        </div>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-[#072E1B]">
          Terjadi kendala saat menampilkan halaman
        </h1>
        <p className="mt-2.5 text-sm text-[#355242] leading-relaxed">
          {error.message || "Silakan muat ulang halaman atau kembali ke beranda utama SINTAS."}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={reset}
            variant="primary"
            leadingIcon={<RotateCcw aria-hidden="true" className="size-4" />}
          >
            Muat Ulang Halaman
          </Button>
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#C4DEC9] bg-[#FEFEFE] px-5 text-sm font-semibold text-[#014F2F] hover:bg-[#EBF4EC] transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
