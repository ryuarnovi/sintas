/**
 * @file InteractiveStockMap Component - Full-screen MapLibre GL regional map with compact icon-only pointer markers and rich on-map Popup when a marker is clicked.
 */

"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { setWorkerUrl, type StyleSpecification } from "maplibre-gl";
import Map, {
  Layer,
  Marker,
  NavigationControl,
  Popup,
  Source,
  type MapRef,
} from "react-map-gl/maplibre";
import { ArrowRight, MapPin, Route, ScanLine, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { GradeBadge } from "@/components/ui/GradeBadge";
import {
  MAP_ECOSYSTEM_NODES,
  NODE_CATEGORY_META,
  type MapEcosystemNode,
  type RegionClusterMeta,
} from "@/constants/map-nodes";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

setWorkerUrl("/maplibre-gl-worker.mjs");

const GOOGLE_MAPS_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    "google-roadmap": {
      type: "raster",
      tiles: [
        "https://mt0.google.com/vt/lyrs=m&hl=id&x={x}&y={y}&z={z}",
        "https://mt1.google.com/vt/lyrs=m&hl=id&x={x}&y={y}&z={z}",
        "https://mt2.google.com/vt/lyrs=m&hl=id&x={x}&y={y}&z={z}",
        "https://mt3.google.com/vt/lyrs=m&hl=id&x={x}&y={y}&z={z}",
      ],
      tileSize: 256,
      attribution: "Map data © Google",
    },
  },
  layers: [
    {
      id: "google-roadmap-layer",
      type: "raster",
      source: "google-roadmap",
      minzoom: 0,
      maxzoom: 20,
    },
  ],
};

export interface InteractiveStockMapProps {
  readonly region: RegionClusterMeta;
  readonly nodes: readonly MapEcosystemNode[];
  readonly selectedNode: MapEcosystemNode | null;
  readonly onSelectNode: (node: MapEcosystemNode | null) => void;
}

export function InteractiveStockMap({
  region,
  nodes,
  selectedNode,
  onSelectNode,
}: InteractiveStockMapProps) {
  const mapRef = useRef<MapRef | null>(null);

  // Fly smoothly when user switches regional cluster
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: [region.center[0], region.center[1]],
      zoom: region.zoom,
      duration: 850,
    });
  }, [region]);

  // Connected partners for the active popup
  const connectedPartners = useMemo(() => {
    if (!selectedNode) return [];
    return MAP_ECOSYSTEM_NODES.filter((n) =>
      selectedNode.connectedNodeIds.includes(n.id)
    );
  }, [selectedNode]);

  // Build GeoJSON LineStrings for active S-Flow connections
  const sflowRoutesGeoJson = useMemo(() => {
    const regionNodes =
      region.id === "indonesia"
        ? MAP_ECOSYSTEM_NODES
        : MAP_ECOSYSTEM_NODES.filter((n) => n.regionId === region.id);
    const nodeById = new globalThis.Map(regionNodes.map((n) => [n.id, n]));
    const features: {
      type: "Feature";
      properties: { isHighlighted: boolean };
      geometry: { type: "LineString"; coordinates: [number, number][] };
    }[] = [];

    for (const node of regionNodes) {
      if (node.category !== "petani") continue;
      for (const targetId of node.connectedNodeIds) {
        const target = nodeById.get(targetId);
        if (!target) continue;
        const isHighlighted =
          selectedNode?.id === node.id || selectedNode?.id === target.id;
        features.push({
          type: "Feature",
          properties: { isHighlighted },
          geometry: {
            type: "LineString",
            coordinates: [
              [node.coordinates[0], node.coordinates[1]],
              [target.coordinates[0], target.coordinates[1]],
            ],
          },
        });
      }
    }

    return {
      type: "FeatureCollection" as const,
      features,
    };
  }, [region.id, selectedNode]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#DCECE0]">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: region.center[0],
          latitude: region.center[1],
          zoom: region.zoom,
        }}
        minZoom={4.5}
        maxZoom={18}
        mapStyle={GOOGLE_MAPS_STYLE}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
        onClick={() => onSelectNode(null)}
      >
        <NavigationControl position="bottom-right" showCompass={false} />

        {/* S-Flow Route Connection Lines between Farmers and Consumers */}
        <Source id="sflow-routes" type="geojson" data={sflowRoutesGeoJson}>
          <Layer
            id="sflow-routes-base"
            type="line"
            paint={{
              "line-color": "#014F2F",
              "line-width": [
                "case",
                ["boolean", ["get", "isHighlighted"], false],
                3.5,
                2,
              ],
              "line-opacity": [
                "case",
                ["boolean", ["get", "isHighlighted"], false],
                0.9,
                0.35,
              ],
              "line-dasharray": [2, 2],
            }}
          />
        </Source>

        {/* Compact Icon-Only Pointer Markers (No Text Clutter) */}
        {nodes.map((node) => {
          const meta = NODE_CATEGORY_META[node.category];
          const isSelected = selectedNode?.id === node.id;
          const isConnectedToSelected =
            selectedNode?.connectedNodeIds.includes(node.id) ?? false;
          const isPetani = node.category === "petani";

          return (
            <Marker
              key={node.id}
              longitude={node.coordinates[0]}
              latitude={node.coordinates[1]}
              anchor="bottom"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectNode(node);
                }}
                title={`${meta.shortLabel}: ${node.name} (Grade ${node.grades.join("/")})`}
                aria-label={`${meta.label}: ${node.name} (${node.district})`}
                className={cn(
                  "group relative flex flex-col items-center cursor-pointer select-none transition-transform duration-200 focus:outline-none",
                  isSelected
                    ? "scale-125 z-30"
                    : isConnectedToSelected
                      ? "scale-110 z-20"
                      : "z-10 hover:scale-115"
                )}
              >
                {/* Pulse Halo when Selected */}
                {isSelected ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-1.5 size-13 rounded-full border-2 border-[#65AF3E] animate-ping opacity-55"
                  />
                ) : null}

                {/* Pointer Pin Head (Icon Only, Distinct Shape/Color per Category) */}
                <span
                  className={cn(
                    "relative flex size-9 items-center justify-center text-[#FEFEFE] shadow-[0_8px_18px_rgba(7,46,27,0.38)] transition-all",
                    isPetani ? "rounded-xl" : "rounded-full"
                  )}
                  style={{
                    backgroundColor: meta.bgHex,
                    borderWidth: isSelected ? "3px" : "2.5px",
                    borderStyle: "solid",
                    borderColor: isSelected ? "#65AF3E" : "#FEFEFE",
                  }}
                >
                  <DynamicIcon name={meta.icon} size={17} />
                </span>

                {/* Sharp Pointer Tip Triangle Pointing to Exact Coordinate */}
                <span
                  aria-hidden="true"
                  className="-mt-0.5 h-0 w-0 border-x-[6px] border-t-[8px] border-x-transparent drop-shadow-xs"
                  style={{
                    borderTopColor: isSelected ? "#65AF3E" : meta.bgHex,
                  }}
                />
              </button>
            </Marker>
          );
        })}

        {/* Floating On-Map Popup When Marker is Clicked */}
        {selectedNode ? (
          <Popup
            longitude={selectedNode.coordinates[0]}
            latitude={selectedNode.coordinates[1]}
            anchor={
              selectedNode.coordinates[1] > region.center[1] - 0.01
                ? "top"
                : "bottom"
            }
            offset={
              selectedNode.coordinates[1] > region.center[1] - 0.01 ? 8 : 48
            }
            closeButton={false}
            closeOnClick={false}
            maxWidth="340px"
            className="sintas-map-popup z-40"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-[310px] sm:w-[330px] overflow-hidden rounded-2xl border border-[#C4DEC9] bg-[#FEFEFE] text-[#072E1B] shadow-[0_24px_52px_-12px_rgba(7,46,27,0.38)]"
            >
              {/* Popup Top Header */}
              <div
                className="px-4 py-3 text-[#FEFEFE] flex items-start justify-between gap-2"
                style={{
                  backgroundColor:
                    NODE_CATEGORY_META[selectedNode.category].bgHex,
                }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <DynamicIcon
                      name={NODE_CATEGORY_META[selectedNode.category].icon}
                      size={13}
                    />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FEFEFE]/90">
                      {selectedNode.categoryLabel}
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-sm font-bold text-[#FEFEFE] leading-snug">
                    {selectedNode.name}
                  </h3>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-[#FEFEFE]/85">
                    <MapPin className="size-3 shrink-0" />
                    <span className="truncate">{selectedNode.district}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <GradeBadge grade={selectedNode.primaryGrade} size="sm" />
                  <button
                    type="button"
                    onClick={() => onSelectNode(null)}
                    aria-label="Tutup popup"
                    className="inline-flex size-6 items-center justify-center rounded-lg bg-[#FEFEFE]/20 text-[#FEFEFE] hover:bg-[#FEFEFE]/30 cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Popup Body */}
              <div className="p-3.5 space-y-3">
                {/* Thumbnail + Price & Volume */}
                <div className="flex items-center gap-3 rounded-xl border border-[#C4DEC9] bg-[#EBF4EC] p-2.5">
                  <div className="relative size-13 shrink-0 overflow-hidden rounded-lg border border-[#C4DEC9] bg-[#FEFEFE]">
                    <Image
                      src={selectedNode.imageUrl}
                      alt={selectedNode.name}
                      fill
                      sizes="52px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-[#014F2F] truncate">
                      {selectedNode.commodityOrNeed}
                    </p>
                    <p className="font-display text-base font-bold text-[#072E1B]">
                      {formatRupiah(selectedNode.pricePerKg)}
                      <span className="text-[11px] font-sans font-normal text-[#355242]">
                        /kg
                      </span>
                    </p>
                    <p className="font-mono text-[10px] text-[#355242]">
                      Volume: {selectedNode.volumeKg} kg · Grade{" "}
                      {selectedNode.grades.join("/")}
                    </p>
                  </div>
                </div>

                {/* Freshness & AI Confidence */}
                <div className="flex items-center justify-between text-[11px] text-[#355242] px-0.5">
                  <span className="truncate pr-2">
                    {selectedNode.freshnessOrSchedule}
                  </span>
                  {selectedNode.aiConfidencePct ? (
                    <span className="inline-flex items-center gap-1 shrink-0 rounded bg-[#EBF4EC] border border-[#C4DEC9] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#014F2F]">
                      <ScanLine className="size-3 text-[#65AF3E]" />
                      AI {selectedNode.aiConfidencePct}%
                    </span>
                  ) : null}
                </div>

                {/* Connected S-Flow Partners */}
                {connectedPartners.length > 0 ? (
                  <div className="pt-2 border-t border-[#C4DEC9]">
                    <p className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#014F2F] mb-1.5">
                      <Route className="size-3 text-[#65AF3E]" />
                      {selectedNode.category === "petani"
                        ? "Terhubung ke Konsumen:"
                        : "Pemasok Petani Terhubung:"}
                    </p>
                    <div className="space-y-1">
                      {connectedPartners.slice(0, 2).map((partner) => {
                        const pMeta = NODE_CATEGORY_META[partner.category];
                        return (
                          <button
                            key={partner.id}
                            type="button"
                            onClick={() => onSelectNode(partner)}
                            className="w-full flex items-center justify-between gap-2 rounded-lg bg-[#EBF4EC]/75 hover:bg-[#DCECE0] px-2.5 py-1.5 text-left text-[11px] transition-colors cursor-pointer"
                          >
                            <span className="inline-flex items-center gap-1.5 min-w-0">
                              <span
                                className="flex size-4.5 shrink-0 items-center justify-center rounded text-[#FEFEFE]"
                                style={{ backgroundColor: pMeta.bgHex }}
                              >
                                <DynamicIcon name={pMeta.icon} size={10} />
                              </span>
                              <span className="font-semibold text-[#072E1B] truncate">
                                {partner.name}
                              </span>
                            </span>
                            <ArrowRight className="size-3 shrink-0 text-[#014F2F]" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {/* CTA Button */}
                <Link
                  href="/login"
                  className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-[#014F2F] px-4 text-xs font-bold text-[#FEFEFE] hover:bg-[#072E1B] transition-colors"
                >
                  <span>
                    {selectedNode.category === "petani"
                      ? "Masuk untuk Pesan Lot Ini"
                      : "Masuk untuk Salurkan Panen"}
                  </span>
                  <ArrowRight className="size-3.5 text-[#65AF3E]" />
                </Link>
              </div>
            </div>
          </Popup>
        ) : null}
      </Map>
    </div>
  );
}
