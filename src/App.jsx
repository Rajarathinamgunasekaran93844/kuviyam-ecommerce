import {
  useEffect,
} from "react";

import {
  motion,
} from "framer-motion";

import AppRoutes from "./routes/AppRoutes";

import "./App.css";

function App() {

  /* SCROLL TO TOP ON REFRESH */

  useEffect(() => {

    window.scrollTo(0, 0);

  }, []);

  return (

    <motion.div

      initial={{
        opacity: 0,
      }}

      animate={{
        opacity: 1,
      }}

      transition={{
        duration: 0.6,
      }}

      className="relative overflow-hidden min-h-screen"
    >

      {/* GLOBAL FLOATING BACKGROUND */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

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

      {/* MAIN APP */}

      <div className="relative z-10">

        <AppRoutes />

      </div>

    </motion.div>

  );

}

export default App;