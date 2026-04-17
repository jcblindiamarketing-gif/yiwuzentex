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

/* ✅ reusable link (opens in new tab) */
const NewTabLink = ({ href, children, className }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
  >
    {children}
  </Link>
);

function DropdownItem({ item }) {
  const [openSub, setOpenSub] = useState(false);

  return (
    <li
      className="relative group hover:bg-gray-100"
      onMouseEnter={() => setOpenSub(true)}
      onMouseLeave={() => setOpenSub(false)}
    >
      <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 cursor-pointer">
        
        {/* ✅ always open in new tab */}
        {item.fullSlug?.startsWith("http") ? (
          <a
            href={item.fullSlug}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            {item.title}
          </a>
        ) : (
          <NewTabLink href={item.fullSlug} className="w-full">
            {item.title}
          </NewTabLink>
        )}

        {item.subcategories?.length > 0 && (
          <FaChevronRight className="text-xs ml-2 text-gray-500" />
        )}
      </div>

      {item.subcategories && openSub && (
        <ul className="absolute left-full top-0 ml-1 bg-white border shadow-lg rounded-md z-50 min-w-[200px]">
          {item.subcategories.map((subItem, subIndex) => (
            <li key={subIndex} className="hover:bg-gray-100">
              <NewTabLink
                href={subItem.fullSlug}
                className="block px-4 py-2 text-sm text-gray-700"
              >
                {subItem.title}
              </NewTabLink>
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
      () => setOpenIndex(null),
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
            
            {/* ✅ fixed */}
            <NewTabLink href={sublink?.fullSlug || "#"} className="w-full">
              {sublink?.title}
            </NewTabLink>

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

const RecursiveMobileDropdown = ({ links }) => {
  const [open, setOpen] = useState({});

  const toggle = (i) => setOpen((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <ul className="pl-4">
      {links.map((sublink, i) => (
        <li key={i}>
          <div className="flex justify-between items-center p-2 hover:bg-gray-100">
            
            {/* ✅ fixed */}
            <NewTabLink href={sublink.fullSlug}>
              {sublink.title}
            </NewTabLink>

            {sublink.sublinks?.length > 0 && (
              <button onClick={() => toggle(i)}>
                <FaChevronDown
                  className={`text-sm transition ${
                    open[i] ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>

          {sublink.sublinks && open[i] && (
            <RecursiveMobileDropdown links={sublink.sublinks} />
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
      return { ...link, sublinks: categories };
    }
    return link;
  });

  return (
    <nav className="flex items-center sticky top-0 justify-between py-4 px-10 bg-white z-[999] h-24">
      
      {/* Logo (same tab) */}
      <Link href="/">
        <Image src={images.Logo} alt="Logo" className="w-[216px]" />
      </Link>

      {/* Desktop */}
      <div className="flex gap-1 items-center max-md:hidden">
        <ul className="md:flex space-x-2">
          {dynamicNavLinks.map((link, index) => (
            <li
              key={index}
              className="relative px-4 py-2 hover:bg-gray-100"
              onMouseEnter={() =>
                setDropdownOpen(link.sublinks ? index : null)
              }
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <Link href={link.fullSlug} className="flex items-center gap-1">
                {link.title}
                {link.sublinks && <FaChevronDown />}
              </Link>

              <AnimatePresence>
                {dropdownOpen === index && link.sublinks && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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

      {/* Mobile */}
      <div className="md:hidden flex gap-3">
        <Search />
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <RxCross1 /> : <CiMenuBurger />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="absolute top-20 left-0 w-full bg-white shadow-md md:hidden">
            <ul className="flex flex-col p-4 space-y-4">
              {dynamicNavLinks.map((link, index) => (
                <li key={index}>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-100">
                    
                    {/* keep main nav same tab */}
                    <Link href={link.fullSlug}>{link.title}</Link>

                    {link.sublinks && (
                      <button onClick={() => toggleMobileDropdown(index)}>
                        <FaChevronDown />
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