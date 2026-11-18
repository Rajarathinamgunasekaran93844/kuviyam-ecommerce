import { Link } from "react-router-dom";

import {
  useContext,
} from "react";

import {
  ShoppingCart,
  Sparkles,
  Heart,
  BookOpen,
  Eye,
} from "lucide-react";

import {
  toast,
} from "react-toastify";

import { CartContext } from "../context/cartContextValue";

import {
  AuthContext,
} from "../context/authContextValue";

import { wishlistAPI } from "../utils/api";
import { toDisplayImageUrl } from "../utils/imageUrls";

const ProductCard = ({
  product,
  layout = "grid",
}) => {
  const isList = layout === "list";
  const { addToCart } =
    useContext(CartContext);

  const {
    isAuthenticated,
  } = useContext(AuthContext);

  /* ====================================== */
  /* HANDLE ADD TO CART */
  /* ====================================== */

  const handleAddToCart = async () => {
      /* LOGIN CHECK */

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
  /* HANDLE WISHLIST */
  /* ====================================== */

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error(
        "🔐 Login required for wishlist",
        {
          position: "top-right",
          autoClose: 2200,
          theme: "colored",
        }
      );
      return;
    }

    try {
      await wishlistAPI.addToWishlist(product.id);
      toast.success(
        `${product.title} added to wishlist ❤️`,
        {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
        }
      );
    } catch {
      toast.error(
        "Failed to add to wishlist",
        {
          position: "top-right",
          autoClose: 2200,
          theme: "colored",
        }
      );
    }
  };

  return (
    <div
      className={`group relative flex h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${isList ? "flex-col sm:flex-row" : "flex-col"}`}
    >
      {/* ====================================== */}
      {/* IMAGE SECTION */}
      {/* ====================================== */}

      <div
        className={`
          relative

          overflow-hidden

          rounded-t-2xl

          bg-[#f1ede3]
          ${isList ? "sm:w-64 sm:shrink-0 sm:rounded-l-2xl sm:rounded-tr-none" : ""}
        `}
      >
        {/* BADGES */}

        <div
          className="
            absolute
            top-5 left-5

            z-20

            flex flex-wrap

            gap-2
          "
        >
          {/* CATEGORY */}

          <span
            className="
              bg-brand-purple-50

              text-brand-purple-900

              px-3 py-1.5

              rounded-full

              text-xs md:text-sm

              font-semibold
            "
          >
            {product.category}
          </span>

          {/* COLLECTION */}

          <span
            className={`
              bg-white

              text-gray-800

              px-3 py-1.5

              rounded-full

              text-xs md:text-sm

              font-semibold

              flex items-center gap-2
              ${isList ? "hidden" : ""}
            `}
          >
            <Sparkles
              size={14}
            />

            Paachcharam
          </span>
        </div>

        {/* FAVORITE */}

        <button
          type="button"
          aria-label={`Add ${product.title} to wishlist`}
          onClick={
            handleWishlist
          }
          className="
            absolute
            top-5 right-5

            z-20

            w-12 h-12

            rounded-full

            bg-white

            backdrop-blur-md

            shadow-xl

            flex items-center justify-center

            hover:scale-110

            transition duration-300
          "
        >
          <Heart
            size={20}
            className="
              text-brand-purple-500

              group-hover:fill-brand-purple-500
            "
          />
        </button>

        {/* IMAGE */}

        <img
          src={toDisplayImageUrl(product?.images?.[0] || "/Paachcharam_book.png")}
          alt={`${product?.title || "Tamil learning book"} cover`}
          loading="lazy"
          decoding="async"
          className={`
            mx-auto
            h-[260px]
            sm:h-[300px]
            md:h-[340px]
            w-full
            max-w-[280px]
            group-hover:scale-[1.02]
            transition duration-300
            object-contain
            p-5
            ${isList ? "sm:h-full sm:min-h-[340px] sm:max-h-[420px] sm:w-full" : ""}
          `}
        />

        {/* OVERLAY */}

        <div
          className="
            absolute inset-0

            bg-gradient-to-t
            from-black/15
            via-transparent
            to-transparent
          "
        ></div>

        {/* QUICK VIEW */}

        <div
          className="
            absolute inset-0

            flex items-center justify-center

            opacity-0

            group-hover:opacity-100
            focus-within:opacity-100

            transition duration-500
          "
        >
          <Link
            to={`/product/${product.id}`}
            className="
                bg-white/90

                backdrop-blur-md

                px-6 py-4

                rounded-full

                shadow-2xl

                font-black

                text-brand-purple-500

                flex items-center gap-3

                hover:scale-105

                transition duration-300
              "
          >
              <Eye size={20} />

              Quick View
          </Link>
        </div>
      </div>

      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <div
        className={`
          relative z-10

          flex flex-col flex-1

          p-5 sm:p-6
          ${isList ? "sm:p-8" : ""}
        `}
      >
        {/* LABEL */}

        <div
          className="
            flex items-center

            gap-2

            text-brand-purple-500

            font-semibold

            text-sm

            uppercase

            tracking-[0.12em]

            mb-4
          "
        >
          <BookOpen
            size={16}
          />

          Tamil Learning Collection
        </div>

        {/* TITLE */}

        <h3
          className="
            text-xl
            md:text-2xl

            font-semibold

            text-gray-900

            leading-tight

            min-h-[60px]

            line-clamp-2
          "
        >
          {product.title}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            text-gray-600

            mt-3

            text-base

            leading-7

            flex-1

            line-clamp-4

            min-h-[70px]
          "
        >
          {
            product.description
          }
        </p>

        {/* ====================================== */}
        {/* PRICE SECTION */}
        {/* ====================================== */}

        <div
          className="
            mt-auto

            pt-8

            flex flex-col

            gap-6
          "
        >
          {/* PRICE */}

          <div
            className="
              flex items-end justify-between

              gap-4

              flex-wrap
            "
          >
            {/* LEFT */}

            <div>
              <span
                className="
                  text-gray-500

                  text-xs

                  uppercase

                  tracking-[0.12em]

                  font-black
                "
              >
                Price
              </span>

              <div
                className="
                  flex items-end gap-3

                  mt-2
                "
              >
                <h3
                  className="
                    text-4xl
                    md:text-5xl

                    font-semibold

                    text-brand-purple-500
                  "
                >
                  ₹{product.price}
                </h3>

              </div>
            </div>
          </div>

          {/* BUTTONS */}

          <div className={`flex flex-col gap-4 ${isList ? "sm:flex-row" : ""}`}>
            {/* VIEW DETAILS */}

            <Link
              to={`/product/${product.id}`}
              className={`group/button flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple-800 px-4 py-3.5 text-base font-semibold text-white transition hover:bg-brand-purple-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800 ${isList ? "sm:flex-1" : ""}`}
            >
                <Eye
                  size={22}
                />

                View Details

                <span
                  className="
                    group-hover/button:translate-x-1

                    transition duration-300
                  "
                >
                  →
                </span>
            </Link>

            {/* ADD TO CART */}

            <button
              type="button"
              onClick={
                handleAddToCart
              }
              className={`
                w-full

                bg-white

                border-2
                border-brand-purple-400

                text-brand-purple-600

                py-4

                rounded-2xl

                    font-semibold

                text-lg

                shadow-lg

                hover:bg-brand-purple-500
                hover:text-white

                transition duration-300

                flex items-center justify-center gap-3
                ${isList ? "sm:w-auto sm:min-w-0 sm:flex-1" : ""}
              `}
            >
              <ShoppingCart
                size={22}
              />

              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
