import { client } from "@/sanity/lib/client";

export const BLOGS_QUERY = `
  *[_type == "post"] | order(_createdAt desc)[0...$limit] {
    _id,
    title,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    _createdAt
  }
`;




export async function fetchBlogs(limit = 10) {
  return client.fetch(BLOGS_QUERY, { limit }, { next: { revalidate: 3600 * 24 } });
}

export async function fetchTotalBlogCount() {
  return client.fetch(`count(*[_type == "post"])`);
}

export async function fetchBlogBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    mainImage {
      asset-> {
        url
      }
    },
    createdAt,
    description,
    slug,
    excerpt
  }`;

  const result = await client.fetch(query, { slug });

  return result;
}
