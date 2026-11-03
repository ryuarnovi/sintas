/**
 * @file OpenGraph Image Generator - Dynamic OG card featuring forest background, 4-grade badges, and SINTAS tagline.
 */

import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#012A19",
          color: "#FEFEFE",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "999px",
                backgroundColor: "#65AF3E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#012A19",
                fontWeight: 800,
                fontSize: "24px",
              }}
            >
              S
            </div>
            <span style={{ fontSize: "34px", fontWeight: 800, letterSpacing: "-0.03em" }}>
              SINTAS
            </span>
          </div>
          <div
            style={{
              borderRadius: "999px",
              border: "1px solid rgba(183, 211, 60, 0.4)",
              backgroundColor: "rgba(183, 211, 60, 0.12)",
              color: "#3FB6A8",
              padding: "10px 22px",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            NIRSISA · WEB + AI
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
            }}
          >
            <span>Panen selamat, tanpa</span>
            <span style={{ color: "#3FB6A8", marginLeft: "18px" }}>sisa.</span>
          </div>
          <div style={{ fontSize: "26px", color: "#A9BDB3", maxWidth: "900px", lineHeight: 1.4 }}>
            Peta stok panen real-time, taksiran mutu Grade A–D dari foto oleh AI, dan
            penyaluran berjenjang dari dapur MBG hingga kompos.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {[
            { g: "Grade A · Segar Prima", bg: "#65AF3E", fg: "#012A19" },
            { g: "Grade B · Katering & UMKM", bg: "#3FB6A8", fg: "#012A19" },
            { g: "Grade C · Pakan & Maggot", bg: "#F2B84B", fg: "#012A19" },
            { g: "Grade D · Kompos", bg: "#8A5A3C", fg: "#FFFFFF" },
          ].map((item) => (
            <div
              key={item.g}
              style={{
                borderRadius: "999px",
                backgroundColor: item.bg,
                color: item.fg,
                padding: "10px 20px",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              {item.g}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
