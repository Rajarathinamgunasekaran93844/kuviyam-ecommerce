import { Link } from "react-router-dom";

import {
  Star,
  ShoppingCart,
  Sparkles,
  Heart,
  BookOpen,
  Eye,
} from "lucide-react";

const ProductCard = ({
  product,
}) => {
  return (
    <div
      className="
        group
        relative

        overflow-hidden

        bg-white/95
        backdrop-blur-md

        rounded-[32px]

        border border-white/80

        shadow-[0_20px_60px_rgba(0,0,0,0.08)]

        hover:shadow-[0_30px_80px_rgba(0,0,0,0.14)]

        transition-all
        duration-500

        hover:-translate-y-3

        h-full

        flex flex-col
      "
    >
      {/* ====================================== */}
      {/* BACKGROUND GLOW */}
      {/* ====================================== */}

      <div
        className="
          absolute
          -top-28
          -right-28

          w-64 h-64

          bg-brand-purple-300

          rounded-full

          opacity-10

          blur-3xl

          group-hover:scale-125

          transition duration-700
        "
      ></div>

      <div
        className="
          absolute
          -bottom-28
          -left-28

          w-64 h-64

          bg-brand-gold-300

          rounded-full

          opacity-10

          blur-3xl

          group-hover:scale-125

          transition duration-700
        "
      ></div>

      {/* ====================================== */}
      {/* FLOATING EMOJIS */}
      {/* ====================================== */}

      <div
        className="
          absolute
          top-5 right-5

          text-3xl

          opacity-30

          animate-bounce

          z-20
        "
      >
        🌈
      </div>

      <div
        className="
          absolute
          bottom-10 left-6

          text-3xl

          opacity-20

          animate-pulse

          z-20
        "
      >
        ⭐
      </div>

      {/* ====================================== */}
      {/* IMAGE SECTION */}
      {/* ====================================== */}

      <div
        className="
          relative

          overflow-hidden

          rounded-t-[32px]

          bg-gradient-to-br
          from-brand-purple-100
          via-brand-gold-50
          to-brand-teal-100
        "
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
              bg-brand-purple-500

              text-white

              px-4 py-2

              rounded-2xl

              text-xs md:text-sm

              font-black

              shadow-lg
            "
          >
            {product.category}
          </span>

          {/* COLLECTION */}

          <span
            className="
              bg-brand-gold-300

              text-gray-800

              px-4 py-2

              rounded-2xl

              text-xs md:text-sm

              font-black

              shadow-lg

              flex items-center gap-2
            "
          >
            <Sparkles
              size={14}
            />

            Paachcharam
          </span>
        </div>

        {/* FAVORITE */}

        <button
          className="
            absolute
            top-5 right-5

            z-20

            w-12 h-12

            rounded-full

            bg-white/90

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
          src={
            product?.images?.[0]
          }
          alt={product.title}
          className="
            h-[260px]
            sm:h-[300px]
            md:h-[340px]

            w-full

            object-cover

            group-hover:scale-105

            transition duration-700
          "
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

            transition duration-500
          "
        >
          <Link
            to={`/product/${product.id}`}
          >
            <button
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
            </button>
          </Link>
        </div>
      </div>

      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <div
        className="
          relative z-10

          flex flex-col flex-1

          p-6 md:p-7
        "
      >
        {/* LABEL */}

        <div
          className="
            flex items-center

            gap-2

            text-brand-purple-500

            font-black

            text-sm

            uppercase

            tracking-[2px]

            mb-4
          "
        >
          <BookOpen
            size={16}
          />

          Tamil Learning Collection
        </div>

        {/* RATING */}

        <div
          className="
            flex items-center flex-wrap

            gap-1

            mb-5
          "
        >
          {[...Array(5)].map(
            (_, index) => (
              <Star
                key={index}
                size={18}
                className="
                  text-brand-gold-400
                  fill-brand-gold-400
                "
              />
            )
          )}

          <span
            className="
              text-gray-500

              text-sm

              ml-2

              font-semibold
            "
          >
            Loved by Kids
          </span>
        </div>

        {/* TITLE */}

        <h3
          className="
            text-lg
            md:text-[30px]

            font-black

            text-gray-900

            leading-tight

            min-h-[80px]

            line-clamp-2
          "
        >
          {product.title}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            text-gray-600

            mt-5

            text-base md:text-lg

            leading-8

            flex-1

            line-clamp-4

            min-h-[80px]
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

                  tracking-[4px]

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

                    font-black

                    text-brand-purple-500
                  "
                >
                  ₹{product.price}
                </h3>

                <span
                  className="
                    text-gray-400

                    line-through

                    text-lg

                    font-bold

                    mb-1
                  "
                >
                  ₹
                  {Math.round(
                    product.price *
                      1.3
                  )}
                </span>
              </div>
            </div>

            {/* TAG */}

            <div
              className="
                bg-brand-purple-100

                text-brand-purple-600

                px-5 py-3

                rounded-2xl

                font-black

                text-sm

                shadow-md

                whitespace-nowrap
              "
            >
              🎉 Best Seller
            </div>
          </div>

          {/* BUTTON */}

          <Link
            to={`/product/${product.id}`}
            className="w-full"
          >
            <button
              className="
                group/button

                w-full

                bg-gradient-to-r
                from-brand-purple-500
                via-brand-red-500
                to-brand-gold-400

                hover:from-brand-purple-600
                hover:to-brand-gold-500

                text-white

                py-5

                rounded-2xl

                font-black

                text-lg

                shadow-2xl

                transition duration-300

                hover:scale-[1.02]

                flex items-center justify-center gap-3
              "
            >
              <ShoppingCart
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
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;