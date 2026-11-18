import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  RefreshCw,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import PageIntro from "../components/PageIntro";
import { blogAPI } from "../utils/api";

const formatDate = (value) => {
  if (!value) return "Recently";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Recently"
    : new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(date);
};

const getPreviewText = (blog) => {
  if (blog.excerpt) return blog.excerpt;

  const content = String(blog.content || "");
  return content.length > 220 ? `${content.slice(0, 220).trim()}…` : content;
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || "Journal stories could not be loaded right now.";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    blogAPI
      .getBlogs()
      .then((response) => {
        if (active) setBlogs(Array.isArray(response.data.data) ? response.data.data : []);
      })
      .catch((requestError) => {
        if (active) setError(getErrorMessage(requestError));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [retryCount]);

  const retry = () => {
    setError("");
    setLoading(true);
    setRetryCount((count) => count + 1);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      <Navbar />

      <main className="pb-20">
        <PageIntro
          icon={BookOpen}
          eyebrow="THE KUVIYAM JOURNAL"
          title="Ideas for little readers."
          highlight="Stories for everyone."
          description="Notes on Tamil, children’s books, and the everyday moments that make reading a joy."
        />

        <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" aria-label="Journal stories">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" role="status" aria-label="Loading journal stories">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-[430px] animate-pulse rounded-[28px] bg-white shadow-sm" />
              ))}
            </div>
          ) : error ? (
            <div className="mx-auto max-w-2xl rounded-[28px] border border-amber-200 bg-white p-8 text-center shadow-sm sm:p-10" role="alert">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gold-50 text-brand-gold-700">
                <RefreshCw size={24} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold text-slate-950">The journal is taking a break</h2>
              <p className="mt-2 text-slate-600">{error}</p>
              <button
                type="button"
                onClick={retry}
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-purple-800 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-purple-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800"
              >
                <RefreshCw size={17} aria-hidden="true" />
                Try again
              </button>
            </div>
          ) : blogs.length === 0 ? (
            <div className="mx-auto max-w-3xl rounded-[28px] border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10 sm:py-14">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-purple-50 text-brand-purple-800">
                <BookOpen size={28} aria-hidden="true" />
              </span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-brand-purple-800">Kuviyam Journal</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">New stories are on their way</h2>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
                There are no journal posts to read yet. In the meantime, explore the books that inspire our stories.
              </p>
              <Link
                to="/shop"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-purple-800 px-5 py-3 font-semibold text-white transition hover:bg-brand-purple-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800"
              >
                Explore the books <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {blogs.map((blog, index) => {
                const isExpanded = expandedBlogId === blog.id;
                const preview = getPreviewText(blog);
                const content = String(blog.content || "");
                const hasMore = Boolean(content && content !== preview);
                const imageId = `journal-image-${blog.id}`;
                const contentId = `journal-content-${blog.id}`;

                return (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.16) }}
                    className="flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#f1ede3]">
                      {blog.imageUrl ? (
                        <img
                          id={imageId}
                          src={blog.imageUrl}
                          alt={blog.imageAlt || blog.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-purple-50 via-white to-brand-gold-50">
                          <img
                            src="/Paachcharam_book.png"
                            alt="Paachcharam children’s book"
                            loading="lazy"
                            className="h-full max-w-[58%] object-contain p-5"
                          />
                        </div>
                      )}
                      <span className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-brand-purple-800 shadow-sm">
                        Kuviyam Journal
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <UserRound size={15} aria-hidden="true" />
                          {blog.author || "Kuviyam Publications"}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={15} aria-hidden="true" />
                          {formatDate(blog.createdAt)}
                        </span>
                      </div>

                      <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-950">
                        {blog.title}
                      </h2>

                      <div id={contentId} className="mt-3 flex-1">
                        <p className="whitespace-pre-line text-base leading-7 text-slate-600">
                          {isExpanded ? content : preview}
                        </p>
                      </div>

                      {hasMore && (
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-controls={contentId}
                          onClick={() => setExpandedBlogId(isExpanded ? null : blog.id)}
                          className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-xl border border-brand-purple-200 bg-brand-purple-50 px-4 py-2.5 font-semibold text-brand-purple-900 transition hover:border-brand-purple-400 hover:bg-brand-purple-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800"
                        >
                          {isExpanded ? "Show less" : "Read full story"}
                          <ArrowRight size={17} className={`transition-transform ${isExpanded ? "-rotate-90" : "group-hover:translate-x-1"}`} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
