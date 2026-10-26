import { BASE_URL, escapeXml, xmlResponse } from "@/lib/sitemapXml";

export async function GET() {
  const sitemapFiles = [
    "page-sitemap.xml",
    "post-sitemap.xml",
    "category-sitemap.xml",
    "product-sitemap.xml",
    "product_cat-sitemap.xml",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles
  .map(
    (file) =>
      `<sitemap><loc>${escapeXml(`${BASE_URL}/${file}`)}</loc></sitemap>`
  )
  .join("")}
</sitemapindex>`;

  return xmlResponse(xml);
}