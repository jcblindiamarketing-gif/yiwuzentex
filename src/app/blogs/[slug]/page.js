// app/blog/[slug].tsx
import { PortableText } from 'next-sanity';
import { fetchBlogBySlug } from '../query';  // Create this function in lib
import Image from 'next/image';
// import { PortableText } from "@" ;

import React from 'react';
import { urlFor } from '@/sanity/lib/image';
import ShareButton from '@/components/ShareButton/ShareButton';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await fetchBlogBySlug(slug);

    if (!blog) {
        return {
            title: 'Blog not found',
            description: 'This blog post could not be found.',
        };
    }

    return {
        title: blog.title,
        description: blog?.excerpt || 'Read the full blog post',
    };
}

export default async function BlogDetailPage({ params }) {
    const { slug } = await params;
    const blog = await fetchBlogBySlug(slug);

    if (!blog) {
        return <div className="p-10 text-lg">Blog not found</div>;
    }
    console.log(blog);

    const portableTextComponents = {
        types: {
            // Handle image block
            image: ({ value }) => (
                <div className="blog-image-container">
                    <img
                        src={urlFor(value.asset).url()}
                        alt={value.alt || 'Blog Image'}
                        className="blog-image"
                        loading="lazy"
                    />
                </div>
            ),
        },
    };


    // let url;
    // const title = blog.title;

    // if (typeof window !== 'undefined') {
    //     url = window.location.href;
    // }


    return (
        <div>

            {/* Blog Content */}
            <section className="max-w-6xl  mx-auto px-4 pt-16 pb-12">
                <div className="prose">
                    <h2 className='text-4xl font-semibold text-center text-[#10797C]'>{blog.title}</h2>
                    <p className="text-sm text-gray-600 my-4">{new Date(blog.createdAt).toLocaleDateString()}</p>
                    <div className="my-6">
                        {/* <Image
                            src={blog.mainImage.asset.url}
                            alt={blog.title}
                            className="rounded-lg shadow-lg w-full h-72 object-cover"
                            width={800}
                            height={400}
                        /> */}

                        <img src={blog.mainImage.asset.url} loading='lazy' alt={blog.title} className="rounded-lg shadow-lg  " />
                    </div>


                    <div className='portable-text '>
                        <PortableText value={blog.description} components={portableTextComponents} />
                    </div>

                </div>

                <div className='flex justify-center'>

                    <ShareButton title={blog.title} />
                </div>
            </section>
        </div>
    );
}
