import { ImageResponse } from "next/og";
export const dynamic = "force-static";

export const alt = "뭉클랩 — 당신의 업무를 위한 AI 에이전트";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(180deg, #f1f3f5 0%, #ffffff 60%)",
          color: "#1a1a1a",
          padding: "56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#7f7f7f" }}>
          <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#1f6fd1" }} />
          MOONKLABS · AI AGENTS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 920 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -3,
            }}
          >
            <span>당신의 업무를 위한</span>
            <span>AI 에이전트</span>
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.45, color: "#595959" }}>
            시키면 에이전트가 끝까지 실행하고, 결정은 사람이 승인합니다.
            MKbot.ai · 장사왕 · Sprintable
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#7f7f7f" }}>moonklabs.com</div>
      </div>
    ),
    size,
  );
}
