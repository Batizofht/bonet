// app/blog/[slug]/page.tsx
import React from "react";
import axios from "axios";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen } from "lucide-react";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  image?: string;
  quote?: string;
  description?: string;
  created_at?: string;
  author?: string;
}

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const {slug} :any = await params.slug;

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
      title: `${blog.title} | Bonet Blog`,
      description: blog.quote || blog.description?.substring(0, 160) || "",
      openGraph: {
        title: blog.title,
        description: blog.quote || blog.description?.substring(0, 160) || "",
        images: blog.image
          ? [`https://switchiify.com/bonetProject/backend/public/${blog.image}`]
          : [],
        type: 'article',
      },
    };
  } catch (err) {
    return {};
  }
}

const getReadingTime = (text: string) => {
  if (!text) return '2 min read';
  const wordsPerMinute = 200;
  const words = text.split(/\s/g).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default async function BlogDetail({ params }: Props) {
  const {slug}  :any= await params.slug;

  const response = await axios.get(
    "https://switchiify.com/bonetProject/backend/public/blogs"
  );
  const blog = response.data.data.find(
    (item: Blog) =>
      item.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!blog) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Back Navigation */}
      {/* <div className="border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-[#188bff] font-semibold hover:gap-3 transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </Link>
        </div>
      </div> */}

      {/* Blog Header */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Blog Title */}
        <motion.h1 
          className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 mt-2 text-center leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {blog.title}
        </motion.h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#188bff]" />
            <span className="text-sm font-medium">
              {blog.created_at ? formatDate(blog.created_at) : 'Recent'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#188bff]" />
            <span className="text-sm font-medium">
              {getReadingTime(blog.description || blog.quote || '')}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#188bff]" />
            <span className="text-sm font-medium">
              {blog.author || 'Bonet Team'}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {blog.image && (
          <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl border border-blue-100">
            <img
              src={`https://switchiify.com/bonetProject/backend/public/${blog.image}`}
              alt={blog.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        )}

        {/* Quote Section */}
        {blog.quote && (
          <blockquote className="relative bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl p-8 mb-8 text-center">
            <div className="absolute top-4 left-6">
              <BookOpen className="w-6 h-6 text-white/20" />
            </div>
            <p className="text-2xl font-semibold text-white leading-relaxed italic">
              "{blog.quote}"
            </p>
            <div className="absolute bottom-4 right-6">
              <BookOpen className="w-6 h-6 text-white/20 rotate-180" />
            </div>
          </blockquote>
        )}

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-50">
            {blog.description ? (
              <div
                className="leading-relaxed text-gray-700 text-lg"
                dangerouslySetInnerHTML={{ 
                  __html: blog.description 
                    .replace(/<h1>/g, '<h1 class="text-3xl font-bold text-gray-800 ">')
                    .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-gray-800 ">')
                    .replace(/<h3>/g, '<h3 class="text-xl font-bold text-gray-800 ">')
                    .replace(/<ul>/g, '<ul class="list-disc list-inside">')
                    .replace(/<ol>/g, '<ol class="list-decimal list-inside">')
                    .replace(/<li>/g, '<li class="text-gray-700">')
                    .replace(/<strong>/g, '<strong class="font-semibold text-gray-800">')
                    .replace(/<em>/g, '<em class="italic text-gray-700">')
                    .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-[#188bff] pl-4 italic text-gray-600 my-6">')
                }}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No content available for this blog post.</p>
              </div>
            )}
          </div>
        </article>

        {/* Share Section */}
        {/* <div className="flex items-center justify-between mt-12 pt-8 border-t border-blue-100">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">Share this article:</span>
            <button className="p-2 rounded-full bg-blue-100 text-[#188bff] hover:bg-blue-200 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#188bff] text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 font-semibold shadow-sm hover:shadow-md"
          >
            <BookOpen className="w-4 h-4" />
            Read More Blogs
          </Link>
        </div> */}
      </div>

      {/* Related Blogs Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
            <BookOpen className="w-6 h-6 text-[#188bff] animate-pulse" />
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
            <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            More <span className="bg-[#188bff] bg-clip-text text-transparent">Articles</span>
          </h2>
          <p className="text-gray-500 text-lg">Discover other valuable insights from our blog</p>
        </div> */}

        {/* You can add related blogs grid here */}
        {/* <div className="text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-3 border-2 border-[#188bff] text-[#188bff] px-8 py-4 rounded-xl hover:bg-[#188bff] hover:text-white transition-all duration-300 font-semibold group"
          >
            <BookOpen className="w-5 h-5" />
            Explore All Blogs
            <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div> */}
      </div>
    </div>
  );
}

// Simple motion component for animations
const motion = {
  h1: ({ className, children, initial, animate, transition }: any) => (
    <h1 className={className}>{children}</h1>
  )
};