"use client";

import images from "@/assets";
import Carousel from "@/components/Carousel/Carousel";
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
  // Make sure we always have an array
  const bannerData = Array.isArray(banners)
    ? banners.filter(Boolean)
    : [];

  return (
    <header className="h-[600px] max-md:h-fit">
      <div className="w-full h-full">
        <Carousel
          data={bannerData}
          renderSlide={(banner) => {
            // Prevent crash if banner is undefined
            if (!banner) {
              return null;
            }

            return (
              <Link href={banner?.ctaUrl || "/"}>
                <img
                  src={banner?.image?.asset?.url || ""}
                  alt="Header Image"
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </Link>
            );
          }}
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