// app/blogs/BlogsClient.tsx
"use client";

import React, { useState } from "react";
import BlogCard from "@/components/BlogCard/BlogCard";
import { fetchBlogs } from "./query";
import { FaSpinner } from "react-icons/fa";

export default function BlogsClient({ initialBlogs, totalCount }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);

  const loadMore = async () => {
    setLoading(true);
    const newLimit = limit + 10;
    const moreBlogs = await fetchBlogs(newLimit);
    setBlogs(moreBlogs);
    setLimit(newLimit);
    setLoading(false);
  };

  const hasMore = blogs.length < totalCount;

  return (
    <section className="pt-16 px-8 md:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <FaSpinner className="animate-spin h-5 w-5" />
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </section>
  );
}
