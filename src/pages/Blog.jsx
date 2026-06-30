import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  RefreshCw,
  User,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { blogAPI } from "../utils/api";
import blog1 from "../assets/blog/blog1.png";
import blog2 from "../assets/blog/blog2.png";
import blog3 from "../assets/blog/blog3.png";

const fallbackImages = [blog1, blog2, blog3];

const formatDate = (value) => {
  if (!value) return "Recently";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Recently"
    : new Intl.DateTimeFormat("en-IN", {
        dateStyle: "long",
      }).format(date);
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || "Blogs could not be loaded right now.";

const getPreviewText = (blog) => {
  if (blog.excerpt) return blog.excerpt;

  const content = blog.content || "";
  return content.length > 180 ? `${content.slice(0, 180).trim()}...` : content;
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  const loadBlogs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await blogAPI.getBlogs();
      setBlogs(response.data.data || []);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    blogAPI
      .getBlogs()
      .then((response) => {
        if (!cancelled) setBlogs(response.data.data || []);
      })
      .catch((requestError) => {
        if (!cancelled) setError(getErrorMessage(requestError));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-brand-purple-50 via-brand-gold-50 to-brand-teal-50">
      <Navbar />

      <main className="relative z-10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-7xl">
          <motion.header
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white bg-white/80 px-6 py-3 shadow-xl backdrop-blur-md">
              <BookOpen size={24} className="text-brand-purple-500" />
              <span className="text-lg font-black text-brand-purple-500">
                Kuviyam Blog
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-gray-900 md:text-7xl">
              Things
              <span className="block bg-gradient-to-r from-brand-purple-500 via-pink-500 to-brand-teal-500 bg-clip-text text-transparent">
                To Read
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-gray-600 md:text-xl">
              Tamil learning stories, parenting ideas, and joyful reading
              moments from Kuviyam Publications.
            </p>
          </motion.header>

          {loading && (
            <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[520px] animate-pulse rounded-2xl bg-white/80 shadow-xl"
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="mx-auto mt-20 max-w-2xl rounded-2xl border border-brand-lavender-200 bg-white/90 p-8 text-center shadow-xl">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-purple-100 text-brand-purple-600">
                <RefreshCw size={30} />
              </div>
              <h2 className="text-2xl font-black text-gray-900">
                Unable to load blogs
              </h2>
              <p className="mt-3 text-gray-600">{error}</p>
              <button
                type="button"
                onClick={loadBlogs}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-purple-600 px-5 py-3 font-black text-white shadow-lg transition hover:bg-brand-purple-700"
              >
                <RefreshCw size={18} />
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="mx-auto mt-20 max-w-2xl rounded-2xl border border-brand-lavender-200 bg-white/90 p-8 text-center shadow-xl">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-teal-100 text-brand-teal-700">
                <BookOpen size={30} />
              </div>
              <h2 className="text-2xl font-black text-gray-900">
                No blogs published yet
              </h2>
              <p className="mt-3 text-gray-600">
                Published stories and updates will appear here.
              </p>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="mt-20 space-y-16">
              {blogs.map((blog, index) => {
                const isExpanded = expandedBlogId === blog.id;
                const fallbackImage = fallbackImages[index % fallbackImages.length];
                const image = blog.imageUrl || fallbackImage;

                return (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${
                      index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative group">
                      <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-brand-purple-300 to-brand-teal-300 opacity-20 blur-2xl transition duration-500 group-hover:opacity-40" />
                      <div className="relative overflow-hidden rounded-2xl border border-white bg-white shadow-2xl">
                        <img
                          src={image}
                          alt={blog.title}
                          onError={(event) => {
                            event.currentTarget.src = fallbackImage;
                          }}
                          className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[500px]"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="inline-flex items-center rounded-full bg-gradient-to-r from-brand-gold-400 to-orange-400 px-5 py-2 text-sm font-black text-white shadow-lg">
                        Kuviyam Story
                      </div>

                      <h2 className="mt-7 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
                        {blog.title}
                      </h2>

                      <div className="mt-7 flex flex-wrap items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-2">
                          <User size={20} />
                          <span className="font-bold">
                            {blog.author || "Kuviyam Publications"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <CalendarDays size={20} />
                          <span className="font-bold">
                            {formatDate(blog.createdAt)}
                          </span>
                        </div>
                      </div>

                      <p className="mt-8 whitespace-pre-line text-xl leading-10 text-gray-600">
                        {isExpanded ? blog.content : getPreviewText(blog)}
                      </p>

                      {blog.content !== getPreviewText(blog) && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedBlogId(isExpanded ? null : blog.id)
                          }
                          className="mt-10 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-brand-purple-500 to-brand-teal-500 px-8 py-5 text-lg font-black text-white shadow-2xl transition duration-300 hover:scale-105 hover:from-brand-purple-600 hover:to-brand-teal-600"
                        >
                          {isExpanded ? "Show Less" : "Read More"}
                          <ArrowRight
                            size={22}
                            className={isExpanded ? "-rotate-90" : ""}
                          />
                        </button>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
