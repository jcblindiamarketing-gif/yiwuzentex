
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import ProductInfo from "./ProductInfo";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const data = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0] {
            name,
            description,
            "imageUrl": image.asset->url
        }`,
        { slug }
    );

    if (!data) {
        return {
            title: "Product Not Found | Zentrex",
            description: "This product could not be found.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const title = data.name || "Product | Zentrex";
    const description =
        data.description || `Discover ${title} from Zentrex.`;

    const productImage =
        data.imageUrl || "https://www.yiwuzentrex.com/og-image.jpg";

    const pageUrl =
        `https://www.yiwuzentrex.com/products/${slug}`;

    return {
        title: `${title} | Zentrex`,
        description,

        alternates: {
            canonical: pageUrl,
        },

        openGraph: {
            title,
            description,
            url: pageUrl,
            siteName: "Zentrex",
            type: "website",
            images: [
                {
                    url: productImage,
                    alt: title,
                    width: 595,
                    height: 595,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [
                {
                    url: productImage,
                    alt: title,
                },
            ],
        },
    };
}

export default async function ProductPage({ params }) {
    const { slug } = await params;

    const data = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0] {
            _id,
            name,
            slug,
            category->{ _id, title },
            description,
            image { asset->{ url } },
            otherImages []{ asset->{ url } },
            specifications,
            mainParent->{ _id }
        }`,
        { slug }
    );

    if (!data) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white pt-12 max-md:pt-4 max-md:px-4 px-20">
            <ProductInfo data={data} />
        </div>
    );
}
