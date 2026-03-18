"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import images from "@/assets"; // SupplyChainBanner or AboutHeader
import Breadcrumb from "@/components/BreadCrumb/BreadCrumb";

export default function SupplyChainManagementPage() {
    return (
        <div className="w-full">
            {/* Banner */}
            <header className="relative w-full max-md:h-[300px]">
                <Image
                    src={images.SupplyChainBanner || images.AboutHeader}
                    alt="Supply Chain"
                    className="w-full max-md:h-full object-cover"
                />
                <div className="absolute bottom-10 left-20 max-md:left-5 max-md:bottom-7">
                    <h2 className="text-5xl max-md:text-3xl font-semibold text-white">
                        Supply Chain Management
                    </h2>

                    {/* Breadcrumb */}
                    <Breadcrumb />
                </div>
            </header>

            {/* Intro */}
            <section className="py-16 px-4 text-center  mx-auto app__container">
                <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-semibold text-[#10797C] mb-4"
                >
                    Seamless, Global & Reliable
                </motion.h3>
                <p className="text-gray-700 text-lg text-left max-md:text-center">
                    {`At ZENTREX, we ensure a seamless, efficient, and reliable supply chain that helps businesses stay ahead in a competitive market. Our comprehensive Supply Chain Management services cover every aspect, from product sourcing and development to quality control and shipment & delivery. With our global presence, industry expertise, and commitment to excellence, we provide customized products tailored to your business needs.`}
                </p>
            </section>

            {/* Section 1: Product Sourcing & Development */}
            <section className="flex flex-col md:flex-row  gap-12 px-6 md:px-20 py-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="md:w-1/2 "
                >
                    <Image
                        src={images.Sourcing}
                        alt="Sourcing"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="md:w-1/2"
                >
                    <h4 className="text-4xl max-md:text-2xl font-semibold text-[#10797C] mb-4">
                        Product Sourcing & Development
                    </h4>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {`ZENTREX connects you to a vast global supplier network backed by deep industry knowledge. We not only identify top-quality manufacturers but also co-develop tailored, innovative products that meet international standards. Whether you're launching a new line or expanding your portfolio, we ensure your products are market-ready and built to perform.`}
                    </p>
                </motion.div>
            </section>

            {/* Section 2: Quality Control */}
            <section className="flex flex-col md:flex-row-reverse  gap-12 px-6 md:px-20 py-12 bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="md:w-1/2"
                >
                    <Image
                        src={images.Quality}
                        alt="Quality Control"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="md:w-1/2"
                >
                    <h4 className="text-4xl max-md:text-2xl font-semibold text-[#10797C] mb-4">
                        Quality Control
                    </h4>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {`Quality isn't a checkbox — it's a commitment. At ZENTREX, we follow rigorous control procedures with multi-stage inspections, lab testing, and compliance assessments. Our dedicated Quality assurance teams ensure each product meets your expectations, industry regulations, and the highest standards — from factory floor to final dispatch.`}
                    </p>
                </motion.div>
            </section>

            {/* Section 3: Shipment & Delivery */}
            <section className="flex flex-col md:flex-row  gap-12 px-6 md:px-20 py-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="md:w-1/2"
                >
                    <Image
                        src={images.Shipping}
                        alt="Shipment & Delivery"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="md:w-1/2"
                >
                    <h4 className="text-4xl max-md:text-2xl font-semibold text-[#10797C] mb-4">
                        Shipment & Delivery
                    </h4>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {`Timely and secure delivery is the backbone of operational success. We collaborate with top logistics partners to provide inventory control, warehousing, and global shipping — using multi-modal transport strategies to reduce lead times and minimize disruption. From factory gate to your doorstep — we’ve got it covered.`}
                    </p>
                </motion.div>
            </section>
        </div>
    );
}
