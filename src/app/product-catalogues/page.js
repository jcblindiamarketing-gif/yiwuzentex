// app/catalogues/page.tsx
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import CataloguePageClient from './CataloguePageClient'
import images from '@/assets'
import Breadcrumb from '@/components/BreadCrumb/BreadCrumb'
import Image from 'next/image'


const getProductsWithCatalogueQuery = groq`
  *[_type == "productCategory" && defined(catalogue.asset)]{
    "slug": slug.current,
    title,
    "parent" : parent -> {
        title,
        "slug" : slug.current
    },
    "catalogueUrl": catalogue.asset->url
  } | order(category->title asc)
`

export default async function CataloguePage() {
    const products = await client.fetch(getProductsWithCatalogueQuery, {}, {
        next: { revalidate: 3600 }
    })

    console.log("products", products);

    // Group by category title
    const grouped = products.reduce((acc, product) => {
        const parentTitle = product?.parent.title || 'Uncategorized';

        if (!acc[parentTitle]) {
            acc[parentTitle] = [];
        }

        acc[parentTitle].push(product);
        return acc;
    }, {});


    const groupedArray = Object.entries(grouped).map(([parentTitle, items]) => ({
        parentTitle,
        items
    }));


    return (

        <>
            <header className='relative w-full max-md:h-[300px]'>
                <Image src={images.AboutHeader} alt="About" className="w-full max-md:h-full" />


                <div className='absolute bottom-10 left-20 max-md:left-5 max-md:bottom-7'>
                    <h2 className='text-6xl max-md:text-3xl font-semibold text-white'>Catalogues</h2>
                    <Breadcrumb />

                </div>
            </header>

            <CataloguePageClient categories={groupedArray} />
        </>
    )
}
