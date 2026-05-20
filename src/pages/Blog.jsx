import {
  motion,
} from "framer-motion";

import {
  CalendarDays,
  ArrowRight,
  User,
} from "lucide-react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import WhatsAppButton from "../components/WhatsAppButton";

/* BLOG IMAGES */

import blog1 from "../assets/blog/blog1.png";
import blog2 from "../assets/blog/blog2.png";
import blog3 from "../assets/blog/blog3.png";

const Blog = () => {
  /* ====================================== */
  /* BLOG DATA */
  /* ====================================== */

  const blogs = [
    {
      id: 1,

      title:
        "How Paachcharam Makes Tamil Learning Fun For Children",

      description:
        "Interactive Tamil books help children learn language skills through colorful storytelling, activities and playful reading experiences.",

      image: blog1,

      author:
        "Kuviyam Publications",

      date:
        "August 18, 2026",

      category:
        "Tamil Learning",
    },

    {
      id: 2,

      title:
        "Why Story Books Are Important For Early Childhood Growth",

      description:
        "Reading books during childhood improves creativity, communication skills and emotional intelligence in young learners.",

      image: blog2,

      author:
        "Inithinithu Team",

      date:
        "August 12, 2026",

      category:
        "Parenting",
    },

    {
      id: 3,

      title:
        "Arivuamudhu Books Create Joyful Reading Habits",

      description:
        "Children naturally develop reading interest when books are interactive, visual and emotionally engaging.",

      image: blog3,

      author:
        "Arivuamudhu",

      date:
        "August 05, 2026",

      category:
        "Kids Stories",
    },
  ];

  return (
    <div
      className="
        min-h-screen

        overflow-hidden

        bg-gradient-to-br
        from-brand-purple-50
        via-brand-gold-50
        to-brand-teal-50

        relative
      "
    >
      {/* ====================================== */}
      {/* NAVBAR */}
      {/* ====================================== */}

      <Navbar />

      {/* ====================================== */}
      {/* FLOATING ELEMENTS */}
      {/* ====================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">
          📚
        </div>

        <div className="absolute top-32 right-10 text-5xl opacity-20 animate-pulse">
          🌈
        </div>

        <div className="absolute bottom-20 left-20 text-5xl opacity-20 animate-bounce">
          ✨
        </div>

        <div className="absolute bottom-24 right-24 text-6xl opacity-20 animate-pulse">
          🧸
        </div>
      </div>

      {/* ====================================== */}
      {/* HERO SECTION */}
      {/* ====================================== */}

      <section
        className="
          relative z-10

          pt-24
          pb-16

          px-6
        "
      >
        <div className="max-w-7xl mx-auto">
          {/* HERO */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="text-center"
          >
            {/* BADGE */}

            <div
              className="
                inline-flex items-center gap-3

                bg-white/80

                backdrop-blur-md

                px-6 py-3

                rounded-full

                shadow-xl

                border border-white
              "
            >
              <span className="text-2xl">
                ✍️
              </span>

              <span
                className="
                  font-black

                  text-brand-purple-500

                  text-lg
                "
              >
                Kuviyam Blog
              </span>
            </div>

            {/* TITLE */}

            <h1
              className="
                mt-8

                text-5xl
                md:text-7xl

                font-black

                text-gray-900

                leading-tight
              "
            >
              Things
              <span
                className="
                  block

                  bg-gradient-to-r
                  from-brand-purple-500
                  via-pink-500
                  to-brand-teal-500

                  bg-clip-text

                  text-transparent
                "
              >
                To Read
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6

                max-w-3xl

                mx-auto

                text-lg
                md:text-xl

                text-gray-600

                leading-9
              "
            >
              Tamil learning stories,
              parenting ideas and
              joyful reading moments
              from Paachcharam,
              Inithinithu &
              Arivuamudhu ✨
            </p>
          </motion.div>

          {/* ====================================== */}
          {/* BLOG CARDS */}
          {/* ====================================== */}

          <div className="mt-24 space-y-16">
            {blogs.map(
              (blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className={`
                    grid
                    grid-cols-1
                    lg:grid-cols-2

                    gap-12

                    items-center

                    ${
                      index % 2 !== 0
                        ? "lg:[&>*:first-child]:order-2"
                        : ""
                    }
                  `}
                >
                  {/* IMAGE */}

                  <div className="relative group">
                    <div
                      className="
                        absolute
                        -inset-4

                        bg-gradient-to-r
                        from-brand-purple-300
                        to-brand-teal-300

                        rounded-[40px]

                        blur-2xl

                        opacity-20

                        group-hover:opacity-40

                        transition duration-500
                      "
                    ></div>

                    <div
                      className="
                        relative

                        overflow-hidden

                        rounded-[40px]

                        bg-white

                        shadow-2xl

                        border border-white
                      "
                    >
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="
                          w-full

                          h-[500px]

                          object-cover

                          group-hover:scale-105

                          transition duration-700
                        "
                      />
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div>
                    {/* CATEGORY */}

                    <div
                      className="
                        inline-flex items-center

                        bg-gradient-to-r
                        from-brand-gold-400
                        to-orange-400

                        text-white

                        px-5 py-2

                        rounded-full

                        text-sm

                        font-black

                        shadow-lg
                      "
                    >
                      {
                        blog.category
                      }
                    </div>

                    {/* TITLE */}

                    <h2
                      className="
                        mt-7

                        text-4xl
                        md:text-5xl

                        font-black

                        text-gray-900

                        leading-tight
                      "
                    >
                      {blog.title}
                    </h2>

                    {/* AUTHOR */}

                    <div
                      className="
                        flex flex-wrap items-center gap-6

                        mt-7

                        text-gray-600
                      "
                    >
                      {/* AUTHOR */}

                      <div className="flex items-center gap-2">
                        <User
                          size={20}
                        />

                        <span className="font-bold">
                          {
                            blog.author
                          }
                        </span>
                      </div>

                      {/* DATE */}

                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={20}
                        />

                        <span className="font-bold">
                          {blog.date}
                        </span>
                      </div>
                    </div>

                    {/* DESCRIPTION */}

                    <p
                      className="
                        mt-8

                        text-xl

                        text-gray-600

                        leading-10
                      "
                    >
                      {
                        blog.description
                      }
                    </p>

                    {/* BUTTON */}

                    <button
                      className="
                        mt-10

                        inline-flex items-center gap-3

                        px-8 py-5

                        rounded-full

                        bg-gradient-to-r
                        from-brand-purple-500
                        to-brand-teal-500

                        hover:from-brand-purple-600
                        hover:to-brand-teal-600

                        text-white

                        text-lg

                        font-black

                        shadow-2xl

                        hover:scale-105

                        transition duration-300
                      "
                    >
                      Read More

                      <ArrowRight
                        size={22}
                      />
                    </button>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ====================================== */}
      {/* FOOTER */}
      {/* ====================================== */}

      <Footer />

      {/* ====================================== */}
      {/* WHATSAPP */}
      {/* ====================================== */}

      <WhatsAppButton />
    </div>
  );
};

export default Blog;