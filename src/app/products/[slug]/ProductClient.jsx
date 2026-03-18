"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

export default function ProductClient({ product }) {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const similarRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const inView = useInView(similarRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  const pageSize = 4;

  useEffect(() => {
    if (inView && similarProducts.length === 0) {
      fetchSimilarProducts();
    }
  }, [inView]);

  const fetchSimilarProducts = async () => {
    const start = page * pageSize;
    const end = start + pageSize;

    setLoading(true);

    console.log("product", product);


    const data = await client.fetch(
      `*[_type == "product" && category._ref == $categoryId && slug.current != $slug] 
      | order(_createdAt desc) 
      [$start...$end] {
        _id,
        name,
        slug,
        category->{ _id, title },
        image { asset-> { url } }
      }`,
      {
        categoryId: product.category._id,
        slug: product.slug.current,
        start,
        end,
      }
    );

    setSimilarProducts((prev) => [...prev, ...data]);
    setPage((prev) => prev + 1);
    if (data.length < pageSize) setHasMore(false);

    setLoading(false);
  };

  return (
    <>
      {/* 🟡 Similar Products */}

      <div className="relative">
        <div ref={similarRef} className="pt-24 px-20 max-md:px-5">
          <h2 className="text-4xl max-md:text-3xl font-semibold text-[#10797C] mb-6 text-center">
            Similar Products
          </h2>
          {loading && <span className="loader block mx-auto my-10" />}
          <div className="grid grid-cols-4 max-md:grid-cols-2 gap-6">
            {similarProducts?.map((prod) => (
              <motion.div
                key={prod._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
                whileHover={{ scale: 1.03 }}
              >
                <Link href={`/products/${prod.slug.current}`}>
                  {prod?.image ? (
                    <Image
                      src={urlFor(prod?.image).url()}
                      alt={prod?.name || prod?.title}
                      width={400}
                      height={400}
                      className="rounded-lg mb-3 object-cover h-[200px] w-full"
                    />
                  ) : (
                    <div className="w-full h-[80%] bg-gray-100 flex items-center justify-center text-gray-400 text-sm mb-3">
                      No Image
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-[#10797C]">
                    {prod.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {hasMore && (
          <div className="relative mt-6 flex justify-center">
            {/* Load More button */}
            <button
              onClick={fetchSimilarProducts}
              className="flex cursor-pointer items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-all"
              disabled={loading}
            >
              <FiChevronDown className="text-xl" />
              {loading ? "Loading..." : "Load More Related Products"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
