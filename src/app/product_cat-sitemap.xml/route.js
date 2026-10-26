import {
  BASE_URL,
  createUrlSet,
  xmlResponse,
  fetchSitemapEntries,
} from "@/lib/sitemapXml";

export async function GET() {
  const categories = await fetchSitemapEntries(`
    *[_type == "productCategory" && defined(slug.current)
      && isActive != false] {
      "slug": slug.current,
      "parentSlug": parent->slug.current,
      _updatedAt
    }
  `);

  return xmlResponse(
    createUrlSet(
      categories.map((category) => {
        const path = category.parentSlug
          ? `/product-segment/${category.parentSlug}/${category.slug}`
          : `/product-segment/${category.slug}`;

        return {
          url: `${BASE_URL}${path}`,
          lastModified: category._updatedAt,
        };
      })
    )
  );
}