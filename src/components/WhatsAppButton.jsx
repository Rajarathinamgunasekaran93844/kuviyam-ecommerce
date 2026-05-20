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
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center"
      >
        {/* PULSE EFFECT */}
        <span className="absolute inset-0 rounded-3xl bg-green-400 opacity-25 animate-ping"></span>

        {/* FLOATING EMOJI */}
        <div className="absolute -top-4 -left-3 text-2xl animate-bounce pointer-events-none">
          💬
        </div>

        {/* MAIN BUTTON */}
        <motion.div
          whileHover={{
            scale: 1.05,
            y: -2,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="
            relative
            flex items-center justify-center
            gap-3 sm:gap-4

            w-[min(92vw,330px)]
            sm:w-[340px]
            min-h-[76px]

            px-4 sm:px-5 py-3

            rounded-2xl

            bg-gradient-to-r
            from-green-500
            to-green-600

            hover:from-green-600
            hover:to-green-700

            border-4 border-white

            shadow-2xl
            overflow-hidden
          "
        >
          {/* LIGHT OVERLAY */}
          <div className="absolute inset-0 bg-white/10"></div>

          {/* ICON BOX */}
          <div
            className="
              relative z-10
              w-12 h-12
              sm:w-14 sm:h-14

              rounded-2xl
              bg-white

              flex items-center justify-center

              shadow-lg
              shrink-0
            "
          >
            <FaWhatsapp
              size={30}
              className="text-green-500"
            />
          </div>

          {/* TEXT CONTENT */}
          <div
            className="
              relative z-10

              flex flex-col justify-center

              px-2

              text-center
            "
          >
            <h3
              className="
                text-xl
                sm:text-2xl
                font-extrabold
                text-white

                leading-tight
                whitespace-nowrap
              "
            >
              Chat With Us
            </h3>

            <p
              className="
                text-sm
                sm:text-base
                text-green-100

                mt-1
                leading-normal
              "
            >
              Tamil Learning Help 🎈
            </p>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
};

export default WhatsAppButton;
