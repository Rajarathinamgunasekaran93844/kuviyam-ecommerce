const ProductSkeleton = () => {
  return (
    <div
      className="
        group
        relative

        overflow-hidden

        bg-white/95
        backdrop-blur-md

        rounded-[30px]

        border-2 border-white

        shadow-2xl

        p-5 md:p-6

        animate-pulse

        h-full

        flex flex-col
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        className="
          absolute
          -top-24
          -right-24

          w-56 h-56

          bg-brand-purple-200

          rounded-full

          opacity-20

          blur-3xl
        "
      ></div>

      <div
        className="
          absolute
          -bottom-24
          -left-24

          w-56 h-56

          bg-brand-gold-200

          rounded-full

          opacity-20

          blur-3xl
        "
      ></div>

      {/* FLOATING EMOJIS */}

      <div
        className="
          absolute
          top-5 right-5

          text-3xl

          opacity-30
        "
      >
        🌈
      </div>

      <div
        className="
          absolute
          bottom-6 left-5

          text-3xl

          opacity-30
        "
      >
        ⭐
      </div>

      {/* IMAGE SECTION */}

      <div
        className="
          relative

          overflow-hidden

          rounded-[26px]

          bg-gradient-to-br
          from-brand-purple-100
          via-brand-gold-50
          to-brand-teal-100

          h-[240px]
          sm:h-[280px]
          md:h-[320px]
        "
      >
        {/* OVERLAY */}

        <div className="absolute inset-0 bg-white/30"></div>

        {/* BADGES */}

        <div
          className="
            absolute
            top-5 left-5

            flex flex-wrap

            gap-2

            z-20
          "
        >
          {/* CATEGORY */}

          <div
            className="
              h-10
              w-28

              rounded-2xl

              bg-brand-purple-300
            "
          ></div>

          {/* COLLECTION */}

          <div
            className="
              h-10
              w-32

              rounded-2xl

              bg-brand-gold-300
            "
          ></div>
        </div>

        {/* FAVORITE */}

        <div
          className="
            absolute
            top-5 right-5

            w-12 h-12

            rounded-full

            bg-white/70

            shadow-lg
          "
        ></div>

        {/* CENTER BOOK */}

        <div
          className="
            absolute inset-0

            flex items-center justify-center
          "
        >
          <div className="text-6xl opacity-30">
            📚
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
          relative

          z-10

          flex flex-col flex-1

          mt-6
        "
      >
        {/* TOP LABEL */}

        <div
          className="
            h-4

            w-44

            rounded-full

            bg-brand-purple-200

            mb-5
          "
        ></div>

        {/* RATING */}

        <div
          className="
            flex items-center

            gap-2

            mb-5
          "
        >
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="
                w-5 h-5

                rounded-full

                bg-brand-gold-300
              "
            ></div>
          ))}

          <div
            className="
              h-4

              w-28

              rounded-full

              bg-gray-200

              ml-2
            "
          ></div>
        </div>

        {/* TITLE */}

        <div
          className="
            h-8

            bg-brand-purple-200

            rounded-full

            w-4/5

            mb-4
          "
        ></div>

        <div
          className="
            h-8

            bg-brand-purple-100

            rounded-full

            w-3/5

            mb-6
          "
        ></div>

        {/* DESCRIPTION */}

        <div
          className="
            space-y-4

            flex-1
          "
        >
          <div className="h-4 bg-gray-200 rounded-full w-full"></div>

          <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>

          <div className="h-4 bg-gray-200 rounded-full w-4/6"></div>

          <div className="h-4 bg-gray-200 rounded-full w-3/6"></div>
        </div>

        {/* PRICE + CTA */}

        <div
          className="
            mt-8

            flex flex-col

            gap-6
          "
        >
          {/* PRICE */}

          <div
            className="
              flex items-end justify-between

              flex-wrap

              gap-4
            "
          >
            {/* PRICE LEFT */}

            <div>
              <div
                className="
                  h-3

                  w-16

                  rounded-full

                  bg-gray-200
                "
              ></div>

              <div
                className="
                  h-12

                  w-28

                  rounded-full

                  bg-brand-purple-300

                  mt-3
                "
              ></div>
            </div>

            {/* BEST SELLER */}

            <div
              className="
                h-10

                w-32

                rounded-2xl

                bg-brand-purple-200
              "
            ></div>
          </div>

          {/* BUTTON */}

          <div
            className="
              h-16

              rounded-2xl

              bg-gradient-to-r
              from-brand-purple-300
              via-brand-red-300
              to-brand-gold-300

              shadow-lg
            "
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;