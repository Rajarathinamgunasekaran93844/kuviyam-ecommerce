import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "919600021480";

  const message =
    "Hello Kuviyam Publications 👋 I would like to know more about your Tamil learning books for kids.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat with Kuviyam Publications on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-xl ring-2 ring-white transition hover:-translate-y-1 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300 sm:h-14 sm:w-[210px] sm:justify-start sm:gap-3 sm:rounded-full sm:px-2"
      >
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-0 transition-opacity group-hover:opacity-20" aria-hidden="true" />
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-green-600 shadow-sm sm:h-10 sm:w-10">
          <FaWhatsapp size={25} aria-hidden="true" />
        </span>
        <span className="sr-only sm:not-sr-only sm:flex sm:flex-col sm:pr-3 sm:text-left">
          <span className="text-sm font-bold leading-tight">Chat with us</span>
          <span className="hidden text-xs text-green-100 md:block">Tamil learning help</span>
        </span>
      </a>
    </motion.div>
  );
};

export default WhatsAppButton;
