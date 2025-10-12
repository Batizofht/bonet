
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import { slugify } from "../../slugify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Blogs{
  image:string;
  title:string;
  quote: string
}
export default function Blog() {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>("");
  const navigate = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out", once: true });
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "https://switchiify.com/bonetProject/backend/public/blogs"
      );
      const blogArray = Array.isArray(response.data.data)
        ? response.data.data
        : response.data.data || [];
      setBlogs(blogArray);
    } catch (err) {
      setError("Failed to load blogs. Please try again later.");
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="py-14 px-5 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      {/* Section Title */}
      <div className="text-center mb-12">
        <div className="w-20 h-1 bg-[#188bff] mx-auto mb-3"></div>
        <h2 className="text-3xl font-bold text-gray-700">
          {t("blog.header.title1")}
        </h2>
        <h1 className="text-4xl font-bold bg-[#188bff] bg-clip-text text-transparent">
          {t("blog.header.title2")}
        </h1>
      </div>

      {/* Loader/Error */}
      {loading && <p className="text-center text-gray-600">{t("blog.loading")}</p>}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}
      {!loading && blogs.length === 0 && !error && (
        <p className="text-center text-gray-500">{t("blog.noPosts")}</p>
      )}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogs.map((post, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={`https://switchiify.com/bonetProject/backend/public/${post.image}`}
              alt={post.image}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-sulphur text-[#188bff] line-clamp-2 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 font-sulphur">
                {post.quote}
              </p>
              <Link
                href={`/blog/${slugify(post.title)}`}
                className="mt-2 inline-block border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
              >
                {t("blog.readMore")}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
