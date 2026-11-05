/**
 * @file Global Not Found (404) Page - Centered minimalist 404 page inside RootLayout (with Navbar & Footer), bespoke SINTAS unplugged-cable illustration, and Kembali ke Beranda CTA.
 */

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center bg-[#FEFEFE] px-6 pt-28 pb-16 sm:pt-32 sm:pb-20 text-center text-[#072E1B]">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        {/* Top Large 404 Title */}
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-[-0.04em] text-[#072E1B] leading-none">
          404
        </h1>

        {/* Center Bespoke SINTAS Unplugged Cable Illustration */}
        <div className="mt-3 sm:mt-4 w-full max-w-[720px]">
          <div className="relative aspect-[1338/640] w-full">
            <Image
              src="/images/sintas-404.webp"
              alt="Ilustrasi 404 SINTAS - Petani memegang kabel jalur distribusi yang terputus"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Bottom Copy & CTA matching reference layout */}
        <div className="mt-4 sm:mt-5 flex flex-col items-center max-w-lg">
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[-0.02em] text-[#072E1B]">
            Sepertinya Anda tersesat
          </h2>

          <p className="mt-2.5 text-sm sm:text-base text-[#355242] leading-relaxed">
            Halaman yang Anda cari tidak tersedia atau belum dibuka untuk akses publik!
          </p>

          {/* Primary Green CTA to Return Home */}
          <div className="mt-7">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[#65AF3E] px-8 text-sm sm:text-base font-bold text-[#FEFEFE] shadow-[0_10px_24px_-6px_rgba(101,175,62,0.5)] transition-all hover:bg-[#014F2F] hover:shadow-[0_12px_28px_-6px_rgba(1,79,47,0.45)]"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
