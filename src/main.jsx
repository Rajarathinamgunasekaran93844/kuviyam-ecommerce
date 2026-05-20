import React from "react";

import ReactDOM from "react-dom/client";

import {
  AnimatePresence,
} from "framer-motion";

import "react-toastify/dist/ReactToastify.css";

import App from "./App";

import "./index.css";

/* CONTEXTS */

import CartProvider from "./context/CartContext";

import {
  AuthProvider,
} from "./context/AuthContext";

/* ROOT ELEMENT */

const rootElement =
  document.getElementById(
    "root"
  );

/* RENDER APPLICATION */

ReactDOM.createRoot(
  rootElement
).render(
  <React.StrictMode>
    {/* PAGE ANIMATIONS */}

    <AnimatePresence
      mode="wait"
    >
      {/* AUTH CONTEXT */}

      <AuthProvider>
        {/* CART CONTEXT */}

        <CartProvider>
          {/* MAIN APP */}

          <App />
        </CartProvider>
      </AuthProvider>
    </AnimatePresence>
  </React.StrictMode>
);