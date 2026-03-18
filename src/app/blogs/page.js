import images from '@/assets'
import Breadcrumb from '@/components/BreadCrumb/BreadCrumb'
import Image from 'next/image'
import React from 'react'
import BlogsClient from './BlogsClient'
import { fetchBlogs, fetchTotalBlogCount } from './query'


async function BlogPage() {
    const blogs = await fetchBlogs();
    const totalCount = await fetchTotalBlogCount();


    return (
        <div>

            <header className='relative w-full max-md:h-[300px]'>
                <Image src={images.AboutHeader} alt="About" className="w-full max-md:h-full" />


                <div className='absolute bottom-10 left-20 max-md:left-5 max-md:bottom-7'>
                    <h2 className='text-6xl max-md:text-3xl font-semibold text-white'>Blogs</h2>
                    <Breadcrumb />

                </div>
            </header>

            <BlogsClient initialBlogs={blogs} totalCount = {totalCount}/>

        </div>
    )
}

export default BlogPage