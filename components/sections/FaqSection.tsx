/**
 * @file FaqSection Component - High-contrast FAQ on #EBF4EC mint-sage with crisp #FEFEFE white accordion cards and #014F2F Masuk (/login) CTA card.
 */

"use client";

import { ArrowRight, MapPin, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { FAQ_ITEMS } from "@/constants/faq";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CATEGORY_LABEL = {
  umum: "Umum & Langganan",
  ai: "Penilaian AI",
  harga: "Mesin Harga",
  operasional: "Operasional",
} as const;

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <section
      id="faq"
      className="relative bg-[#EBF4EC] py-20 sm:py-24 text-[#072E1B] border-t border-[#C4DEC9]"
    >
      <div className="mx-auto grid w-full max-w-[1560px] gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:gap-12 lg:px-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-8">
            <SectionHeader
              eyebrow="PERTANYAAN UMUM"
              title={
                <>
                  Lima hal mendasar sebelum{" "}
                  <span className="text-[#65AF3E]">menggunakan SINTAS.</span>
                </>
              }
              description="Penjelasan ringkas mengenai akses petani, langganan konsumen, akurasi grade AI, hingga mekanisme penyaluran dan pembayaran."
            />

            <div className="rounded-3xl bg-[#014F2F] p-7 text-[#FEFEFE] shadow-[0_22px_48px_-14px_rgba(1,79,47,0.35)]">
              <p className="font-display text-xl font-bold">
                Siap mengakses peta stok SINTAS?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#D6EBD9]">
                Masuk ke portal pelanggan untuk memantau titik panen sayur
                berdasarkan Grade A–D atau menyalurkan hasil kebun Anda.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink
                  href="/login"
                  variant="primaryDark"
                  size="md"
                  trailingIcon={<ArrowRight aria-hidden="true" className="size-4 text-[#014F2F]" />}
                >
                  Masuk Akun
                </ButtonLink>
                <ButtonLink
                  href="#cara-kerja"
                  variant="secondaryDark"
                  size="md"
                  trailingIcon={<MapPin aria-hidden="true" className="size-4 text-[#8FD16A]" />}
                >
                  Pelajari Solusi
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="space-y-3.5">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              const buttonId = `faq-btn-${item.id}`;
              return (
                <li
                  key={item.id}
                  className={cn(
                    "rounded-2xl border bg-[#FEFEFE] px-6 transition-all",
                    isOpen
                      ? "border-[#014F2F] shadow-[0_16px_36px_-14px_rgba(1,79,47,0.14)]"
                      : "border-[#C4DEC9] hover:border-[#65AF3E]"
                  )}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full cursor-pointer items-start gap-4 py-5 text-left focus-visible:outline-none"
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold tabular-nums transition-colors",
                          isOpen
                            ? "bg-[#014F2F] text-[#FEFEFE]"
                            : "bg-[#EBF4EC] text-[#014F2F]"
                        )}
                      >
                        0{idx + 1}
                      </span>
                      <span className="flex-1">
                        <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#65AF3E]">
                          {CATEGORY_LABEL[item.category]}
                        </span>
                        <span className="mt-1 block font-display text-lg font-bold leading-snug text-[#072E1B] sm:text-xl">
                          {item.question}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300",
                          isOpen
                            ? "rotate-45 border-[#014F2F] bg-[#014F2F] text-[#FEFEFE]"
                            : "border-[#C4DEC9] bg-[#EBF4EC] text-[#014F2F]"
                        )}
                      >
                        <Plus aria-hidden="true" className="size-4" strokeWidth={2} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: duration.slow, ease: ease.out }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pl-11 pr-4 text-sm sm:text-base leading-relaxed text-[#355242]">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
