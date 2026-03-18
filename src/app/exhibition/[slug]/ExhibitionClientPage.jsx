"use client";
import React from "react";
// import { PortableText } from "@portabletext/react";

function ExhibitionClientPage({ exhibition }) {
  return (
    <div className="app__container">
      <div className="flex justify-between gap-4  my-10">
        <div>
          <h2 className="text-3xl font-semibold text-[#10797C]">{exhibition.title}</h2>
          <p className="grey-variant mt-4 w-[85%]">{exhibition.description}</p>
        </div>

        <div>
          {exhibition?.youtubeVideo && (
            <iframe
              width="560"
              height="315"
              src={exhibition.youtubeVideo}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-semibold text-center text-[#10797C]">Glimpse of Exhibition</h2>

        <div className="fake-masonry">
          {exhibition?.otherImages?.map((image, index) => (
            <img
              src={image.asset.url}
              alt={exhibition.title}
              key={index}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExhibitionClientPage;
