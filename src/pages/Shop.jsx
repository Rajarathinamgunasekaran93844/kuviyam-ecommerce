import { useEffect, useMemo, useState } from "react";
import { ArrowDownUp, BookOpen, LayoutGrid, List, Search, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { productAPI } from "../utils/api";

const PAGE_SIZE = 9;

const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  if (sortBy === "price-low") {
    sorted.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
  } else if (sortBy === "price-high") {
    sorted.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
  } else if (sortBy === "title") {
    sorted.sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));
  } else if (sortBy === "newest") {
    sorted.sort((a, b) => {
      const dateDifference = new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      return Number.isNaN(dateDifference) || dateDifference === 0
        ? Number(b.id || 0) - Number(a.id || 0)
        : dateDifference;
    });
  }

  return sorted;
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [layout, setLayout] = useState("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [retryCount, setRetryCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  useEffect(() => {
    let active = true;

    productAPI
      .getProducts()
      .then((response) => {
        const data = response.data.products || response.data.data || [];
        if (!Array.isArray(data)) throw new Error("Unexpected product response.");
        if (active) {
          setProducts(data);
          setError(false);
        }
      })
      .catch(() => {
        if (active) {
          setProducts([]);
          setError(true);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [retryCount]);

  const categories = useMemo(() => {
    const counts = new Map();
    products.forEach((product) => {
      const name = String(product.category || "").trim();
      if (name) counts.set(name, (counts.get(name) || 0) + 1);
    });

    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLocaleLowerCase();

    return products.filter((product) => {
      const matchesCategory = !category || product.category === category;
      const searchableText = [product.title, product.category, product.description]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();
      return matchesCategory && (!searchTerm || searchableText.includes(searchTerm));
    });
  }, [category, products, search]);

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortBy),
    [filteredProducts, sortBy]
  );

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  const chooseCategory = (nextCategory) => {
    setVisibleCount(PAGE_SIZE);
    const nextParams = new URLSearchParams(searchParams);
    if (nextCategory) nextParams.set("category", nextCategory);
    else nextParams.delete("category");
    setSearchParams(nextParams);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8f6f0] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <header className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-purple-800">
              Paachcharam collection
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Tamil books for young readers
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Browse the books available in our catalog, or search by title and description.
            </p>
          </header>

          <div className="mx-auto mb-8 max-w-3xl">
            <label htmlFor="book-search" className="sr-only">Search books</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} aria-hidden="true" />
              <input
                id="book-search"
                type="search"
                placeholder="Search books"
                value={search}
                onChange={(event) => {
                  setVisibleCount(PAGE_SIZE);
                  setSearch(event.target.value);
                }}
                className="min-h-14 w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-purple-700 focus:ring-2 focus:ring-brand-purple-200"
              />
            </div>
          </div>

          <section aria-label="Book categories" className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
              <BookOpen size={17} className="text-brand-purple-700" aria-hidden="true" />
              Browse by category
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter books by category">
              {[
                { name: "", label: "All books", count: products.length },
                ...categories.map((item) => ({ name: item.name, label: item.name, count: item.count })),
              ].map((item) => {
                const selected = category === item.name;
                return (
                  <button
                    key={item.name || "all-books"}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => chooseCategory(item.name)}
                    className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-500 focus-visible:ring-offset-2 ${
                      selected
                        ? "border-brand-purple-800 bg-brand-purple-800 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-brand-purple-300 hover:bg-brand-purple-50"
                    }`}
                  >
                    {item.label}
                    <span className={selected ? "text-white/75" : "text-slate-400"}>{item.count}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="mb-6 flex flex-col gap-4 border-y border-slate-200 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3 text-slate-700" aria-live="polite">
              <span className="font-medium">
                {loading ? "Loading books…" : `${filteredProducts.length} ${filteredProducts.length === 1 ? "book" : "books"}`}
              </span>
              {category && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 ring-1 ring-slate-200">
                  {category}
                  <button
                    type="button"
                    onClick={() => chooseCategory("")}
                    aria-label={`Clear ${category} category`}
                    className="rounded-full text-slate-500 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800"
                  >
                    <X size={15} aria-hidden="true" />
                  </button>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700">
                <ArrowDownUp size={16} className="text-brand-purple-700" aria-hidden="true" />
                <span className="sr-only">Sort books</span>
                <select
                  aria-label="Sort books"
                  value={sortBy}
                  onChange={(event) => {
                    setVisibleCount(PAGE_SIZE);
                    setSortBy(event.target.value);
                  }}
                  className="max-w-[190px] bg-transparent py-2 text-sm outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="featured">Featured order</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="title">Title: A to Z</option>
                </select>
              </label>

              <div role="group" aria-label="Book view" className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  aria-label="Grid view"
                  aria-pressed={layout === "grid"}
                  onClick={() => setLayout("grid")}
                  className={`flex h-9 w-10 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-500 ${layout === "grid" ? "bg-brand-purple-800 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <LayoutGrid size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  aria-pressed={layout === "list"}
                  onClick={() => setLayout("list")}
                  className={`flex h-9 w-10 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-500 ${layout === "list" ? "bg-brand-purple-800 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <List size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3" role="status" aria-label="Loading books">
              {Array.from({ length: 3 }, (_, index) => <ProductSkeleton key={index} />)}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-amber-200 bg-white px-6 py-10 text-center" role="alert">
              <h2 className="text-lg font-semibold text-slate-900">Books could not be loaded</h2>
              <p className="mt-2 text-slate-600">Check your connection and try again.</p>
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  setRetryCount((count) => count + 1);
                }}
                className="mt-5 min-h-11 rounded-xl bg-brand-purple-800 px-5 py-2.5 font-semibold text-white hover:bg-brand-purple-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800"
              >
                Retry
              </button>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
              <h2 className="text-xl font-semibold text-slate-900">No books found</h2>
              <p className="mt-2 text-slate-600">
                {category ? `There are no books in “${category}” matching this search.` : "Try a different search term."}
              </p>
              {category && (
                <button type="button" onClick={() => chooseCategory("")} className="mt-5 font-semibold text-brand-purple-800 underline-offset-4 hover:underline">
                  Browse all categories
                </button>
              )}
            </div>
          ) : (
            <>
              <div className={layout === "grid" ? "grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3" : "grid grid-cols-1 gap-5"}>
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} layout={layout} />
                ))}
              </div>

              {visibleCount < sortedProducts.length && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                    className="min-h-12 rounded-xl border border-brand-purple-300 bg-white px-6 py-3 font-semibold text-brand-purple-900 transition hover:border-brand-purple-800 hover:bg-brand-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800"
                  >
                    Load {Math.min(PAGE_SIZE, sortedProducts.length - visibleCount)} more books
                  </button>
                </div>
              )}
            </>
          )}

          <div className="mt-10 text-center">
            <Link to="/" className="text-sm font-semibold text-brand-purple-800 underline-offset-4 hover:underline">
              Return to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Shop;
