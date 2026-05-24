import { ImageResponse } from "next/og";

export const alt = "Jarl Nelson — I build investment-management technology.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 100px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #18181b 100%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark top-left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              color: "#fbbf24",
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "-0.04em",
            }}
          >
            JN
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#a1a1aa",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            jarlnelson.ai
          </div>
        </div>

        {/* Headline + subhead */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            I build investment-management technology.
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 28,
              color: "#d4d4d8",
              lineHeight: 1.4,
            }}
          >
            <div>
              Most recently: INDATA Nexus — a production AI agent for buy-side firms.
            </div>
            <div style={{ color: "#a1a1aa" }}>
              Built solo, with Claude Code.
            </div>
          </div>
        </div>

        {/* Footer line */}
        <div
          style={{
            fontSize: 20,
            color: "#71717a",
          }}
        >
          Three decades. Currently leading product for AI at INDATA.
        </div>
      </div>
    ),
    { ...size }
  );
}
