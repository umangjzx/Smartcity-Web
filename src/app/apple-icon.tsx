import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const emblem = fs
    .readFileSync(path.join(process.cwd(), "public/assets/dhruvam/logos/dhruvam-badge.png"))
    .toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#020B1C",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${emblem}`} alt="" width={150} height={150} />
      </div>
    ),
    { ...size }
  );
}
