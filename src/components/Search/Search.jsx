"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import { FaSearch } from "react-icons/fa";
import { getSearchResults } from "@/lib/searchQuery";

export default function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const inputRef = useRef(null);
  const router = useRouter();

  const fetchProducts = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm) {
        setResults([]);
        setSearchCompleted(false);
        return;
      }

      setLoading(true);
      try {
        const res = await getSearchResults(searchTerm);
        setResults(res || []);
        setSearchCompleted(true);
      } catch (err) {
        console.error("Search failed:", err);
        setSearchCompleted(true);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchProducts(query);
  }, [query, fetchProducts]);

  const handleSelect = (slug) => {
    router.push(`/products/${slug}`);
    resetSearch();
  };

  const resetSearch = () => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleSelect(results[activeIndex].slug.current);
    }
  };

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        resetSearch();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === "Escape") resetSearch();
    };
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, []);

  return (
    <div className="py-8">
      <div className="mx-auto px-4 max-md:px-0 flex items-center justify-between">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="bg-[#10797C] cursor-pointer text-white p-2 rounded-full hover:bg-[#10797C] hover:text-white transition-colors"
            aria-label="Open search"
          >
            <FaSearch />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/40 flex pt-20 justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative w-full max-w-xl px-6"
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                placeholder="Search for products..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-5 py-3 rounded-lg border border-gray-300 shadow-lg bg-white text-lg focus:outline-none focus:ring-2 focus:ring-[#10797C]"
              />

              {/* Search results */}
              <AnimatePresence>
                {results.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute z-50 w-[min(600px,_90vw)] mt-2 bg-white border border-gray-200 rounded-md shadow-xl max-h-[300px] overflow-y-auto"
                  >
                    {results.map((product, i) => (
                      <li
                        key={product._id}
                        onMouseDown={() => handleSelect(product.slug.current)}
                        className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${
                          activeIndex === i ? "bg-gray-100" : "hover:bg-gray-50"
                        }`}
                      >
                        {product.image?.asset?.url && (
                          <Image
                            src={product.image.asset.url}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="object-cover rounded"
                          />
                        )}
                        <span>{product.name}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}

                {searchCompleted &&
                  !loading &&
                  query &&
                  results.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute z-50 w-full max-w-xl px-6 mt-2 bg-white border border-gray-200 rounded-md shadow-xl p-4 text-center text-gray-600"
                    >
                      <p>No results found. Try refining your search query.</p>
                    </motion.div>
                  )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
