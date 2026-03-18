"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import images from "@/assets"; // Adjust if needed

const Loader = () => {
  //Loader For Page Loading
  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full bg-white">
      <div className="flex animate-bounce duration-1000 ease-in-out flex-col items-center justify-center">
        <Image
          src={images.Logo}
          alt="Brand Logo"
          width={200}
          height={100}
          priority
        />
        <motion.p
          className="text-xl font-medium text-[#10797c] mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading your experience...
        </motion.p>
      </div>
    </div>
  );
};

export default Loader;
