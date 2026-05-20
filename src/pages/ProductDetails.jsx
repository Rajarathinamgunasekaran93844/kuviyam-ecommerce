import {
  useParams,
} from "react-router-dom";

import {
  useContext,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Star,
  ShoppingCart,
  Sparkles,
  BookOpen,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import products from "../data/products";

import { CartContext } from "../context/CartContext";

const ProductDetails = () => {

  const { id } =
    useParams();

  const { addToCart } =
    useContext(CartContext);

  const product =
    products.find(

      (item) =>
        item.id ===
        Number(id)

    );

  /* IMAGE STATE */

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(

    product?.images?.[0]

  );

  /* PRODUCT NOT FOUND */

  if (!product) {

    return (

      <>

        <Navbar />

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-purple-100 via-brand-gold-50 to-brand-teal-100">

          <div className="text-center">

            <div className="text-6xl md:text-7xl mb-6">

              📚

            </div>

            <h1 className="text-3xl md:text-4xl font-black text-gray-800">

              Product Not Found

            </h1>

          </div>

        </div>

        <Footer />

      </>

    );

  }

  return (

    <>

      <Navbar />

      <section className="relative overflow-hidden px-3 sm:px-5 md:px-6 py-16 md:py-20 pb-36 bg-gradient-to-br from-brand-purple-100 via-brand-gold-50 to-brand-teal-100 min-h-screen">

        {/* FLOATING CARTOON ELEMENTS */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-10 left-10 text-6xl animate-bounce">
            ☁️
          </div>

          <div className="absolute top-20 right-16 text-5xl animate-pulse">
            🌈
          </div>

          <div className="absolute bottom-10 left-20 text-5xl animate-bounce">
            🧸
          </div>

          <div className="absolute bottom-16 right-10 text-5xl animate-pulse">
            🚀
          </div>

          <div className="absolute top-1/2 left-1/3 text-4xl animate-spin">
            ⭐
          </div>

          <div className="absolute top-1/3 right-1/4 text-5xl animate-bounce">
            🎈
          </div>

        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-start relative z-10 min-w-0">

          {/* IMAGE GALLERY */}

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              duration: 0.7,
            }}

            className="w-full min-w-0"
          >

            {/* MAIN IMAGE */}

            <div className="relative bg-white/90 backdrop-blur-md rounded-[28px] overflow-hidden shadow-2xl border-4 border-white">

              {/* TOP BADGES */}

              <div className="absolute top-5 left-5 z-20 flex flex-wrap gap-3">

                <span className="bg-brand-purple-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">

                  {product.category}

                </span>

                <span className="bg-brand-gold-400 text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">

                  <Sparkles size={14} />

                  Kids Favorite

                </span>

              </div>

              {/* MAIN IMAGE */}

              <motion.img

                key={selectedImage}

                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                transition={{
                  duration: 0.4,
                }}

                src={selectedImage}
                alt={product.title}
                className="w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover"
              />

            </div>

            {/* THUMBNAILS */}

            <div className="flex flex-wrap gap-3 md:gap-4 mt-6 justify-center lg:justify-start">

              {product.images.map(

                (
                  image,
                  index
                ) => (

                  <motion.div

                    whileHover={{
                      scale: 1.08,
                    }}

                    whileTap={{
                      scale: 0.95,
                    }}

                    key={index}

                    onClick={() =>
                      setSelectedImage(
                        image
                      )
                    }

                    className={`cursor-pointer border-4 rounded-[25px] overflow-hidden transition shadow-xl ${
                      selectedImage ===
                      image
                        ? "border-brand-purple-500 scale-105"
                        : "border-white"
                    }`}
                  >

                    <img
                      src={image}
                      alt=""
                    className="w-20 h-20 md:w-24 md:h-24 object-cover"
                    />

                  </motion.div>

                )

              )}

            </div>

          </motion.div>

          {/* PRODUCT INFO */}

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              duration: 0.7,
            }}

            className="relative w-full min-w-0 bg-white/90 backdrop-blur-md rounded-[22px] md:rounded-[24px] shadow-2xl p-5 md:p-8 lg:p-10 border-4 border-white overflow-hidden"
          >

            {/* BACKGROUND */}

            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-purple-300 rounded-full opacity-20"></div>

            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-gold-300 rounded-full opacity-20"></div>

            <div className="relative z-10">

              {/* CATEGORY */}

              <div className="inline-flex items-center gap-2 bg-brand-purple-100 px-5 py-3 rounded-full mb-6">

                <BookOpen
                  className="text-brand-purple-500"
                  size={20}
                />

                <span className="font-bold text-brand-purple-500 uppercase tracking-wide">

                  {product.category}

                </span>

              </div>

              {/* TITLE */}

              <h1 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">

                {product.title}

              </h1>

              {/* RATING */}

              <div className="flex items-center gap-2 mt-8">

                {[...Array(5)].map(

                  (_, index) => (

                    <Star
                      key={index}
                      size={24}
                      className="text-brand-gold-400 fill-brand-gold-400"
                    />

                  )

                )}

                <span className="text-gray-600 font-bold ml-2">

                  Loved by Kids 🌈

                </span>

              </div>

              {/* DESCRIPTION */}

              <p className="text-gray-700 text-base md:text-lg leading-8 mt-6">

                {product.description}

              </p>

              {/* FEATURES */}

              <div className="grid sm:grid-cols-2 gap-5 mt-8">

                <div className="bg-brand-purple-50 rounded-3xl p-5 shadow-md">

                  <div className="text-4xl mb-3">

                    📚

                  </div>

                  <h3 className="font-black text-gray-800 text-xl">

                    Interactive Learning

                  </h3>

                </div>

                <div className="bg-brand-gold-50 rounded-3xl p-5 shadow-md">

                  <div className="text-4xl mb-3">

                    🌈

                  </div>

                  <h3 className="font-black text-gray-800 text-xl">

                    Kids Friendly Design

                  </h3>

                </div>

              </div>

              {/* PRICE */}

              <div className="mt-8 md:mt-10">

                <span className="text-gray-500 uppercase tracking-widest font-bold">

                  Price

                </span>

                <h2 className="text-4xl md:text-5xl font-black text-brand-purple-500 mt-2">

                  ₹{product.price}

                </h2>

              </div>

              {/* BUTTON */}

              <button

                onClick={() =>
                  addToCart(product)
                }

                className="group mt-8 md:mt-10 w-full bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 hover:from-brand-purple-600 hover:to-brand-gold-500 text-white py-4 rounded-full text-lg font-black shadow-2xl hover:scale-105 transition duration-300 flex items-center justify-center gap-3"
              >

                <ShoppingCart
                  size={26}
                  className="group-hover:scale-110 transition duration-300"
                />

                Add To Cart 🚀

              </button>

            </div>

          </motion.div>

        </div>

      </section>

      {/* STICKY ADD TO CART */}

      <motion.div

        initial={{
          y: 100,
          opacity: 0,
        }}

        animate={{
          y: 0,
          opacity: 1,
        }}

        transition={{
          duration: 0.5,
        }}

        className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t-4 border-brand-purple-200 shadow-2xl z-50"
      >

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-row justify-between items-center gap-3 md:gap-5">

          <div className="min-w-0 text-left">

            <h2 className="hidden sm:block font-black text-lg md:text-xl text-gray-800 truncate">

              {product.title}

            </h2>

            <p className="text-brand-purple-500 font-black text-2xl md:text-3xl">

              ₹{product.price}

            </p>

          </div>

          <button

            onClick={() =>
              addToCart(product)
            }

            className="shrink-0 bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 hover:from-brand-purple-600 hover:to-brand-gold-500 text-white px-5 md:px-8 py-3 md:py-4 rounded-full font-black text-base md:text-lg shadow-xl hover:scale-105 transition duration-300 flex items-center gap-2 md:gap-3"
          >

            <ShoppingCart size={22} />

            Add To Cart

          </button>

        </div>

      </motion.div>

      <Footer />

    </>

  );
};

export default ProductDetails;
