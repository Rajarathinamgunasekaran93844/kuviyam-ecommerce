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
  LogIn,
  LogOut,
} from "lucide-react";

import logo from "../assets/Paachcharam_logo_02.png";

import { CartContext } from "../context/cartContextValue";

import { AuthContext } from "../context/authContextValue";

const authActionBase = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[.98]";
const loginActionClass = `${authActionBase} h-11 min-w-[96px] px-5 bg-brand-purple-700 text-white shadow-sm hover:bg-brand-purple-800 focus-visible:ring-brand-purple-500`;
const logoutActionClass = `${authActionBase} h-11 px-4 border border-rose-200 bg-white text-rose-700 shadow-sm hover:border-rose-300 hover:bg-rose-50 focus-visible:ring-rose-500`;
const mobileLoginActionClass = `${authActionBase} min-h-12 w-full px-6 py-3 bg-brand-purple-700 text-base text-white shadow-sm hover:bg-brand-purple-800 focus-visible:ring-brand-purple-500`;
const mobileLogoutActionClass = `${authActionBase} min-h-12 w-full px-6 py-3 border border-rose-200 bg-white text-base text-rose-700 shadow-sm hover:border-rose-300 hover:bg-rose-50 focus-visible:ring-rose-500`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] =
    useState(false);

  // Helper function to get initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length >= 2) {
      return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const navigate = useNavigate();

  /* ====================================== */
  /* CART */
  /* ====================================== */

  const { totalItems } =
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

  // Create navLinks with optional admin link
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/gallery", label: "Gallery" },
    { path: "/blog", label: "Journal" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md"
    >
      {/* ====================================== */}
      {/* MAIN CONTAINER */}
      {/* ====================================== */}

      <div className="container-custom2 relative z-10">
        <div
          className="
            flex items-center justify-between

            gap-4

            min-h-[82px]

            py-3
          "
        >
          {/* ====================================== */}
          {/* LEFT */}
          {/* ====================================== */}

          <Link
            to="/"
            aria-label="Paachcharam home"
            className="flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-purple-800"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-brand-lavender-300 bg-white p-1 shadow-sm">
              <img
                src={logo}
                alt=""
                className="h-full w-full object-contain"
              />
            </span>
            <span className="hidden min-w-0 min-[480px]:block leading-tight">
              <span className="block truncate font-serif text-xl font-semibold text-brand-purple-900 xl:text-2xl">Paachcharam</span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.15em] text-brand-purple-500">Kuviyam Publications</span>
            </span>
          </Link>

          {/* ====================================== */}
          {/* DESKTOP MENU */}
          {/* ====================================== */}

          <ul className="hidden xl:flex items-center gap-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
              className={({ isActive }) => `flex min-h-10 items-center justify-center rounded-xl px-3.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800 ${isActive ? "bg-brand-purple-50 text-brand-purple-900" : "text-slate-600 hover:bg-slate-50 hover:text-brand-purple-900"}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ====================================== */}
          {/* RIGHT */}
          {/* ====================================== */}

          <div className="flex items-center gap-3">
            {/* CART */}

            <Link to="/cart" aria-label={`Shopping cart, ${totalItems} items`}>
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
                  {totalItems}
                </span>
              </div>
            </Link>

            {/* ====================================== */}
            {/* AUTH BUTTONS */}
            {/* ====================================== */}

            {isAuthenticated ? (
              <div className="hidden xl:flex items-center gap-3">
                {/* ADMIN DASHBOARD (if admin) */}
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 text-sm font-semibold text-amber-900 shadow-sm transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  >
                    <span aria-hidden="true">⚙️</span>
                    Admin
                  </Link>
                )}
                {/* PROFILE */}
                <Link
                  to="/profile"
                  aria-label="Open your profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-purple-200 bg-brand-purple-50 text-sm font-bold text-brand-purple-800 shadow-sm transition hover:bg-brand-purple-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-500 focus-visible:ring-offset-2"
                >
                  {getInitials(user?.name)}
                </Link>

                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className={logoutActionClass}
                >
                  <LogOut size={17} aria-hidden="true" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden xl:flex items-center gap-3">
                {/* LOGIN */}

                <Link
                  to="/login"
                  className={loginActionClass}
                >
                  <LogIn size={17} aria-hidden="true" />
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
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="site-navigation-mobile"
              onClick={() => setMenuOpen(!menuOpen)}
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
        id="site-navigation-mobile"
        aria-hidden={!menuOpen}
        className={`
          xl:hidden

          overflow-hidden

          transition-all duration-300

          ${
            menuOpen
              ? "visible max-h-[900px]"
              : "invisible max-h-0"
          }
        `}
      >
        <div
          className="
            bg-white

            px-6 py-8

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
              Navigation
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
                  className={({ isActive }) => `flex items-center justify-center rounded-xl px-5 py-3.5 text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800 ${isActive ? "bg-brand-purple-50 text-brand-purple-900" : "text-slate-700 hover:bg-slate-50 hover:text-brand-purple-900"}`}
                >
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
                {/* ADMIN LINK (if admin) */}
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-6 py-3 text-base font-semibold text-amber-900 shadow-sm transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  >
                    <span aria-hidden="true">⚙️</span>
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/profile"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-brand-purple-200 bg-brand-purple-50 px-6 py-3 text-base font-semibold text-brand-purple-900 shadow-sm transition hover:bg-brand-purple-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-500 focus-visible:ring-offset-2"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-purple-200 text-sm font-bold text-brand-purple-900">
                    {getInitials(user?.name)}
                  </span>
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    handleLogout();

                    setMenuOpen(
                      false
                    );
                  }}
                  className={mobileLogoutActionClass}
                >
                  <LogOut size={18} aria-hidden="true" />
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
                  className={mobileLoginActionClass}
                >
                  <LogIn size={18} aria-hidden="true" />
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
