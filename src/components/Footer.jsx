import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import {
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import {
  Sparkles,
  BookOpen,
  Star,
  Heart,
  ArrowRight,
  Rocket,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

const Footer = () => {
  const navigate =
    useNavigate();

  /* ====================================== */
  /* SOCIAL LINKS */
  /* ====================================== */

  const socialLinks = [
    {
      icon: (
        <FaInstagram size={24} />
      ),

      link:
        "https://www.instagram.com/",

      hover:
        "hover:bg-pink-500",
    },

    {
      icon: (
        <FaFacebookF size={22} />
      ),

      link:
        "https://www.facebook.com/",

      hover:
        "hover:bg-blue-600",
    },

    {
      icon: (
        <FaYoutube size={24} />
      ),

      link:
        "https://www.youtube.com/",

      hover:
        "hover:bg-red-500",
    },

    {
      icon: (
        <FaWhatsapp size={24} />
      ),

      link:
        "https://wa.me/919600021480",

      hover:
        "hover:bg-green-500",
    },

    {
      icon: (
        <FaLinkedinIn size={22} />
      ),

      link:
        "https://www.linkedin.com/",

      hover:
        "hover:bg-sky-600",
    },

    {
      icon: (
        <FaXTwitter size={22} />
      ),

      link:
        "https://x.com/",

      hover:
        "hover:bg-black",
    },
  ];

  /* ====================================== */
  /* QUICK LINKS */
  /* ====================================== */

  const quickLinks = [
    {
      name: "Home",

      icon: "🏠",

      path: "/",
    },

    {
      name: "Shop",

      icon: "🛍️",

      path: "/shop",
    },

    {
      name: "Gallery",

      icon: "🖼️",

      path: "/gallery",
    },

    {
      name: "Blog",

      icon: "✍️",

      path: "/blog",
    },

    {
      name: "About",

      icon: "📘",

      path: "/about",
    },

    {
      name: "Contact",

      icon: "📞",

      path: "/contact",
    },
  ];

  return (
    <footer className="relative overflow-hidden mt-16 md:mt-20">
      {/* ====================================== */}
      {/* BACKGROUND */}
      {/* ====================================== */}

      <div
        className="
          absolute inset-0

          bg-gradient-to-br
          from-brand-purple-100
          via-brand-gold-50
          to-brand-teal-100
        "
      ></div>

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      {/* ====================================== */}
      {/* FLOATING ELEMENTS */}
      {/* ====================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-10 left-10 text-5xl opacity-20 animate-bounce">
          ☁️
        </div>

        <div className="absolute top-16 right-16 text-4xl opacity-20 animate-pulse">
          🌈
        </div>

        <div className="absolute bottom-12 left-12 text-5xl opacity-20 animate-bounce">
          🧸
        </div>

        <div className="absolute bottom-12 right-12 text-4xl opacity-20 animate-pulse">
          🚀
        </div>

        <div className="absolute top-1/2 left-1/3 text-4xl opacity-10 animate-spin">
          ⭐
        </div>
      </div>

      {/* ====================================== */}
      {/* MAIN CONTENT */}
      {/* ====================================== */}

      <div className="container-custom relative z-20 py-14 md:py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-12">
          {/* ====================================== */}
          {/* BRAND */}
          {/* ====================================== */}

          <div>
            {/* BADGE */}

            <div
              className="
                inline-flex items-center gap-3

                bg-white/70

                backdrop-blur-xl

                px-5 py-3

                rounded-2xl

                border border-brand-purple-200

                shadow-lg

                mb-8
              "
            >
              <Sparkles
                className="text-brand-purple-500"
                size={20}
              />

              <span
                className="
                  font-bold

                  text-brand-purple-600

                  text-sm
                "
              >
                Kids Learning World
              </span>
            </div>

            {/* LOGO */}

            <h2 className="leading-tight">
              <span
                className="
                  block

                  text-4xl md:text-5xl

                  font-black

                  text-brand-purple-500
                "
              >
                Paachcharam
              </span>

              {/* <span
                className="
                  block

                  text-4xl md:text-5xl

                  font-black

                  text-brand-teal-500
                "
              >
                Publications
              </span> */}
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                text-slate-700

                mt-6

                text-base md:text-lg

                leading-8

                max-w-md
              "
            >
              Inspiring little learners
              to discover Tamil through
              colorful books, joyful
              rhymes, fun stories and
              exciting educational
              adventures.
            </p>

            {/* FEATURES */}

            <div className="flex flex-wrap gap-4 mt-8">
              <div
                className="
                  flex items-center gap-2

                  bg-white/70

                  px-4 py-3

                  rounded-2xl

                  border border-brand-purple-200

                  shadow-md
                "
              >
                <BookOpen
                  className="text-brand-teal-500"
                  size={18}
                />

                <span
                  className="
                    font-bold

                    text-slate-800

                    text-sm
                  "
                >
                  Story Books
                </span>
              </div>

              <div
                className="
                  flex items-center gap-2

                  bg-white/70

                  px-4 py-3

                  rounded-2xl

                  border border-brand-purple-200

                  shadow-md
                "
              >
                <Star
                  className="text-brand-gold-400 fill-brand-gold-400"
                  size={18}
                />

                <span
                  className="
                    font-bold

                    text-slate-800

                    text-sm
                  "
                >
                  Kids Friendly
                </span>
              </div>
            </div>
          </div>

          {/* ====================================== */}
          {/* QUICK LINKS */}
          {/* ====================================== */}

          <div>
            <h3
              className="
                text-2xl

                font-black

                text-slate-900

                mb-6
              "
            >
              Quick Links
            </h3>

            <ul className="space-y-5">
              {quickLinks.map(
                (
                  item,
                  index
                ) => (
                  <li key={index}>
                    <Link
                      to={
                        item.path
                      }
                      className="
                        flex items-center justify-between

                        text-slate-700

                        hover:text-brand-purple-500

                        text-lg

                        font-bold

                        transition duration-300

                        group
                      "
                    >
                      <span className="flex items-center gap-3">
                        <span>
                          {
                            item.icon
                          }
                        </span>

                        {
                          item.name
                        }
                      </span>

                      <ArrowRight
                        size={18}
                        className="
                          opacity-0

                          group-hover:opacity-100

                          group-hover:translate-x-1

                          transition duration-300
                        "
                      />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* ====================================== */}
          {/* CONTACT */}
          {/* ====================================== */}

          <div>
            <h3
              className="
                text-2xl

                font-black

                text-slate-900

                mb-6
              "
            >
              Contact Us
            </h3>

            <div className="space-y-5">
              {/* EMAIL */}

              <a
                href="mailto:support@kuviyampublications.com"
                className="
                  block

                  bg-white/70

                  backdrop-blur-xl

                  rounded-3xl

                  p-5

                  border border-brand-purple-200

                  shadow-lg

                  hover:scale-[1.02]

                  transition duration-300
                "
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">
                    📧
                  </div>

                  <div>
                    <h4
                      className="
                        text-slate-900

                        text-lg

                        font-black
                      "
                    >
                      Email
                    </h4>

                    <p
                      className="
                        text-slate-600

                        text-base

                        mt-1

                        break-words
                      "
                    >
                      support@kuviyampublications.com
                    </p>
                  </div>
                </div>
              </a>

              {/* PHONE */}

              <a
                href="tel:+919600021480"
                className="
                  block

                  bg-white/70

                  backdrop-blur-xl

                  rounded-3xl

                  p-5

                  border border-brand-purple-200

                  shadow-lg

                  hover:scale-[1.02]

                  transition duration-300
                "
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">
                    📱
                  </div>

                  <div>
                    <h4
                      className="
                        text-slate-900

                        text-lg

                        font-black
                      "
                    >
                      Phone
                    </h4>

                    <p
                      className="
                        text-slate-600

                        text-base

                        mt-1
                      "
                    >
                      +91 9600021480
                    </p>
                  </div>
                </div>
              </a>

              {/* LOCATION */}

              <div
                className="
                  bg-white/70

                  backdrop-blur-xl

                  rounded-3xl

                  p-5

                  border border-brand-purple-200

                  shadow-lg
                "
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">
                    📍
                  </div>

                  <div>
                    <h4
                      className="
                        text-slate-900

                        text-lg

                        font-black
                      "
                    >
                      Location
                    </h4>

                    <p
                      className="
                        text-slate-600

                        text-base

                        mt-1
                      "
                    >
                      Tiruchirappalli, Tamil Nadu,
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================== */}
          {/* SOCIAL */}
          {/* ====================================== */}

          <div>
            <h3
              className="
                text-2xl

                font-black

                text-slate-900

                mb-6
              "
            >
              Follow Us
            </h3>

            {/* SOCIAL ICONS */}

            <div className="grid grid-cols-3 gap-4">
              {socialLinks.map(
                (
                  item,
                  index
                ) => (
                  <a
                    key={index}
                    href={
                      item.link
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      w-14 h-14

                      rounded-2xl

                      bg-white/70

                      border border-brand-purple-200

                      flex items-center justify-center

                      text-slate-700

                      hover:text-white

                      shadow-lg

                      hover:scale-105

                      transition duration-300

                      ${item.hover}
                    `}
                  >
                    {item.icon}
                  </a>
                )
              )}
            </div>

            {/* CTA */}

            <div
              className="
                mt-8

                bg-white/70

                backdrop-blur-xl

                rounded-3xl

                p-6

                border border-brand-purple-200

                shadow-lg
              "
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart
                  size={20}
                  className="text-brand-purple-500 fill-brand-purple-500"
                />

                <span
                  className="
                    font-black

                    text-slate-900

                    text-xl
                  "
                >
                  Happy Learning
                </span>
              </div>

              <p
                className="
                  text-slate-700

                  text-base

                  leading-8
                "
              >
                Join our colorful Tamil
                learning journey and
                make education joyful
                for every child.
              </p>

              {/* BUTTON */}

              <button
                onClick={() =>
                  navigate(
                    "/shop"
                  )
                }
                className="
                  mt-6

                  bg-gradient-to-r
                  from-brand-purple-500
                  to-brand-gold-400

                  hover:from-brand-purple-600
                  hover:to-brand-gold-500

                  text-white

                  px-5 py-3

                  rounded-2xl

                  font-bold

                  text-base

                  shadow-xl

                  flex items-center gap-2

                  hover:scale-105

                  transition duration-300
                "
              >
                Start Learning

                <Rocket
                  size={18}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================== */}
      {/* COPYRIGHT */}
      {/* ====================================== */}

      <div
        className="
          relative z-20

          border-t border-brand-purple-200

          bg-white/60

          backdrop-blur-xl
        "
      >
        <div className="container-custom py-6 text-center px-4">
          <p
            className="
              text-sm md:text-lg

              font-bold

              text-slate-700
            "
          >
            © 2026 🌈 Kuviyam
            Publications.
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;