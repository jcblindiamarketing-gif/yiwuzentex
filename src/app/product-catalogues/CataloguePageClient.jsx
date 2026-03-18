"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FormModal from "@/components/FormModal/FormModal";

export default function CataloguePageClient({ categories }) {
  const formRef = useRef();

  // const [visibleCatalogues, setVisibleCatalogues] = useState(2);
  const [selectedCatalogue, setSelectedCatalogue] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleRequest = (catalogue) => {
    setSelectedCatalogue(catalogue);
    setFormVisible(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="px-20 py-8  max-md:px-4">
      {/* {categories.map((catalogue, index) => (
        <motion.div
          key={index}
          className="flex items-center w-full justify-between p-4 rounded-lg bg-white shadow mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-gray-800 font-medium">{catalogue.title}</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleRequest(catalogue)}
              className="px-4 py-2 bg-[#10797C] text-white rounded-lg hover:bg-[#0b5a5d] transition-colors cursor-pointer"
            >
              Download
            </button>
          </div>
        </motion.div>
      ))} */}

      {categories.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-6">
          {/* Group Title */}
          <h2 className="text-xl md:text-2xl   font-semibold text-[#10797C] my-2">
            {group.parentTitle}
          </h2>

          {/* Group Items */}
          {group.items.map((catalogue, index) => (
            <motion.div
              key={index}
              className="flex items-center w-full justify-between p-4 rounded-lg bg-white shadow mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <span className="text-gray-800 font-medium">
                {catalogue.title}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRequest(catalogue)}
                  className="px-4 py-2 bg-[#10797C] text-white rounded-lg hover:bg-[#0b5a5d] transition-colors cursor-pointer"
                >
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ))}

      {/* {categories.length > visibleCatalogues && (
        <div className="text-right mt-4">
          <button
            className="text-[#10797C] hover:underline"
            onClick={() => setVisibleCatalogues((prev) => prev + 2)}
          >
            More Catalogues
          </button>
        </div>
      )} */}

      <FormModal
        formVisible={formVisible}
        formRef={formRef}
        setFormVisible={setFormVisible}
        selectedCatalogue={selectedCatalogue}
        key={selectedCatalogue?.id}
      />
    </div>
  );
}

// const dummyData= ({categories}) => {
//   return(
//     {
//         <>
//       categories.map((category) => (
//       <div key={category.name} className="mb-10">
//         <div className="space-y-4 w-full">
//           {category.catalogues
//             .slice(0, visibleCatalogues)
//             .map((catalogue) => (
//               <motion.div
//                 key={catalogue.id}
//                 className="flex items-center w-full justify-between p-4 rounded-lg bg-white shadow"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <span className="text-gray-800 font-medium">
//                   {catalogue.title}
//                 </span>
//                 <div className="flex gap-2">
//                   {/* <button
//                     onClick={() => handleRequest(catalogue)}
//                     className="px-4 py-2 border border-[#10797C] text-[#10797C] rounded-lg hover:bg-[#10797C] hover:text-white transition-colors cursor-pointer"
//                   >
//                     View
//                   </button> */}

//                   <button
//                     onClick={() => handleRequest(catalogue)}
//                     className="px-4 py-2 bg-[#10797C] text-white rounded-lg hover:bg-[#0b5a5d] transition-colors cursor-pointer"
//                   >
//                     Download
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//         </div>

//         {category.catalogues.length > visibleCatalogues && (
//           <div className="text-right mt-4">
//             <button
//               variant="ghost"
//               className="text-[#10797C] hover:underline"
//               onClick={() => setVisibleCatalogues((prev) => prev + 2)}
//             >
//               More Catalogues
//             </button>
//           </div>
//         )}

//         <div className="my-8 border-b border-gray-300" />
//       </div>
//     ))}
//     </>

//   )
// }
