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
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContextValue";
import { authAPI } from "../utils/api";
import { validateEmail } from "../utils/validators";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  /* ====================================== */
  /* STATES */
  /* ====================================== */

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  /* FORGOT PASSWORD */

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState("request");
  const [resetForm, setResetForm] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  /* ====================================== */
  /* HANDLE INPUT CHANGE */
  /* ====================================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ====================================== */
  /* HANDLE LOGIN */
  /* ====================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!validateEmail(formData.email)) errors.email = "Please enter a valid email address.";
    if (!formData.password) errors.password = "Password is required.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      await login(formData);
      toast.success("Login successful!");
      navigate("/profile");
    } catch (err) {
      const backendError = err.response?.data?.message || "Invalid email or password.";
      toast.error(backendError);
    } finally {
      setLoading(false);
    }
  };

  const resetForgotPasswordState = () => {
    setResetStep("request");
    setResetForm({
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    });
    setResetMessage("");
    setResetError("");
    setResetLoading(false);
  };

  const handleResetChange = (e) => {
    setResetForm({
      ...resetForm,
      [e.target.name]: e.target.value,
    });
  };

  const requestPasswordReset = async () => {
    if (!validateEmail(resetForm.email)) {
      setResetError("Please enter a valid registered email.");
      setResetMessage("");
      return;
    }

    setResetLoading(true);
    setResetError("");
    setResetMessage("");

    try {
      const response = await authAPI.forgotPassword({
        email: resetForm.email,
      });
      const resetOtp = response.data.resetOtp;
      setResetStep("reset");
      setResetMessage(
        resetOtp
          ? `${response.data.message} Demo OTP: ${resetOtp}`
          : response.data.message
      );
      toast.success("Password reset OTP sent.");
    } catch (err) {
      const message =
        err.response?.data?.message || "Unable to send password reset OTP.";
      setResetError(message);
      toast.error(message);
    } finally {
      setResetLoading(false);
    }
  };

  const submitNewPassword = async () => {
    if (!resetForm.otp.trim()) {
      setResetError("Please enter the OTP.");
      return;
    }

    if (resetForm.password.length < 6) {
      setResetError("Password must be at least 6 characters long.");
      return;
    }

    if (resetForm.password !== resetForm.confirmPassword) {
      setResetError("Passwords do not match.");
      return;
    }

    setResetLoading(true);
    setResetError("");

    try {
      const response = await authAPI.resetPassword({
        email: resetForm.email,
        otp: resetForm.otp,
        password: resetForm.password,
        confirmPassword: resetForm.confirmPassword,
      });

      toast.success(response.data.message);
      setFormData((currentForm) => ({
        ...currentForm,
        email: resetForm.email,
        password: "",
      }));
      setShowForgotPassword(false);
      resetForgotPasswordState();
    } catch (err) {
      const message =
        err.response?.data?.message || "Unable to reset password.";
      setResetError(message);
      toast.error(message);
    } finally {
      setResetLoading(false);
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
              className={`
                w-full

                h-[72px]

                rounded-2xl

                border-2 ${fieldErrors.email ? 'border-red-400' : 'border-gray-200'}

                bg-white/80

                pl-14 pr-5

                text-lg

                outline-none

                focus:border-brand-purple-400
                focus:ring-4
                focus:ring-brand-purple-100

                transition
              `}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm font-semibold mt-2">{fieldErrors.email}</p>
            )}
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
              className={`
                w-full

                h-[72px]

                rounded-2xl

                border-2 ${fieldErrors.password ? 'border-red-400' : 'border-gray-200'}

                bg-white/80

                pl-14 pr-16

                text-lg

                outline-none

                focus:border-brand-purple-400
                focus:ring-4
                focus:ring-brand-purple-100

                transition
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-purple-500 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
            {fieldErrors.password && (
              <p className="text-red-500 text-sm font-semibold mt-2">{fieldErrors.password}</p>
            )}
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
            disabled={loading}
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
              disabled:opacity-70
              disabled:cursor-not-allowed
            "
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
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
                setShowForgotPassword(false);
                resetForgotPasswordState();
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
              {resetStep === "request" ? "Forgot Password" : "Reset Password"}
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
              {resetStep === "request" 
                ? "Enter your registered email to reset password ✨" 
                : "Enter the OTP and your new password ✨"}
            </p>

            {/* MESSAGE/ERROR */}

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

            {resetError && (
              <div
                className="
                  mt-4

                  bg-red-100

                  text-red-600

                  font-bold

                  rounded-2xl

                  px-5 py-4
                "
              >
                {resetError}
              </div>
            )}

            {/* STEP 1: REQUEST OTP */}

            {resetStep === "request" && (
              <div className="mt-10 space-y-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your registered email"
                  value={resetForm.email}
                  onChange={handleResetChange}
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

                <button
                  onClick={requestPasswordReset}
                  disabled={resetLoading}
                  className="
                    w-full
                    h-[64px]
                    rounded-2xl
                    bg-gradient-to-r
                    from-brand-purple-500
                    to-brand-teal-500
                    hover:from-brand-purple-600
                    hover:to-brand-teal-600
                    text-white
                    text-xl
                    font-black
                    shadow-xl
                    transition duration-300
                    hover:scale-[1.01]
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                  "
                >
                  {resetLoading ? "SENDING..." : "SEND OTP"}
                </button>
              </div>
            )}

            {/* STEP 2: RESET PASSWORD */}

            {resetStep === "reset" && (
              <div className="mt-10 space-y-5">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={resetForm.otp}
                  onChange={handleResetChange}
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

                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={resetForm.password}
                  onChange={handleResetChange}
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

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={resetForm.confirmPassword}
                  onChange={handleResetChange}
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

                <button
                  onClick={submitNewPassword}
                  disabled={resetLoading}
                  className="
                    w-full
                    h-[64px]
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
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                  "
                >
                  {resetLoading ? "RESETTING..." : "RESET PASSWORD"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
