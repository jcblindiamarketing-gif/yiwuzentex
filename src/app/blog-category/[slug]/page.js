
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { notFound } from "next/navigation";

const CATEGORY_QUERY = `*[_type == "blogCategory" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current
}`;

const POSTS_QUERY = `*[
  _type == "post" &&
  blogCategory._ref == $categoryId &&
  defined(slug.current)
] | order(createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  metaDescription,
  "image": mainImage.asset->url
}`;

export default async function BlogCategoryPage({ params }) {
  const { slug } = await params;

  const category = await client.fetch(CATEGORY_QUERY, { slug });

  if (!category) {
    notFound();
  }

  const posts = await client.fetch(POSTS_QUERY, {
    categoryId: category._id,
  });

  return (
<main className="mx-auto w-full max-w-[1600px] px-8 py-12">      <h1 className="mb-4 text-3xl font-bold">{category.title}</h1>

      {posts.length === 0 ? (
        <p>No blog posts have been assigned to this category yet.</p>
      ) : (
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">          {posts.map((post) => (
            <article
              key={post._id}
              className="overflow-hidden rounded-lg border p-4"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="mb-4 h-48 w-full rounded object-cover"
                />
              )}

              <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>

              {post.metaDescription && (
                <p className="mb-4 text-sm text-gray-600">
                  {post.metaDescription}
                </p>
              )}

              <Link
                href={`/blogs/${post.slug}`}
                className="font-medium text-teal-700 hover:underline"
              >
                Read More
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
