import Reveal from "./Reveal";

import {
  BookOpen,
  Music,
  Puzzle,
  Languages,
  Sparkles,
  ArrowRight,
  Heart,
  Star,
} from "lucide-react";

const Categories = () => {
  const categories = [
    {
      title: "Inithinithu Rhymes",

      subtitle: "Paachcharam Collection",

      emoji: "🎵",

      color:
        "from-brand-purple-400 via-brand-red-400 to-brand-purple-500",

      shadow:
        "shadow-brand-purple-200",

      bg:
        "bg-brand-purple-50",

      text:
        "Fun Tamil rhymes filled with music, colorful illustrations, joyful storytelling, and playful learning experiences for happy little learners.",

      icon:
        <Music
          className="text-white"
          size={38}
        />,

      badge:
        "Popular",
    },

    {
      title: "Arivuamudhu Stories",

      subtitle: "Paachcharam Collection",

      emoji: "📚",

      color:
        "from-brand-gold-400 via-brand-gold-300 to-brand-gold-400",

      shadow:
        "shadow-brand-gold-200",

      bg:
        "bg-brand-gold-50",

      text:
        "Beautiful Tamil learning stories with engaging characters, creative adventures, educational values, and interactive reading experiences.",

      icon:
        <BookOpen
          className="text-white"
          size={38}
        />,

      badge:
        "Kids Favorite",
    },

    {
      title: "Activity Learning",

      subtitle: "Creative Fun Zone",

      emoji: "🧩",

      color:
        "from-brand-teal-400 via-brand-teal-400 to-brand-teal-500",

      shadow:
        "shadow-brand-teal-200",

      bg:
        "bg-brand-teal-50",

      text:
        "Creative puzzles, coloring games, activities, and engaging learning tasks specially designed to improve kids creativity and thinking skills.",

      icon:
        <Puzzle
          className="text-white"
          size={38}
        />,

      badge:
        "Creative Fun",
    },

    {
      title: "Tamil Learning",

      subtitle: "Easy Kids Education",

      emoji: "🌈",

      color:
        "from-brand-red-400 via-brand-red-300 to-brand-red-500",

      shadow:
        "shadow-brand-red-200",

      bg:
        "bg-brand-red-50",

      text:
        "Interactive Tamil learning books specially crafted for children with easy lessons, colorful visuals, simple words, and joyful education.",

      icon:
        <Languages
          className="text-white"
          size={38}
        />,

      badge:
        "Best Learning",
    },
  ];

  return (
    <section
      className="
        relative

        py-20 md:py-24

        overflow-hidden

        bg-gradient-to-br
        from-brand-purple-100
        via-brand-gold-50
        to-brand-teal-100
      "
    >
      {/* SOFT OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20"></div>

      {/* FLOATING ELEMENTS */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-5xl opacity-20 animate-bounce">
          ☁️
        </div>

        <div className="absolute top-20 right-16 text-5xl opacity-20 animate-pulse">
          🌈
        </div>

        <div className="absolute bottom-10 left-16 text-5xl opacity-20 animate-bounce">
          🧸
        </div>

        <div className="absolute bottom-12 right-10 text-5xl opacity-20 animate-pulse">
          🚀
        </div>

        <div className="absolute top-1/2 left-1/3 text-4xl opacity-20 animate-spin">
          ⭐
        </div>

        <div className="absolute top-1/3 right-1/4 text-4xl opacity-10 animate-bounce">
          🎈
        </div>
      </div>

      {/* MAIN */}

      <div className="container-custom relative z-10">
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

              px-8 py-4

              rounded-full

              border-2 border-brand-purple-300

              shadow-xl

              mb-10
            "
          >
            <Sparkles
              className="text-brand-purple-500"
              size={24}
            />

            <span className="text-brand-purple-500 font-black text-lg tracking-wide">
              Paachcharam Collections
            </span>
          </div>

          {/* TITLE */}

          <h2 className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight">
            <span className="text-gray-900">
              Fun Tamil
            </span>

            <span className="block text-brand-purple-500 mt-3">
              Learning Categories
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-8

              text-lg md:text-xl

              text-gray-700

              leading-8 md:leading-9

              max-w-5xl mx-auto
            "
          >
            Discover joyful Tamil learning experiences
            through Paachcharam collections filled with
            rhymes, stories, puzzles, activities, and
            colorful educational adventures specially
            designed for children.
          </p>
        </div>

        {/* GRID */}

        <div
          className="
            grid

            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4

            gap-8 xl:gap-10
          "
        >
          {categories.map((item, index) => (
            <Reveal key={index}>
              <div
                className={`
                  group
                  relative

                  overflow-hidden

                  rounded-[32px]

                  bg-white/90
                  backdrop-blur-md

                  border-4 border-white

                  shadow-2xl
                  ${item.shadow}

                  hover:-translate-y-4
                  hover:scale-[1.02]

                  transition-all duration-500

                  h-full

                  flex flex-col

                  p-7 md:p-8
                `}
              >
                {/* GLOW */}

                <div
                  className={`
                    absolute
                    -top-16
                    -right-16

                    w-52
                    h-52

                    rounded-full

                    bg-gradient-to-br
                    ${item.color}

                    opacity-10

                    blur-2xl

                    group-hover:scale-125

                    transition duration-700
                  `}
                ></div>

                {/* EMOJI */}

                <div className="absolute top-6 right-6 text-4xl opacity-30">
                  {item.emoji}
                </div>

                {/* BADGE */}

                <div
                  className={`
                    inline-flex
                    items-center
                    gap-2

                    ${item.bg}

                    px-5
                    py-2

                    rounded-full

                    text-sm
                    font-black

                    text-gray-700

                    shadow-md

                    mb-8

                    self-start
                  `}
                >
                  <Heart
                    size={16}
                    className="text-brand-purple-500"
                  />

                  {item.badge}
                </div>

                {/* ICON */}

                <div
                  className={`
                    relative

                    w-20 h-20
                    md:w-24 md:h-24

                    rounded-[24px]

                    bg-gradient-to-br
                    ${item.color}

                    flex
                    items-center
                    justify-center

                    shadow-2xl

                    mx-auto

                    group-hover:rotate-6
                    group-hover:scale-110

                    transition duration-300
                  `}
                >
                  {/* STAR */}

                  <div
                    className="
                      absolute

                      -top-3 -right-3

                      w-10 h-10

                      rounded-full

                      bg-white

                      shadow-lg

                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Star
                      size={18}
                      className="text-brand-gold-400 fill-brand-gold-400"
                    />
                  </div>

                  {item.icon}
                </div>

                {/* SUBTITLE */}

                <p
                  className="
                    text-center

                    text-sm

                    font-bold

                    uppercase

                    tracking-[2px]

                    text-brand-purple-500

                    mt-7
                  "
                >
                  {item.subtitle}
                </p>

                {/* TITLE */}

                <h3
                  className="
                    text-2xl md:text-3xl

                    font-black

                    text-center

                    text-gray-900

                    mt-3

                    leading-tight

                    min-h-[72px]

                    flex
                    items-center
                    justify-center
                  "
                >
                  {item.title}
                </h3>

                {/* DESCRIPTION */}

                <p
                  className="
                    text-gray-600

                    text-center

                    leading-8

                    text-base md:text-lg

                    mt-5

                    flex-1

                    min-h-[150px]
                  "
                >
                  {item.text}
                </p>

                {/* BUTTON */}

                <div className="flex justify-center mt-8">
                  <button
                    className={`
                      bg-gradient-to-r
                      ${item.color}

                      text-white

                      px-7 py-4

                      rounded-full

                      font-black
                      text-base md:text-lg

                      shadow-xl

                      flex
                      items-center
                      gap-3

                      hover:scale-105

                      transition duration-300
                    `}
                  >
                    Explore Collection

                    <ArrowRight size={22} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;