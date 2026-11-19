
import { ImageResponse } from "next/og";

export const runtime = "edge";

const BRAND = "ZENTREX";
const TEAL = "#10797C";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const title = (searchParams.get("title") || "Zentrex").slice(0, 100);
  const description = (
    searchParams.get("description") ||
    "Your trusted partner in global sourcing and supply solutions."
  ).slice(0, 200);

  let imageData = null;

  const imageUrl = searchParams.get("image") || "";

  // Only fetch images from the Sanity CDN.
  try {
    if (imageUrl) {
      const parsed = new URL(imageUrl);

      if (
        parsed.protocol === "https:" &&
        parsed.hostname === "cdn.sanity.io"
      ) {
        const response = await fetch(parsed.toString(), {
          headers: { Accept: "image/*" },
        });

        if (response.ok) {
          const contentType = response.headers.get("content-type") || "";

          if (
            ["image/png", "image/jpeg", "image/webp"].includes(
              contentType.split(";")[0].trim().toLowerCase()
            )
          ) {
            const buffer = new Uint8Array(await response.arrayBuffer());

            // Convert bytes to base64 without exceeding argument limits.
            let binary = "";
            const chunkSize = 8192;

            for (let i = 0; i < buffer.length; i += chunkSize) {
              binary += String.fromCharCode(
                ...buffer.subarray(i, i + chunkSize)
              );
            }

            imageData = `data:${contentType.split(";")[0]};base64,${btoa(binary)}`;
          }
        }
      }
    }
  } catch (error) {
    console.error("OG image fetch failed:", error);
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
            width: imageData ? "66%" : "100%",
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

        {imageData && (
          <div
            style={{
              width: "34%",
              height: "630px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 36,
              background: "#f2f8f8",
            }}
          >
            <img
              src={imageData}
              alt=""
              width={330}
              height={420}
              style={{
                width: "100%",
                height: "420px",
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
