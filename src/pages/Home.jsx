import { useCallback, useState } from "react";
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

import Footer from "../components/Footer";

import WhatsAppButton from "../components/WhatsAppButton";


const Home = () => {
  const [categories, setCategories] = useState([]);
  const handleProductsLoaded = useCallback((products) => {
    const grouped = new Map();
    products.forEach((product) => {
      const name = String(product.category || "").trim();
      if (!name) return;
      grouped.set(name, (grouped.get(name) || 0) + 1);
    });
    setCategories(Array.from(grouped, ([name, count]) => ({ name, count })));
  }, []);

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

          bg-[#f8f6f0]
          text-slate-900
        "
      >
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
              relative
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
            <FeaturedBooks onProductsLoaded={handleProductsLoaded} />
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
            <Categories categories={categories} />
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
