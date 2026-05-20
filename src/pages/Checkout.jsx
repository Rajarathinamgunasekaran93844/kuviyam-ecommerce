import {
  useContext,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import {
  Sparkles,
  ShoppingBag,
  Truck,
  Send,
} from "lucide-react";

import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { CartContext } from "../context/CartContext";

const Checkout = () => {

  const {

    cartItems,
    clearCart,

  } = useContext(CartContext);

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",
      phone: "",
      address: "",

    });

  /* TOTAL */

  const total =
    cartItems.reduce(

      (acc, item) =>

        acc +
        item.price *
          item.quantity,

      0

    );

  /* INPUT CHANGE */

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]:
        e.target.value,

    });

  };

  /* PLACE ORDER */

  const placeOrder = () => {

    if (

      !formData.name ||
      !formData.phone ||
      !formData.address

    ) {

      toast.error(
        "Please fill all fields 🌈"
      );

      return;

    }

    toast.success(
      "Order Placed Successfully 🎉"
    );

    localStorage.setItem(

      "latestOrder",

      JSON.stringify({

        customer: formData,
        items: cartItems,
        total,

      })

    );

    clearCart();

    setTimeout(() => {

      navigate("/success");

    }, 2000);

  };

  return (

    <>

      <Navbar />

      {/* TOAST */}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="colored"
      />

      <section className="relative overflow-hidden min-h-screen px-6 py-16 md:py-20 bg-gradient-to-br from-brand-purple-100 via-brand-gold-50 to-brand-teal-100">

        {/* FLOATING CARTOON ELEMENTS */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-10 left-10 text-6xl animate-bounce">
            ☁️
          </div>

          <div className="absolute top-20 right-16 text-5xl animate-pulse">
            🌈
          </div>

          <div className="absolute bottom-10 left-20 text-5xl animate-bounce">
            🧸
          </div>

          <div className="absolute bottom-16 right-10 text-5xl animate-pulse">
            🚀
          </div>

          <div className="absolute top-1/2 left-1/3 text-4xl animate-spin">
            ⭐
          </div>

          <div className="absolute top-1/3 right-1/4 text-5xl animate-bounce">
            🎈
          </div>

        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* HEADER */}

          <div className="text-center mb-12 md:mb-16">

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-brand-purple-300 mb-8">

              <Sparkles
                className="text-brand-purple-500"
                size={20}
              />

              <span className="font-bold text-brand-purple-500 tracking-wide">

                Secure Kids Checkout

              </span>

            </div>

            {/* TITLE */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">

              <span className="text-gray-800">

                Complete Your
              </span>

              <span className="block text-brand-purple-500 mt-3">

                Happy Order 🎉

              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="text-gray-700 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-8 md:leading-9">

              Enter your details and place your order
              to start the fun Tamil learning journey.

            </p>

          </div>

          {/* EMPTY CART */}

          {cartItems.length === 0 ? (

            <div className="bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-8 md:p-12 text-center border-4 border-white">

              <div className="text-6xl md:text-7xl mb-6">

                🛒

              </div>

              <h2 className="text-3xl md:text-4xl font-black text-gray-800">

                Your Cart Is Empty

              </h2>

              <p className="text-gray-600 text-base md:text-lg mt-5 leading-8 max-w-xl mx-auto">

                Add some colorful Tamil learning books
                before proceeding to checkout.

              </p>

            </div>

          ) : (

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">

              {/* FORM SECTION */}

              <div className="relative bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-6 md:p-8 lg:p-10 border-4 border-white overflow-hidden">

                {/* BACKGROUND */}

                <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-purple-300 rounded-full opacity-20"></div>

                <div className="relative z-10">

                  <h2 className="text-3xl font-black text-gray-800 mb-8">

                    📦 Delivery Details

                  </h2>

                  <div className="space-y-6">

                    {/* NAME */}

                    <div>

                      <label className="block text-lg font-bold text-gray-700 mb-3">

                        Full Name

                      </label>

                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-brand-purple-50 border-2 border-transparent rounded-2xl px-5 py-4 text-base md:text-lg outline-none focus:border-brand-purple-400 transition duration-300"
                      />

                    </div>

                    {/* PHONE */}

                    <div>

                      <label className="block text-lg font-bold text-gray-700 mb-3">

                        Phone Number

                      </label>

                      <input
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-brand-gold-50 border-2 border-transparent rounded-2xl px-5 py-4 text-base md:text-lg outline-none focus:border-brand-gold-400 transition duration-300"
                      />

                    </div>

                    {/* ADDRESS */}

                    <div>

                      <label className="block text-lg font-bold text-gray-700 mb-3">

                        Delivery Address

                      </label>

                      <textarea
                        name="address"
                        rows="6"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full bg-brand-teal-50 border-2 border-transparent rounded-2xl px-5 py-4 text-base md:text-lg outline-none focus:border-brand-teal-400 transition duration-300 resize-none"
                      ></textarea>

                    </div>

                  </div>

                </div>

              </div>

              {/* ORDER SUMMARY */}

              <div className="relative bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-6 md:p-8 lg:p-10 border-4 border-white overflow-hidden">

                {/* BACKGROUND */}

                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-brand-gold-300 rounded-full opacity-20"></div>

                <div className="relative z-10">

                  {/* TITLE */}

                  <div className="flex items-center gap-3 mb-8">

                    <ShoppingBag
                      className="text-brand-purple-500"
                      size={34}
                    />

                    <h2 className="text-3xl font-black text-gray-800">

                      Order Summary

                    </h2>

                  </div>

                  {/* ITEMS */}

                  <div className="space-y-6">

                    {cartItems.map((item) => (

                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-brand-purple-50 rounded-2xl px-5 py-4"
                      >

                        <div>

                          <h3 className="text-lg font-black text-gray-800">

                            {item.title}

                          </h3>

                          <p className="text-gray-600 mt-1">

                            Qty: {item.quantity}

                          </p>

                        </div>

                        <h3 className="text-2xl font-black text-brand-purple-500">

                          ₹
                          {item.price *
                            item.quantity}

                        </h3>

                      </div>

                    ))}

                  </div>

                  {/* TOTAL */}

                  <div className="border-t border-gray-200 mt-8 pt-8">

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                      <h2 className="text-2xl font-bold text-gray-700">

                        Total Amount

                      </h2>

                      <h2 className="text-4xl font-black text-brand-purple-500">

                        ₹{total}

                      </h2>

                    </div>

                    {/* DELIVERY */}

                    <div className="flex items-center gap-3 mt-6 text-green-600 font-bold text-lg">

                      <Truck size={24} />

                      Free Delivery Available

                    </div>

                    {/* BUTTON */}

                    <button
                      onClick={placeOrder}
                      className="group mt-8 w-full bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 hover:from-brand-purple-600 hover:to-brand-gold-500 text-white py-4 rounded-full text-lg font-black shadow-2xl hover:scale-105 transition duration-300 flex items-center justify-center gap-3"
                    >

                      <Send
                        size={24}
                        className="group-hover:translate-x-1 transition duration-300"
                      />

                      Place Order (COD) 🚀

                    </button>

                  </div>

                </div>

              </div>

            </div>

          )}

        </div>

      </section>

      <Footer />

    </>

  );
};

export default Checkout;
