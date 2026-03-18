import Breadcrumb from '@/components/BreadCrumb/BreadCrumb';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import Image from 'next/image';
import React from 'react'
import ExhibitionClientPage from './ExhibitionClientPage';

const getExhibitionDetails = async (slug) => {
    try {
        const query = groq`
            *[_type == "exhibition" && slug.current == $slug][0]{
                _id,
                title,
                date,
                slug,
                mainImage { asset-> { url } },
                otherImages []{ asset-> { url } },
                headerImage { asset-> { url } },
                youtubeVideo,
                description
            }
        `;

        const res = await client.fetch(query, { slug });

        return res;
    } catch (e) {
        console.log(e);
    }
}


async function ExibitionDetalsPage({ params }) {
    const { slug } = await params;

    console.log("slug", slug);

    const data = await getExhibitionDetails(slug);

    console.log("data", data);

    return (
        <div>

            <header className='relative w-full max-md:h-[300px]'>
                <Image src={data.headerImage.asset.url} width={1920} height={720} alt="About" className="w-full max-md:h-full" />


                {/* <div className='absolute bottom-10 left-20 max-md:left-5 max-md:bottom-7'>
                    <h2 className='text-6xl max-md:text-3xl font-semibold text-white'>{data.title}</h2>
                    <Breadcrumb />

                </div> */}
            </header>

            <ExhibitionClientPage  exhibition={data}/>

        </div>
    )
}

export default ExibitionDetalsPage