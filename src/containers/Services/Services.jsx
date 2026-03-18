"use client";
import { ProductsInfo, ServicesInfo } from "@/constants/data";
import { motion, useInView } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.2, // stagger by index
      ease: "easeOut",
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

function SupplyChainLayout({ services }) {
  const parentRef = useRef(null);
  const isInView = useInView(parentRef, { once: true });
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative w-full flex flex-col items-center pt-10 pb-20">
      {/* Parent Card - Supply Chain Management */}
      <motion.div
        ref={parentRef}
        initial={{ opacity: 0, y: -50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative rounded-2xl w-80 mb-20 shadow-lg z-10 overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={services[0].image}
          alt={services[0].title}
          width={320}
          height={200}
          className="rounded-2xl object-cover w-full h-52 grayscale hover:grayscale-0 transition duration-500"
        />

        {/* Overlay */}
        <motion.div
          initial={false}
          animate={{ y: hovered ? "0%" : "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#10797C]/70 z-10 pointer-events-none"
        />

        {/* Read More Button */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="absolute bottom-5 left-4 z-40 "
        >
          <Link
            href={"/services/supply-chain-management"}
            className="bg-accent cursor-pointer hover:text-amber-50 transition duration-300 mt-5 rounded-full s px-4 py-2 font-medium"
          >
            Read More
          </Link>
        </motion.div>

        {/* Title Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h2 className="text-white text-2xl font-bold text-center px-4">
            {services[0].title}
          </h2>
        </div>
      </motion.div>

      {/* Connecting SVG Lines */}
      {isInView && (
        <motion.svg
          className="absolute hidden md:block top-[180px] z-0"
          width="100%"
          height="300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {["22%", "50%", "78%"].map((x, i) => (
            // <motion.line
            //   key={i}
            //   x1="50%"
            //   y1="0"
            //   x2={x}
            //   y2="300"
            //   strokeDasharray="5,5"
            //   strokeDashoffset={5}
            //   stroke="#10797C"
            //   strokeWidth="2"
            //   initial={{ pathLength: 0 }}
            //   animate={{ pathLength: 1 }}
            //   transition={{ duration: 1.3, delay: i * 0.3, ease: "easeOut" }}
            // />
            <motion.line
              key={i}
              x1="50%"
              y1="0"
              x2={x}
              y2="300"
              strokeDasharray="1,5"
              strokeLinecap="round"
              stroke="#10797C"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, delay: i * 0.3, ease: "easeOut" }}
            />
          ))}
        </motion.svg>
      )}

      {/* Mobile Line Connector */}
      {isInView && (
        // <div className="absolute md:hidden top-[270px] w-1 border-l-2 border-dotted border-[#10797C] z-0" />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "780px" }}
          transition={{ duration: 3.5, ease: "easeOut" }}
          className="absolute md:hidden top-[240px] w-1 border-l-2 border-dotted border-[#10797C] z-0"
        />
      )}

      {/* Child Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="flex justify-center gap-24 mt-10 flex-wrap relative z-10"
      >
        {services.slice(1).map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
            className="relative group rounded-2xl w-72 h-52 shadow-md overflow-hidden"
          >
            <Image
              src={service.image}
              alt={service.title}
              width={300}
              height={200}
              className="rounded-lg h-full object-cover w-full  group-hover:grayscale-0 grayscale transition-all duration-300"
            />
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <h3 className="text-xl font-semibold text-center text-white  bg-opacity-60 px-2 py-1 rounded">
                {service.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const HoverCard = ({ service, isActive, onInteract }) => {
  const [isHovered, setIsHovered] = useState(false);

  const hovered = isHovered || isActive; // preview or actual hover

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        onInteract(); // stop auto animation
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-[300px] h-[320px] overflow-hidden rounded-md"
    >
      {/* Image */}
      <Image
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
      />

      {/* Overlay */}
      <motion.div
        initial={false}
        animate={{ y: hovered ? "0%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 bg-[#10797C]/70 z-10 pointer-events-none"
      />

      {/* Text + Button */}
      <div className="absolute bottom-16 left-4 z-20 pointer-events-none">
        <h2 className="text-3xl font-semibold text-white">{service.title}</h2>
      </div>

      <motion.div
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 20,
        }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute bottom-5 left-4 z-20 pointer-events-none"
      >
        <button className="bg-accent mt-5 rounded-full cursor-pointer px-4 py-1 font-medium">
          Read More
        </button>
      </motion.div>
    </div>
  );
};

const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(true);

  return (
    <motion.div
      className="relative w-[300px] h-[320px] overflow-hidden rounded-md cursor-pointer group"
      //   onMouseEnter={() => setIsHovered(true)}
      //   onMouseLeave={() => setIsHovered(true)}

      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
    >
      <Link href={`/product-segment/${product.slug}`}>
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
        />

        {/* Overlay Slide Animation */}
        <motion.div
          initial={false}
          animate={{ y: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#10797C]/70 z-10 pointer-events-none"
        />

        {/* Center Text with Fade + Slide */}
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
        >
          <h2 className="text-3xl font-semibold text-white text-center">
            {product.title}
          </h2>
        </motion.div>
      </Link>
    </motion.div>
  );
};

function Services() {
  const [activeIndex, setActiveIndex] = useState(null); // current auto-preview index
  const [stopped, setStopped] = useState(false); // global animation stopped

  useEffect(() => {
    if (stopped) return;

    let index = 0;
    setActiveIndex(index);

    const interval = setInterval(() => {
      index = (index + 1) % ServicesInfo.length;
      setActiveIndex(index);
    }, 2000); // time for each card to animate

    return () => clearInterval(interval);
  }, [stopped]);

  const handleUserInteract = () => {
    setStopped(true);
    setActiveIndex(null); // stop animation
  };

  return (
    <>
      <div className="app__container">

        <h2 className="accent-sec capitalize text-5xl leading-14 font-medium max-md:hidden text-center mb-5">
          Growing success with all services.
        </h2>

        <h2 className="accent-sec capitalize text-3xl font-medium text-center md:hidden ">
          Growing success with all services.
        </h2>

        {/* <div className="mt-10 flex gap-4  flex-wrap pb-24 max-md:justify-center max-md:pb-16">
          {ServicesInfo.map((service, index) => (
            <HoverCard
              key={index}
              service={service}
              isActive={index === activeIndex}
              onInteract={handleUserInteract}
            />
          ))}
        </div> */}
        <SupplyChainLayout services={ServicesInfo} />
      </div>

      <div className="mt-8 max-md:mt-5">
        <h2 className="accent-sec text-5xl max-md:text-3xl font-medium text-center">
          Our Product Segment
        </h2>
        <p className="grey-variant w-2/3 max-md:w-[90%] mx-auto mt-5 text-center">
          ZENTREX delivers a versatile portfolio of high-quality products
          ranging from essential industrial solutions like automotive
          components, agricultural tools, and precision hardware, to globally
          trusted utility products tailored for modern business needs.
        </p>

        <div className="flex gap-4 mt-10 justify-center flex-wrap pb-24">
          {ProductsInfo.map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;
