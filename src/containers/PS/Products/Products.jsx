"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

function Products({ products }) {
  return (
    <section className="py-20 px-4 md:px-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-5xl max-md:text-3xl font-semibold text-[#10797C]">
          Our Products Segment
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-lg">
          Explore our diverse product range across multiple industries, crafted
          with precision and trust.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <Link href={`/product-segment/${product.slug}`}>
              <div className="relative h-64 w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  layout="fill"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex items-center justify-between transition-all duration-300 ease-in-out bg-white group-hover:bg-[#10797C]">
                <h3 className="text-2xl font-semibold text-[#10797C] group-hover:text-white transition-colors duration-300">
                  {product.title}
                </h3>
                <FaArrowRight className="text-[#10797C] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Products;
