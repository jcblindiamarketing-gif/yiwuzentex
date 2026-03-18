import images from "@/assets";
import Image from "next/image";
import React from "react";

function Map() {
  return (
    <div className="w-full ">
      <h2 className="text-5xl max-md:text-4xl font-medium text-center accent-sec">
        Where we are
      </h2>

      <div className="app__container flex justify-center mt-16">
        <Image src={images.Map} alt="Map" className="w-full" />
      </div>
    </div>
  );
}

export default Map;
