import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useContext,
  useState,
  useEffect,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  ShoppingCart,
  BookOpen,
  Heart,
} from "lucide-react";

import {
  toast,
} from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toDisplayImageUrl } from "../utils/imageUrls";
import { CartContext } from "../context/cartContextValue";
import { AuthContext } from "../context/authContextValue";
import {
  productAPI,
  wishlistAPI
} from "../utils/api";

const configuredSiteUrl = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_SITE_URL
  : import.meta.env.VITE_SITE_URL;
const SITE_URL = (
  configuredSiteUrl ||
  (import.meta.env.DEV ? window.location.origin : "https://kuviyam-ecommerce.vercel.app")
).replace(/\/$/, "");

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadedProductId, setLoadedProductId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchProductAndWishlist = async () => {
      try {
        const response = await productAPI.getProductById(id);
        const productData = response.data.product || response.data.data;
        if (!productData) throw new Error("Product response was empty.");
        if (!active) return;
        setProduct(productData);
        setSelectedImage(productData.images?.[0] || "/Paachcharam_book.png");
        setLoadedProductId(String(id));
      } catch (error) {
        if (!active) return;
        console.error("Failed to fetch product:", error);
        toast.error("Product not found");
        navigate("/shop");
      } finally {
        if (active) setLoading(false);
      }

      if (active && isAuthenticated) {
        try {
          const wishlistRes = await wishlistAPI.getWishlist();
          const wishlistItems = wishlistRes.data.wishlist || wishlistRes.data.data || [];
          const isInWishlist = wishlistItems.some(item => item.id === Number(id));
          if (active) setInWishlist(isInWishlist);
        } catch (err) {
          if (active) console.error("Failed to check wishlist:", err);
        }
      }
    };

    fetchProductAndWishlist();
    return () => {
      active = false;
    };
  }, [id, navigate, isAuthenticated]);

  useEffect(() => {
    if (!product) return undefined;

    const title = `${product.title} | Tamil Children's Book | Kuviyam Publications`;
    const description = String(product.description || "View this book from the Paachcharam Tamil learning collection.")
      .replace(/\s+/g, " ")
      .slice(0, 160);
    const productImage = product.images?.[0]
      ? new URL(toDisplayImageUrl(product.images[0]), SITE_URL).href
      : undefined;

    document.title = title;
    document.head.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.head.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.head.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    if (productImage) {
      document.head.querySelector('meta[property="og:image"]')?.setAttribute("content", productImage);
    }

    const structuredData = document.createElement("script");
    structuredData.id = "product-structured-data";
    structuredData.type = "application/ld+json";
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description,
      ...(productImage ? { image: [productImage] } : {}),
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: Number(product.price),
        url: `${SITE_URL}/product/${encodeURIComponent(product.id)}`,
      },
    });
    document.head.append(structuredData);

    return () => structuredData.remove();
  }, [product]);

  /* ====================================== */
  /* ADD TO CART */
  /* ====================================== */

  const handleAddToCart = async () => {
      /* CHECK LOGIN */

      if (
        !isAuthenticated
      ) {
        toast.error(
          "🔐 Please login to continue",
          {
            position:
              "top-right",

            autoClose: 2200,

            theme:
              "colored",
          }
        );

        navigate("/login");

        return;
      }

    try {
      await addToCart(product);
      toast.success(`${product.title} added to cart.`, {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not add this book to your cart.");
    }
  };

  /* ====================================== */
  /* WISHLIST HANDLERS */
  /* ====================================== */

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("🔐 Please login to continue", { position: "top-right", autoClose: 2200 });
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    try {
      setWishlistLoading(true);
      if (inWishlist) {
        await wishlistAPI.removeFromWishlist(Number(id));
        setInWishlist(false);
        toast.success("Removed from wishlist ❤️", { position: "top-right", autoClose: 2200 });
      } else {
        await wishlistAPI.addToWishlist(Number(id));
        setInWishlist(true);
        toast.success("Added to wishlist ❤️", { position: "top-right", autoClose: 2200 });
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      toast.error("Failed to update wishlist", { position: "top-right", autoClose: 2200 });
    } finally {
      setWishlistLoading(false);
    }
  };

  /* ====================================== */
  /* PRODUCT NOT FOUND */
  /* ====================================== */

  if (loading || loadedProductId !== String(id)) {
    return (
      <>
        <Navbar />
        <div
          className="
            min-h-screen
            flex items-center justify-center
            bg-gradient-to-br
            from-brand-purple-100
            via-brand-gold-50
            to-brand-teal-100
          "
        >
          <div className="text-center">
            <div className="text-6xl md:text-7xl mb-6 animate-bounce">
              📚
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-800">
              Loading Product...
            </h1>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div
          className="
            min-h-screen
            flex items-center justify-center
            bg-gradient-to-br
            from-brand-purple-100
            via-brand-gold-50
            to-brand-teal-100
          "
        >
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
      {/* ====================================== */}
      {/* NAVBAR */}
      {/* ====================================== */}

      <Navbar />

      {/* ====================================== */}
      {/* MAIN SECTION */}
      {/* ====================================== */}

      <section
        className="
          relative

          overflow-hidden

          px-3
          sm:px-5
          md:px-6

          py-16
          md:py-20

          pb-36

          bg-gradient-to-br
          from-brand-purple-100
          via-brand-gold-50
          to-brand-teal-100

          min-h-screen
        "
      >
        {/* ====================================== */}
        {/* FLOATING ELEMENTS */}
        {/* ====================================== */}

        <div
          className="
            absolute inset-0

            overflow-hidden

            pointer-events-none
          "
        >
          <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-40">
            ☁️
          </div>

          <div className="absolute top-20 right-16 text-5xl animate-pulse opacity-40">
            🌈
          </div>

          <div className="absolute bottom-10 left-20 text-5xl animate-bounce opacity-40">
            🧸
          </div>

          <div className="absolute bottom-16 right-10 text-5xl animate-pulse opacity-40">
            🚀
          </div>

          <div className="absolute top-1/2 left-1/3 text-4xl animate-spin opacity-30">
            ⭐
          </div>

          <div className="absolute top-1/3 right-1/4 text-5xl animate-bounce opacity-40">
            🎈
          </div>
        </div>

        {/* ====================================== */}
        {/* CONTENT */}
        {/* ====================================== */}

        <div
          className="
            max-w-7xl

            mx-auto

            grid
            lg:grid-cols-2

            gap-8
            lg:gap-12

            items-start

            relative

            z-10

            min-w-0
          "
        >
          {/* ====================================== */}
          {/* IMAGE GALLERY */}
          {/* ====================================== */}

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
            className="
              w-full

              min-w-0
            "
          >
            {/* MAIN IMAGE */}

            <div
              className="
                relative

                bg-white/90

                backdrop-blur-md

                rounded-[28px]

                overflow-hidden

                shadow-2xl

                border-4 border-white
              "
            >
              {/* BADGES */}

              <div
                className="
                  absolute
                  top-5 left-5

                  z-20

                  flex flex-wrap

                  gap-3
                "
              >
                <span
                  className="
                    bg-brand-purple-500

                    text-white

                    px-5 py-2

                    rounded-full

                    text-sm

                    font-bold

                    shadow-lg
                  "
                >
                  {product.category}
                </span>

              </div>

              {/* MAIN IMAGE */}

              <div className="mx-auto aspect-[4/5] w-full max-w-[420px] bg-[#f6f2e9]">
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
                src={toDisplayImageUrl(selectedImage || product.images?.[0] || "/Paachcharam_book.png")}
                alt={product.title}
                className="
                  h-full
                  w-full
                  object-contain
                  p-4
                "
              />
              </div>
            </div>

            {/* ====================================== */}
            {/* THUMBNAILS */}
            {/* ====================================== */}

            <div
              className="
                flex flex-wrap

                gap-3
                md:gap-4

                mt-6

                justify-center
                lg:justify-start
              "
            >
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
                    className={`
                      cursor-pointer

                      border-4

                      rounded-[25px]

                      overflow-hidden

                      transition

                      shadow-xl

                      ${
                        selectedImage ===
                        image
                          ? "border-brand-purple-500 scale-105"
                          : "border-white"
                      }
                    `}
                  >
                    <img
                      src={toDisplayImageUrl(image)}
                      alt=""
                      className="
                        w-20 h-20
                        md:w-24 md:h-24

                        bg-[#f6f2e9]
                        object-contain
                        p-2
                      "
                    />
                  </motion.div>
                )
              )}
            </div>
          </motion.div>

          {/* ====================================== */}
          {/* PRODUCT INFO */}
          {/* ====================================== */}

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
            className="
              relative

              w-full

              min-w-0

              bg-white/90

              backdrop-blur-md

              rounded-[22px]
              md:rounded-[24px]

              shadow-2xl

              p-5
              md:p-8
              lg:p-10

              border-4 border-white

              overflow-hidden
            "
          >
            {/* BACKGROUND */}

            <div
              className="
                absolute
                -top-20
                -right-20

                w-64 h-64

                bg-brand-purple-300

                rounded-full

                opacity-20
              "
            ></div>

            <div
              className="
                absolute
                -bottom-20
                -left-20

                w-64 h-64

                bg-brand-gold-300

                rounded-full

                opacity-20
              "
            ></div>

            <div className="relative z-10">
              {/* CATEGORY */}

              <div
                className="
                  inline-flex items-center gap-2

                  bg-brand-purple-100

                  px-5 py-3

                  rounded-full

                  mb-6
                "
              >
                <BookOpen
                  className="
                    text-brand-purple-500
                  "
                  size={20}
                />

                <span
                  className="
                    font-bold

                    text-brand-purple-500

                    uppercase

                    tracking-wide
                  "
                >
                  {product.category}
                </span>
              </div>

              {/* TITLE */}

              <h1
                className="
                  text-3xl
                  md:text-4xl

                  font-black

                  text-gray-800

                  leading-tight
                "
              >
                {product.title}
              </h1>

              {/* RATING */}

              {/* DESCRIPTION */}

              <p
                className="
                  text-gray-700

                  text-base
                  md:text-lg

                  leading-8

                  mt-6
                "
              >
                {
                  product.description
                }
              </p>

              {/* FEATURES */}

              <div
                className="
                  grid
                  sm:grid-cols-2

                  gap-5

                  mt-8
                "
              >
                <div
                  className="
                    bg-brand-purple-50

                    rounded-3xl

                    p-5

                    shadow-md
                  "
                >
                  <div className="text-4xl mb-3">
                    📚
                  </div>

                  <h3
                    className="
                      font-black

                      text-gray-800

                      text-xl
                    "
                  >
                    Interactive Learning
                  </h3>
                </div>

                <div
                  className="
                    bg-brand-gold-50

                    rounded-3xl

                    p-5

                    shadow-md
                  "
                >
                  <div className="text-4xl mb-3">
                    🌈
                  </div>

                  <h3
                    className="
                      font-black

                      text-gray-800

                      text-xl
                    "
                  >
                    Kids Friendly Design
                  </h3>
                </div>
              </div>

              {/* PRICE */}

              <div className="mt-8 md:mt-10">
                <span
                  className="
                    text-gray-500

                    uppercase

                    tracking-widest

                    font-bold
                  "
                >
                  Price
                </span>

                <h2
                  className="
                    text-4xl
                    md:text-5xl

                    font-black

                    text-brand-purple-500

                    mt-2
                  "
                >
                  ₹{product.price}
                </h2>
              </div>

              {/* BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10">
                <button
                  onClick={
                    handleAddToCart
                  }
                  className="
                    group
                    flex-1
                    bg-gradient-to-r
                    from-brand-purple-500
                    to-brand-gold-400
                    hover:from-brand-purple-600
                    hover:to-brand-gold-500
                    text-white
                    py-4
                    rounded-full
                    text-lg
                    font-black
                    shadow-2xl
                    hover:scale-105
                    transition duration-300
                    flex items-center justify-center gap-3
                  "
                >
                  <ShoppingCart
                    size={26}
                    className="group-hover:scale-110 transition duration-300"
                  />
                  Add To Cart 🚀
                </button>

                <button
                  onClick={handleToggleWishlist}
                  disabled={wishlistLoading}
                  className={`
                    group
                    w-full sm:w-16 h-16 sm:h-auto
                    flex items-center justify-center
                    rounded-full
                    text-lg
                    font-black
                    shadow-2xl
                    hover:scale-105
                    transition duration-300
                    disabled:opacity-70 disabled:cursor-not-allowed
                    ${inWishlist ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'bg-pink-100 hover:bg-pink-200 text-pink-600'}
                  `}
                >
                  <Heart
                    size={26}
                    fill={inWishlist ? 'currentColor' : 'none'}
                    className="group-hover:scale-110 transition duration-300"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================== */}
      {/* STICKY ADD TO CART */}
      {/* ====================================== */}

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
        className="
          fixed
          bottom-0
          left-0

          w-full

          bg-white/90

          backdrop-blur-md

          border-t-4 border-brand-purple-200

          shadow-2xl

          z-50
        "
      >
        <div
          className="
            max-w-7xl

            mx-auto

            px-4
            md:px-6

            py-3
            md:py-4

            flex flex-row

            justify-between

            items-center

            gap-3
            md:gap-5
          "
        >
          <div
            className="
              min-w-0

              text-left
            "
          >
            <h2
              className="
                hidden sm:block

                font-black

                text-lg
                md:text-xl

                text-gray-800

                truncate
              "
            >
              {product.title}
            </h2>

            <p
              className="
                text-brand-purple-500

                font-black

                text-2xl
                md:text-3xl
              "
            >
              ₹{product.price}
            </p>
          </div>

          {/* STICKY BUTTON */}

          <button
            onClick={
              handleAddToCart
            }
            className="
              shrink-0

              bg-gradient-to-r
              from-brand-purple-500
              to-brand-gold-400

              hover:from-brand-purple-600
              hover:to-brand-gold-500

              text-white

              px-5
              md:px-8

              py-3
              md:py-4

              rounded-full

              font-black

              text-base
              md:text-lg

              shadow-xl

              hover:scale-105

              transition duration-300

              flex items-center gap-2
              md:gap-3
            "
          >
            <ShoppingCart
              size={22}
            />

            Add To Cart
          </button>
        </div>
      </motion.div>

      {/* ====================================== */}
      {/* FOOTER */}
      {/* ====================================== */}

      <Footer />
    </>
  );
};

export default ProductDetails;
