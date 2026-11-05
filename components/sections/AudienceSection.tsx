/**
 * @file AudienceSection Component - Deep Forest Green (#014F2F) two-sided ecosystem section connecting farmers and 10 buyer segments (Grade A-D) on an interactive stock map.
 */

import { ArrowRight, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { AudienceTabs } from "@/components/sections/AudienceTabs";
import { DemandStrip } from "@/components/sections/DemandStrip";
import { ButtonLink } from "@/components/ui/Button";

export function AudienceSection() {
  return (
    <section
      id="untuk-siapa"
      className="relative bg-[#014F2F] py-20 sm:py-24 text-[#FEFEFE]"
    >
      <div className="mx-auto max-w-[1560px] px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="EKOSISTEM PETANI & KONSUMEN GRADE A–D"
            inverted
            title={
              <>
                Petani dan sepuluh kategori konsumen{" "}
                <span className="text-[#8FD16A]">dalam satu peta stok.</span>
              </>
            }
            description="Konsumen (Restoran, Dapur MBG, Katering, UMKM, Perorangan, Pengepul, hingga Peternak) melihat titik panen di peta beserta grade AI dan sisa jam segar."
          />

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <ButtonLink
              href="/login"
              variant="primaryDark"
              size="md"
              trailingIcon={<ArrowRight aria-hidden="true" className="size-4 text-[#014F2F]" />}
            >
              Masuk Portal
            </ButtonLink>
            <ButtonLink
              href="#ai"
              variant="secondaryDark"
              size="md"
              trailingIcon={<MapPin aria-hidden="true" className="size-4 text-[#8FD16A]" />}
            >
              Simulasi AI Grade
            </ButtonLink>
          </div>
        </div>

        <AudienceTabs />
        <DemandStrip />
      </div>
    </section>
  );
}
