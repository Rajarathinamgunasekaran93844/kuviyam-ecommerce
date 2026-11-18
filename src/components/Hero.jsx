import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => (
  <section className="relative isolate overflow-hidden bg-[#f8f6f0] text-slate-900">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-28 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand-gold-200/50 blur-3xl"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-48 -left-24 h-[26rem] w-[26rem] rounded-full bg-brand-purple-100/70 blur-3xl"
    />

    <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:py-20 lg:min-h-[640px] lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:px-10 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-purple-200 bg-white/80 px-4 py-2 text-sm font-semibold text-brand-purple-800 shadow-sm">
          <Sparkles size={16} aria-hidden="true" />
          Kuviyam Publications · Paachcharam
        </div>

        <h1 className="mt-7 text-4xl font-semibold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Tamil stories for
          <span className="block font-serif italic text-brand-purple-700">
            little minds.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          Explore rhymes, stories and early learning books that bring Tamil into a
          child’s everyday reading.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-slate-700">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm">
            <BookOpen size={16} className="text-brand-purple-700" aria-hidden="true" />
            Rhymes and stories
          </span>
          <span className="rounded-full bg-white px-4 py-2.5 shadow-sm">Tamil learning</span>
          <span className="rounded-full bg-white px-4 py-2.5 shadow-sm">Books for young readers</span>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            to="/shop"
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-brand-purple-800 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-purple-900/15 transition hover:-translate-y-0.5 hover:bg-brand-purple-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800"
          >
            Explore the books
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            to="/about"
            className="inline-flex min-h-12 items-center rounded-xl px-4 py-3 font-semibold text-slate-700 underline decoration-brand-gold-500 decoration-2 underline-offset-4 transition hover:text-brand-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800"
          >
            About the publisher
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.08 }}
        className="relative mx-auto w-full max-w-[440px] lg:ml-auto"
      >
        <div className="absolute -inset-5 -rotate-3 rounded-[2rem] bg-brand-gold-200/70" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white p-3 shadow-[0_28px_80px_rgba(45,31,62,0.16)] sm:p-4">
          <img
            src="/inithuinithu_book.optimized.jpg"
            alt="Cover of Inithinithu, a Tamil rhymes book for young readers"
            className="aspect-[4/5] w-full rounded-[1.25rem] bg-[#f6f1e7] object-contain p-2"
            decoding="async"
            fetchPriority="high"
          />
          <div className="flex items-center justify-between gap-4 px-2 py-4 sm:px-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-purple-700">
                Paachcharam collection
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">Inithinithu</p>
            </div>
            <span className="rounded-full bg-brand-purple-50 px-3 py-1.5 text-sm font-semibold text-brand-purple-800">
              Tamil rhymes
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
