import { useEffect, useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { productAPI } from "../utils/api";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import Reveal from "./Reveal";

const FeaturedBooks = ({ onProductsLoaded }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchProducts = async () => {
      try {
        const response = await productAPI.getProducts();
        const data = response.data.products || response.data.data || [];
        if (!Array.isArray(data)) throw new Error("Unexpected product response.");
        if (active) {
          setProducts(data);
          onProductsLoaded?.(data);
        }
      } catch {
        if (active) {
          setProducts([]);
          setError(true);
          onProductsLoaded?.([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      active = false;
    };
  }, [onProductsLoaded, retryCount]);

  return (
    <Reveal>
      <section className="bg-[#f1ede3] py-16 sm:py-20" aria-busy={loading}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-purple-200 bg-white px-4 py-2 text-sm font-semibold text-brand-purple-800">
              <BookOpen size={16} aria-hidden="true" />
              The Paachcharam collection
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Tamil books for young readers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Browse rhymes and stories made for children beginning their Tamil reading journey.
            </p>
          </header>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3" role="status" aria-label="Loading books">
              {Array.from({ length: 3 }, (_, index) => <ProductSkeleton key={index} />)}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-amber-200 bg-white px-6 py-10 text-center" role="alert">
              <h3 className="text-lg font-semibold text-slate-900">Books could not be loaded</h3>
              <p className="mt-2 text-slate-600">Check your connection and try again.</p>
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  setError(false);
                  setRetryCount((count) => count + 1);
                }}
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-purple-800 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-purple-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800"
              >
                Retry
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center" role="status">
              <p className="text-lg font-semibold text-slate-900">No books are available right now.</p>
              <p className="mt-2 text-slate-600">Please check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Link
              to="/shop"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-brand-purple-300 bg-white px-5 py-3 font-semibold text-brand-purple-900 transition hover:border-brand-purple-800 hover:bg-brand-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800"
            >
              Browse all books
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
};

export default FeaturedBooks;
