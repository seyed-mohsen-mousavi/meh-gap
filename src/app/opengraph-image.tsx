import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(45deg, #e50989 0%, #ffa614 50% , #118bce 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 80,
          fontWeight: "bold",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            padding: "40px 80px",
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "32px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          }}
        >
          Meh Gap 💬
        </div>
      </div>
    ),
  );
}
