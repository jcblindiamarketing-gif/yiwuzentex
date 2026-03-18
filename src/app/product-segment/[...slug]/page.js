// app/product-segment/[slug]/page.js
import images from '@/assets'
import Breadcrumb from '@/components/BreadCrumb/BreadCrumb'
import CategoryCard from '@/components/CategoryCard/CategoryCard'
import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import React from 'react'
import ProductsCards from "@/containers/PS/ProductsCards/ProductsCards"; // <-- create this component
import ProductSegmentClient from './ProductSegmentClient'

// Fetch subcategories of a given category
async function getChildCategories(parentId) {
    try {
        const query = `
      *[_type == "productCategory" && parent._ref == $parentId]{
        _id,
        title,
        "slug": slug.current,
        "imageUrl": image.asset->url
      }
    `;
        return await client.fetch(query, { parentId });
    } catch (error) {
        console.error("❌ Error fetching child categories:", error.message);
        return [];
    }
}

// Fetch products under a specific category
async function getProductsForCategory(categoryId) {
    try {
        const query = `
      *[_type == "product" && category._ref == $categoryId]{
        _id,
        name,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        description,
        specifications
      }
    `;
        return await client.fetch(query, { categoryId });
    } catch (error) {
        console.error("❌ Error fetching products:", error.message);
        return [];
    }
}

// Get main category and either subcategories or products
async function getCategoryData(slug) {
    try {
        const mainCategoryQuery = `
        *[_type == "productCategory" && slug.current == $slug][0]{
          _id,
          title,
          "slug": slug.current,
          description,
        "catalogueUrl": catalogue.asset->url,
          
        }
      `;
        const mainCategory = await client.fetch(mainCategoryQuery, { slug });

        console.log("mainCategory", mainCategory);

        if (!mainCategory) {
            return null;
        }

        const [products, subCategories] = await Promise.all([
            getProductsForCategory(mainCategory._id),
            getChildCategories(mainCategory._id),
        ]);

        // const [subCategories] = await Promise.all([
        //     // getProductsForCategory(mainCategory._id),
        //     getChildCategories(mainCategory._id),
        // ]);

        return {
            mainCategory,
            products,
            subCategories,
        };
    } catch (error) {
        console.error("❌ Error in getCategoryData:", error.message);
        return null;
    }
}




export default async function ProductSegmentPage({ params }) {
    const { slug: slugArray } = await params;

    // Extract the last segment of slug (e.g., /category/shirts → "shirts")
    const slug = slugArray.length ? slugArray[slugArray.length - 1] : "";


    if (!slug) {
        return <div className="p-10 text-lg">Invalid URL: Slug not provided.</div>;
    }

    const data = await getCategoryData(slug);

    if (!data?.mainCategory) {
        return <div className="p-10 text-lg">Category not found.</div>;
    }

    const { mainCategory, subCategories, products } = data;
    // const { mainCategory, subCategories } = data;

    // console.log("Main Category:", mainCategory);
    // console.log("Subcategories:", subCategories);
    // console.log("Products:", products);

    return (
        <>
            <header className="relative w-full max-md:h-[300px]">
                <Image src={images.AboutHeader} alt="About" className="w-full max-md:h-full" />
                <div className="absolute bottom-10 left-20 max-md:left-5 max-md:bottom-7">
                    <h2 className="text-6xl max-md:text-3xl font-semibold text-white">
                        {mainCategory.title}
                    </h2>
                    <Breadcrumb />
                </div>
            </header>

            <div className="app__container py-10">

                <div>

                    <h1 className="text-5xl max-md:text-3xl font-semibold text-[#10797C] text-center mb-5">
                        {mainCategory.title}
                    </h1>

                    {/* Description */}
                    {mainCategory.description && (
                        <div className="portable-text mb-5">
                            <PortableText value={mainCategory.description} />
                        </div>
                    )}


                </div>


                {/* Subcategories Of this category */}
                {subCategories?.length > 0 && (
                    <>
                        {/* <h2 className="text-4xl text-center font-semibold text-[#10797C] my-8">Subcategories</h2> */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
                            {subCategories.map((category) => (
                                <CategoryCard
                                    key={category._id}
                                    category={category}
                                    mainCategorySlug={`${mainCategory.slug}`}
                                />
                            ))}
                        </div>
                    </>
                )}


                {/* Products directly under this category */}
                {products?.length > 0 && (
                    <>
                        {/* <h2 className="text-4xl text-center font-semibold text-[#10797C] mt-5 mb-14">Products</h2> */}
                        <ProductsCards products={products} />
                    </>
                )}


                {mainCategory.catalogueUrl && <ProductSegmentClient data={mainCategory} />}


            </div>



        </>
    );
}



