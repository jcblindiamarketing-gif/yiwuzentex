"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MegaMenu({ show, sublinks }) {
  if (!sublinks || sublinks.length === 0) return null;

  const isMega = sublinks.length > 8;

  return (
    <AnimatePresence>
      {show && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`absolute left-0 mt-2 bg-white shadow-lg rounded-md py-4 px-6 z-50 max-h-[400px] overflow-y-auto 
            ${isMega ? "grid grid-cols-2 gap-x-8" : "flex flex-col"}
            w-[min(600px,_90vw)]`}
        >
          {sublinks.map((sublink, i) => (
            <Link
              key={i}
              href={sublink.slug}
              className="hover:bg-gray-100 px-2 py-1 rounded-md"
            >
              <li>{sublink.title}</li>
            </Link>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
