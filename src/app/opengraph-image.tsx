import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "DHRUVAM 2026-27 — Rotaract Club of Coimbatore Smartcity";

export default function OpengraphImage() {
  const emblem = fs
    .readFileSync(path.join(process.cwd(), "public/assets/dhruvam/logos/dhruvam-emblem.png"))
    .toString("base64");
  const badge = fs
    .readFileSync(path.join(process.cwd(), "public/assets/dhruvam/logos/dhruvam-badge-256.png"))
    .toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #020B1C 0%, #06152B 55%, #020B1C 100%)",
          position: "relative",
        }}
      >
        {/* Soft gold glow */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(246,181,27,0.22) 0%, rgba(246,181,27,0) 70%)",
          }}
        />

        {/* Left: real DHRUVAM key art */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 520,
            height: "100%",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${emblem}`}
            alt=""
            width={480}
            height={330}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Right: wordmark + credentials */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`data:image/png;base64,${badge}`} alt="" width={34} height={34} style={{ objectFit: "cover" }} />
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, letterSpacing: 3, textTransform: "uppercase", display: "flex" }}>
              Rotaract Club of Coimbatore Smartcity
            </span>
          </div>

          <div style={{ fontSize: 108, fontWeight: 900, letterSpacing: 4, color: "#FFD65A", display: "flex" }}>
            DHRUVAM
          </div>

          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.75)", marginTop: 8, display: "flex" }}>
            The Star That Guides
          </div>

          <div
            style={{
              fontSize: 20,
              color: "rgba(246,181,27,0.7)",
              marginTop: 32,
              letterSpacing: 2,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            2026–27 · Rotary District 3206
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
