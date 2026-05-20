import { motion } from "framer-motion";

import {
  Sparkles,
  Star,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import inithinithu from "../assets/inithuinithu_book.jpeg";


const Hero = () => {

  return (

    <section className="relative overflow-hidden bg-gradient-to-br from-brand-purple-100 via-brand-gold-50 to-brand-teal-100 min-h-[88vh] flex items-center">

      {/* FLOATING ELEMENTS */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-10 left-10 text-3xl opacity-30 animate-pulse">
          ☁️
        </div>

        <div className="absolute top-24 right-10 text-4xl opacity-40 animate-bounce">
          🌈
        </div>

        <div className="absolute bottom-10 left-10 text-4xl opacity-30 animate-bounce">
          🧸
        </div>

        <div className="absolute bottom-10 right-16 text-4xl opacity-30 animate-pulse">
          🚀
        </div>

        <div className="absolute top-1/2 left-1/3 text-3xl opacity-20 animate-spin">
          ⭐
        </div>

      </div>

      {/* CONTAINER */}

      <div className="container-custom relative z-10 py-10">

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* LEFT CONTENT */}

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              duration: 0.8,
            }}

            className="text-center lg:text-left"
          >

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 bg-white/90 px-5 py-3 rounded-full border-2 border-brand-purple-300 shadow-lg mb-8">

              <Sparkles
                size={20}
                className="text-brand-purple-500"
              />

              <span className="font-black text-brand-purple-500 text-sm md:text-base">

                Fun Tamil Learning For Kids

              </span>

            </div>

            {/* HEADING */}

            <h1 className="text-3xl md:text-4xl xl:text-5xl font-black leading-tight">

              <span className="text-gray-800">

                Learn Tamil

              </span>

              <span className="block text-brand-purple-500 mt-2">

                Through Fun

              </span>

              <span className="block text-brand-gold-500 mt-2">

                Stories & Rhymes 🌈

              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="mt-6 md:mt-8 text-base md:text-lg text-gray-700 leading-8 max-w-2xl mx-auto lg:mx-0">

              Discover colorful Tamil learning books,
              interactive rhymes, playful stories,
              and joyful educational experiences
              specially crafted for curious little minds.

            </p>

            {/* FEATURES */}

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">

              <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-md">

                <BookOpen
                  className="text-brand-teal-500"
                  size={22}
                />

                <span className="font-bold text-gray-700">

                  Interactive Books

                </span>

              </div>

              <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-md">

                <Star
                  className="text-brand-gold-500"
                  size={22}
                />

                <span className="font-bold text-gray-700">

                  Kids Friendly

                </span>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex flex-wrap justify-center lg:justify-start gap-5 mt-8">

              <Link to="/shop">

                <button className="group bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 hover:from-brand-purple-600 hover:to-brand-gold-500 text-white px-8 py-4 rounded-full text-lg font-black shadow-2xl hover:scale-105 transition duration-300 flex items-center gap-3">

                  📚 Shop Now

                  <ArrowRight
                    size={22}
                    className="group-hover:translate-x-1 transition"
                  />

                </button>

              </Link>

              <Link to="/about">

                <button className="bg-white border-4 border-brand-gold-300 text-gray-800 px-8 py-4 rounded-full text-lg font-black shadow-xl hover:scale-105 transition duration-300">

                  🎈 Explore More

                </button>

              </Link>

            </div>

          </motion.div>

          {/* RIGHT IMAGE */}

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              duration: 0.8,
            }}

            className="relative flex justify-center lg:justify-end"
          >

            {/* GLOW */}

            <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] bg-brand-gold-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

            {/* STICKERS */}

            <div className="absolute -top-6 left-4 text-5xl animate-bounce">
              🎨
            </div>

            <div className="absolute bottom-6 -right-2 text-5xl animate-pulse">
              📖
            </div>

            {/* IMAGE */}

            <motion.div

              whileHover={{
                scale: 1.03,
                rotate: -1,
              }}

              transition={{
                duration: 0.3,
              }}

              className="relative z-10"
            >

              <div className="bg-white p-5 rounded-[28px] shadow-2xl border-4 border-white">

                <img
                  src={inithinithu}
                  alt="Tamil Learning Book"
                  className="w-full max-w-[360px] md:max-w-[560px] xl:max-w-[640px] rounded-[24px] object-cover"
                />

              </div>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>

  );

};

export default Hero;
