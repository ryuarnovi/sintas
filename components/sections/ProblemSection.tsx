/**
 * @file ProblemSection Component - Editorial data story on #FEFEFE white featuring Bappenas metrics, PriceCrashChart, and a Split "Kondisi Lama vs. Solusi SINTAS" Transformation Board.
 */

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Recycle,
  Scale,
  Users,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PriceCrashChart } from "@/components/sections/PriceCrashChart";
import { SourceNote } from "@/components/ui/SourceNote";

const PROBLEM_TO_SOLUTION_ROWS = [
  {
    step: "01",
    problemTitle: "Pembeli Terbatas (1–2 Pengepul)",
    problemDetail:
      "Petani hanya bergantung pada tengkulak lokal sehingga harga ditekan sepihak saat panen melimpah.",
    solutionTitle: "Peta Stok Terbuka ke 10+ Segmen Konsumen",
    solutionDetail:
      "Stok kebun langsung dilihat oleh Restoran, Dapur MBG, Katering, UMKM, hingga Peternak.",
    metricBadge: "Akses Pasar 5× Lebih Luas",
    icon: Users,
  },
  {
    step: "02",
    problemTitle: "Mutu Sulit Dibuktikan Jarak Jauh",
    problemDetail:
      "Tanpa standar kualitas objektif, konsumen institusi ragu memesan langsung dari kelompok tani.",
    solutionTitle: "Kamera AI Penentu Grade A, B, C, D",
    solutionDetail:
      "Satu foto panen menghasilkan skor mutu visual beserta estimasi sisa jam kesegaran.",
    metricBadge: "Taksir Objektif < 3 Detik",
    icon: Scale,
  },
  {
    step: "03",
    problemTitle: "Panen Raya Serempak Tanpa Prediksi",
    problemDetail:
      "Petani menanam komoditas yang sama bersamaan tanpa data proyeksi serapan dan harga pasar.",
    solutionTitle: "Prediksi Harga AI & Rekomendasi Tanam",
    solutionDetail:
      "AI memproyeksikan harga 14 hari ke depan per grade dan memberi sinyal waktu panen/tanam.",
    metricBadge: "Cegah Anjlok Harga −90%",
    icon: AlertTriangle,
  },
  {
    step: "04",
    problemTitle: "Sayur Grade C & D Dibuang di Lahan",
    problemDetail:
      "Sayur yang tidak lolos standar restoran atau ritel dibiarkan membusuk karena tidak ada kanal serapan.",
    solutionTitle: "Alokasi Berjenjang S-Flow Tanpa Sisa",
    solutionDetail:
      "Grade C otomatis disalurkan ke UMKM olahan saus/kuliner, dan Grade D ke peternak & kompos.",
    metricBadge: "100% Panen Terserap",
    icon: Recycle,
  },
] as const;

export function ProblemSection() {
  return (
    <section
      id="masalah"
      className="relative bg-[#FEFEFE] text-[#072E1B] py-20 sm:py-24 border-b border-[#C4DEC9]"
    >
      <div className="mx-auto max-w-[1560px] px-6 sm:px-10 lg:px-16">
        {/* Top Editorial Header + Key Bappenas Numbers */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end mb-12">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="LATAR MASALAH & TRANSFORMASI SINTAS"
              title={
                <>
                  Panen melimpah, harga runtuh, lalu{" "}
                  <span className="text-[#65AF3E]">sayurnya terbuang.</span>
                </>
              }
              description="Setiap musim panen raya, kelebihan pasokan sesaat membuat harga di tingkat petani anjlok hingga 90%. Di saat yang sama, ribuan dapur institusi kesulitan mencari pemasok segar yang terukur."
            />
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-5">
            <div className="rounded-2xl bg-[#014F2F] text-[#FEFEFE] p-5 shadow-[0_16px_36px_-14px_rgba(1,79,47,0.3)]">
              <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#8FD16A] tabular-nums">
                23–48 Jt Ton
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-[#D6EBD9]">
                Pangan hilang & terbuang per tahun di Indonesia (Kajian Bappenas)
              </p>
            </div>
            <div className="rounded-2xl bg-[#EBF4EC] border border-[#C4DEC9] p-5">
              <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#014F2F] tabular-nums">
                Rp213–551 T
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-[#355242]">
                Kerugian ekonomi tahunan, setara 4–5% PDB nasional
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Price Collapse Chart + Documentary Photo */}
        <PriceCrashChart />

        <div className="mt-4">
          <SourceNote>
            Angka Bappenas mencakup seluruh jenis pangan nasional. Kehilangan pascapanen
            hortikultura sayur dan buah mencapai 40–60% (FAO / WRI).
          </SourceNote>
        </div>

        {/* Distinct Split Transformation Board: "4 Masalah Klasik vs. Solusi Otomatis SINTAS" */}
        <div className="mt-14 rounded-3xl border border-[#C4DEC9] overflow-hidden shadow-soft">
          {/* Board Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#072E1B] text-[#FEFEFE] px-6 py-4 sm:px-8">
            <div className="lg:col-span-6 flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#D6EBD9]">
                4 Titik Runtuhnya Nilai Panen (Pola Lama)
              </span>
            </div>
            <div className="hidden lg:flex lg:col-span-6 items-center gap-2.5 pl-6 border-l border-[#FEFEFE]/15">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#8FD16A]">
                Intervensi AI & Peta Stok SINTAS
              </span>
            </div>
          </div>

          {/* 4 Horizontal Transformation Rows */}
          <div className="divide-y divide-[#C4DEC9]">
            {PROBLEM_TO_SOLUTION_ROWS.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.step}
                  className="grid grid-cols-1 lg:grid-cols-12 items-stretch"
                >
                  {/* Left: The Bottleneck (Mint-Sage #EBF4EC) */}
                  <div className="lg:col-span-6 bg-[#EBF4EC] p-6 sm:px-8 flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#FEFEFE] border border-[#C4DEC9] text-[#014F2F]">
                      <Icon className="size-5" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#014F2F]">
                          MASALAH {row.step}
                        </span>
                      </div>
                      <h3 className="mt-1 font-display text-lg font-bold text-[#072E1B]">
                        {row.problemTitle}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#355242]">
                        {row.problemDetail}
                      </p>
                    </div>
                  </div>

                  {/* Right: The SINTAS Solution (Deep Forest Green #014F2F) */}
                  <div className="lg:col-span-6 bg-[#014F2F] text-[#FEFEFE] p-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t lg:border-t-0 lg:border-l border-[#FEFEFE]/12">
                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#65AF3E] text-[#FEFEFE]">
                        <ArrowRight className="size-4" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="size-3.5 text-[#8FD16A]" />
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#8FD16A]">
                            SOLUSI SINTAS
                          </span>
                        </div>
                        <h4 className="mt-1 font-display text-lg font-bold text-[#FEFEFE]">
                          {row.solutionTitle}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-[#D6EBD9]">
                          {row.solutionDetail}
                        </p>
                      </div>
                    </div>

                    <span className="self-start sm:self-center shrink-0 rounded-xl bg-[#072E1B] border border-[#8FD16A]/30 px-3.5 py-2 font-mono text-xs font-bold text-[#8FD16A]">
                      {row.metricBadge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
