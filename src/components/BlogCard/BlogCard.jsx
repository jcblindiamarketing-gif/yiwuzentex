// components/BlogCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white shadow-md rounded overflow-hidden">
      <Image
        src={blog.mainImage}
        alt={blog.title}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <Link href={`/blogs/${blog.slug}`}>
          <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
        </Link>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(blog._createdAt).toLocaleDateString()}
        </p>
        <Link href={`/blogs/${blog.slug}`}>
          <p className="text-teal-600 hover:underline">Read More</p>
        </Link>
      </div>
    </div>
  );
}
