import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";

const Contact = () => {

  return (

    <>

      <Navbar />

      <section className="relative overflow-hidden min-h-screen py-16 md:py-20 bg-gradient-to-br from-brand-purple-100 via-brand-gold-50 to-brand-teal-100">

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

        <div className="container-custom relative z-10">

          {/* HEADER */}

          <div className="text-center mb-12 md:mb-16">

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-brand-purple-300 mb-8">

              <Sparkles
                className="text-brand-purple-500"
                size={20}
              />

              <span className="font-bold text-brand-purple-500 tracking-wide">

                Contact Kuviyam Publications

              </span>

            </div>

            {/* TITLE */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">

              <span className="text-gray-800">

                Let's Connect
              </span>

              <span className="block text-brand-purple-500 mt-3">

                With Happy Learning 🌈
              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="text-gray-700 text-lg md:text-xl mt-8 max-w-4xl mx-auto leading-8 md:leading-9">

              We would love to hear from you. Reach out to
              Kuviyam Publications for Tamil learning books,
              support, collaborations, and fun educational experiences.

            </p>

          </div>

          {/* CONTACT GRID */}

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* LEFT SIDE */}

            <div className="relative bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-6 md:p-8 lg:p-10 overflow-hidden border-4 border-white">

              {/* BACKGROUND DECORATION */}

              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-purple-300 rounded-full opacity-20"></div>

              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-gold-300 rounded-full opacity-20"></div>

              <div className="relative z-10">

                <h2 className="text-3xl font-black text-gray-800 mb-8">

                  📞 Contact Information

                </h2>

                <div className="space-y-6">

                  {/* EMAIL */}

                  <div className="flex items-start gap-4 bg-brand-purple-50 rounded-[20px] p-5 hover:-translate-y-2 transition duration-300 shadow-md">

                    <div className="w-14 h-14 rounded-2xl bg-brand-purple-400 flex items-center justify-center flex-shrink-0 shadow-lg">

                      <Mail
                        className="text-white"
                        size={26}
                      />

                    </div>

                    <div className="min-w-0">

                      <h3 className="text-xl font-black text-gray-800">

                        Email

                      </h3>

                      <p className="text-gray-700 mt-2 text-base md:text-lg break-words leading-8">

                        support@kuviyampublications.com

                      </p>

                    </div>

                  </div>

                  {/* PHONE */}

                  <div className="flex items-start gap-4 bg-brand-gold-50 rounded-[20px] p-5 hover:-translate-y-2 transition duration-300 shadow-md">

                    <div className="w-14 h-14 rounded-2xl bg-brand-gold-400 flex items-center justify-center flex-shrink-0 shadow-lg">

                      <Phone
                        className="text-white"
                        size={26}
                      />

                    </div>

                    <div>

                      <h3 className="text-xl font-black text-gray-800">

                        Phone

                      </h3>

                      <p className="text-gray-700 mt-2 text-base md:text-lg">

                        +91 9600021480

                      </p>

                    </div>

                  </div>

                  {/* LOCATION */}

                  <div className="flex items-start gap-4 bg-brand-teal-50 rounded-[20px] p-5 hover:-translate-y-2 transition duration-300 shadow-md">

                    <div className="w-14 h-14 rounded-2xl bg-brand-teal-400 flex items-center justify-center flex-shrink-0 shadow-lg">

                      <MapPin
                        className="text-white"
                        size={26}
                      />

                    </div>

                    <div>

                      <h3 className="text-xl font-black text-gray-800">

                        Location

                      </h3>

                      <p className="text-gray-700 mt-2 text-base md:text-lg leading-8">

                        Tamil Nadu, India

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE FORM */}

            <div className="relative bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-6 md:p-8 lg:p-10 overflow-hidden border-4 border-white">

              {/* DECORATION */}

              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-teal-300 rounded-full opacity-20"></div>

              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-purple-300 rounded-full opacity-20"></div>

              <div className="relative z-10">

                <h2 className="text-3xl font-black text-gray-800 mb-8">

                  ✉️ Send Message

                </h2>

                <form className="space-y-6">

                  {/* NAME */}

                  <div>

                    <label className="block text-gray-800 font-bold mb-3 text-lg">

                      Full Name

                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-brand-purple-50 border-2 border-transparent rounded-2xl px-5 py-4 text-base md:text-lg outline-none focus:border-brand-purple-400 transition duration-300"
                    />

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label className="block text-gray-800 font-bold mb-3 text-lg">

                      Email Address

                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-brand-gold-50 border-2 border-transparent rounded-2xl px-5 py-4 text-base md:text-lg outline-none focus:border-brand-gold-400 transition duration-300"
                    />

                  </div>

                  {/* MESSAGE */}

                  <div>

                    <label className="block text-gray-800 font-bold mb-3 text-lg">

                      Message

                    </label>

                    <textarea
                      rows="6"
                      placeholder="Write your message"
                      className="w-full bg-brand-teal-50 border-2 border-transparent rounded-2xl px-5 py-4 text-base md:text-lg outline-none focus:border-brand-teal-400 transition duration-300 resize-none"
                    ></textarea>

                  </div>

                  {/* BUTTON */}

                  <button
                    type="submit"
                    className="group bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 hover:from-brand-purple-600 hover:to-brand-gold-500 text-white px-8 py-4 rounded-full font-black flex items-center gap-3 transition duration-300 text-lg shadow-2xl hover:scale-105"
                  >

                    <Send
                      size={24}
                      className="group-hover:translate-x-1 transition duration-300"
                    />

                    Send Message 🚀

                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );
};

export default Contact;
