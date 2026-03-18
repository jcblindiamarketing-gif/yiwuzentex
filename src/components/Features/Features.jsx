"use client";

import { motion } from "framer-motion";
import { FaHandshake, FaExclamationTriangle, FaShippingFast, FaCogs } from "react-icons/fa";

const problems = [
  {
    icon: <FaHandshake className="text-4xl text-[#10797C]" />,
    title: "Unreliable Sourcing Partners",
    description:
      "Inconsistent suppliers can lead to delays, poor communication, and unreliable product delivery.",
  },
  {
    icon: <FaExclamationTriangle className="text-4xl text-[#10797C]" />,
    title: "Lack of Quality Control",
    description:
      "Without proper inspection, products can fail to meet industry and regulatory standards.",
  },
  {
    icon: <FaShippingFast className="text-4xl text-[#10797C]" />,
    title: "Disjointed Logistics Operations",
    description:
      "Managing shipping, inventory, and warehousing separately causes delays and increases costs.",
  },
  {
    icon: <FaCogs className="text-4xl text-[#10797C]" />,
    title: "Limited Product Variety",
    description:
      "Businesses often struggle to find a single partner who can supply a wide range of product categories under one roof — causing time loss and inconsistent quality.",
  }
  
];

export default function ProblemsWeSolve() {
  return (
    <section className="mt-24 mb-20 bg-gray-50 py-20 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-medium text-center text-[#10797C] mb-12"
      >
        The Problem We Solve
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {problems.map((problem, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="mb-4">{problem.icon}</div>
            <h3 className="text-xl font-bold text-[#10797C] mb-2">{problem.title}</h3>
            <p className="text-gray-600">{problem.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
