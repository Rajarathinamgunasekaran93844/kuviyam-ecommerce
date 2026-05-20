import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
} from "lucide-react";

const Profile = () => {
  return (
    <div
      className="
        min-h-screen

        bg-gradient-to-b
        from-brand-purple-50
        via-brand-gold-50
        to-brand-teal-50

        px-4
        md:px-8

        py-10
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        <div
          className="
            bg-white/90
            backdrop-blur-md

            rounded-[32px]

            shadow-2xl

            p-8 md:p-10

            border border-white
          "
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* PROFILE IMAGE */}

            <div
              className="
                w-36 h-36

                rounded-full

                bg-gradient-to-br
                from-brand-purple-400
                to-brand-teal-400

                flex items-center justify-center

                text-white

                shadow-2xl
              "
            >
              <User size={60} />
            </div>

            {/* USER INFO */}

            <div className="text-center md:text-left">
              <h1
                className="
                  text-4xl md:text-5xl

                  font-black

                  text-gray-900
                "
              >
                Welcome Back 👋
              </h1>

              <p
                className="
                  mt-4

                  text-lg

                  text-gray-600
                "
              >
                Manage your Kuviyam Publications account.
              </p>
            </div>
          </div>
        </div>

        {/* CARDS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4

            gap-8

            mt-10
          "
        >
          {/* ORDERS */}

          <div
            className="
              bg-white/90

              rounded-[30px]

              p-8

              shadow-xl

              hover:-translate-y-2

              transition duration-300
            "
          >
            <ShoppingBag
              size={42}
              className="text-brand-purple-500"
            />

            <h2 className="text-2xl font-black mt-6">
              My Orders
            </h2>

            <p className="text-gray-600 mt-3 leading-7">
              Track all your purchased books and orders.
            </p>
          </div>

          {/* WISHLIST */}

          <div
            className="
              bg-white/90

              rounded-[30px]

              p-8

              shadow-xl

              hover:-translate-y-2

              transition duration-300
            "
          >
            <Heart
              size={42}
              className="text-pink-500"
            />

            <h2 className="text-2xl font-black mt-6">
              Wishlist
            </h2>

            <p className="text-gray-600 mt-3 leading-7">
              Save your favourite Paachcharam books.
            </p>
          </div>

          {/* ADDRESS */}

          <div
            className="
              bg-white/90

              rounded-[30px]

              p-8

              shadow-xl

              hover:-translate-y-2

              transition duration-300
            "
          >
            <MapPin
              size={42}
              className="text-brand-teal-500"
            />

            <h2 className="text-2xl font-black mt-6">
              Addresses
            </h2>

            <p className="text-gray-600 mt-3 leading-7">
              Manage shipping and delivery addresses.
            </p>
          </div>

          {/* LOGOUT */}

          <div
            className="
              bg-white/90

              rounded-[30px]

              p-8

              shadow-xl

              hover:-translate-y-2

              transition duration-300
            "
          >
            <LogOut
              size={42}
              className="text-brand-red-500"
            />

            <h2 className="text-2xl font-black mt-6">
              Logout
            </h2>

            <p className="text-gray-600 mt-3 leading-7">
              Securely logout from your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
