"use client";

import { useState, useEffect, useRef } from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Breadcrumb() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const crumbs = pathParts.map((part, index) => {
    const href = "/" + pathParts.slice(0, index + 1).join("/");
    const title = part
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return { href, title };
  });

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="flex items-center space-x-1 text-xl py-4 relative">
      <Link
        href="/"
        className="text-[#cfd4d4] hover:text-[#63c3c5] flex items-center gap-1 font-medium"
      >
        <FaHome className="text-base" />
        <span className="text-2xl max-md:text-xl sm:inline">Home</span>
      </Link>

      {crumbs.length <= 2 ? (
        crumbs.map((crumb, index) => (
          <div key={index} className="flex items-center space-x-1">
            <FaChevronRight className="text-gray-100 text-xl max-md:text-sm" />
            <Link
              href={crumb.href}
              className="text-amber-100 hover:text-[#10797C] capitalize text-xl max-md:text-sm font-medium"
            >
              {crumb.title}
            </Link>
          </div>
        ))
      ) : (
        <>
          {/* First Link */}
          <div className="flex items-center space-x-1">
            <FaChevronRight className="text-gray-100 text-xl max-md:text-sm" />
            <Link
              href={crumbs[0].href}
              className="text-amber-100 hover:text-[#10797C] capitalize text-xl max-md:text-sm font-medium"
            >
              {crumbs[0].title}
            </Link>
          </div>

          {/* Dropdown */}
          <div ref={dropdownRef} className="relative flex items-center">
            <FaChevronRight className="text-gray-100 text-xl max-md:text-sm" />
            <button
              onClick={toggleDropdown}
              className="text-amber-100 cursor-pointer hover:text-[#10797C] capitalize text-2xl max-md:text-sm font-medium"
            >
              ...
            </button>
            {isDropdownOpen && (
              <div className="absolute top-8 left-0 bg-white text-sm rounded-md shadow-md z-50 py-2 min-w-[160px] border">
                {crumbs.slice(1, -1).map((crumb, index) => (
                  <Link
                    key={index}
                    href={crumb.href}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-[#10797C] capitalize"
                  >
                    {crumb.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Last Link */}
          <div className="flex items-center space-x-1">
            <FaChevronRight className="text-gray-100 text-xl max-md:text-sm" />
            <Link
              href={crumbs[crumbs.length - 1].href}
              className="text-amber-100 hover:text-[#10797C] capitalize text-xl max-md:text-sm font-medium"
            >
              {crumbs[crumbs.length - 1].title}
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default Breadcrumb;
