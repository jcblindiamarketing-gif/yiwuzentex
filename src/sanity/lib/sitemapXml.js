export const BASE_URL = "https://www.yiwuzentrex.com";

export function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function createUrlSet(entries) {
  const urls = entries
    .filter((entry) => entry.url)
    .map((entry) => {
      const lastmod = entry.lastModified
        ? `<lastmod>${escapeXml(new Date(entry.lastModified).toISOString())}</lastmod>`
        : "";

      return `<url><loc>${escapeXml(entry.url)}</loc>${lastmod}</url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

export function xmlResponse(xml) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

export async function fetchSitemapEntries(query, params) {
  const { client } = await import("@/sanity/lib/client");
  return client.fetch(query, params || {}, { next: { revalidate: 3600 } });
}