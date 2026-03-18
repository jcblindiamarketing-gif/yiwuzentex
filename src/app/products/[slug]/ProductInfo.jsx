"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import ProductClient from "./ProductClient";
import FormModal from "@/components/FormModal/FormModal";
import Carousel from "@/components/Carousel/Carousel";
import { FaCheckCircle } from "react-icons/fa";
import FormTicketModal from "@/components/FormModal/FormTicketModal";

function ProductInfo({ data }) {
  const formRef = useRef(null);
  const [formVisible, setFormVisible] = useState(false);



  const [images, setImages] = useState([data.image, ...Array.isArray(data?.otherImages) ? data?.otherImages : []]);

  console.log("images", images);

  const openForm = () => setFormVisible(true);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="sticky top-32 max-md:top-0 max-md:relative">
          {data?.image ? (
            <Carousel
              data={images}
              renderSlide={(img, index) => (
                <img
                  src={img?.asset?.url}
                  alt={`Product Image ${index + 1}`}
                  // width={600}
                  // height={600}
                  className="rounded-md  shadow-md"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              )}
              showThumbnails={true} // ✅
              showArrows={true}
              showDots={false}
              autoPlay={false}
              // leftArrowPosition="left-[0rem]"
              // rightArrowPosition="right-[4rem] max-md:right-[1rem]"
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        <div className="space-y-5 animate-fadeIn">
          <h1 className="text-4xl font-bold text-[#10797C]">{data.name}</h1>
          <p className="text-gray-700 text-lg">{data.description}</p>

          {data?.specifications && (
            <div className="pt-4 prose max-w-none portable-text">
              <PortableText value={data.specifications} />
            </div>
          )}

          <div className="flex gap-2 justify-between border border-gray-200 rounded-md px-4 py-7 items-center max-md:flex-col max-md:justify-start max-md:items-start max-md:gap-5 ">
            <div className="flex gap-2 max-sm:flex-col">
              <div className="w-[100px] h-[100px] bg-gray-100  text-gray-400 text-sm">
                <img
                  src={data?.image.asset?.url}
                  className="w-full h-full rounded-md "
                  alt="Product Main Image"
                />
              </div>

              <div>
                <h2 className="mb-2 font-semibold">
                  Looking To Purchase {data.name} in bulk ?
                </h2>

                <ul className="list-disc list-inside space-y-2">
                  <li className="flex gap-2 items-center">
                    <FaCheckCircle className="text-green-700" />
                    Purchase item in bulk quanity
                  </li>
                  <li className="flex gap-2 items-center">
                    <FaCheckCircle className="text-green-700" />
                    Get at the best price for your business
                  </li>
                </ul>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={openForm}
                className="bg-[#10797C]  cursor-pointer hover:bg-[#0b5a5d] text-white px-4 py-3 rounded-lg shadow-md transition-all"
              >
                Click to Raise Request
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <FormTicketModal
        formVisible={formVisible}
        selectedProduct={data}
        formRef={formRef}
        setFormVisible={setFormVisible}
        key={data._id}
      />

      <ProductClient product={data} />
    </>
  );
}

export default ProductInfo;
