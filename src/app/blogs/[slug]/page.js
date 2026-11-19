// src/app/blogs/[slug]/page.js
import { PortableText } from 'next-sanity';
import { fetchBlogBySlug } from '../query';
import React from 'react';
import { urlFor } from '@/sanity/lib/image';
import ShareButton from '@/components/ShareButton/ShareButton';
import sanitizeHtml from 'sanitize-html';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog not found',
      description: 'This blog post could not be found.',
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt || 'Read the full blog post',
  };
}

// Cleans HTML so it is safe to display
const cleanHtml = (html = '') =>
  sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img', 'h1', 'h2', 'iframe', 'figure', 'figcaption', 'span',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class', 'style'],
      img: ['src', 'alt', 'width', 'height'],
      a: ['href', 'target', 'rel'],
      iframe: ['src', 'width', 'height', 'allowfullscreen'],
    },
    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
  });

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="blog-image-container">
        <img
          src={urlFor(value.asset).url()}
          alt={value.alt || 'Blog Image'}
          className="blog-image"
          loading="lazy"
        />
      </div>
    ),

    // New "HTML Block" from Sanity
    htmlBlock: ({ value }) => (
      <div
        className="blog-html"
        dangerouslySetInnerHTML={{ __html: cleanHtml(value?.html) }}
      />
    ),
  },

  block: {
    // Old posts where HTML was typed as normal text (like your current post)
    normal: ({ value, children }) => {
      const text = (value?.children || [])
        .map((c) => c.text || '')
        .join('')
        .trim();

      if (text.startsWith('<') && text.endsWith('>')) {
        return (
          <div
            className="blog-html"
            dangerouslySetInnerHTML={{ __html: cleanHtml(text) }}
          />
        );
      }

      return <p>{children}</p>;
    },
  },
};

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return <div className="p-10 text-lg">Blog not found</div>;
  }

  return (
    <div>
      {/* Blog Content */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-12">
        <div className="prose">
          <h2 className="text-4xl font-semibold text-center text-[#10797C]">
            {blog.title}
          </h2>
          <p className="text-sm text-gray-600 my-4">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>

          <div className="my-6">
            <img
              src={blog.mainImage.asset.url}
              loading="lazy"
              alt={blog.title}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="portable-text">
            <PortableText value={blog.description} components={portableTextComponents} />
          </div>
        </div>

        <div className="flex justify-center">
          <ShareButton title={blog.title} />
        </div>
      </section>
    </div>
  );
}