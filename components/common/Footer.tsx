/**
 * @file Footer Component - Compact, clean SINTAS & Nirsisa footer in #072E1B and #014F2F without plant icons or excessive vertical height.
 */

import { ArrowRight, ArrowUpRight, AtSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "@/constants/nav";

export function Footer() {
  return (
    <footer className="bg-[#072E1B] text-[#FEFEFE] border-t border-[#014F2F]">
      <div className="mx-auto max-w-[1560px] px-6 sm:px-10 lg:px-16 py-10">
        {/* Single Compact Main Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-8 border-b border-[#FEFEFE]/12">
          {/* Left: Official SINTAS Logo + Nirsisa Parent Brand */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="relative size-10 rounded-xl bg-[#FEFEFE] p-1.5">
                <Image
                  src="/brand/sintas-ikon.png"
                  alt="Logo SINTAS"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-tight text-[#FEFEFE] block leading-none">
                  SINTAS
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8FD16A]">
                  Panen Selamat, Tanpa Sisa
                </span>
              </div>
            </Link>

            <div
              aria-hidden="true"
              className="hidden sm:block h-8 w-px bg-[#FEFEFE]/15"
            />

            {/* Mandatory Nirsisa Parent Brand */}
            <div className="flex items-center gap-3">
              <div className="relative h-7 w-24 shrink-0">
                <Image
                  src="/brand/nirsisa-logo-putih.png"
                  alt="Logo Nirsisa"
                  fill
                  sizes="96px"
                  className="object-contain object-left"
                />
              </div>
              <p className="text-xs text-[#D6EBD9] max-w-xs leading-snug">
                Produk teknologi pangan dari{" "}
                <strong className="font-semibold text-[#FEFEFE]">Nirsisa</strong>{" "}
                untuk menyalurkan panen sayur tanpa sisa.
              </p>
            </div>
          </div>

          {/* Center: Compact Horizontal Navigation */}
          <nav aria-label="Navigasi Footer">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#D6EBD9]">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-[#8FD16A]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Compact Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://instagram.com/nirsisa.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#FEFEFE]/20 bg-[#014F2F]/60 px-4 text-xs font-semibold text-[#FEFEFE] transition-colors hover:border-[#8FD16A]"
            >
              <AtSign aria-hidden="true" className="size-3.5 text-[#8FD16A]" />
              <span>nirsisa.id</span>
              <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-75" />
            </a>

            <Link
              href="/login"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#65AF3E] px-5 text-xs sm:text-sm font-bold text-[#FEFEFE] transition-colors hover:bg-[#014F2F]"
            >
              <span>Masuk</span>
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        {/* Compact Bottom Legal & Attribution Bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[#D6EBD9]/70">
          <p>© 2026 Nirsisa · SINTAS. Hak cipta dilindungi.</p>
          <p>
            Grade AI adalah indikasi mutu visual · Foto: kontributor Wikimedia Commons (CC BY-SA 4.0).
          </p>
        </div>
      </div>
    </footer>
  );
}
