import {
  BASE_URL,
  createUrlSet,
  xmlResponse,
  fetchSitemapEntries,
} from "@/lib/sitemapXml";

export async function GET() {
  const products = await fetchSitemapEntries(`
    *[_type == "product" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }
  `);

  return xmlResponse(
    createUrlSet(
      products.map((product) => ({
        url: `${BASE_URL}/products/${product.slug}`,
        lastModified: product._updatedAt,
      }))
    )
  );
}