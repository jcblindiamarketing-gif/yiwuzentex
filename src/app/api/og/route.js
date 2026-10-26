
import { ImageResponse } from "next/og";

export const runtime = "edge";

const BRAND = "ZENTREX";
const TEAL = "#10797C";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const title = (searchParams.get("title") || "Zentrex")
    .slice(0, 100);

  const description = (
    searchParams.get("description") ||
    "Your trusted partner in global sourcing and supply solutions."
  ).slice(0, 200);

  let image = searchParams.get("image") || "";

  // Only allow images hosted on the Sanity CDN.
  try {
    if (image) {
      const parsed = new URL(image);

      if (
        parsed.protocol !== "https:" ||
        parsed.hostname !== "cdn.sanity.io"
      ) {
        image = "";
      }
    }
  } catch {
    image = "";
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#ffffff",
          fontFamily: "Arial",
          color: "#172b35",
        }}
      >
        <div
          style={{
            width: image ? "66%" : "100%",
            padding: "64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: TEAL,
              marginBottom: 36,
            }}
          >
            {BRAND}
          </div>

          <div
            style={{
              fontSize: title.length > 48 ? 42 : 54,
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 24,
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 23,
              lineHeight: 1.4,
              color: "#52636b",
            }}
          >
            {description}
          </div>

          <div
            style={{
              marginTop: 36,
              fontSize: 19,
              color: TEAL,
            }}
          >
            www.yiwuzentrex.com
          </div>
        </div>

        {image ? (
          <div
            style={{
              width: "34%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 36,
              background: "#f2f8f8",
            }}
          >
            <img
              src={image}
              alt=""
              width="330"
              height="420"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "420px",
                objectFit: "contain",
              }}
            />
          </div>
        ) : null}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
