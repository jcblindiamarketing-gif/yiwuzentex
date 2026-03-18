"use client";
import images from "@/assets";
import Carousel from "@/components/Carousel/Carousel";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CarouselData = [
  {
    id: 1,
    image: images.Header1,
  },
  {
    id: 2,
    image: images.Header2,
  },
  {
    id: 3,
    image: images.Header3,
  },
];

function Header({ banners }) {
  return (
    <header className="h-[600px]  max-md:h-fit">
      <div className="w-full h-full">
        {/* <Image src={images.Header} alt="Header Image"  className="w-full h-full"/> */}
        <Carousel
          data={banners}
          
          renderSlide={(banner) => (
            // <Image src={'https://www.gocomet.com/blog/wp-content/uploads/2021/04/HLAG_Salahuddin_Rotterdam_1280x800_rgb-1-1.webp'} alt="Header Image" className="w-full " />
            // <img src="https://c4.wallpaperflare.com/wallpaper/361/145/166/reflection-port-tourist-attraction-water-wallpaper-preview.jpg" alt="Header Image" className="w-full h-full object-fill"/>
            <Link href={banner.ctaUrl ? banner.ctaUrl : "/"}>
              <img
                src={banner.image.asset.url}
                alt="Header Image"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </Link>
          )}
          showDots={true}
          showArrows={true}
          autoPlay={true}
          delay={5000}
        />
      </div>
    </header>
  );
}

export default Header;
