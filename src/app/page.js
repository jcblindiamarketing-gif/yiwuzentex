import ProblemSolve from "@/components/Features/Features";
import Loader from "@/components/Loader/Loader";
import WorldMap from "@/components/Map/Map";
import About from "@/containers/About/About";
import Header from "@/containers/Header/Header";
import InteractiveWorldMap from "@/containers/InteractiveWorldMap/InteractiveWorldMap";
import Services from "@/containers/Services/Services";
import { client } from "@/sanity/lib/client";
import Image from "next/image";


export async function getBannersByTitle(title) {
  const query = `*[_type == "siteBanner" && page == $title][0]{
    banners[] {
      image {
        asset-> {
          url
        }
      },
      ctaUrl,
      alt
    }
  }`

  try {
    const data = await client.fetch(
      query,
      { title },
      {
        next: { revalidate: 3600 * 24 }, // 1 day
      }
    )

    console.log("data", data) 
    return data?.banners || []
  } catch (error) {
    console.error(`Error fetching ${title} banners:`, error)
    return []
  }
}



export default async function Home() {
  const banners = await getBannersByTitle('home');

  console.log("banners", banners);

  return (
    <div className="">
      <Header  banners={banners}/>
      <About />
      <ProblemSolve />
      <Services/>
      {/* <WorldMap/> */}
      <InteractiveWorldMap/>

    </div>
  );
}
