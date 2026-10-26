import {
  BASE_URL,
  createUrlSet,
  xmlResponse,
  fetchSitemapEntries,
} from "@/lib/sitemapXml";

export async function GET() {
  const posts = await fetchSitemapEntries(`
    *[_type == "post" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }
  `);

  return xmlResponse(
    createUrlSet(
      posts.map((post) => ({
        url: `${BASE_URL}/blogs/${post.slug}`,
        lastModified: post._updatedAt,
      }))
    )
  );
}