import {
  Sparkles,
  BookOpen,
  Star,
  Heart,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {

  return (

    <>

      <Navbar />

      <section className="relative overflow-hidden min-h-screen py-16 md:py-20 bg-gradient-to-br from-brand-purple-100 via-brand-gold-50 to-brand-teal-100">

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

        <div className="container-custom relative z-10">

          {/* HEADER */}

          <div className="text-center mb-12 md:mb-16">

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-brand-purple-300 mb-8">

              <Sparkles
                className="text-brand-purple-500"
                size={20}
              />

              <span className="font-bold text-brand-purple-500 tracking-wide">

                About Kuviyam Publications

              </span>

            </div>

            {/* HEADING */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">

              <span className="text-gray-800">

                Making Tamil
              </span>

              <span className="block text-brand-purple-500 mt-3">

                Learning Fun
              </span>

              <span className="block text-brand-gold-500">

                For Kids 🌈
              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="text-gray-700 text-lg md:text-xl mt-8 max-w-4xl mx-auto leading-8 md:leading-9">

              Inspiring children to explore Tamil through colorful
              stories, playful rhymes, engaging activities,
              and beautifully designed educational books.

            </p>

          </div>

          {/* MAIN ABOUT CARD */}

          <div className="relative bg-white/90 backdrop-blur-md shadow-2xl rounded-[24px] p-6 md:p-10 lg:p-12 overflow-hidden border-4 border-white">

            {/* DECORATIVE BACKGROUND */}

            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-purple-300 rounded-full opacity-20"></div>

            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-gold-300 rounded-full opacity-20"></div>

            <div className="max-w-5xl mx-auto relative z-10">

              {/* INTRO CARD */}

              <div className="bg-gradient-to-r from-brand-purple-100 via-brand-gold-50 to-brand-teal-100 rounded-[22px] p-6 md:p-8 shadow-xl mb-10 border-2 border-white">

                <div className="flex flex-wrap gap-4 mb-6">

                  <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md">

                    <BookOpen
                      className="text-brand-teal-500"
                      size={20}
                    />

                    <span className="font-bold text-gray-700">

                      Educational Books

                    </span>

                  </div>

                  <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md">

                    <Star
                      className="text-brand-gold-500"
                      size={20}
                    />

                    <span className="font-bold text-gray-700">

                      Kids Friendly

                    </span>

                  </div>

                  <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md">

                    <Heart
                      className="text-brand-purple-500"
                      size={20}
                    />

                    <span className="font-bold text-gray-700">

                      Fun Learning

                    </span>

                  </div>

                </div>

                <p className="text-base md:text-lg text-gray-700 leading-8">

                  At{" "}

                  <span className="font-black text-brand-purple-500">

                    Kuviyam Publications

                  </span>

                  , we believe children learn best through joy,
                  creativity, imagination, and colorful experiences.
                  Our mission is to make Tamil learning exciting,
                  memorable, and meaningful for every child.

                </p>

              </div>

              {/* CONTENT GRID */}

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">

                {/* CARD 1 */}

                <div className="bg-brand-purple-50 rounded-[22px] p-6 shadow-lg hover:-translate-y-3 transition duration-500">

                  <div className="text-4xl mb-4">

                    📚

                  </div>

                  <h3 className="text-2xl font-black text-brand-purple-500 mb-4">

                    Colorful Learning

                  </h3>

                  <p className="text-gray-700 leading-8 text-base md:text-lg">

                    Our books are designed with bright illustrations,
                    engaging activities, and interactive storytelling
                    that help children enjoy learning Tamil naturally.

                  </p>

                </div>

                {/* CARD 2 */}

                <div className="bg-brand-gold-50 rounded-[22px] p-6 shadow-lg hover:-translate-y-3 transition duration-500">

                  <div className="text-4xl mb-4">

                    🌈

                  </div>

                  <h3 className="text-2xl font-black text-brand-gold-500 mb-4">

                    Fun & Creativity

                  </h3>

                  <p className="text-gray-700 leading-8 text-base md:text-lg">

                    We combine fun, creativity, and culture to help
                    children develop confidence and love for the
                    Tamil language from an early age.

                  </p>

                </div>

                {/* CARD 3 */}

                <div className="bg-brand-teal-50 rounded-[22px] p-6 shadow-lg hover:-translate-y-3 transition duration-500">

                  <div className="text-4xl mb-4">

                    🎵

                  </div>

                  <h3 className="text-2xl font-black text-brand-teal-500 mb-4">

                    Inithinithu Rhymes

                  </h3>

                  <p className="text-gray-700 leading-8 text-base md:text-lg">

                    Our special collection “Inithinithu” introduces
                    Tamil rhymes in a playful and engaging way,
                    helping children improve fluency and pronunciation.

                  </p>

                </div>

                {/* CARD 4 */}

                <div className="bg-brand-red-50 rounded-[22px] p-6 shadow-lg hover:-translate-y-3 transition duration-500">

                  <div className="text-4xl mb-4">

                    ❤️

                  </div>

                  <h3 className="text-2xl font-black text-brand-red-500 mb-4">

                    Tamil Culture

                  </h3>

                  <p className="text-gray-700 leading-8 text-base md:text-lg">

                    Through our publications, we help children connect
                    with Tamil traditions, values, stories, and culture
                    in a joyful and meaningful way.

                  </p>

                </div>

              </div>

              {/* BOTTOM SECTION */}

              <div className="mt-12 text-center">

                <div className="inline-block bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 text-white px-8 py-4 rounded-full shadow-2xl text-lg font-black hover:scale-105 transition duration-300">

                  🌟 Inspiring Happy Tamil Learners

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );
};

export default About;
