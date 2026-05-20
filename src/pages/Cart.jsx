import { useContext } from "react";

import { Link } from "react-router-dom";

import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { CartContext } from "../context/CartContext";

const Cart = () => {

  const {

    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,

  } = useContext(CartContext);

  /* TOTAL PRICE */

  const total = cartItems.reduce(

    (acc, item) =>

      acc +
      item.price *
        item.quantity,

    0

  );

  return (

    <>

      <Navbar />

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

                Kids Shopping Cart

              </span>

            </div>

            {/* TITLE */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">

              <span className="text-gray-800">

                Your Fun
              </span>

              <span className="block text-brand-purple-500 mt-3">

                Learning Cart 🛒

              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="text-gray-700 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-8 md:leading-9">

              Review your colorful Tamil learning books
              and continue your joyful learning adventure.

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

              <p className="text-gray-600 text-base md:text-lg mt-5 max-w-xl mx-auto leading-8">

                Looks like you haven’t added any Tamil
                learning books yet. Explore our colorful
                collection and start your learning journey.

              </p>

              <Link to="/shop">

                <button className="mt-8 bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 hover:from-brand-purple-600 hover:to-brand-gold-500 text-white px-8 py-4 rounded-full text-lg font-black shadow-2xl hover:scale-105 transition duration-300">

                  📚 Explore Books

                </button>

              </Link>

            </div>

          ) : (

            <div className="grid lg:grid-cols-3 gap-10">

              {/* LEFT SIDE - CART ITEMS */}

              <div className="lg:col-span-2 space-y-8">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="relative bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-5 md:p-6 overflow-hidden border-4 border-white hover:-translate-y-2 transition duration-500"
                  >

                    {/* BACKGROUND DECORATION */}

                    <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-purple-300 rounded-full opacity-20"></div>

                    <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-center relative z-10">

                      {/* IMAGE */}

                      <div className="relative">

                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-[18px] shadow-xl border-4 border-white"
                        />

                        <div className="absolute -top-3 -right-3 text-3xl animate-bounce">

                          🌈

                        </div>

                      </div>

                      {/* CONTENT */}

                      <div className="flex-1 w-full">

                        <h2 className="text-2xl md:text-3xl font-black text-gray-800 leading-tight">

                          {item.title}

                        </h2>

                        <p className="text-brand-purple-500 text-xl md:text-2xl font-black mt-3">

                          ₹{item.price}

                        </p>

                        {/* QUANTITY */}

                        <div className="flex items-center gap-3 mt-6">

                          <button
                            onClick={() =>
                              decreaseQty(item.id)
                            }
                            className="w-10 h-10 rounded-full bg-brand-gold-300 hover:bg-brand-gold-400 flex items-center justify-center shadow-lg transition duration-300"
                          >

                            <Minus size={20} />

                          </button>

                          <span className="text-xl font-black text-gray-800 min-w-[36px] text-center">

                            {item.quantity}

                          </span>

                          <button
                            onClick={() =>
                              increaseQty(item.id)
                            }
                            className="w-10 h-10 rounded-full bg-brand-teal-400 hover:bg-brand-teal-500 text-white flex items-center justify-center shadow-lg transition duration-300"
                          >

                            <Plus size={20} />

                          </button>

                        </div>

                      </div>

                      {/* PRICE + REMOVE */}

                      <div className="flex flex-col items-center gap-4">

                        <h2 className="text-2xl md:text-3xl font-black text-brand-teal-500">

                          ₹
                          {item.price *
                            item.quantity}

                        </h2>

                        <button
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="bg-brand-red-500 hover:bg-brand-red-600 text-white px-5 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition duration-300 hover:scale-105"
                        >

                          <Trash2 size={18} />

                          Remove

                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

              {/* RIGHT SIDE - SUMMARY */}

              <div>

                <div className="sticky top-28 relative bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-6 border-4 border-white overflow-hidden">

                  {/* BACKGROUND */}

                  <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-gold-300 rounded-full opacity-20"></div>

                  <div className="relative z-10">

                    {/* TITLE */}

                    <div className="flex items-center gap-3 mb-8">

                      <ShoppingBag
                        className="text-brand-purple-500"
                        size={32}
                      />

                      <h2 className="text-3xl font-black text-gray-800">

                        Summary

                      </h2>

                    </div>

                    {/* TOTAL ITEMS */}

                    <div className="flex justify-between items-center mb-6">

                      <span className="text-lg font-semibold text-gray-600">

                        Total Items

                      </span>

                      <span className="text-2xl font-black text-gray-800">

                        {cartItems.length}

                      </span>

                    </div>

                    {/* TOTAL PRICE */}

                    <div className="flex justify-between items-center border-t border-gray-200 pt-6">

                      <span className="text-xl font-bold text-gray-700">

                        Total Price

                      </span>

                      <span className="text-3xl md:text-4xl font-black text-brand-purple-500">

                        ₹{total}

                      </span>

                    </div>

                    {/* BUTTON */}

                    <Link to="/checkout">

                      <button className="w-full mt-8 bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 hover:from-brand-purple-600 hover:to-brand-gold-500 text-white px-6 py-4 rounded-full text-lg font-black shadow-2xl hover:scale-105 transition duration-300">

                        🚀 Proceed To Checkout

                      </button>

                    </Link>

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

export default Cart;
