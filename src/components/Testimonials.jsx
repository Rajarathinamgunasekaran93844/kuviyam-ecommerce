import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Pagination,
} from "swiper/modules";

import {
  Star,
  Sparkles,
  Quote,
  Heart,
} from "lucide-react";

import Reveal from "./Reveal";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [

  {
    id: 1,
    name: "Priya",
    role: "Parent",
    emoji: "👩‍👧",
    color:
      "from-brand-purple-400 via-brand-red-400 to-brand-purple-500",
    shadow:
      "shadow-brand-purple-200",
    badge:
      "Top Parent Choice",
    review:
      "Amazing Tamil learning books for children. My daughter loves the rhymes and colorful visuals.",
  },

  {
    id: 2,
    name: "Karthik",
    role: "Teacher",
    emoji: "👨‍🏫",
    color:
      "from-brand-gold-400 via-brand-gold-300 to-brand-gold-400",
    shadow:
      "shadow-brand-gold-200",
    badge:
      "Teacher Recommended",
    review:
      "Very engaging and educational content. Perfect for preschool kids and early learners.",
  },

  {
    id: 3,
    name: "Divya",
    role: "Mother",
    emoji: "👩",
    color:
      "from-brand-teal-400 via-brand-teal-400 to-brand-teal-500",
    shadow:
      "shadow-brand-teal-200",
    badge:
      "Kids Favorite",
    review:
      "Beautifully designed books that help children connect with Tamil culture in a fun and playful way.",
  },

  {
    id: 4,
    name: "Arun",
    role: "Parent",
    emoji: "👨‍👦",
    color:
      "from-brand-red-400 via-brand-red-300 to-brand-red-500",
    shadow:
      "shadow-brand-red-200",
    badge:
      "Happy Learning",
    review:
      "The illustrations and joyful learning approach are fantastic. Highly recommended for little learners.",
  },

];

const Testimonials = () => {

  return (

    <Reveal>

      <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-brand-purple-100 via-brand-gold-50 to-brand-teal-100">

        {/* SOFT OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20"></div>

        {/* FLOATING ELEMENTS */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-10 left-10 text-5xl opacity-20 animate-bounce">
            🌈
          </div>

          <div className="absolute top-16 right-16 text-5xl opacity-20 animate-pulse">
            ⭐
          </div>

          <div className="absolute bottom-10 left-20 text-5xl opacity-20 animate-bounce">
            🧸
          </div>

          <div className="absolute bottom-16 right-10 text-5xl opacity-20 animate-pulse">
            🚀
          </div>

          <div className="absolute top-1/2 left-1/3 text-4xl opacity-20 animate-spin">
            🎈
          </div>

          <div className="absolute top-1/3 right-1/4 text-4xl opacity-10 animate-bounce">
            ☁️
          </div>

        </div>

        {/* MAIN CONTAINER */}

        <div className="container-custom relative z-10">

          {/* HEADER */}

          <div className="text-center max-w-6xl mx-auto mb-12 md:mb-16">

            {/* BADGE */}

            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-8 py-4 rounded-full border-2 border-brand-purple-300 shadow-xl mb-10">

              <Sparkles
                className="text-brand-purple-500"
                size={24}
              />

              <span className="font-black text-brand-purple-500 text-lg tracking-wide">

                Happy Parents & Teachers

              </span>

            </div>

            {/* TITLE */}

            <h2 className="text-3xl md:text-5xl font-black leading-tight">

              <span className="text-gray-900">

                What Parents

              </span>

              <span className="block text-brand-purple-500 mt-3">

                & Teachers Say

              </span>

            </h2>

            {/* DESCRIPTION */}

            <p className="mt-8 text-lg md:text-xl text-gray-700 leading-8 md:leading-9 max-w-5xl mx-auto">

              Parents and teachers love our colorful Tamil
              learning books because they make education
              joyful, interactive, and exciting for children.

            </p>

          </div>

          {/* SLIDER */}

          <Swiper
            modules={[
              Autoplay,
              Pagination,
            ]}
            spaceBetween={40}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            breakpoints={{

              768: {
                slidesPerView: 2,
              },

              1280: {
                slidesPerView: 3,
              },

            }}
            className="pb-20"
          >

            {testimonials.map((item) => (

              <SwiperSlide
                key={item.id}
                className="h-auto"
              >

                <div className={`

                  relative

                  h-full

                  bg-white/90
                  backdrop-blur-md

                  rounded-[28px]

                  p-6 md:p-8

                  border-4 border-white

                  shadow-2xl
                  ${item.shadow}

                  overflow-hidden

                  hover:-translate-y-4
                  hover:scale-[1.02]

                  transition-all duration-500

                `}>

                  {/* GLOW */}

                  <div className={`

                    absolute
                    -top-16
                    -right-16

                    w-48
                    h-48

                    rounded-full

                    bg-gradient-to-br
                    ${item.color}

                    opacity-10

                    blur-2xl

                    group-hover:scale-125

                    transition duration-700

                  `}></div>

                  {/* QUOTE */}

                  <div className="absolute top-6 right-6 opacity-10">

                    <Quote
                      size={80}
                      className="text-gray-700"
                    />

                  </div>

                  {/* TOP BADGE */}

                  <div className="inline-flex items-center gap-2 bg-brand-purple-100 px-5 py-2 rounded-full text-sm font-black text-brand-purple-500 shadow-md mb-8">

                    <Heart
                      size={16}
                      className="fill-brand-purple-500"
                    />

                    {item.badge}

                  </div>

                  {/* PROFILE */}

                  <div className="relative z-10 flex items-center gap-5">

                    {/* AVATAR */}

                    <div className={`

                      w-[72px]
                      h-[72px]
                      md:w-20
                      md:h-20

                      rounded-full

                      bg-gradient-to-br
                      ${item.color}

                      flex
                      items-center
                      justify-center

                      text-4xl

                      shadow-2xl

                      border-4 border-white

                    `}>

                      {item.emoji}

                    </div>

                    {/* DETAILS */}

                    <div>

                      <h3 className="text-2xl font-black text-gray-900">

                        {item.name}

                      </h3>

                      <p className="text-lg text-gray-500 font-bold mt-1">

                        {item.role}

                      </p>

                      {/* STARS */}

                      <div className="flex gap-1 mt-3">

                        {[...Array(5)].map((_, i) => (

                          <Star
                            key={i}
                            size={18}
                            className="text-brand-gold-400 fill-brand-gold-400"
                          />

                        ))}

                      </div>

                    </div>

                  </div>

                  {/* REVIEW */}

                  <p className="relative z-10 text-gray-700 text-base md:text-lg leading-8 mt-6 min-h-[128px]">

                    “{item.review}”

                  </p>

                  {/* FOOTER */}

                  <div className="flex items-center justify-between mt-8">

                    <div className="bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 text-white px-5 py-3 rounded-full font-black text-sm shadow-lg">

                      ⭐ Loved By Kids

                    </div>

                    <div className="text-5xl">

                      🎉

                    </div>

                  </div>

                </div>

              </SwiperSlide>

            ))}

          </Swiper>

        </div>

      </section>

    </Reveal>

  );

};

export default Testimonials;
