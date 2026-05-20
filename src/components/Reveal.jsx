import { motion } from "framer-motion";

const Reveal = ({
  children,
  className = "",
  delay = 0,
}) => {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 80,
        scale: 0.9,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}

      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut",
      }}

      viewport={{
        once: true,
        amount: 0.2,
      }}

      whileHover={{
        y: -5,
      }}

      className={`relative ${className}`}
    >

      {/* GLOW EFFECT */}

      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-brand-purple-200 via-brand-gold-100 to-brand-teal-200 opacity-0 blur-2xl transition duration-500 group-hover:opacity-40"></div>

      {/* FLOATING DECORATIONS */}

      <div className="absolute -top-3 -right-3 text-2xl animate-pulse pointer-events-none">

        ✨

      </div>

      <div className="absolute -bottom-3 -left-3 text-2xl animate-bounce pointer-events-none">

        🌈

      </div>

      {/* CONTENT */}

      <div className="relative z-10">

        {children}

      </div>

    </motion.div>

  );
};

export default Reveal;