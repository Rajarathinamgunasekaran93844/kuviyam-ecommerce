import {
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import WhatsAppButton from "../components/WhatsAppButton";

/* GALLERY IMAGES */

import gallery1 from "../assets/gallery/gallery1.png";
import gallery2 from "../assets/gallery/gallery2.png";
// import gallery3 from "../assets/gallery/gallery3.jpg";
// import gallery4 from "../assets/gallery/gallery4.jpg";
// import gallery5 from "../assets/gallery/gallery5.jpg";
// import gallery6 from "../assets/gallery/gallery6.jpg";

const Gallery = () => {
  /* ====================================== */
  /* GALLERY DATA */
  /* ====================================== */

  const galleryImages = [
    {
      id: 1,

      image: gallery1,

      title:
        "Inithinithu Reading Time",

      category: "Kids",
    },

    {
      id: 2,

      image: gallery2,

      title:
        "Arivuamudhu Collection",

      category: "Books",
    },

    {
      id: 3,

      image: gallery1,

      title:
        "Tamil Learning Moments",

      category: "Events",
    },

    {
      id: 4,

      image: gallery1,

      title:
        "Paachcharam Learning",

      category: "Awards",
    },

    {
      id: 5,

      image: gallery1,

      title:
        "Fun Tamil Education",

      category: "Kids",
    },

    {
      id: 6,

      image: gallery1,

      title:
        "Creative Book Memories",

      category: "Books",
    },
  ];

  /* ====================================== */
  /* STATES */
  /* ====================================== */

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  /* ====================================== */
  /* OPEN IMAGE */
  /* ====================================== */

  const openImage = (index) => {
    setCurrentIndex(index);

    setSelectedImage(
      galleryImages[index]
    );
  };

  /* ====================================== */
  /* CLOSE IMAGE */
  /* ====================================== */

  const closeImage = () => {
    setSelectedImage(null);
  };

  /* ====================================== */
  /* NEXT IMAGE */
  /* ====================================== */

  const nextImage = () => {
    const next =
      (currentIndex + 1) %
      galleryImages.length;

    setCurrentIndex(next);

    setSelectedImage(
      galleryImages[next]
    );
  };

  /* ====================================== */
  /* PREVIOUS IMAGE */
  /* ====================================== */

  const prevImage = () => {
    const prev =
      (currentIndex -
        1 +
        galleryImages.length) %
      galleryImages.length;

    setCurrentIndex(prev);

    setSelectedImage(
      galleryImages[prev]
    );
  };

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
          🌈
        </div>

        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-pulse">
          ⭐
        </div>

        <div className="absolute bottom-20 left-20 text-5xl opacity-20 animate-bounce">
          📚
        </div>

        <div className="absolute bottom-32 right-16 text-6xl opacity-20 animate-pulse">
          🎈
        </div>
      </div>

      {/* ====================================== */}
      {/* HERO SECTION */}
      {/* ====================================== */}

      <section
        className="
          relative z-10

          pt-24
          pb-20

          px-6
        "
      >
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}

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
                📸
              </span>

              <span
                className="
                  font-black

                  text-brand-purple-500

                  text-lg
                "
              >
                Kuviyam Memories
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
              Magical
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
                Gallery
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
              Capturing joyful
              learning moments from
              Paachcharam,
              Inithinithu and
              Arivuamudhu books 🌈
            </p>
          </motion.div>

          {/* ====================================== */}
          {/* GALLERY GRID */}
          {/* ====================================== */}

          <div
            className="
              mt-24

              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3

              gap-10
            "
          >
            {galleryImages.map(
              (item, index) => (
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  whileHover={{
                    y: -12,
                  }}
                  className="group"
                >
                  {/* CARD */}

                  <div
                    onClick={() =>
                      openImage(
                        index
                      )
                    }
                    className="
                      relative

                      cursor-pointer

                      overflow-hidden

                      rounded-[36px]

                      bg-white/80

                      backdrop-blur-md

                      border border-white

                      shadow-2xl

                      hover:shadow-[0_25px_70px_rgba(0,0,0,0.15)]

                      transition-all duration-500
                    "
                  >
                    {/* IMAGE */}

                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={
                          item.title
                        }
                        className="
                          w-full

                          h-[420px]

                          object-cover

                          group-hover:scale-110

                          transition duration-700
                        "
                      />

                      {/* OVERLAY */}

                      <div
                        className="
                          absolute inset-0

                          bg-gradient-to-t
                          from-black/70
                          via-black/10
                          to-transparent
                        "
                      ></div>

                      {/* CATEGORY */}

                      <div
                        className="
                          absolute
                          top-5 left-5

                          bg-white/90

                          text-brand-purple-500

                          px-5 py-2

                          rounded-full

                          font-black

                          shadow-xl
                        "
                      >
                        {
                          item.category
                        }
                      </div>

                      {/* FLOATING ICON */}

                      <div className="absolute top-5 right-5 text-4xl">
                        ✨
                      </div>

                      {/* CONTENT */}

                      <div className="absolute bottom-7 left-7 right-7">
                        <h2
                          className="
                            text-3xl

                            font-black

                            text-white
                          "
                        >
                          {item.title}
                        </h2>

                        <p
                          className="
                            mt-2

                            text-white/90

                            text-lg
                          "
                        >
                          Click to open
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ====================================== */}
      {/* IMAGE MODAL */}
      {/* ====================================== */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed inset-0 z-[999]

              bg-black/90

              backdrop-blur-md

              flex items-center justify-center

              p-6 md:p-10

              overflow-hidden
            "
          >
            {/* CLOSE BUTTON */}

            <button
              onClick={closeImage}
              className="
                absolute
                top-6
                right-6

                w-14 h-14

                rounded-full

                bg-white/20

                backdrop-blur-md

                flex items-center justify-center

                text-white

                hover:bg-white/30

                transition

                z-50
              "
            >
              <X size={30} />
            </button>

            {/* LEFT BUTTON */}

            <button
              onClick={prevImage}
              className="
                absolute
                left-4 md:left-8

                top-1/2
                -translate-y-1/2

                w-14 h-14

                rounded-full

                bg-white/20

                backdrop-blur-md

                flex items-center justify-center

                text-white

                hover:bg-white/30

                transition

                z-50
              "
            >
              <ChevronLeft
                size={34}
              />
            </button>

            {/* RIGHT BUTTON */}

            <button
              onClick={nextImage}
              className="
                absolute
                right-4 md:right-8

                top-1/2
                -translate-y-1/2

                w-14 h-14

                rounded-full

                bg-white/20

                backdrop-blur-md

                flex items-center justify-center

                text-white

                hover:bg-white/30

                transition

                z-50
              "
            >
              <ChevronRight
                size={34}
              />
            </button>

            {/* IMAGE */}

            <motion.img
              key={
                selectedImage.image
              }
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              src={
                selectedImage.image
              }
              alt={
                selectedImage.title
              }
              className="
                w-auto

                max-w-[90vw]
                md:max-w-[80vw]

                h-auto

                max-h-[80vh]

                object-contain

                rounded-[28px]

                shadow-[0_25px_80px_rgba(0,0,0,0.45)]

                mx-auto
              "
            />
          </motion.div>
        )}
      </AnimatePresence>

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

export default Gallery;