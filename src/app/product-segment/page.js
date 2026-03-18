import images from '@/assets'
import Breadcrumb from '@/components/BreadCrumb/BreadCrumb'
import Products from '@/containers/PS/Products/Products'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import React from 'react'


async function getParentCategories() {
  const query = `
      *[_type == "productCategory" && !defined(parent) &&  (isActive == true || !defined(isActive))]{
        _id,
        title,
        "slug": slug.current,
        "imageUrl": image.asset->url
      }
    `
  const categories = await client.fetch(query);
  return categories
}


async function ProductSegment() {

  const categories = await getParentCategories()


  return (
    <div>


      <header className='relative w-full max-md:h-[300px]'>
        <Image src={images.AboutHeader} alt="About" className="w-full max-md:h-full" />


        <div className='absolute bottom-10 left-20 max-md:left-5 max-md:bottom-7'>
          <h2 className='text-6xl max-md:text-3xl font-semibold text-white'>Products Segment</h2>
          <Breadcrumb />

        </div>
      </header>


      <Products products={categories} />
    </div>
  )
}

export default ProductSegment


