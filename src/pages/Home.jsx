import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import Navbar from "../components/Navbar";

import Header from "../components/Header";

// import BookFilterBar from "../components/BookFilterBar";

import Hero from "../components/Hero";

import FeaturedBooks from "../components/FeaturedBooks";

import Categories from "../components/Categories";

import Testimonials from "../components/Testimonials";

import Footer from "../components/Footer";

import WhatsAppButton from "../components/WhatsAppButton";

import PageLoader from "../components/PageLoader";

const Home = () => {
  const [loading, setLoading] =
    useState(true);

  /* ====================================== */
  /* PAGE LOADER */
  /* ====================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  /* ====================================== */
  /* SHOW LOADER */
  /* ====================================== */

  if (loading) {
    return <PageLoader />;
  }

  return (
    <AnimatePresence mode="wait">
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
        transition={{
          duration: 0.6,
        }}
        className="
          relative

          min-h-screen

          overflow-x-hidden

          bg-gradient-to-b
          from-brand-purple-50
          via-brand-gold-50
          to-brand-teal-50
        "
      >
        {/* ====================================== */}
        {/* FLOATING BACKGROUND ELEMENTS */}
        {/* ====================================== */}

        <div
          className="
            fixed inset-0

            pointer-events-none

            overflow-hidden

            z-0
          "
        >
          {/* CLOUD */}

          <div className="absolute top-10 left-6 text-6xl animate-bounce opacity-30">
            ☁️
          </div>

          {/* RAINBOW */}

          <div className="absolute top-24 right-10 text-6xl animate-pulse opacity-40">
            🌈
          </div>

          {/* TEDDY */}

          <div className="absolute bottom-32 left-10 text-5xl animate-bounce opacity-30">
            🧸
          </div>

          {/* ROCKET */}

          <div className="absolute bottom-20 right-10 text-5xl animate-pulse opacity-30">
            🚀
          </div>

          {/* STAR */}

          <div className="absolute top-1/2 left-1/4 text-4xl animate-spin opacity-20">
            ⭐
          </div>

          {/* BALLOON */}

          <div className="absolute top-1/3 right-1/3 text-5xl animate-bounce opacity-30">
            🎈
          </div>

          {/* BOOK */}

          <div className="absolute bottom-1/3 right-20 text-5xl animate-pulse opacity-30">
            📚
          </div>
        </div>

        {/* ====================================== */}
        {/* MAIN CONTENT */}
        {/* ====================================== */}

        <div
          className="
            relative

            z-10

            overflow-visible
          "
        >
          {/* ====================================== */}
          {/* HEADER */}
          {/* ====================================== */}

          <div
            className="
              relative

              z-[140]
            "
          >
            <Header />
          </div>

          {/* ====================================== */}
          {/* NAVBAR */}
          {/* ====================================== */}

          <div
            className="
              sticky

              top-0

              z-[130]
            "
          >
            <Navbar />
          </div>

          {/* ====================================== */}
          {/* BOOK FILTER BAR */}
          {/* ====================================== */}

          {/* <div
            className="
              sticky

              top-[108px]

              z-[120]

              overflow-visible
            "
          >
            <BookFilterBar />
          </div> */}

          {/* ====================================== */}
          {/* HERO SECTION */}
          {/* ====================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              relative

              z-10

              pt-6
              md:pt-10
            "
          >
            <Hero />
          </motion.div>

          {/* ====================================== */}
          {/* FEATURED BOOKS */}
          {/* ====================================== */}

          <motion.div
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
              duration: 0.8,
            }}
            className="
              relative

              z-10
            "
          >
            <FeaturedBooks />
          </motion.div>

          {/* ====================================== */}
          {/* CATEGORIES */}
          {/* ====================================== */}

          <motion.div
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
              duration: 0.8,
            }}
            className="
              relative

              z-10
            "
          >
            <Categories />
          </motion.div>

          {/* ====================================== */}
          {/* TESTIMONIALS */}
          {/* ====================================== */}

          <motion.div
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
              duration: 0.8,
            }}
            className="
              relative

              z-10
            "
          >
            <Testimonials />
          </motion.div>

          {/* ====================================== */}
          {/* FOOTER */}
          {/* ====================================== */}

          <div
            className="
              relative

              z-10
            "
          >
            <Footer />
          </div>

          {/* ====================================== */}
          {/* WHATSAPP BUTTON */}
          {/* ====================================== */}

          <div className="relative z-[200]">
            <WhatsAppButton />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;