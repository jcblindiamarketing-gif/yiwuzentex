import {
  BASE_URL,
  createUrlSet,
  xmlResponse,
  fetchSitemapEntries,
} from "@/lib/sitemapXml";

// Run on the server for every request, never prebuilt or cached by Next.js
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const posts = await fetchSitemapEntries(`
    *[_type == "post" && defined(slug.current)] | order(_updatedAt desc) {
      "slug": slug.current,
      _updatedAt
    }
  `);

  return xmlResponse(
    createUrlSet(
      (posts || []).map((post) => ({
        url: `${BASE_URL}/blogs/${post.slug}`,
        lastModified: post._updatedAt,
      }))
    )
  );
}