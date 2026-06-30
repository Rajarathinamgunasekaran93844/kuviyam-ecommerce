import {
  useState,
  useEffect,
} from "react";

import {
  Search,
  Sparkles,
  BookOpen,
  Star,
  Rocket,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

import { productAPI } from "../utils/api";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getProducts({ search });
        setProducts(response.data.products || response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

  const filteredProducts = products;

  return (

    <>

      <Navbar />

      <section className="relative overflow-hidden min-h-screen py-16 md:py-20 bg-gradient-to-br from-brand-purple-100 via-brand-gold-50 to-brand-teal-100">

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20"></div>

        {/* FLOATING ELEMENTS */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-10 left-10 text-5xl opacity-20 animate-bounce">
            ☁️
          </div>

          <div className="absolute top-20 right-16 text-5xl opacity-20 animate-pulse">
            🌈
          </div>

          <div className="absolute bottom-10 left-20 text-5xl opacity-20 animate-bounce">
            🧸
          </div>

          <div className="absolute bottom-16 right-10 text-5xl opacity-20 animate-pulse">
            🚀
          </div>

          <div className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-spin">
            ⭐
          </div>

          <div className="absolute top-1/3 right-1/4 text-5xl opacity-10 animate-bounce">
            🎈
          </div>

        </div>

        {/* MAIN CONTAINER */}

        <div className="container-custom relative z-10">

          {/* HEADER */}

          <div className="text-center max-w-6xl mx-auto mb-12 md:mb-16">

            {/* BADGE */}

            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md px-8 py-4 rounded-full border-2 border-brand-purple-300 shadow-xl mb-10">

              <Sparkles
                className="text-brand-purple-500"
                size={24}
              />

              <span className="font-black text-brand-purple-500 text-lg tracking-wide">

                Explore Tamil Learning Books

              </span>

            </div>

            {/* TITLE */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">

              <span className="block text-gray-900">

                Fun Learning

              </span>

              <span className="block text-brand-purple-500 mt-3">

                Book Store 📚

              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="text-gray-700 text-lg md:text-xl mt-8 max-w-5xl mx-auto leading-8 md:leading-9">

              Discover colorful Tamil books, rhymes,
              stories, and playful educational materials
              specially designed for curious little learners.

            </p>

            {/* FEATURES */}

            <div className="flex flex-wrap justify-center gap-6 mt-8 md:mt-10">

              <div className="flex items-center gap-3 bg-white px-5 md:px-6 py-3 md:py-4 rounded-2xl shadow-xl hover:scale-105 transition duration-300">

                <BookOpen
                  className="text-brand-teal-500"
                  size={24}
                />

                <span className="font-black text-base md:text-lg text-gray-700">

                  Interactive Stories

                </span>

              </div>

              <div className="flex items-center gap-3 bg-white px-5 md:px-6 py-3 md:py-4 rounded-2xl shadow-xl hover:scale-105 transition duration-300">

                <Star
                  className="text-brand-gold-500"
                  size={24}
                />

                <span className="font-black text-base md:text-lg text-gray-700">

                  Kids Friendly

                </span>

              </div>

              <div className="flex items-center gap-3 bg-white px-5 md:px-6 py-3 md:py-4 rounded-2xl shadow-xl hover:scale-105 transition duration-300">

                <Rocket
                  className="text-brand-purple-500"
                  size={24}
                />

                <span className="font-black text-base md:text-lg text-gray-700">

                  Fun Learning

                </span>

              </div>

            </div>

          </div>

          {/* SEARCH BAR */}

          <div className="flex justify-center mb-12 md:mb-16">

            <div className="relative w-full max-w-3xl">

              {/* SEARCH ICON */}

              <Search
                className="absolute left-5 md:left-7 top-1/2 -translate-y-1/2 text-brand-purple-400"
                size={24}
              />

              {/* INPUT */}

              <input
                type="text"
                placeholder="Search fun learning books..."
                className="w-full bg-white/90 backdrop-blur-md border-4 border-white shadow-2xl rounded-full pl-14 md:pl-20 pr-14 md:pr-20 py-4 md:py-5 text-base md:text-lg font-semibold outline-none focus:border-brand-purple-300 transition duration-300"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

              {/* EMOJI */}

              <div className="absolute right-5 md:right-7 top-1/2 -translate-y-1/2 text-2xl md:text-3xl animate-bounce">

                🌈

              </div>

            </div>

          </div>

          {/* RESULT SECTION */}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-16">

            <div className="flex items-center gap-3 bg-white px-5 md:px-6 py-3 md:py-4 rounded-2xl shadow-xl">

              <BookOpen
                className="text-brand-teal-500"
                size={28}
              />

              <span className="font-black text-gray-700 text-lg">

                {filteredProducts.length} Books Found

              </span>

            </div>

            <div className="text-lg md:text-xl font-black text-brand-purple-500 text-center">

              🎈 Happy Learning Starts Here

            </div>

          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full max-w-[460px] mx-auto"
                >
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (

            <div className="bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-8 md:p-12 text-center border-4 border-white max-w-4xl mx-auto">

              <div className="text-6xl md:text-7xl mb-6">

                📚

              </div>

              <h2 className="text-3xl md:text-4xl font-black text-gray-800">

                No Books Found

              </h2>

              <p className="text-gray-600 text-lg mt-5 max-w-2xl mx-auto leading-8">

                Try searching with another keyword
                to discover more fun Tamil learning books.

              </p>

            </div>

          ) : (

            /* PRODUCT GRID */

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">

              {filteredProducts.map(

                (product) => (

                  <div
                    key={product.id}
                    className="flex justify-center"
                  >

                    <div className="w-full max-w-[460px] hover:-translate-y-4 transition duration-500">

                      <ProductCard
                        product={product}
                      />

                    </div>

                  </div>

                )

              )}

            </div>

          )}

        </div>

      </section>

      <Footer />

    </>

  );

};

export default Shop;
