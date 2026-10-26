
import images from "@/assets";
import Breadcrumb from "@/components/BreadCrumb/BreadCrumb";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import ProductsCards from "@/containers/PS/ProductsCards/ProductsCards";
import ProductSegmentClient from "./ProductSegmentClient";
import ContactForm from "@/components/ContactForm/ContactForm";

const SITE_URL = "https://www.yiwuzentrex.com";

// Dynamic SEO and social-sharing metadata
export async function generateMetadata({ params }) {
  const { slug: slugArray } = await params;

  const slug = Array.isArray(slugArray)
    ? slugArray[slugArray.length - 1]
    : slugArray;

  if (!slug) {
    return {
      title: "Product Categories | Zentrex",
      description: "Explore product categories from Zentrex.",
    };
  }

  const category = await client.fetch(
    `*[_type == "productCategory" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      description,
      "imageUrl": image.asset->url
    }`,
    { slug }
  );

  if (!category) {
    return {
      title: "Category Not Found | Zentrex",
      robots: { index: false, follow: false },
    };
  }

  const title = category.title || "Product Category";

  // Sanity descriptions may be Portable Text, not plain strings.
  const description = Array.isArray(category.description)
    ? category.description
        .map((block) =>
          block.children
            ?.map((child) => child.text || "")
            .join("") || ""
        )
        .filter(Boolean)
        .join(" ")
    : typeof category.description === "string"
      ? category.description
      : "";

  const metaDescription =
    description || `Explore ${title} products from Zentrex.`;

  // Preserve the full path for nested categories.
  const path = Array.isArray(slugArray)
    ? slugArray.join("/")
    : slugArray;

  const pageUrl = `${SITE_URL}/product-segment/${path}`;

  // Generate a branded, unique social-sharing image.
  const ogParams = new URLSearchParams({
    title,
    description: metaDescription,
  });

  if (category.imageUrl) {
    ogParams.set("image", category.imageUrl);
  }

  const ogImage = `${SITE_URL}/api/og?${ogParams.toString()}`;

  return {
    title: `${title} | Zentrex`,
    description: metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description: metaDescription,
      url: pageUrl,
      siteName: "Zentrex",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
  };
}

// Fetch child categories
async function getChildCategories(parentId) {
  try {
    const query = `
      *[_type == "productCategory" && parent._ref == $parentId] {
        _id,
        title,
        "slug": slug.current,
        "imageUrl": image.asset->url
      }
    `;

    return await client.fetch(query, { parentId });
  } catch (error) {
    console.error("Error fetching child categories:", error);
    return [];
  }
}

// Fetch products belonging to a category
async function getProductsForCategory(categoryId) {
  try {
    const query = `
      *[_type == "product" && category._ref == $categoryId] {
        _id,
        name,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        description,
        specifications
      }
    `;

    const products = await client.fetch(query, { categoryId });

    return (products || []).sort((a, b) =>
      (a.name || "").localeCompare(
        b.name || "",
        undefined,
        {
          numeric: true,
          sensitivity: "base",
        }
      )
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Fetch category details, products, and subcategories
async function getCategoryData(slug) {
  try {
    const mainCategoryQuery = `
      *[_type == "productCategory" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        description,
        "imageUrl": image.asset->url,
        "catalogueUrl": catalogue.asset->url
      }
    `;

    const mainCategory = await client.fetch(
      mainCategoryQuery,
      { slug }
    );

    if (!mainCategory) {
      return null;
    }

    const [products, subCategories] = await Promise.all([
      getProductsForCategory(mainCategory._id),
      getChildCategories(mainCategory._id),
    ]);

    return {
      mainCategory,
      products,
      subCategories,
    };
  } catch (error) {
    console.error("Error fetching category data:", error);
    return null;
  }
}

export default async function ProductSegmentPage({ params }) {
  const { slug: slugArray } = await params;

  const slug = Array.isArray(slugArray)
    ? slugArray[slugArray.length - 1]
    : slugArray;

  if (!slug) {
    return (
      <div className="p-10 text-lg">
        Invalid URL: Slug not provided.
      </div>
    );
  }

  const data = await getCategoryData(slug);

  if (!data?.mainCategory) {
    return (
      <div className="p-10 text-lg">
        Category not found.
      </div>
    );
  }

  const { mainCategory, subCategories, products } = data;

  const showBatteriesVideo =
    mainCategory.slug?.toLowerCase() === "batteries";

  return (
    <>
      <header className="relative w-full max-md:h-[300px]">
        <Image
          src={images.AboutHeader}
          alt="Product category header"
          className="w-full max-md:h-full"
          priority
        />

        <div className="absolute bottom-10 left-20 max-md:left-5 max-md:bottom-7">
          <h2 className="text-6xl max-md:text-3xl font-semibold text-white">
            {mainCategory.title}
          </h2>
          <Breadcrumb />
        </div>
      </header>

      <div className="app__container py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <main className="w-full lg:w-[70%]">
            <div>
              <h1 className="text-5xl max-md:text-3xl font-semibold text-[#10797C] text-center mb-5">
                {mainCategory.title}
              </h1>

              {mainCategory.description && (
                <div className="portable-text mb-5">
                  <PortableText
                    value={mainCategory.description}
                  />
                </div>
              )}
            </div>

            {subCategories?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
                {subCategories.map((category) => (
                  <CategoryCard
                    key={category._id}
                    category={category}
                    mainCategorySlug={mainCategory.slug}
                  />
                ))}
              </div>
            )}

            {products?.length > 0 && (
              <ProductsCards products={products} />
            )}

            {mainCategory.catalogueUrl && (
              <ProductSegmentClient data={mainCategory} />
            )}

            {showBatteriesVideo && (
              <section className="mt-12 w-full">
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    controls
                    className="h-full w-full object-contain"
                  >
                    <source
                      src="/video/jcbl-batteries-video.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support video playback.
                  </video>
                </div>
              </section>
            )}
          </main>

          <aside className="w-full lg:w-[30%]">
            <div className="lg:sticky lg:top-24">
              <ContactForm />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
