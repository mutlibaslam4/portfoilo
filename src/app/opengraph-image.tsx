import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#050706",
          color: "#f4f7f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#43e36d", letterSpacing: 4 }}>PORTFOLIO</div>
        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 24, lineHeight: 1.05 }}>{profile.name}</div>
        <div style={{ fontSize: 44, marginTop: 20, color: "#43e36d" }}>{profile.role}</div>
        <div style={{ fontSize: 28, marginTop: 36, color: "#9ca49e" }}>{profile.headline}</div>
      </div>
    ),
    size,
  );
}
