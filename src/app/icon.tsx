import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Uses the real DHRUVAM star/compass emblem (cropped from the club's actual
// campaign artwork) rather than a generic placeholder mark.
export default function Icon() {
  const emblem = fs
    .readFileSync(path.join(process.cwd(), "public/assets/dhruvam/logos/dhruvam-star-emblem.png"))
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
        <img src={`data:image/png;base64,${emblem}`} alt="" width={30} height={30} />
      </div>
    ),
    { ...size }
  );
}
