"use client";
import { motion } from "framer-motion";
import FormModal from "@/components/FormModal/FormModal";
import React, { useRef, useState } from "react";

function ProductSegmentClient({ data }) {
  const [formVisible, setFormVisible] = useState(false);
  const formRef = useRef(null);

  const openForm = () => setFormVisible(true);

  return (
    <>
      {data.catalogueUrl ? (
        <div className="w-full bg-[#48d1cc] mt-16 p-4 text-white rounded-2xl ">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4 justify-between items-center max-md:flex-col"
          >
            <p className="text-xl font-semibold max-md:text-base">
              Looking for a Catalogue of{" "}
              <span className="font-bold">
                {data?.name || data?.title}
              </span>{" "}
            </p>
            <button
              onClick={openForm}
              className="bg-[#10797C] cursor-pointer hover:bg-[#0b5a5d] text-white px-6 py-3 rounded-lg shadow-md transition-all"
            >
              Download Catalogue Now
            </button>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <button
            // onClick={openForm}
            className="bg-[#10797C] cursor-not-allowed hover:bg-[#0b5a5d] text-white px-6 py-3 rounded-lg shadow-md transition-all"
            disabled
          >
            Catalogue Not Available
          </button>
        </motion.div>
      )}

      <FormModal
        formVisible={formVisible}
        selectedCatalogue={data}
        formRef={formRef}
        setFormVisible={setFormVisible}
        key={data._id}
      />
    </>
  );
}

export default ProductSegmentClient;
