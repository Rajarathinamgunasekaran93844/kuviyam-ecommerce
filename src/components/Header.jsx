import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  Mail,
  Phone,
} from "lucide-react";

const Header = () => {
  return (
    <header
      className="
        relative

        z-[140]

        w-full

        overflow-hidden

        bg-gradient-to-r
        from-[#6A1B9A]
        via-[#7B1FA2]
        to-[#9C64A6]

        border-b border-purple-300

        shadow-md
      "
    >
      {/* ====================================== */}
      {/* BACKGROUND GLOW */}
      {/* ====================================== */}

      <div
        className="
          absolute
          top-0
          left-0

          w-full
          h-full

          bg-white/5

          pointer-events-none
        "
      ></div>

      {/* ====================================== */}
      {/* CONTAINER */}
      {/* ====================================== */}

      <div
        className="
          relative

          z-10

          max-w-[1600px]

          mx-auto

          px-3
          sm:px-5
          md:px-8
          xl:px-10

          min-h-[58px]
          sm:min-h-[64px]
          md:min-h-[74px]

          py-2

          flex flex-col
          md:flex-row

          items-center
          justify-between

          gap-3
          md:gap-6
        "
      >
        {/* ====================================== */}
        {/* LEFT - SOCIAL ICONS */}
        {/* ====================================== */}

        <div
          className="
            flex items-center

            gap-2
            sm:gap-3

            order-2
            md:order-1
          "
        >
          {/* FACEBOOK */}

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="
              w-9 h-9
              sm:w-10 sm:h-10
              md:w-11 md:h-11

              bg-white/10

              hover:bg-blue-600

              text-white

              rounded-sm

              flex items-center justify-center

              transition duration-300

              hover:scale-105

              shadow-md
            "
          >
            <FaFacebookF
              size={18}
            />
          </a>

          {/* TWITTER */}

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="
              w-9 h-9
              sm:w-10 sm:h-10
              md:w-11 md:h-11

              bg-white/10

              hover:bg-sky-500

              text-white

              rounded-sm

              flex items-center justify-center

              transition duration-300

              hover:scale-105

              shadow-md
            "
          >
            <FaTwitter
              size={18}
            />
          </a>

          {/* INSTAGRAM */}

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="
              w-9 h-9
              sm:w-10 sm:h-10
              md:w-11 md:h-11

              bg-gradient-to-br
              from-pink-500
              via-red-500
              to-yellow-500

              text-white

              rounded-sm

              flex items-center justify-center

              transition duration-300

              hover:scale-105

              shadow-md
            "
          >
            <FaInstagram
              size={18}
            />
          </a>

          {/* LINKEDIN */}

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="
              w-9 h-9
              sm:w-10 sm:h-10
              md:w-11 md:h-11

              bg-[#0077B5]

              text-white

              rounded-sm

              flex items-center justify-center

              transition duration-300

              hover:scale-105

              shadow-md
            "
          >
            <FaLinkedinIn
              size={18}
            />
          </a>
        </div>

        {/* ====================================== */}
        {/* RIGHT - CONTACT INFO */}
        {/* ====================================== */}

        <div
          className="
            flex flex-col
            sm:flex-row

            items-center

            gap-2
            sm:gap-5
            md:gap-8
            xl:gap-12

            text-white

            font-semibold

            order-1
            md:order-2
          "
        >
          {/* EMAIL */}

          <a
            href="mailto:support@kuviyampublications.com"
            className="
              flex items-center

              gap-2
              md:gap-3

              text-[13px]
              sm:text-[14px]
              md:text-[16px]
              xl:text-[18px]

              text-center
              sm:text-left

              break-all

              hover:text-yellow-200

              transition duration-300
            "
          >
            <Mail
              size={18}
              className="
                shrink-0
              "
            />

            <span>
              support@kuviyampublications.com
            </span>
          </a>

          {/* PHONE */}

          <a
            href="tel:+919600021480"
            className="
              flex items-center

              gap-2
              md:gap-3

              text-[13px]
              sm:text-[14px]
              md:text-[16px]
              xl:text-[18px]

              whitespace-nowrap

              hover:text-yellow-200

              transition duration-300
            "
          >
            <Phone
              size={18}
              className="
                shrink-0
              "
            />

            <span>
              +91 9600021480
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;