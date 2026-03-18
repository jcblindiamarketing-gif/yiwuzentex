"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const ProductsCards = ({ products }) => {
  if (!products?.length)
    return <p className="p-5 text-lg ">No Products Found</p>;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {products.map((cat) => (
        <ProductsCard key={cat._id} cat={cat} />
      ))}
    </section>
  );
};

const ProductsCard = ({ cat }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden flex flex-col justify-between"
    >
      {/* Image Section */}
      <Link
        href={`/products/${cat.slug}`}
        className="relative w-full  overflow-hidden"
      >
        {cat.imageUrl ? (
          <img
            loading="lazy"
            encoding="webp"
            src={cat.imageUrl}
            alt={cat.name || cat.title}
            className="transition-transform duration-300 hover:scale-105 w-[250px] h-[250px] max-md:w-[200px] max-md:h-[200px] mx-auto"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${cat.slug}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {cat.name || cat.title}
          </h3>
        </Link>
        {cat.description && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
            {cat.description}
          </p>
        )}

        {/* Read More Button */}
        <Link
          href={`/products/${cat.slug}`}
          className="mt-auto w-full text-center bg-[#10797C] hover:bg-[#0e6669] text-white py-2 rounded-lg transition duration-300 text-sm font-medium"
        >
          Read More
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductsCards;
