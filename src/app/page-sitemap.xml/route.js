import {
  BASE_URL,
  createUrlSet,
  xmlResponse,
} from "@/lib/sitemapXml";

export async function GET() {
  const paths = [
    "",
    "/about-us",
    "/services",
    "/services/supply-chain-management",
    "/product-catalogues",
    "/product-segment",
    "/contact-us",
    "/blogs",
    "/exhibition",
  ];

  return xmlResponse(
    createUrlSet(
      paths.map((path) => ({
        url: `${BASE_URL}${path}`,
      }))
    )
  );
}