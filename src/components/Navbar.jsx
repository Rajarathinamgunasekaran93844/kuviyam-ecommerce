import {
  useState,
  useContext,
} from "react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  ShoppingCart,
  Menu,
  X,
  Sparkles,
  LogOut,
  User,
} from "lucide-react";

import logo from "../assets/Paachcharam_logo_02.png";

import { CartContext } from "../context/CartContext";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate = useNavigate();

  /* ====================================== */
  /* CART */
  /* ====================================== */

  const { cartItems } =
    useContext(CartContext);

  /* ====================================== */
  /* AUTH */
  /* ====================================== */

  const {
    user,
    logout,
    isAuthenticated,
  } = useContext(AuthContext);

  /* ====================================== */
  /* LOGOUT */
  /* ====================================== */

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  /* ====================================== */
  /* NAV LINKS */
  /* ====================================== */

  const navLinks = [
    {
      path: "/",

      label: "Home",

      emoji: "🏠",

      bg: `
        bg-gradient-to-r
        from-brand-purple-500
        to-brand-purple-400

        hover:from-brand-purple-600
        hover:to-brand-purple-500
      `,

      text: "text-white",
    },

    {
      path: "/shop",

      label: "Shop",

      emoji: "🛍️",

      bg: `
        bg-gradient-to-r
        from-brand-teal-400
        to-brand-teal-500

        hover:from-brand-teal-500
        hover:to-brand-teal-600
      `,

      text: "text-white",
    },

    {
      path: "/gallery",

      label: "Gallery",

      emoji: "🖼️",

      bg: `
        bg-gradient-to-r
        from-pink-400
        to-rose-500

        hover:from-pink-500
        hover:to-rose-600
      `,

      text: "text-white",
    },

    {
      path: "/blog",

      label: "Blog",

      emoji: "✍️",

      bg: `
        bg-gradient-to-r
        from-indigo-400
        to-blue-500

        hover:from-indigo-500
        hover:to-blue-600
      `,

      text: "text-white",
    },

    {
      path: "/about",

      label: "About",

      emoji: "📘",

      bg: `
        bg-gradient-to-r
        from-brand-red-400
        to-brand-red-500

        hover:from-brand-red-600
        hover:to-brand-red-700
      `,

      text: "text-white",
    },

    {
      path: "/contact",

      label: "Contact",

      emoji: "📞",

      bg: `
        bg-gradient-to-r
        from-brand-gold-400
        to-brand-gold-500

        hover:from-brand-gold-500
        hover:to-brand-gold-600
      `,

      text: "text-gray-900",
    },
  ];

  return (
    <nav
      className="
        sticky top-0 z-50 overflow-hidden

        bg-gradient-to-r
        from-brand-purple-50/95
        via-brand-gold-50/95
        to-brand-teal-50/95

        backdrop-blur-md

        shadow-lg

        border-b-2 border-brand-lavender-400
      "
    >
      {/* FLOATING EMOJIS */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-5 text-xl opacity-20">
          ☁️
        </div>

        <div className="absolute top-3 right-8 text-xl opacity-20">
          🚀
        </div>

        <div className="absolute bottom-1 right-5 text-2xl opacity-20">
          🌈
        </div>
      </div>

      {/* ====================================== */}
      {/* MAIN CONTAINER */}
      {/* ====================================== */}

      <div className="container-custom2 relative z-10">
        <div
          className="
            flex items-center justify-between

            gap-4

            min-h-[110px]

            py-4
          "
        >
          {/* ====================================== */}
          {/* LEFT */}
          {/* ====================================== */}

          <Link
            to="/"
            className="
              flex items-center

              gap-4

              shrink-0
            "
          >
            {/* LOGO */}

            <div
              className="
                bg-white

                rounded-[26px]

                px-4 py-3

                shadow-xl

                border-2 border-brand-lavender-300

                flex items-center justify-center

                overflow-hidden

                min-w-[160px]
                sm:min-w-[190px]
                xl:min-w-[220px]
              "
            >
              <img
                src={logo}
                alt="Paachcharam Logo"
                className="
                  h-[58px]
                  sm:h-[70px]
                  xl:h-[78px]

                  w-auto

                  object-contain

                  block
                "
              />
            </div>

            {/* BRAND */}

            <div className="hidden 2xl:block leading-tight">
              <div
                className="
                  text-[32px]

                  font-black

                  text-brand-purple-900

                  whitespace-nowrap
                "
              >
                Paachcharam
              </div>

              <p
                className="
                  text-sm

                  font-bold

                  text-brand-purple-500

                  mt-1
                "
              >
                Kids Learning World 🌈
              </p>
            </div>
          </Link>

          {/* ====================================== */}
          {/* DESKTOP MENU */}
          {/* ====================================== */}

          <ul className="hidden xl:flex items-center gap-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `
                    flex items-center justify-center

                    gap-3

                    min-w-[118px]

                    h-[62px]

                    px-4 py-4

                    rounded-2xl

                    text-[15px]
                    2xl:text-[16px]

                    font-extrabold

                    text-center

                    shadow-lg

                    transition-all duration-300

                    hover:scale-105

                    ${link.bg}
                    ${link.text}

                    ${
                      isActive
                        ? "ring-4 ring-white shadow-2xl scale-105"
                        : ""
                    }
                  `}
                >
                  <span className="text-xl flex items-center">
                    {link.emoji}
                  </span>

                  <span className="leading-normal whitespace-nowrap">
                    {link.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ====================================== */}
          {/* RIGHT */}
          {/* ====================================== */}

          <div className="flex items-center gap-3">
            {/* CART */}

            <Link to="/cart">
              <div className="relative">
                <div
                  className="
                    w-12 h-12

                    rounded-2xl

                    bg-white

                    border-2 border-brand-teal-500

                    shadow-lg

                    flex items-center justify-center

                    hover:scale-105

                    transition duration-300
                  "
                >
                  <ShoppingCart
                    size={22}
                    className="text-brand-purple-500"
                  />
                </div>

                <span
                  className="
                    absolute
                    -top-2 -right-2

                    bg-brand-red-500

                    text-white

                    text-xs

                    font-black

                    w-6 h-6

                    rounded-full

                    flex items-center justify-center

                    border-2 border-white
                  "
                >
                  {cartItems.length}
                </span>
              </div>
            </Link>

            {/* ====================================== */}
            {/* AUTH BUTTONS */}
            {/* ====================================== */}

            {isAuthenticated ? (
              <div className="hidden xl:flex items-center gap-3">
                {/* PROFILE */}

                <Link to="/profile">
                  <div
                    className="
                      flex items-center gap-3

                      h-[62px]

                      px-5

                      rounded-2xl

                      bg-gradient-to-r
                      from-emerald-400
                      to-green-500

                      text-white

                      font-black

                      shadow-xl

                      hover:scale-105

                      transition duration-300
                    "
                  >
                    <User size={20} />

                    <span className="max-w-[120px] truncate">
                      {user?.name}
                    </span>
                  </div>
                </Link>

                {/* LOGOUT */}

                <button
                  onClick={
                    handleLogout
                  }
                  className="
                    flex items-center justify-center gap-2

                    h-[62px]

                    px-5

                    rounded-2xl

                    bg-gradient-to-r
                    from-red-500
                    to-rose-500

                    hover:from-red-600
                    hover:to-rose-600

                    text-white

                    font-black

                    shadow-xl

                    hover:scale-105

                    transition duration-300
                  "
                >
                  <LogOut
                    size={20}
                  />

                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden xl:flex items-center gap-3">
                {/* LOGIN */}

                <Link
                  to="/login"
                  className="
                    flex items-center justify-center

                    h-[62px]

                    px-6

                    rounded-2xl

                    bg-gradient-to-r
                    from-brand-purple-500
                    to-brand-purple-400

                    hover:from-brand-purple-600
                    hover:to-brand-purple-500

                    text-white

                    font-black

                    shadow-xl

                    hover:scale-105

                    transition duration-300
                  "
                >
                  Login
                </Link>
              </div>
            )}

            {/* ====================================== */}
            {/* MOBILE MENU BUTTON */}
            {/* ====================================== */}

            <button
              className="
                xl:hidden

                w-12 h-12

                rounded-2xl

                bg-white

                border-2 border-brand-lavender-400

                shadow-lg

                flex items-center justify-center
              "
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
            >
              {menuOpen ? (
                <X
                  size={24}
                  className="text-brand-purple-500"
                />
              ) : (
                <Menu
                  size={24}
                  className="text-brand-purple-500"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ====================================== */}
      {/* MOBILE MENU */}
      {/* ====================================== */}

      <div
        className={`
          xl:hidden

          overflow-hidden

          transition-all duration-500

          ${
            menuOpen
              ? "max-h-[900px]"
              : "max-h-0"
          }
        `}
      >
        <div
          className="
            bg-gradient-to-b
            from-brand-purple-50
            via-brand-gold-50
            to-brand-teal-50

            px-6 py-8

            rounded-b-[30px]

            border-t border-white/50
          "
        >
          {/* HEADER */}

          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles
              className="text-brand-purple-500"
              size={22}
            />

            <div
              className="
                text-2xl

                font-black

                text-brand-purple-500
              "
            >
              Kids Menu
            </div>
          </div>

          {/* NAV LINKS */}

          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className={({ isActive }) => `
                    flex items-center justify-center gap-3

                    px-6 py-4

                    rounded-2xl

                    text-lg

                    font-black

                    text-center

                    shadow-lg

                    transition duration-300

                    ${link.bg}
                    ${link.text}

                    ${
                      isActive
                        ? "ring-4 ring-white"
                        : ""
                    }
                  `}
                >
                  <span className="text-xl">
                    {link.emoji}
                  </span>

                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ====================================== */}
          {/* MOBILE AUTH */}
          {/* ====================================== */}

          <div className="mt-6 flex flex-col gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="
                    flex items-center justify-center gap-3

                    px-6 py-4

                    rounded-2xl

                    bg-gradient-to-r
                    from-emerald-400
                    to-green-500

                    text-white

                    text-lg

                    font-black

                    shadow-xl
                  "
                >
                  <User size={20} />

                  {user?.name}
                </Link>

                <button
                  onClick={() => {
                    handleLogout();

                    setMenuOpen(
                      false
                    );
                  }}
                  className="
                    flex items-center justify-center gap-3

                    px-6 py-4

                    rounded-2xl

                    bg-gradient-to-r
                    from-red-500
                    to-rose-500

                    text-white

                    text-lg

                    font-black

                    shadow-xl
                  "
                >
                  <LogOut
                    size={20}
                  />

                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="
                    flex items-center justify-center

                    px-6 py-4

                    rounded-2xl

                    bg-gradient-to-r
                    from-brand-purple-500
                    to-brand-purple-400

                    text-white

                    text-lg

                    font-black

                    shadow-xl
                  "
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;