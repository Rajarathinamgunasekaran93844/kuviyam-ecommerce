import {
  useState,
  useContext,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { register } =
    useContext(AuthContext);

  /* PASSWORD TOGGLE */

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  /* ERROR */

  const [error, setError] =
    useState("");

  /* FORM DATA */

  const [formData, setFormData] =
    useState({
      name: "",

      email: "",

      phone: "",

      address: "",

      password: "",

      confirmPassword: "",
    });

  /* HANDLE CHANGE */

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  /* HANDLE SUBMIT */

  const handleSubmit = (e) => {
    e.preventDefault();

    /* PASSWORD CHECK */

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    /* CHECK EXISTING USER */

    const existingUser =
      JSON.parse(
        localStorage.getItem(
          "kuviyamUser"
        )
      );

    if (
      existingUser &&
      existingUser.email ===
        formData.email
    ) {
      setError(
        "Account already exists with this email."
      );

      return;
    }

    /* USER OBJECT */

    const newUser = {
      name: formData.name,

      email: formData.email,

      phone: formData.phone,

      address:
        formData.address,

      password:
        formData.password,
    };

    /* REGISTER */

    register(newUser);

    /* REDIRECT */

    navigate("/profile");
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
      {/* FLOATING EMOJIS */}

      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">
        🌈
      </div>

      <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-pulse">
        📚
      </div>

      <div className="absolute top-1/2 left-20 text-5xl opacity-20 animate-spin">
        ⭐
      </div>

      {/* REGISTER CARD */}

      <div
        className="
          relative

          w-full
          max-w-4xl

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

          <h1
            className="
              text-5xl md:text-6xl

              font-black

              text-gray-900

              mt-6
            "
          >
            Sign Up
          </h1>

          <p
            className="
              text-gray-600

              text-lg

              mt-4
            "
          >
            Create your Kuviyam
            Publications account ✨
          </p>
        </div>

        {/* ERROR */}

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

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-10"
        >
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2

              gap-6
            "
          >
            {/* NAME */}

            <div className="relative">
              <User
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
                type="text"
                name="name"
                placeholder="Full Name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                required
                className="
                  w-full

                  h-[70px]

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
                placeholder="Email Address"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                required
                className="
                  w-full

                  h-[70px]

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

            {/* PHONE */}

            <div className="relative md:col-span-2">
              <Phone
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
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                required
                className="
                  w-full

                  h-[70px]

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

            {/* ADDRESS */}

            <div className="relative md:col-span-2">
              <MapPin
                size={22}
                className="
                  absolute
                  left-5
                  top-8

                  text-brand-purple-400
                "
              />

              <textarea
                name="address"
                placeholder="Address"
                value={
                  formData.address
                }
                onChange={
                  handleChange
                }
                required
                rows={4}
                className="
                  w-full

                  rounded-2xl

                  border-2 border-gray-200

                  bg-white/80

                  pl-14 pr-5 py-5

                  text-lg

                  outline-none

                  resize-none

                  focus:border-brand-purple-400
                  focus:ring-4
                  focus:ring-brand-purple-100

                  transition
                "
              ></textarea>
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
                placeholder="Create Password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                required
                className="
                  w-full

                  h-[70px]

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
                  <EyeOff
                    size={24}
                  />
                ) : (
                  <Eye size={24} />
                )}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}

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
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm Password"
                value={
                  formData.confirmPassword
                }
                onChange={
                  handleChange
                }
                required
                className="
                  w-full

                  h-[70px]

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

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
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
                {showConfirmPassword ? (
                  <EyeOff
                    size={24}
                  />
                ) : (
                  <Eye size={24} />
                )}
              </button>
            </div>
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="
              w-full

              h-[72px]

              rounded-2xl

              mt-8

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
            SIGN UP
          </button>
        </form>

        {/* LOGIN */}

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">
            Already have an
            account?
          </p>

          <Link
            to="/login"
            className="
              inline-block

              mt-3

              text-brand-purple-500

              text-lg

              font-black

              hover:underline
            "
          >
            Login Here ✨
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;