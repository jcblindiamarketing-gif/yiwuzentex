"use client";

import images from "@/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#f5f5f5] shadow-2xl text-[#10797c] pt-14 pb-20 px-6 md:px-10 mt-20">
        <Image
          src={images.LogoWBg}
          alt="Brand Logo"
          className="w-72 max-md:w-48 mt-2 mb-5"
        />

        <div className="md:border-r md:border-[#48D1CC] pr-0 md:pr-4 w-full md:w-[28%] md:text-left md:hidden">
         
          <p>
            Yiwu ZENTREX – Trusted by global buyers, we simplify international
            trade with quality products and innovative solutions that drive
            growth.
          </p>

          <p className="mt-4">
            Contact Email :{" "}
            <a href="mailto:info@yiwuzentrex.com" className="hover:underline ">
              info@yiwuzentrex.com
            </a>
          </p>
          <p className="mt-2">
            Contact Number :{" "}
            <a href="tel:+86-19557958903" className="hover:underline ">
              +86 - 19557958903
            </a>
          </p>
        </div>

        <div className="flex flex-col max-md:grid max-md:grid-cols-2 md:flex-row  max-md:justify-start gap-12 md:gap- mb-8 mt-12  mx-auto">
          {/* Column 1: Company */}
          <div className="md:border-r md:border-[#48D1CC] pr-0 md:pr-5 w-full md:w-[28%]  md:text-left max-md:hidden">
            {/* <h3 className="font-bold mb-3 text-xl">Company</h3>
            <ul className="space-y-2  ">
              <li>
                <Link href="/" className="hover:underline  hover:text-[#48D1CC] transition-colors ease-in duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="hover:underline  hover:text-[#48D1CC] transition-colors ease-in duration-200"
                >
                  About Us
                </Link>
              </li>
            </ul> */}
            <p>
              Yiwu ZENTREX – Trusted by global buyers, we simplify international
              trade with quality products and innovative solutions that drive
              growth.
            </p>

            <p className="mt-4">
              Contact Email :{" "}
              <a
                href="mailto:info@yiwuzentrex.com"
                className="hover:underline "
              >
                info@yiwuzentrex.com
              </a>
            </p>
            <p className="mt-2">
              Contact Number :{" "}
              <a href="tel:+86-19557958903" className="hover:underline ">
                +86 - 19557958903
              </a>
            </p>
          </div>

          {/* Column 2: Services */}
          <div className="md:border-r md:border-[#48D1CC] pr-0 md:pr-4 w-full md:w-1/4  md:text-left">
            <h3 className="font-bold mb-3 text-xl">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/supply-chain-management"
                  className="hover:underline  hover:text-[#48D1CC] transition-colors ease-in duration-200"
                >
                  Supply Chain Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="md:border-r md:border-[#48D1CC] pr-0 md:pr-4 w-full md:w-1/4  md:text-left">
            <h3 className="font-bold mb-3 text-xl">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/product-segment/auto"
                  className="hover:underline  hover:text-[#48D1CC] transition-colors ease-in duration-200"
                >
                  Auto
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/product-segment/agri"
                  className="hover:underline  hover:text-[#48D1CC] transition-colors ease-in duration-200"
                >
                  Agri
                </Link>
              </li> */}
              <li>
                <Link
                  href="/product-segment/hardware-tools"
                  className="hover:underline  hover:text-[#48D1CC] transition-colors ease-in duration-200"
                >
                  Hardware & Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/product-catalogues"
                  className="hover:underline  hover:text-[#48D1CC] transition-colors ease-in duration-200"
                >
                  Product Catalogues
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="w-full md:w-fit  md:text-left">
            <h3 className="font-bold mb-3 text-xl">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact-us"
                  className="hover:underline  hover:text-[#48D1CC] transition-colors ease-in duration-200 "
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/exhibition"
                  className="hover:underline  hover:text-[#48D1CC] transition-colors ease-in duration-200"
                >
                  Exhibition
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:underline  hover:text-[#48D1CC] transition-colors ease-in duration-200"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Copyright Footer */}
      <div className="bg-[#48D1CC] text-black pt-4 pb-2 text-center text-[15px]">
        Copyright © {new Date().getFullYear()} Zentrex. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
