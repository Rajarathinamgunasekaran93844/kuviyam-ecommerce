import { motion } from "framer-motion";

const PageLoader = () => {

  return (

    <div className="fixed inset-0 z-[999] overflow-hidden bg-gradient-to-br from-brand-purple-200 via-brand-gold-100 to-brand-teal-200 flex items-center justify-center">

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

      {/* MAIN LOADER */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative z-10 flex flex-col items-center"
      >

        {/* GLOW EFFECT */}

        <div className="absolute w-44 h-44 md:w-52 md:h-52 bg-brand-gold-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>

        {/* LOADER CIRCLE */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
          className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-[8px] md:border-[10px] border-brand-purple-400 border-t-brand-gold-300 border-r-brand-teal-400 shadow-2xl flex items-center justify-center bg-white"
        >

          {/* CENTER ICON */}

          <div className="text-5xl animate-bounce">

            📚

          </div>

        </motion.div>

        {/* TITLE */}

        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="mt-8 text-3xl md:text-4xl font-black text-center"
        >

          <span className="text-brand-purple-500">
            Kuviyam
          </span>

          <span className="block text-brand-teal-500 mt-2">
            Publications
          </span>

        </motion.h2>

        {/* SUBTEXT */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6,
          }}
          className="mt-5 text-base md:text-lg text-gray-700 font-semibold text-center max-w-md px-4"
        >

          🌈 Loading fun Tamil learning adventures for kids...

        </motion.p>

        {/* BOUNCING DOTS */}

        <div className="flex gap-3 mt-8">

          <div className="w-4 h-4 rounded-full bg-brand-purple-500 animate-bounce"></div>

          <div className="w-4 h-4 rounded-full bg-brand-gold-400 animate-bounce delay-150"></div>

          <div className="w-4 h-4 rounded-full bg-brand-teal-500 animate-bounce delay-300"></div>

        </div>

      </motion.div>

    </div>

  );
};

export default PageLoader;
