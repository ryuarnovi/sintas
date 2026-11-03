/**
 * @file StockMapExplorer Component - Full-bleed 100% viewport regional map with collapsible floating filter/list panel, compact icon legend, and on-map marker popups.
 */

"use client";

import {
  ChevronLeft,
  Layers,
  MapPin,
  Navigation,
  PanelLeftOpen,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { GRADE_ORDER } from "@/constants/grades";
import {
  MAP_ECOSYSTEM_NODES,
  NODE_CATEGORY_META,
  REGION_CLUSTERS,
  type MapEcosystemNode,
  type NodeCategory,
  type RegionClusterId,
} from "@/constants/map-nodes";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Grade } from "@/types/landing";

const LazyInteractiveStockMap = dynamic(
  () =>
    import("@/components/sections/InteractiveStockMap").then(
      (mod) => mod.InteractiveStockMap
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#EBF4EC] font-mono text-xs font-bold text-[#014F2F]">
        Memuat kanvas peta regional SINTAS...
      </div>
    ),
  }
);

const CATEGORY_FILTER_ORDER: readonly (NodeCategory | "semua")[] = [
  "semua",
  "petani",
  "dapur-mbg",
  "restoran",
  "katering",
  "umkm",
  "pengepul",
  "peternak",
] as const;

export function StockMapExplorer() {
  const [regionId, setRegionId] = useState<RegionClusterId>("indonesia");
  const [categoryFilter, setCategoryFilter] = useState<NodeCategory | "semua">(
    "semua"
  );
  const [gradeFilter, setGradeFilter] = useState<Grade | "semua">("semua");
  const [panelOpen, setPanelOpen] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeRegion = useMemo(
    () =>
      REGION_CLUSTERS.find((r) => r.id === regionId) ?? REGION_CLUSTERS[0],
    [regionId]
  );

  const regionNodes = useMemo(
    () =>
      regionId === "indonesia"
        ? MAP_ECOSYSTEM_NODES
        : MAP_ECOSYSTEM_NODES.filter((n) => n.regionId === regionId),
    [regionId]
  );

  const filteredNodes = useMemo(
    () =>
      regionNodes.filter((n) => {
        const matchCategory =
          categoryFilter === "semua" || n.category === categoryFilter;
        const matchGrade =
          gradeFilter === "semua" || n.grades.includes(gradeFilter);
        return matchCategory && matchGrade;
      }),
    [regionNodes, categoryFilter, gradeFilter]
  );

  const selectedNode: MapEcosystemNode | null = useMemo(() => {
    if (!selectedId) return null;
    return filteredNodes.find((n) => n.id === selectedId) ?? null;
  }, [filteredNodes, selectedId]);

  const handleRegionChange = (nextRegionId: RegionClusterId) => {
    setRegionId(nextRegionId);
    setSelectedId(null);
  };

  const handleResetFilters = () => {
    setCategoryFilter("semua");
    setGradeFilter("semua");
  };

  const farmerCount = filteredNodes.filter(
    (n) => n.category === "petani"
  ).length;
  const consumerCount = filteredNodes.filter(
    (n) => n.category !== "petani"
  ).length;

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#DCECE0] text-[#072E1B]">
      {/* FULL-SCREEN 100% VIEWPORT MAP CANVAS */}
      <div className="absolute inset-0 z-0">
        <LazyInteractiveStockMap
          region={activeRegion}
          nodes={filteredNodes}
          selectedNode={selectedNode}
          onSelectNode={(node) => setSelectedId(node ? node.id : null)}
        />
      </div>

      {/* FLOATING TOP BAR (Over Map, Below Fixed Navbar) */}
      <div className="pointer-events-none absolute inset-x-0 top-[74px] z-20 px-4 sm:px-6">
        <div className="mx-auto flex max-w-[1560px] flex-wrap items-center justify-between gap-2.5">
          {/* Left Group: Hide/Show Panel Button + Region Cluster Switcher */}
          <div className="pointer-events-auto flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setPanelOpen((prev) => !prev)}
              aria-expanded={panelOpen}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#C4DEC9] bg-[#FEFEFE]/96 px-3.5 text-xs font-bold text-[#072E1B] shadow-[0_10px_28px_rgba(7,46,27,0.14)] backdrop-blur-md transition-colors hover:border-[#014F2F] cursor-pointer"
            >
              {panelOpen ? (
                <>
                  <ChevronLeft className="size-4 text-[#014F2F]" />
                  <span>Tutup Panel</span>
                </>
              ) : (
                <>
                  <PanelLeftOpen className="size-4 text-[#65AF3E]" />
                  <span>
                    Buka Panel ({filteredNodes.length} Titik)
                  </span>
                </>
              )}
            </button>

            {/* Regional Cluster Selector Pills */}
            <div className="inline-flex items-center gap-1 rounded-xl border border-[#C4DEC9] bg-[#FEFEFE]/96 p-1 shadow-[0_10px_28px_rgba(7,46,27,0.14)] backdrop-blur-md">
              <span className="hidden md:inline-flex items-center gap-1 pl-2.5 pr-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#014F2F]">
                <Navigation className="size-3 text-[#65AF3E]" />
                Wilayah:
              </span>
              {REGION_CLUSTERS.map((reg) => {
                const active = reg.id === regionId;
                return (
                  <button
                    key={reg.id}
                    type="button"
                    onClick={() => handleRegionChange(reg.id)}
                    className={cn(
                      "h-8 rounded-lg px-3 text-xs font-bold transition-all cursor-pointer",
                      active
                        ? "bg-[#014F2F] text-[#FEFEFE] shadow-2xs"
                        : "text-[#072E1B] hover:bg-[#EBF4EC]"
                    )}
                  >
                    {reg.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Group: Floating Grade Filter Bar */}
          <div className="pointer-events-auto inline-flex items-center gap-1 rounded-xl border border-[#C4DEC9] bg-[#FEFEFE]/96 p-1 shadow-[0_10px_28px_rgba(7,46,27,0.14)] backdrop-blur-md">
            <span className="hidden sm:inline-block pl-2.5 pr-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#355242]">
              Grade:
            </span>
            <button
              type="button"
              onClick={() => setGradeFilter("semua")}
              className={cn(
                "h-8 rounded-lg px-2.5 text-xs font-bold transition-colors cursor-pointer",
                gradeFilter === "semua"
                  ? "bg-[#014F2F] text-[#FEFEFE]"
                  : "text-[#355242] hover:bg-[#EBF4EC]"
              )}
            >
              Semua
            </button>
            {GRADE_ORDER.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGradeFilter(g)}
                className={cn(
                  "h-8 rounded-lg px-2.5 font-mono text-xs font-bold transition-colors cursor-pointer",
                  gradeFilter === g
                    ? "bg-[#65AF3E] text-[#FEFEFE]"
                    : "text-[#072E1B] hover:bg-[#EBF4EC]"
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* COLLAPSIBLE FLOATING LEFT PANEL (Filter & Node List) */}
      {panelOpen ? (
        <aside
          aria-label="Panel Filter dan Daftar Titik"
          className="absolute top-[126px] bottom-16 left-4 sm:left-6 z-20 flex w-[calc(100vw-2rem)] sm:w-[350px] flex-col overflow-hidden rounded-2xl border border-[#C4DEC9] bg-[#FEFEFE]/96 shadow-[0_24px_52px_-12px_rgba(7,46,27,0.28)] backdrop-blur-md"
        >
          {/* Panel Header */}
          <div className="border-b border-[#C4DEC9] bg-[#EBF4EC] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-[#014F2F]" />
              <div>
                <h1 className="font-display text-sm font-bold text-[#072E1B]">
                  {activeRegion.shortLabel}
                </h1>
                <p className="text-[11px] text-[#355242]">
                  <strong className="text-[#014F2F]">{farmerCount} Petani</strong>{" "}
                  ·{" "}
                  <strong className="text-[#0B6B3A]">
                    {consumerCount} Konsumen
                  </strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {categoryFilter !== "semua" || gradeFilter !== "semua" ? (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex h-7 items-center gap-1 rounded-lg border border-[#C4DEC9] bg-[#FEFEFE] px-2 text-[11px] font-bold text-[#014F2F] hover:bg-[#DCECE0] cursor-pointer"
                >
                  <RotateCcw className="size-3" />
                  Reset
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Sembunyikan panel"
                className="inline-flex size-7 items-center justify-center rounded-lg border border-[#C4DEC9] bg-[#FEFEFE] text-[#072E1B] hover:bg-[#DCECE0] cursor-pointer"
              >
                <ChevronLeft className="size-4" />
              </button>
            </div>
          </div>

          {/* Category Filter Chips inside Panel */}
          <div className="border-b border-[#C4DEC9] bg-[#FEFEFE] p-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#355242] mb-2">
              Filter Kategori Titik
            </p>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORY_FILTER_ORDER.map((catId) => {
                const active = categoryFilter === catId;
                if (catId === "semua") {
                  return (
                    <button
                      key="semua"
                      type="button"
                      onClick={() => setCategoryFilter("semua")}
                      className={cn(
                        "inline-flex h-7 items-center gap-1 rounded-lg border px-2.5 text-[11px] font-bold transition-all cursor-pointer",
                        active
                          ? "border-[#072E1B] bg-[#072E1B] text-[#FEFEFE]"
                          : "border-[#C4DEC9] bg-[#EBF4EC]/60 text-[#072E1B] hover:bg-[#EBF4EC]"
                      )}
                    >
                      <Layers className="size-3 text-[#65AF3E]" />
                      <span>Semua ({regionNodes.length})</span>
                    </button>
                  );
                }

                const meta = NODE_CATEGORY_META[catId];
                const count = regionNodes.filter(
                  (n) => n.category === catId
                ).length;

                return (
                  <button
                    key={catId}
                    type="button"
                    onClick={() => setCategoryFilter(catId)}
                    className={cn(
                      "inline-flex h-7 items-center gap-1.5 rounded-lg border px-2.5 text-[11px] font-bold transition-all cursor-pointer",
                      active
                        ? "text-[#FEFEFE]"
                        : "border-[#C4DEC9] bg-[#FEFEFE] text-[#072E1B] hover:bg-[#EBF4EC]"
                    )}
                    style={
                      active
                        ? {
                            backgroundColor: meta.bgHex,
                            borderColor: meta.bgHex,
                          }
                        : undefined
                    }
                  >
                    <DynamicIcon name={meta.icon} size={11} />
                    <span>
                      {meta.shortLabel} ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable List of Nodes (Clicking opens Popup on Map) */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredNodes.map((node) => {
              const meta = NODE_CATEGORY_META[node.category];
              const isSelected = selectedNode?.id === node.id;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedId(node.id)}
                  className={cn(
                    "w-full rounded-xl border p-2.5 text-left transition-all cursor-pointer flex items-start gap-2.5",
                    isSelected
                      ? "border-[#014F2F] bg-[#014F2F] text-[#FEFEFE] shadow-sm"
                      : "border-[#C4DEC9] bg-[#EBF4EC]/55 text-[#072E1B] hover:border-[#65AF3E] hover:bg-[#EBF4EC]"
                  )}
                >
                  <span
                    className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg text-[#FEFEFE]"
                    style={{
                      backgroundColor: isSelected ? "#65AF3E" : meta.bgHex,
                    }}
                  >
                    <DynamicIcon name={meta.icon} size={15} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={cn(
                          "font-mono text-[9px] font-bold uppercase tracking-wider",
                          isSelected ? "text-[#8FD16A]" : "text-[#014F2F]"
                        )}
                      >
                        {meta.badgeText}
                      </span>
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.2 font-mono text-[10px] font-bold",
                          isSelected
                            ? "bg-[#FEFEFE]/20 text-[#FEFEFE]"
                            : "bg-[#FEFEFE] border border-[#C4DEC9] text-[#072E1B]"
                        )}
                      >
                        Grade {node.grades.join("/")}
                      </span>
                    </div>

                    <p
                      className={cn(
                        "mt-0.5 font-display text-xs font-bold truncate",
                        isSelected ? "text-[#FEFEFE]" : "text-[#072E1B]"
                      )}
                    >
                      {node.name}
                    </p>

                    <div className="mt-1 flex items-center justify-between text-[11px]">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 truncate",
                          isSelected ? "text-[#D6EBD9]" : "text-[#355242]"
                        )}
                      >
                        <MapPin className="size-3 shrink-0 text-[#65AF3E]" />
                        <span className="truncate">{node.district}</span>
                      </span>
                      <span
                        className={cn(
                          "font-mono font-bold shrink-0 ml-2",
                          isSelected ? "text-[#8FD16A]" : "text-[#014F2F]"
                        )}
                      >
                        {formatRupiah(node.pricePerKg)}/kg
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      ) : null}

      {/* FLOATING COMPACT LEGEND PILL AT BOTTOM OF MAP */}
      <div className="pointer-events-auto absolute bottom-3 left-4 sm:left-6 z-20 flex flex-wrap items-center gap-1.5 rounded-xl border border-[#C4DEC9] bg-[#FEFEFE]/95 px-3 py-2 shadow-[0_12px_30px_rgba(7,46,27,0.18)] backdrop-blur-md">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#014F2F] mr-1">
          Marker:
        </span>
        {(Object.keys(NODE_CATEGORY_META) as NodeCategory[]).map((catKey) => {
          const meta = NODE_CATEGORY_META[catKey];
          const active = categoryFilter === catKey;
          return (
            <button
              key={catKey}
              type="button"
              onClick={() =>
                setCategoryFilter((prev) =>
                  prev === catKey ? "semua" : catKey
                )
              }
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] font-semibold transition-colors cursor-pointer",
                active
                  ? "border-[#014F2F] bg-[#EBF4EC] text-[#072E1B]"
                  : "border-transparent bg-transparent text-[#355242] hover:bg-[#EBF4EC]"
              )}
            >
              <span
                className={cn(
                  "flex size-5 items-center justify-center text-[#FEFEFE]",
                  catKey === "petani" ? "rounded-md" : "rounded-full"
                )}
                style={{ backgroundColor: meta.bgHex }}
              >
                <DynamicIcon name={meta.icon} size={11} />
              </span>
              <span className="hidden md:inline">{meta.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
