/**
 * @file Not Found Page - Clean minimalist 404 route in #FEFEFE and #014F2F (also served when clicking Masuk /login).
 */

import { ArrowLeft } from "lucide-react";
import { SintasMark } from "@/components/common/SintasMark";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FEFEFE] px-6 text-center text-[#012A19]">
      <div className="max-w-lg rounded-3xl border border-[#014F2F]/12 bg-[#F6F9F7] p-10 sm:p-12 flex flex-col items-center">
        <SintasMark size={48} />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#014F2F]">
          404 · Halaman Belum Tersedia
        </p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#012A19]">
          Akses akun pelanggan sedang disiapkan.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#4A6155] leading-relaxed">
          Portal langganan dan masuk akun SINTAS sedang dalam tahap finalisasi.
          Silakan kembali ke halaman utama untuk menjelajahi fitur peta stok dan
          simulasi AI.
        </p>
        <div className="mt-8">
          <ButtonLink
            href="/"
            variant="primary"
            size="lg"
            leadingIcon={<ArrowLeft aria-hidden="true" className="size-4" />}
          >
            Kembali ke Beranda
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
