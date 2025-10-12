// app/blog/[slug]/page.tsx
import React from "react";
import axios from "axios";
import { notFound } from "next/navigation";

interface Blog {
  title: string;
  image?: string;
  quote?: string;
  description?: string;
}

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const slug = params.slug;

  try {
    const response = await axios.get(
      "https://switchiify.com/bonetProject/backend/public/blogs"
    );
    const blog = response.data.data.find(
      (item: Blog) =>
        item.title.toLowerCase().replace(/\s+/g, "-") === slug
    );

    if (!blog) return {};

    return {
      title: blog.title,
      description: blog.description || "",
      openGraph: {
        title: blog.title,
        description: blog.description || "",
        images: blog.image
          ? [`https://switchiify.com/bonetProject/backend/public/${blog.image}`]
          : [],
      },
    };
  } catch (err) {
    return {};
  }
}

export default async function BlogDetail({ params }: Props) {
  const slug = params.slug;

  // Fetch blog from backend
  const response = await axios.get(
    "https://switchiify.com/bonetProject/backend/public/blogs"
  );
  const blog = response.data.data.find(
    (item: Blog) =>
      item.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!blog) return notFound();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow mt-6 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 mt-8 text-center text-blue-600 uppercase">
        {blog.title}
      </h1>

      {blog.image && (
        <img
          src={`https://switchiify.com/bonetProject/backend/public/${blog.image}`}
          alt={blog.title}
          className="w-full h-full object-cover rounded-md mb-4"
        />
      )}

      {blog.quote && (
        <blockquote className="text-2xl text-gray-600 text-center mb-4 border-l-4 border-blue-500 pl-4 italic">
          "{blog.quote}"
        </blockquote>
      )}

    {blog.description ? (
  <div
    className="leading-relaxed whitespace-pre-line text-lg"
    dangerouslySetInnerHTML={{ __html: blog.description }}
  />
) : (
  <p className="text-gray-500">No description available.</p>
)}
    </div>
  );
}
