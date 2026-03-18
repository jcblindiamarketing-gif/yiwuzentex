"use client";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";

const ShareButton = ({ title }) => {
  const url = window.location.href;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);



  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className="flex space-x-4 mt-6">
      {/* Facebook */}
      <button
        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 cursor-pointer"
        onClick={() => window.open(shareUrls.facebook, "_blank")}
      >
        <FaFacebookF className="text-xl" />
      </button>

      {/* Twitter */}
      <button
        className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 cursor-pointer"
        onClick={() => window.open(shareUrls.twitter, "_blank")}
      >
        <FaTwitter className="text-xl" />
      </button>

      {/* WhatsApp */}
      <button
        className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer"
        onClick={() => window.open(shareUrls.whatsapp, "_blank")}
      >
        <FaWhatsapp className="text-xl" />
      </button>

      {/* LinkedIn */}
      <button
        className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 cursor-pointer"
        onClick={() => window.open(shareUrls.linkedin, "_blank")}
      >
        <FaLinkedinIn className="text-xl" />
      </button>

      {/* Email */}
      <button
        className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 cursor-pointer"
        onClick={() => (window.location.href = shareUrls.email)}
      >
        <FaEnvelope className="text-xl" />
      </button>

      {/* Copy Link */}
      <button
        className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-800 cursor-pointer"
        onClick={handleCopyLink}
      >
        <FaLink className="text-xl" />
      </button>
    </div>
  );
};

export default ShareButton;
