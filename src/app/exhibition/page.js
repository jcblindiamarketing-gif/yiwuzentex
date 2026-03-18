import ExhibitionClient from './ExhibitionClient'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import Breadcrumb from '@/components/BreadCrumb/BreadCrumb'
import images from '@/assets'

const pageSize = 3 // first few exhibitions only

const query = groq`*[_type == "exhibition"] | order(date desc)[0...$pageSize]{
  _id,
  title,
  date,
  slug,
  mainImage { asset-> { url } }
}`

export default async function ExhibitionPage() {
    const exhibitions = await client.fetch(query, { pageSize }, { next: { revalidate: 3600 } })

    if (!exhibitions) return <div>Loading...</div>

    //Extract Upcoming Event and Past Event (Past Events are thos which are over)

    const upcomingExhibitions = exhibitions.filter(exhibition => new Date(exhibition.date) > new Date())
    const pastExhibitions = exhibitions.filter(exhibition => new Date(exhibition.date) < new Date())

    return (
        <>
            <header className='relative w-full max-md:h-[300px]'>
                <Image src={images.AboutHeader} alt="About" className="w-full max-md:h-full" />


                <div className='absolute bottom-10 left-20 max-md:left-5 max-md:bottom-7'>
                    <h2 className='text-6xl max-md:text-3xl font-semibold text-white'>Exhibitions</h2>
                    <Breadcrumb />

                </div>
            </header>

            <ExhibitionClient initialData={exhibitions} pastExhibitionsInitial={pastExhibitions} upComingExhibitionsInitial={upcomingExhibitions} />
        </>
    )
}
