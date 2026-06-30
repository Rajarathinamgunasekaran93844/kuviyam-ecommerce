import { useEffect, useState } from "react";

import {
  Sparkles,
  Star,
  BookOpen,
  Rocket,
  Heart,
} from "lucide-react";

import { Link } from "react-router-dom";

import { productAPI } from "../utils/api";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import Reveal from "./Reveal";

const FeaturedBooks = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getProducts();
        setProducts(response.data.products || response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Reveal>
      <section
        className="
          relative

          overflow-hidden

          py-20 md:py-24

          bg-gradient-to-br
          from-brand-purple-100
          via-brand-gold-50
          to-brand-teal-100
        "
      >
        {/* SOFT OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30"></div>

        {/* FLOATING ELEMENTS */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-5xl opacity-20 animate-bounce">
            📚
          </div>

          <div className="absolute top-16 right-14 text-5xl opacity-20 animate-pulse">
            🌈
          </div>

          <div className="absolute bottom-10 left-10 text-5xl opacity-20 animate-bounce">
            🧸
          </div>

          <div className="absolute bottom-14 right-10 text-5xl opacity-20 animate-pulse">
            🚀
          </div>

          <div className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-spin">
            ⭐
          </div>

          <div className="absolute top-1/3 right-1/3 text-4xl opacity-10 animate-bounce">
            🎈
          </div>
        </div>

        {/* MAIN CONTAINER */}

        <div className="container-custom relative z-10 px-4">
          {/* HEADER */}

          <div className="text-center max-w-6xl mx-auto mb-16">
            {/* BADGE */}

            <div
              className="
                inline-flex
                items-center
                gap-3

                bg-white/90
                backdrop-blur-md

                px-7 py-4

                rounded-full

                border-2 border-brand-purple-200

                shadow-xl

                mb-10
              "
            >
              <Sparkles
                size={22}
                className="text-brand-purple-500"
              />

              <span className="font-black text-brand-purple-500 text-base md:text-lg tracking-wide">
                Paachcharam Featured Collection
              </span>
            </div>

            {/* TITLE */}

            <h2 className="leading-tight">
              <span
                className="
                  block

                  text-4xl md:text-5xl xl:text-6xl

                  font-black

                  text-gray-900
                "
              >
                Popular Tamil
              </span>

              <span
                className="
                  block

                  text-4xl md:text-5xl xl:text-6xl

                  font-black

                  text-brand-purple-500

                  mt-3
                "
              >
                Learning Books
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-8

                text-lg md:text-xl

                text-gray-700

                leading-8 md:leading-9

                max-w-5xl
                mx-auto
              "
            >
              Discover joyful Tamil learning experiences
              through Paachcharam collections including
              Inithinithu rhymes, Arivuamudhu stories,
              activity books, colorful adventures, and
              exciting educational fun for little learners.
            </p>

            {/* FEATURE BOXES */}

            <div
              className="
                flex flex-wrap

                justify-center

                gap-5

                mt-12
              "
            >
              {/* BOX */}

              <div
                className="
                  flex items-center justify-center
                  gap-3

                  bg-white/90
                  backdrop-blur-sm

                  px-6 py-4

                  rounded-2xl

                  shadow-lg

                  border border-brand-purple-100

                  hover:scale-105

                  transition duration-300
                "
              >
                <BookOpen
                  className="text-brand-teal-500 shrink-0"
                  size={22}
                />

                <span className="font-bold text-base md:text-lg text-gray-700 whitespace-nowrap">
                  Interactive Stories
                </span>
              </div>

              {/* BOX */}

              <div
                className="
                  flex items-center justify-center
                  gap-3

                  bg-white/90
                  backdrop-blur-sm

                  px-6 py-4

                  rounded-2xl

                  shadow-lg

                  border border-brand-purple-100

                  hover:scale-105

                  transition duration-300
                "
              >
                <Star
                  className="text-brand-gold-500 shrink-0"
                  size={22}
                />

                <span className="font-bold text-base md:text-lg text-gray-700 whitespace-nowrap">
                  Kids Friendly
                </span>
              </div>

              {/* BOX */}

              <div
                className="
                  flex items-center justify-center
                  gap-3

                  bg-white/90
                  backdrop-blur-sm

                  px-6 py-4

                  rounded-2xl

                  shadow-lg

                  border border-brand-purple-100

                  hover:scale-105

                  transition duration-300
                "
              >
                <Heart
                  className="text-brand-red-400 shrink-0"
                  size={22}
                />

                <span className="font-bold text-base md:text-lg text-gray-700 whitespace-nowrap">
                  Loved By Parents
                </span>
              </div>

              {/* BOX */}

              <div
                className="
                  flex items-center justify-center
                  gap-3

                  bg-white/90
                  backdrop-blur-sm

                  px-6 py-4

                  rounded-2xl

                  shadow-lg

                  border border-brand-purple-100

                  hover:scale-105

                  transition duration-300
                "
              >
                <Rocket
                  className="text-brand-purple-500 shrink-0"
                  size={22}
                />

                <span className="font-bold text-base md:text-lg text-gray-700 whitespace-nowrap">
                  Fun Learning
                </span>
              </div>
            </div>
          </div>

          {/* PRODUCT GRID */}

          <div
            className="
              grid

              grid-cols-1
              sm:grid-cols-2
              2xl:grid-cols-3

              gap-y-14
              gap-x-10
            "
          >
            {loading
              ? Array(6)
                  .fill()
                  .map((_, index) => (
                    <ProductSkeleton
                      key={index}
                    />
                  ))
              : products.map((product) => (
                  <div
                    key={product.id}
                    className="
                      flex
                      justify-center
                    "
                  >
                    <div className="w-full max-w-[430px]">
                      <ProductCard
                        product={product}
                      />
                    </div>
                  </div>
                ))}
          </div>

          {/* BOTTOM CTA */}

          <div className="flex justify-center mt-20">
            <Link to="/shop">
              <button
                className="
                  group

                  bg-gradient-to-r
                  from-brand-purple-500
                  via-brand-red-500
                  to-brand-gold-400

                  hover:from-brand-purple-600
                  hover:to-brand-gold-500

                  text-white

                  px-9 py-5

                  rounded-2xl

                  font-black
                  text-lg md:text-xl

                  shadow-2xl

                  hover:scale-105

                  transition duration-300

                  flex items-center gap-4
                "
              >
                📚 Explore More Books

                <span className="group-hover:translate-x-2 transition duration-300">
                  🚀
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
};

export default FeaturedBooks;