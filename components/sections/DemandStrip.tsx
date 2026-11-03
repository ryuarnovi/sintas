/**
 * @file DemandStrip Component - 4-column macro market & MBG mandate numbers inside the #014F2F Audience section.
 */

"use client";

import NumberFlow from "@number-flow/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { CITATION_SOURCES } from "@/constants/sources";

export function DemandStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className="mt-12 pt-10 border-t border-[#FEFEFE]/15 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div className="rounded-2xl bg-[#072E1B]/65 border border-[#FEFEFE]/12 p-5">
        <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#8FD16A] tabular-nums">
          <NumberFlow value={inView ? 27486 : 0} format={{ useGrouping: true }} />
        </div>
        <p className="mt-2 text-sm font-medium text-[#FEFEFE]">
          Dapur MBG (SPPG) beroperasi melayani 57 juta penerima
        </p>
        <p className="mt-1 font-mono text-[11px] text-[#D6EBD9]/80">
          Sumber: {CITATION_SOURCES.bgnDapurOperasi.publisher},{" "}
          {CITATION_SOURCES.bgnDapurOperasi.dateLabel}
        </p>
      </div>

      <div className="rounded-2xl bg-[#072E1B]/65 border border-[#FEFEFE]/12 p-5">
        <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FEFEFE] tabular-nums">
          ≥<NumberFlow value={inView ? 15 : 0} />
        </div>
        <p className="mt-2 text-sm font-medium text-[#FEFEFE]">
          Pemasok lokal wajib dilibatkan oleh setiap dapur MBG
        </p>
        <p className="mt-1 font-mono text-[11px] text-[#D6EBD9]/80">
          Sumber: {CITATION_SOURCES.bgnSuppliers.publisher},{" "}
          {CITATION_SOURCES.bgnSuppliers.dateLabel}
        </p>
      </div>

      <div className="rounded-2xl bg-[#072E1B]/65 border border-[#FEFEFE]/12 p-5">
        <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FEFEFE] tabular-nums">
          1–5
        </div>
        <p className="mt-2 text-sm font-medium text-[#FEFEFE]">
          Rata-rata pemasok nyata di ~80 dapur Solo Raya saat ini
        </p>
        <p className="mt-1 font-mono text-[11px] text-[#D6EBD9]/80">
          Sumber: {CITATION_SOURCES.tirtoSoloRaya.publisher},{" "}
          {CITATION_SOURCES.tirtoSoloRaya.dateLabel}
        </p>
      </div>

      <div className="rounded-2xl bg-[#072E1B]/65 border border-[#FEFEFE]/12 p-5">
        <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#8FD16A] tabular-nums">
          USD 1,15 M
        </div>
        <p className="mt-2 text-sm font-medium text-[#FEFEFE]">
          Pasar agritech Indonesia (+18,7% CAGR hingga 2031)
        </p>
        <p className="mt-1 font-mono text-[11px] text-[#D6EBD9]/80">
          Sumber: {CITATION_SOURCES.kenResearchMarket.publisher}
        </p>
      </div>
    </div>
  );
}
