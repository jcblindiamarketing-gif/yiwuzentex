"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navLinks } from "../../constants/navLinks";

import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { CiMenuBurger } from "react-icons/ci";
import Image from "next/image";
import images from "@/assets";
import Search from "../Search/Search";

function SimpleDropdown({ show, sublinks }) {
  if (!show) return null;

  return (
    <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md z-50 min-w-[200px]">
      {sublinks.map((sublink, index) => (
        <DropdownItem key={index} item={sublink} />
      ))}
    </ul>
  );
}

function DropdownItem({ item }) {
  const [openSub, setOpenSub] = useState(false);

  return (
    <li
      className="relative group hover:bg-gray-100"
      onMouseEnter={() => setOpenSub(true)}
      onMouseLeave={() => setOpenSub(false)}
    >
      <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 cursor-pointer">
      {item.fullSlug?.startsWith('http') ? (
  <a href={item.fullSlug} target="_blank" rel="noopener noreferrer" className="...">
    {item.title}
  </a>
) : (
  <Link href={item.fullSlug} className="...">
    {item.title}
  </Link>
)}
        {item.subcategories?.length > 0 && (
          <FaChevronRight className="text-xs ml-2 text-gray-500" />
        )}
      </div>

      {item.subcategories && openSub && (
        <ul className="absolute left-full top-0 mt-0 ml-1 bg-white border border-gray-200 shadow-lg rounded-md z-50 min-w-[200px]">
          {item.subcategories.map((subItem, subIndex) => (
            <li key={subIndex} className="hover:bg-gray-100">
              <Link
                href={subItem.fullSlug}
                className="block px-4 py-2 text-sm text-gray-700"
              >
                {subItem.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

const RecursiveDropdown = ({ links, depth = 0 }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const closeTimeoutRef = useRef(null);

  if (depth > 2) return null;

  const handleMouseEnter = (index) => {
    clearTimeout(closeTimeoutRef.current);
    setOpenIndex(index);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(
      () => {
        setOpenIndex(null);
      },
      2000 * (depth + 1)
    );
  };

  return (
    <ul
      className={`absolute z-20 bg-white shadow-lg rounded-md mt-2 ${
        depth > 0 ? "left-full top-0 ml-1 min-w-[270px]" : "min-w-[240px]"
      }`}
    >
      {links?.map((sublink, i) => (
        <li
          key={i}
          className="relative"
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Link href={sublink?.fullSlug || "#"} className="w-full">
              {sublink?.title}
            </Link>
            {sublink?.sublinks?.length > 0 && (
              <FaChevronRight className="ml-2 text-xs text-gray-500" />
            )}
          </div>

          {sublink?.sublinks?.length > 0 && openIndex === i && (
            <div
              className="absolute top-0 left-full z-30"
              onMouseEnter={() => clearTimeout(closeTimeoutRef.current)}
              onMouseLeave={handleMouseLeave}
            >
              <RecursiveDropdown links={sublink.sublinks} depth={depth + 1} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

const RecursiveMobileDropdown = ({ links, depth = 0 }) => {
  const [open, setOpen] = useState({});

  const toggle = (i) => setOpen((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <ul className="pl-4">
      {links.map((sublink, i) => (
        <li key={i}>
          <div className="flex justify-between items-center p-2 hover:bg-gray-100">
            <Link href={sublink.fullSlug}>{sublink.title}</Link>
            {sublink.sublinks?.length > 0 && (
              <button onClick={() => toggle(i)}>
                <FaChevronDown
                  className={`text-sm transform transition ${
                    open[i] ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            )}
          </div>
          {sublink.sublinks && open[i] && (
            <RecursiveMobileDropdown
              links={sublink.sublinks}
              depth={depth + 1}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default function Navbar({ categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState({});

  const toggleMobileDropdown = (index) => {
    setMobileDropdown((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const dynamicNavLinks = navLinks.map((link) => {
    if (link.fullSlug === "/product-segment") {
      return { ...link, sublinks: categories }; // categories = categoryTree
    }
    return link;
  });

  return (
    <nav className="flex items-center sticky top-0 justify-between py-4 px-10 max-md:px-4  bg-white z-[999] font-medium  h-24 max-md:h-20">
      {/* Logo */}
      <Link href={"/"} className="cursor-pointer">
        <Image
          src={images.Logo}
          alt="Logo"
          className="w-[216px] max-md:w-[150px]"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="flex gap-1 items-center max-md:hidden">
      <ul className="md:flex space-x-2 ">
  {dynamicNavLinks.map((link, index) => (
    <li
      key={index}
      className="relative px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200"
      onMouseEnter={() => setDropdownOpen(link.sublinks ? index : null)}
      onMouseLeave={() => setDropdownOpen(null)}
    >
      <Link href={link.fullSlug} className="flex items-center gap-1">
        {link.title}
        {link.sublinks && (
          <FaChevronDown
            className={`text-sm transform transition ${
              dropdownOpen === index ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </Link>

      {/* Dropdown */}
      <AnimatePresence>
        {dropdownOpen === index && link.sublinks?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0"
          >
            <RecursiveDropdown links={link.sublinks} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  ))}
</ul>

        <Search />
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex gap-3">
        <Search />
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <RxCross1 className="w-6 h-6" />
          ) : (
            <CiMenuBurger className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white shadow-md md:hidden max-h-[400px] overflow-y-auto"
          >
            <ul className="flex flex-col p-4 space-y-4">
              {dynamicNavLinks.map((link, index) => (
                <li key={index}>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-100">
                    <Link onClick={() => setIsOpen(false)} href={link.fullSlug}>
                      {link.title}
                    </Link>
                    {link.sublinks?.length > 0 && (
                      <button onClick={() => toggleMobileDropdown(index)}>
                        <FaChevronDown
                          className={`text-sm transform transition ${
                            mobileDropdown[index] ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {link.sublinks && mobileDropdown[index] && (
                    <RecursiveMobileDropdown links={link.sublinks} />
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
