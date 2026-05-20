import {
  useState,
  useContext,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  /* ====================================== */
  /* STATES */
  /* ====================================== */

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  /* FORGOT PASSWORD */

  const [showForgotPassword, setShowForgotPassword] =
    useState(false);

  const [resetEmail, setResetEmail] =
    useState("");

  const [resetMessage, setResetMessage] =
    useState("");

  /* ====================================== */
  /* HANDLE INPUT CHANGE */
  /* ====================================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  /* ====================================== */
  /* HANDLE LOGIN */
  /* ====================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser =
      JSON.parse(
        localStorage.getItem(
          "kuviyamUser"
        )
      );

    if (!savedUser) {
      setError(
        "No account found. Please register first."
      );

      return;
    }

    if (
      savedUser.email ===
        formData.email &&
      savedUser.password ===
        formData.password
    ) {
      login(savedUser);

      navigate("/profile");
    } else {
      setError(
        "Invalid email or password."
      );
    }
  };

  return (
    <div
      className="
        min-h-screen

        relative

        overflow-hidden

        bg-gradient-to-br
        from-brand-purple-100
        via-brand-gold-50
        to-brand-teal-100

        flex items-center justify-center

        px-4 py-10
      "
    >
      {/* ====================================== */}
      {/* FLOATING BACKGROUND */}
      {/* ====================================== */}

      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">
        🌈
      </div>

      <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-pulse">
        📚
      </div>

      <div className="absolute top-1/2 left-20 text-5xl opacity-20 animate-spin">
        ⭐
      </div>

      {/* ====================================== */}
      {/* LOGIN CARD */}
      {/* ====================================== */}

      <div
        className="
          relative

          w-full
          max-w-2xl

          bg-white/90
          backdrop-blur-xl

          rounded-[40px]

          shadow-[0_25px_80px_rgba(0,0,0,0.15)]

          border border-white

          p-8 md:p-12
        "
      >
        {/* HEADER */}

        <div className="text-center">
          {/* ICON */}

          <div
            className="
              inline-flex items-center justify-center

              w-20 h-20

              rounded-full

              bg-gradient-to-r
              from-brand-purple-500
              to-brand-teal-500

              text-white

              shadow-xl
            "
          >
            <Sparkles size={38} />
          </div>

          {/* TITLE */}

          <h1
            className="
              text-5xl md:text-6xl

              font-black

              text-gray-900

              mt-6
            "
          >
            Login
          </h1>

          {/* SUBTITLE */}

          <p
            className="
              text-gray-600

              text-lg

              mt-4
            "
          >
            Welcome back to Kuviyam
            Publications ✨
          </p>
        </div>

        {/* ====================================== */}
        {/* ERROR */}
        {/* ====================================== */}

        {error && (
          <div
            className="
              mt-8

              bg-red-100

              text-red-600

              font-semibold

              rounded-2xl

              px-5 py-4
            "
          >
            {error}
          </div>
        )}

        {/* ====================================== */}
        {/* FORM */}
        {/* ====================================== */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-7"
        >
          {/* EMAIL */}

          <div className="relative">
            <Mail
              size={22}
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2

                text-brand-purple-400
              "
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="
                w-full

                h-[72px]

                rounded-2xl

                border-2 border-gray-200

                bg-white/80

                pl-14 pr-5

                text-lg

                outline-none

                focus:border-brand-purple-400
                focus:ring-4
                focus:ring-brand-purple-100

                transition
              "
            />
          </div>

          {/* PASSWORD */}

          <div className="relative">
            <Lock
              size={22}
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2

                text-brand-purple-400
              "
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Enter your password"
              value={
                formData.password
              }
              onChange={handleChange}
              required
              className="
                w-full

                h-[72px]

                rounded-2xl

                border-2 border-gray-200

                bg-white/80

                pl-14 pr-16

                text-lg

                outline-none

                focus:border-brand-purple-400
                focus:ring-4
                focus:ring-brand-purple-100

                transition
              "
            />

            {/* TOGGLE */}

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                right-5
                top-1/2
                -translate-y-1/2

                text-gray-500
              "
            >
              {showPassword ? (
                <EyeOff size={24} />
              ) : (
                <Eye size={24} />
              )}
            </button>
          </div>

          {/* ====================================== */}
          {/* FORGOT PASSWORD */}
          {/* ====================================== */}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() =>
                setShowForgotPassword(
                  true
                )
              }
              className="
                text-brand-purple-500

                font-bold

                hover:underline

                transition
              "
            >
              Forgot Password?
            </button>
          </div>

          {/* ====================================== */}
          {/* LOGIN BUTTON */}
          {/* ====================================== */}

          <button
            type="submit"
            className="
              w-full

              h-[72px]

              rounded-2xl

              bg-gradient-to-r
              from-brand-purple-500
              to-brand-teal-500

              hover:from-brand-purple-600
              hover:to-brand-teal-600

              text-white

              text-xl

              font-black

              shadow-2xl

              hover:scale-[1.02]

              transition duration-300
            "
          >
            LOGIN
          </button>
        </form>

        {/* ====================================== */}
        {/* REGISTER */}
        {/* ====================================== */}

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">
            Don&apos;t have an
            account?
          </p>

          <Link
            to="/register"
            className="
              inline-block

              mt-3

              text-brand-purple-500

              text-lg

              font-black

              hover:underline
            "
          >
            Create New Account ✨
          </Link>
        </div>
      </div>

      {/* ====================================== */}
      {/* FORGOT PASSWORD MODAL */}
      {/* ====================================== */}

      {showForgotPassword && (
        <div
          className="
            fixed inset-0 z-[999]

            bg-black/60

            backdrop-blur-sm

            flex items-center justify-center

            px-4
          "
        >
          <div
            className="
              relative

              w-full
              max-w-3xl

              bg-white

              rounded-[36px]

              shadow-[0_25px_80px_rgba(0,0,0,0.25)]

              p-8 md:p-12
            "
          >
            {/* CLOSE */}

            <button
              onClick={() => {
                setShowForgotPassword(
                  false
                );

                setResetMessage("");
              }}
              className="
                absolute
                top-6
                right-6

                w-12 h-12

                rounded-full

                bg-gray-100

                hover:bg-gray-200

                text-2xl

                font-bold

                transition
              "
            >
              ×
            </button>

            {/* TITLE */}

            <h2
              className="
                text-4xl
                md:text-6xl

                font-black

                text-center

                text-gray-900
              "
            >
              Forget Password
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                text-center

                text-gray-500

                text-lg

                mt-5
              "
            >
              Enter your registered
              email to reset password
              ✨
            </p>

            {/* MESSAGE */}

            {resetMessage && (
              <div
                className="
                  mt-8

                  bg-green-100

                  text-green-600

                  font-bold

                  rounded-2xl

                  px-5 py-4
                "
              >
                {resetMessage}
              </div>
            )}

            {/* INPUT */}

            <div className="mt-10">
              <input
                type="email"
                placeholder="Email"
                value={resetEmail}
                onChange={(e) =>
                  setResetEmail(
                    e.target.value
                  )
                }
                className="
                  w-full

                  h-[74px]

                  rounded-2xl

                  border-2 border-gray-200

                  px-6

                  text-xl

                  outline-none

                  focus:border-brand-purple-400
                  focus:ring-4
                  focus:ring-brand-purple-100

                  transition
                "
              />
            </div>

            {/* BUTTON */}

            <button
              onClick={() => {
                if (!resetEmail) {
                  setResetMessage(
                    'Please enter email.'
                  );

                  return;
                }

                setResetMessage(
                  'Password reset link sent successfully ✨'
                );
              }}
              className="
                w-full

                h-[64px]

                mt-8

                rounded-2xl

                bg-gradient-to-r
                from-brand-gold-400
                to-purple-400

                hover:from-brand-gold-500
                hover:to-purple-500

                text-white

                text-xl

                font-black

                shadow-xl

                transition duration-300

                hover:scale-[1.01]
              "
            >
              SEND PASSWORD RESET
              LINK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;