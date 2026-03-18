// app/products/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import ProductClient from "./ProductClient";
import ProductInfo from "./ProductInfo";


export async function generateMetadata({ params }) {
    const { slug } = await params;

    const data = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0] {
          name,
          description
          
        }`,
        { slug }
    );

    if (!data) {
        return {
            title: 'Product not found',
            description: 'This Product could not be found.',
        };
    }


    return {
        title: data.name,
        description: data.description,
    };

}

export default async function ProductPage({ params }) {
    const { slug } = await params;

    console.log("slug", slug);
    const data = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0] {
          _id,
          name,
          slug,
          category->{ _id, title },
          description,
          image { asset-> { url } },
          otherImages []{ asset-> { url } },
          specifications,
          mainParent->{ _id }
        }`,
        { slug }
    );

    console.log("data", data);


    if (!data) notFound();

    return (

        <div className="min-h-screen bg-white pt-12 max-md:pt-4  max-md:px-4 px-20">

            <ProductInfo data={data} />
        </div>
    );
}