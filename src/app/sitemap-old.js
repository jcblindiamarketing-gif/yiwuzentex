
import { client } from "@/sanity/lib/client";

const BASE_URL = "https://www.yiwuzentrex.com";

export const revalidate = 3600;

const STATIC_PAGES = [
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

export default async function sitemap() {
  const [blogs, products, categories, exhibitions] = await Promise.all([
    client.fetch(`
      *[_type == "post" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }
    `),

    client.fetch(`
      *[_type == "product" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }
    `),

    client.fetch(`
      *[_type == "productCategory" && defined(slug.current)
        && isActive != false] {
        "slug": slug.current,
        "parentSlug": parent->slug.current,
        _updatedAt
      }
    `),

    client.fetch(`
      *[_type == "exhibition" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }
    `),
  ]);

  const staticUrls = STATIC_PAGES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const blogUrls = blogs.map((blog) => ({
    url: `${BASE_URL}/blogs/${blog.slug}`,
    lastModified: new Date(blog._updatedAt),
  }));

  const productUrls = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date(product._updatedAt),
  }));

  const categoryUrls = categories.map((category) => {
    const categoryPath = category.parentSlug
      ? `/product-segment/${category.parentSlug}/${category.slug}`
      : `/product-segment/${category.slug}`;

    return {
      url: `${BASE_URL}${categoryPath}`,
      lastModified: new Date(category._updatedAt),
    };
  });

  const exhibitionUrls = exhibitions.map((exhibition) => ({
    url: `${BASE_URL}/exhibition/${exhibition.slug}`,
    lastModified: new Date(exhibition._updatedAt),
  }));

  return [
    ...staticUrls,
    ...blogUrls,
    ...productUrls,
    ...categoryUrls,
    ...exhibitionUrls,
  ];
}
