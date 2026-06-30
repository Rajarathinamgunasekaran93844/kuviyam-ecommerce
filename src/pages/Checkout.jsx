import {
  useContext,
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

import {
  Sparkles,
  ShoppingBag,
  Truck,
  Send,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/cartContextValue";
import { AuthContext } from "../context/authContextValue";
import { orderAPI, paymentAPI } from "../utils/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [rzpInstance, setRzpInstance] = useState(null);

  /* ====================================== */
  /* AUTH CHECK */
  /* ====================================== */

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("🔐 Please login to continue", {
        position: "top-right",
        autoClose: 2200,
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [isAuthenticated, navigate]);

  /* ====================================== */
  /* HANDLE PAYMENT METHOD CHANGE */
  /* ====================================== */

  useEffect(() => {
    // If payment method changes, clean up Razorpay instance and reset loading
    if (rzpInstance) {
      try {
        rzpInstance.close();
      } catch (err) {
        // Ignore any errors when trying to close
      }
      setRzpInstance(null);
    }
    setLoading(false);
  }, [paymentMethod]);

  /* ====================================== */
  /* FORM STATE */
  /* ====================================== */

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  /* ====================================== */
  /* TOTAL */
  /* ====================================== */

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  /* ====================================== */
  /* HANDLE INPUT */
  /* ====================================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ====================================== */
  /* PLACE ORDER DIRECTLY (FOR COD) */
  /* ====================================== */
  const placeOrderDirect = async (orderData) => {
    try {
      await orderAPI.createOrder(orderData);
      toast.success("Order Placed Successfully 🎉", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
      clearCart();
      setTimeout(() => navigate("/success"), 2200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  /* ====================================== */
  /* RAZORPAY PAYMENT FUNCTION */
  /* ====================================== */
  const makeRazorpayPayment = async (orderData) => {
    try {
      // Create Razorpay order from backend
      const paymentRes = await paymentAPI.createOrder({
        amount: total,
      });
      const razorpayOrder = paymentRes.data.order;

      // Initialize Razorpay checkout
      const options = {
        key: "rzp_test_SlN41OijJX8EXL", // Your Razorpay test key
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Kuviyam Publications",
        description: "Tamil Learning Books",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          // Verify payment
          await paymentAPI.verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          // Now place the actual order
          await placeOrderDirect(orderData);
        },
        prefill: {
          name: formData.name,
          email: user?.email,
          contact: formData.phone
        },
        theme: {
          color: "#8b5cf6"
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setRzpInstance(null);
          }
        }
      };
      const rzp = new window.Razorpay(options);
      setRzpInstance(rzp);
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
      setLoading(false);
      setRzpInstance(null);
    }
  };

  /* ====================================== */
  /* PLACE ORDER */
  /* ====================================== */

  const placeOrder = async () => {
    /* EMPTY FORM */

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill all fields 🌈", {
        position: "top-right",
        autoClose: 2200,
        theme: "colored",
      });

      return;
    }

    /* EMPTY CART */

    if (cartItems.length === 0) {
      toast.error("Your cart is empty 🛒", {
        position: "top-right",
        autoClose: 2200,
        theme: "colored",
      });

      return;
    }

    setLoading(true);
    const orderData = {
      customer: formData,
      items: cartItems,
      paymentMethod,
    };
    if (paymentMethod === 'RAZORPAY') {
      await makeRazorpayPayment(orderData);
    } else {
      await placeOrderDirect(orderData);
    }
  };

  return (
    <>
      {/* ====================================== */}
      {/* NAVBAR */}
      {/* ====================================== */}

      <Navbar />

      {/* ====================================== */}
      {/* MAIN SECTION */}
      {/* ====================================== */}

      <section
        className="
          relative

          overflow-hidden

          min-h-screen

          px-4
          sm:px-5
          md:px-6

          py-16
          md:py-20

          bg-gradient-to-br
          from-brand-purple-100
          via-brand-gold-50
          to-brand-teal-100
        "
      >
        {/* ====================================== */}
        {/* FLOATING ELEMENTS */}
        {/* ====================================== */}

        <div
          className="
            absolute inset-0

            overflow-hidden

            pointer-events-none
          "
        >
          <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-40">
            ☁️
          </div>

          <div className="absolute top-20 right-16 text-5xl animate-pulse opacity-40">
            🌈
          </div>

          <div className="absolute bottom-10 left-20 text-5xl animate-bounce opacity-40">
            🧸
          </div>

          <div className="absolute bottom-16 right-10 text-5xl animate-pulse opacity-40">
            🚀
          </div>

          <div className="absolute top-1/2 left-1/3 text-4xl animate-spin opacity-30">
            ⭐
          </div>

          <div className="absolute top-1/3 right-1/4 text-5xl animate-bounce opacity-40">
            🎈
          </div>
        </div>

        {/* ====================================== */}
        {/* CONTAINER */}
        {/* ====================================== */}

        <div
          className="
            max-w-7xl

            mx-auto

            relative

            z-10
          "
        >
          {/* ====================================== */}
          {/* HEADER */}
          {/* ====================================== */}

          <div className="text-center mb-12 md:mb-16">
            {/* BADGE */}

            <div
              className="
                inline-flex items-center gap-2

                bg-white

                px-6 py-3

                rounded-full

                shadow-lg

                border-2 border-brand-purple-300

                mb-8
              "
            >
              <Sparkles
                className="
                  text-brand-purple-500
                "
                size={20}
              />

              <span
                className="
                  font-bold

                  text-brand-purple-500

                  tracking-wide
                "
              >
                Secure Kids Checkout
              </span>
            </div>

            {/* TITLE */}

            <h1
              className="
                text-4xl
                md:text-5xl
                lg:text-6xl

                font-black

                leading-tight
              "
            >
              <span className="text-gray-800">
                Complete Your
              </span>

              <span
                className="
                  block

                  text-brand-purple-500

                  mt-3
                "
              >
                Happy Order 🎉
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                text-gray-700

                text-lg
                md:text-xl

                mt-8

                max-w-3xl

                mx-auto

                leading-8
                md:leading-9
              "
            >
              Enter your details
              and place your order
              to start the fun
              Tamil learning
              journey.
            </p>
          </div>

          {/* ====================================== */}
          {/* EMPTY CART */}
          {/* ====================================== */}

          {cartItems.length ===
          0 ? (
            <div
              className="
                bg-white/90

                backdrop-blur-md

                rounded-[24px]

                shadow-2xl

                p-8
                md:p-12

                text-center

                border-4 border-white
              "
            >
              <div className="text-6xl md:text-7xl mb-6">
                🛒
              </div>

              <h2
                className="
                  text-3xl
                  md:text-4xl

                  font-black

                  text-gray-800
                "
              >
                Your Cart Is Empty
              </h2>

              <p
                className="
                  text-gray-600

                  text-base
                  md:text-lg

                  mt-5

                  leading-8

                  max-w-xl

                  mx-auto
                "
              >
                Add some colorful
                Tamil learning books
                before proceeding
                to checkout.
              </p>

              <Link to="/shop">
                <button
                  className="
                    mt-8

                    bg-gradient-to-r
                    from-brand-purple-500
                    to-brand-gold-400

                    hover:from-brand-purple-600
                    hover:to-brand-gold-500

                    text-white

                    px-8 py-4

                    rounded-full

                    text-lg

                    font-black

                    shadow-2xl

                    hover:scale-105

                    transition duration-300
                  "
                >
                  📚 Explore Books
                </button>
              </Link>
            </div>
          ) : (
            <div
              className="
                grid
                lg:grid-cols-2

                gap-8
                lg:gap-10
              "
            >
              {/* ====================================== */}
              {/* FORM SECTION */}
              {/* ====================================== */}

              <div
                className="
                  relative

                  bg-white/90

                  backdrop-blur-md

                  rounded-[24px]

                  shadow-2xl

                  p-6
                  md:p-8
                  lg:p-10

                  border-4 border-white

                  overflow-hidden
                "
              >
                {/* BACKGROUND */}

                <div
                  className="
                    absolute
                    -top-16
                    -right-16

                    w-40 h-40

                    bg-brand-purple-300

                    rounded-full

                    opacity-20
                  "
                ></div>

                <div className="relative z-10">
                  <h2
                    className="
                      text-3xl

                      font-black

                      text-gray-800

                      mb-8
                    "
                  >
                    📦 Delivery
                    Details
                  </h2>

                  {/* PAYMENT METHOD SELECTION */}
                  <div className="mb-8">
                    <h3 className="text-xl font-black text-gray-800 mb-4">
                      💳 Select Payment Method
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('COD')}
                        className={`p-4 rounded-2xl border-4 transition duration-300 ${
                          paymentMethod === 'COD'
                            ? 'border-brand-purple-500 bg-brand-purple-50'
                            : 'border-gray-200 bg-white hover:border-brand-purple-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">💰</div>
                          <div className="text-left">
                            <p className="font-black text-gray-800">Cash on Delivery</p>
                            <p className="text-sm text-gray-600">Pay when you receive</p>
                          </div>
                          {paymentMethod === 'COD' && (
                            <div className="ml-auto">
                              <div className="w-6 h-6 rounded-full bg-brand-purple-500 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('RAZORPAY')}
                        className={`p-4 rounded-2xl border-4 transition duration-300 ${
                          paymentMethod === 'RAZORPAY'
                            ? 'border-brand-purple-500 bg-brand-purple-50'
                            : 'border-gray-200 bg-white hover:border-brand-purple-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">💳</div>
                          <div className="text-left">
                            <p className="font-black text-gray-800">Online Payment</p>
                            <p className="text-sm text-gray-600">UPI, Card, Netbanking</p>
                          </div>
                          {paymentMethod === 'RAZORPAY' && (
                            <div className="ml-auto">
                              <div className="w-6 h-6 rounded-full bg-brand-purple-500 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* FORM */}

                  <div className="space-y-6">
                    {/* NAME */}

                    <div>
                      <label
                        className="
                          block

                          text-lg

                          font-bold

                          text-gray-700

                          mb-3
                        "
                      >
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={
                          formData.name
                        }
                        onChange={
                          handleChange
                        }
                        className="
                          w-full

                          bg-brand-purple-50

                          border-2 border-transparent

                          rounded-2xl

                          px-5 py-4

                          text-base
                          md:text-lg

                          outline-none

                          focus:border-brand-purple-400

                          transition duration-300
                        "
                      />
                    </div>

                    {/* PHONE */}

                    <div>
                      <label
                        className="
                          block

                          text-lg

                          font-bold

                          text-gray-700

                          mb-3
                        "
                      >
                        Phone Number
                      </label>

                      <input
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={
                          formData.phone
                        }
                        onChange={
                          handleChange
                        }
                        className="
                          w-full

                          bg-brand-gold-50

                          border-2 border-transparent

                          rounded-2xl

                          px-5 py-4

                          text-base
                          md:text-lg

                          outline-none

                          focus:border-brand-gold-400

                          transition duration-300
                        "
                      />
                    </div>

                    {/* ADDRESS */}

                    <div>
                      <label
                        className="
                          block

                          text-lg

                          font-bold

                          text-gray-700

                          mb-3
                        "
                      >
                        Delivery
                        Address
                      </label>

                      <textarea
                        name="address"
                        rows="6"
                        placeholder="Enter your address"
                        value={
                          formData.address
                        }
                        onChange={
                          handleChange
                        }
                        className="
                          w-full

                          bg-brand-teal-50

                          border-2 border-transparent

                          rounded-2xl

                          px-5 py-4

                          text-base
                          md:text-lg

                          outline-none

                          resize-none

                          focus:border-brand-teal-400

                          transition duration-300
                        "
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* ====================================== */}
              {/* SUMMARY */}
              {/* ====================================== */}

              <div
                className="
                  relative

                  bg-white/90

                  backdrop-blur-md

                  rounded-[24px]

                  shadow-2xl

                  p-6
                  md:p-8
                  lg:p-10

                  border-4 border-white

                  overflow-hidden
                "
              >
                {/* BACKGROUND */}

                <div
                  className="
                    absolute
                    -bottom-16
                    -left-16

                    w-40 h-40

                    bg-brand-gold-300

                    rounded-full

                    opacity-20
                  "
                ></div>

                <div className="relative z-10">
                  {/* TITLE */}

                  <div
                    className="
                      flex items-center gap-3

                      mb-8
                    "
                  >
                    <ShoppingBag
                      className="
                        text-brand-purple-500
                      "
                      size={34}
                    />

                    <h2
                      className="
                        text-3xl

                        font-black

                        text-gray-800
                      "
                    >
                      Order Summary
                    </h2>
                  </div>

                  {/* ITEMS */}

                  <div className="space-y-6">
                    {cartItems.map(
                      (item) => (
                        <div
                          key={
                            item.id
                          }
                          className="
                            flex flex-col
                            sm:flex-row

                            sm:justify-between
                            sm:items-center

                            gap-3

                            bg-brand-purple-50

                            rounded-2xl

                            px-5 py-4
                          "
                        >
                          <div>
                            <h3
                              className="
                                text-lg

                                font-black

                                text-gray-800
                              "
                            >
                              {
                                item.title
                              }
                            </h3>

                            <p
                              className="
                                text-gray-600

                                mt-1
                              "
                            >
                              Qty:
                              {" "}
                              {
                                item.quantity
                              }
                            </p>
                          </div>

                          <h3
                            className="
                              text-2xl

                              font-black

                              text-brand-purple-500
                            "
                          >
                            ₹
                            {item.price *
                              item.quantity}
                          </h3>
                        </div>
                      )
                    )}
                  </div>

                  {/* TOTAL */}

                  <div
                    className="
                      border-t border-gray-200

                      mt-8

                      pt-8
                    "
                  >
                    <div
                      className="
                        flex flex-col
                        sm:flex-row

                        sm:justify-between
                        sm:items-center

                        gap-3
                      "
                    >
                      <h2
                        className="
                          text-2xl

                          font-bold

                          text-gray-700
                        "
                      >
                        Total Amount
                      </h2>

                      <h2
                        className="
                          text-4xl

                          font-black

                          text-brand-purple-500
                        "
                      >
                        ₹{total}
                      </h2>
                    </div>

                    {/* DELIVERY */}

                    <div
                      className="
                        flex items-center gap-3

                        mt-6

                        text-green-600

                        font-bold

                        text-lg
                      "
                    >
                      <Truck
                        size={24}
                      />

                      Free Delivery
                      Available
                    </div>

                    {/* SECURITY */}

                    <div
                      className="
                        flex items-center gap-3

                        mt-4

                        text-brand-purple-500

                        font-bold

                        text-lg
                      "
                    >
                      <ShieldCheck
                        size={24}
                      />

                      Secure Checkout
                    </div>

                    {/* BUTTON */}

                    <button
                      onClick={placeOrder}
                      disabled={loading}
                      className="
                        group

                        mt-8

                        w-full

                        bg-gradient-to-r
                        from-brand-purple-500
                        to-brand-gold-400

                        hover:from-brand-purple-600
                        hover:to-brand-gold-500

                        text-white

                        py-4

                        rounded-full

                        text-lg

                        font-black

                        shadow-2xl

                        hover:scale-105

                        transition duration-300

                        flex items-center justify-center gap-3
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                      "
                    >
                      <Send
                        size={24}
                        className="
                          group-hover:translate-x-1

                          transition duration-300
                        "
                      />

                      {loading ? "PROCESSING PAYMENT..." : `Pay ₹${total} 🚀`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ====================================== */}
      {/* FOOTER */}
      {/* ====================================== */}

      <Footer />
    </>
  );
};

export default Checkout;
