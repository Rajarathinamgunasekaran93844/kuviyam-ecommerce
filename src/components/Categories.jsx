import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

const Categories = ({ categories = [] }) => {
  if (categories.length === 0) return null;

  return (
    <section className="bg-[#f8f6f0] py-16 sm:py-20" aria-labelledby="category-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-purple-800">
              Browse the catalog
            </p>
            <h2 id="category-heading" className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Books by category
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600">
            Choose a category to see the books currently available in the shop.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ name, count }) => (
            <Reveal key={name}>
              <Link
                to={`/shop?category=${encodeURIComponent(name)}`}
                className="group flex min-h-28 items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-purple-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-purple-50 text-brand-purple-800">
                    <BookOpen size={22} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-slate-900">{name}</span>
                    <span className="mt-1 block text-sm text-slate-500">
                      {count} {count === 1 ? "book" : "books"}
                    </span>
                  </span>
                </span>
                <ArrowRight size={19} className="shrink-0 text-brand-purple-800 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
