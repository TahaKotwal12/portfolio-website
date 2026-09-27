import { ImageResponse } from "next/og";

export const alt = "Margin of Error — Web & Product Engineering Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#08080a",
          backgroundImage:
            "linear-gradient(to bottom right, #08080a 0%, #08080a 55%, #17143a 100%)",
          color: "#f4f3ef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#f4f3ef",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#08080a",
            }}
          >
            M
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>
            Margin of Error
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: -1.5,
            maxWidth: 980,
          }}
        >
          We build web apps with zero margin for error.
        </div>

        <div style={{ display: "flex", marginTop: 32, fontSize: 26, color: "#9a9a9f" }}>
          Web &amp; Product Engineering Studio
        </div>
      </div>
    ),
    { ...size }
  );
}
