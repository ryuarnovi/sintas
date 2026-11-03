/**
 * @file Root Error Boundary - Client error recovery boundary styled with SINTAS tokens.
 */

"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper-50 px-6 text-center text-forest-900">
      <div className="max-w-md rounded-card border border-forest-900/15 bg-white p-8 shadow-float">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-amber-700">
          GANGGUAN PEMUATAN
        </span>
        <h1 className="mt-2 font-display text-2xl font-bold">
          Terjadi kendala saat menampilkan halaman
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {error.message || "Silakan muat ulang komponen untuk melanjutkan."}
        </p>
        <div className="mt-6">
          <Button
            onClick={reset}
            variant="primary"
            leadingIcon={<RotateCcw aria-hidden="true" className="size-4" />}
          >
            Muat ulang halaman
          </Button>
        </div>
      </div>
    </div>
  );
}
