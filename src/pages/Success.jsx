import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import {
  CheckCircle,
  Sparkles,
  Truck,
  Home,
  ShoppingBag,
} from "lucide-react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { orderAPI } from "../utils/api";
import { AuthContext } from "../context/authContextValue";

const Success = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  /* GET ORDER */
  useEffect(() => {
    let cancelled = false;

    const fetchLatestOrder = async () => {
      await Promise.resolve();

      if (cancelled) {
        return;
      }

      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const response = await orderAPI.getLatestOrder();
        if (!cancelled) {
          setOrder(response.data.order || response.data.latestOrder);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
        toast.error("Failed to load order details");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchLatestOrder();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="relative overflow-hidden min-h-screen flex items-center justify-center px-6 py-16 md:py-20 bg-gradient-to-br from-brand-purple-100 via-brand-gold-50 to-brand-teal-100">
          <div className="text-center">
            <div className="text-6xl animate-bounce mb-6">📚</div>
            <h2 className="text-2xl font-black text-gray-800">Loading order details...</h2>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center px-6 py-16 md:py-20 bg-gradient-to-br from-brand-purple-100 via-brand-gold-50 to-brand-teal-100">

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

        {/* MAIN CARD */}

        <div className="relative z-10 bg-white/90 backdrop-blur-md shadow-2xl rounded-[24px] p-6 md:p-10 max-w-4xl w-full border-4 border-white overflow-hidden">

          {/* BACKGROUND DECORATION */}

          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-purple-300 rounded-full opacity-20"></div>

          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-gold-300 rounded-full opacity-20"></div>

          <div className="relative z-10">

            {/* SUCCESS ICON */}

            <div className="flex justify-center">

              <div className="relative">

                <div className="absolute inset-0 bg-green-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>

                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center shadow-2xl border-4 border-white">

                  <CheckCircle
                    size={58}
                    className="text-white"
                  />

                </div>

              </div>

            </div>

            {/* BADGE */}

            <div className="flex justify-center mt-8">

              <div className="inline-flex items-center gap-2 bg-brand-purple-100 px-6 py-3 rounded-full shadow-lg">

                <Sparkles
                  className="text-brand-purple-500"
                  size={20}
                />

                <span className="font-bold text-brand-purple-500 tracking-wide">

                  Order Confirmed Successfully

                </span>

              </div>

            </div>

            {/* TITLE */}

            <h1 className="text-3xl md:text-4xl font-black text-center text-gray-800 mt-8 leading-tight">

              Your Order Is
              <span className="block text-green-500 mt-3">

                Successfully Placed 🎉

              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="mt-6 text-gray-700 text-base md:text-lg text-center leading-8 max-w-3xl mx-auto">

              Thank you for choosing Kuviyam Publications.
              Your colorful Tamil learning books will soon
              begin their happy journey to your home.

            </p>

            {/* INFO GRID */}

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-12">

              {/* CUSTOMER DETAILS */}

              <div className="bg-brand-purple-50 rounded-[22px] p-6 shadow-lg">

                <h2 className="text-2xl font-black text-brand-purple-500 mb-6">

                  👤 Customer Details

                </h2>

                <div className="space-y-4 text-base md:text-lg text-gray-700">

                  <p>

                    <strong>Name:</strong>{" "}
                    {order?.customer?.name}

                  </p>

                  <p>

                    <strong>Phone:</strong>{" "}
                    {order?.customer?.phone}

                  </p>

                  <p className="leading-8">

                    <strong>Address:</strong>{" "}
                    {order?.customer?.address}

                  </p>

                </div>

              </div>

              {/* DELIVERY INFO */}

              <div className="bg-brand-gold-50 rounded-[22px] p-6 shadow-lg">

                <h2 className="text-2xl font-black text-brand-gold-500 mb-6">

                  🚚 Delivery Info

                </h2>

                <div className="space-y-5 text-base md:text-lg text-gray-700">

                  <div className="flex items-center gap-4">

                    <Truck
                      className="text-green-500"
                      size={28}
                    />

                    <span>

                      Delivery Within 3-5 Days

                    </span>

                  </div>

                  <div className="flex items-center gap-4">

                    <ShoppingBag
                      className="text-brand-purple-500"
                      size={28}
                    />

                    <span>

                      Cash On Delivery Available

                    </span>

                  </div>

                  <div className="flex items-center gap-4">

                    🌈

                    <span>

                      Happy Tamil Learning Ahead

                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* ORDER ITEMS */}

            <div className="mt-12 bg-brand-teal-50 rounded-[22px] p-6 shadow-lg">

              <h2 className="text-2xl font-black text-brand-teal-500 mb-6">

                📚 Ordered Books

              </h2>

              <div className="space-y-5">

                {order?.items?.map(

                  (item) => (

                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-md"
                    >

                      <div>

                        <h3 className="text-xl font-black text-gray-800">

                          {item.title}

                        </h3>

                        <p className="text-gray-600 mt-1">

                          Quantity: {item.quantity}

                        </p>

                      </div>

                      <h3 className="text-2xl md:text-3xl font-black text-brand-purple-500">

                        ₹
                        {item.price *
                          item.quantity}

                      </h3>

                    </div>

                  )

                )}

              </div>

            </div>

            {/* TOTAL */}

            <div className="mt-12 text-center">

              <div className="inline-block bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 text-white px-8 md:px-10 py-5 rounded-full shadow-2xl">

                <h2 className="text-xl font-bold">

                  Total Amount

                </h2>

                <h2 className="text-4xl font-black mt-2">

                  ₹{order?.total}

                </h2>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12">

              <Link to="/">

                <button className="bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 hover:from-brand-purple-600 hover:to-brand-gold-500 text-white px-7 md:px-8 py-4 rounded-full text-base md:text-lg font-black shadow-2xl hover:scale-105 transition duration-300 flex items-center gap-3">

                  <Home size={24} />

                  Back To Home

                </button>

              </Link>

              <Link to="/shop">

                <button className="bg-white border-4 border-brand-gold-300 text-gray-800 px-7 md:px-8 py-4 rounded-full text-base md:text-lg font-black shadow-2xl hover:scale-105 transition duration-300 flex items-center gap-3">

                  📚 Continue Shopping

                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );
};

export default Success;
