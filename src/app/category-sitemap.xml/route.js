import {
  BASE_URL,
  createUrlSet,
  xmlResponse,
  fetchSitemapEntries,
} from "@/lib/sitemapXml";

export async function GET() {
  const categories = await fetchSitemapEntries(`
    *[_type == "blogCategory" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }
  `);

  return xmlResponse(
    createUrlSet(
      categories.map((category) => ({
        url: `${BASE_URL}/blog-category/${category.slug}`,
        lastModified: category._updatedAt,
      }))
    )
  );
}