"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CategoryCard({ category, mainCategorySlug }) {
  const [hovered, setHovered] = useState(false);

  const currentUrlAfterProductSegment = window.location.pathname.split("/").slice(2).join("/");


  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300"
    >
      <Link
        href={`/product-segment/${currentUrlAfterProductSegment}/${category.slug}`}
        className="block group"
      >
        {/* Image Section */}
        <div className="relative w-full h-64">
          {category.imageUrl ? (
            <Image
              src={category.imageUrl}
              alt={category.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}

          {/* Overlay (only on hover) */}
          <motion.div
            initial={false}
            animate={{ y: hovered ? "0%" : "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#10797C]/70 z-10 pointer-events-none"
          />

          {/* Title Centered */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <h2 className="text-white text-xl md:text-2xl font-semibold text-center px-4 drop-shadow">
              {category.title}
            </h2>
          </div>
        </div>

        {/* Optional Read More CTA */}
        <div className="relative group overflow-hidden p-4 text-center cursor-pointer">
          {/* Background Fill */}
          <span className="absolute inset-0 bg-[#10797C] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0"></span>

          {/* Text Layer */}
          <p className="relative z-10 text-lg text-gray-500 group-hover:text-white font-medium transition-colors duration-300">
            Explore Products →
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
