import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  Suspense,
  lazy,
  useContext,
} from "react";

import PageLoader from "../components/PageLoader";

import { AuthContext } from "../context/authContextValue";

/* ====================================== */
/* LAZY PAGES */
/* ====================================== */

const Home = lazy(() =>
  import("../pages/Home")
);

const Shop = lazy(() =>
  import("../pages/Shop")
);

const Cart = lazy(() =>
  import("../pages/Cart")
);

const About = lazy(() =>
  import("../pages/About")
);

const Contact = lazy(() =>
  import("../pages/Contact")
);

const Checkout = lazy(() =>
  import("../pages/Checkout")
);

const Success = lazy(() =>
  import("../pages/Success")
);

const ProductDetails = lazy(() =>
  import(
    "../pages/ProductDetails"
  )
);

const Gallery = lazy(() =>
  import("../pages/Gallery")
);

const Blog = lazy(() =>
  import("../pages/Blog")
);

const Profile = lazy(() =>
  import("../pages/Profile")
);

const Login = lazy(() =>
  import("../pages/Login")
);

const Register = lazy(() =>
  import("../pages/Register")
);

const Admin = lazy(() =>
  import("../pages/Admin")
);

/* ====================================== */
/* PROTECTED ROUTE */
/* ====================================== */

const ProtectedRoute = ({
  children,
  requireAdmin = false,
}) => {
  const { isAuthenticated, user, loading } =
    useContext(AuthContext);

  if (loading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (requireAdmin && !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/* ====================================== */
/* 404 PAGE */
/* ====================================== */

const NotFound = () => {
  return (
    <div
      className="
        min-h-screen

        flex items-center justify-center

        bg-gradient-to-br
        from-brand-purple-100
        via-brand-gold-50
        to-brand-teal-100

        px-6
      "
    >
      <div className="text-center">
        {/* ICON */}

        <div className="text-7xl md:text-8xl animate-bounce">
          🌈
        </div>

        {/* TITLE */}

        <h1
          className="
            text-5xl md:text-6xl

            font-black

            text-brand-purple-500

            mt-8
          "
        >
          404
        </h1>

        {/* SUBTITLE */}

        <h2
          className="
            text-2xl md:text-4xl

            font-black

            text-gray-800

            mt-6

            leading-tight
          "
        >
          Oops! Page Not Found
        </h2>

        {/* DESCRIPTION */}

        <p
          className="
            text-lg md:text-xl

            text-gray-700

            mt-6

            max-w-2xl

            mx-auto

            leading-9
          "
        >
          The colorful learning page
          you are looking for seems
          to have wandered away into
          a rainbow 🌈
        </p>

        {/* BUTTON */}

        <a
          href="/"
          className="
            inline-flex items-center justify-center

            mt-10

            bg-gradient-to-r
            from-brand-purple-500
            to-brand-gold-400

            hover:from-brand-purple-600
            hover:to-brand-gold-500

            text-white

            px-8 py-4

            rounded-2xl

            text-lg

            font-black

            shadow-2xl

            hover:scale-105

            transition duration-300
          "
        >
          🏠 Back To Home
        </a>
      </div>
    </div>
  );
};

/* ====================================== */
/* APP ROUTES */
/* ====================================== */

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={<PageLoader />}
      >
        <Routes>
          {/* HOME */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* SHOP */}

          <Route
            path="/shop"
            element={<Shop />}
          />

          {/* PRODUCT DETAILS */}

          <Route
            path="/product/:id"
            element={
              <ProductDetails />
            }
          />

          {/* CART */}

          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* CHECKOUT */}

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          {/* SUCCESS */}

          <Route
            path="/success"
            element={<Success />}
          />

          {/* GALLERY */}

          <Route
            path="/gallery"
            element={<Gallery />}
          />

          {/* BLOG */}

          <Route
            path="/blog"
            element={<Blog />}
          />

          {/* LOGIN */}

          <Route
            path="/login"
            element={<Login />}
          />

          {/* REGISTER */}

          <Route
            path="/register"
            element={<Register />}
          />

          {/* PROFILE */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ADMIN DASHBOARD */}

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* ABOUT */}

          <Route
            path="/about"
            element={<About />}
          />

          {/* CONTACT */}

          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* OPTIONAL REDIRECT */}

          <Route
            path="/home"
            element={
              <Navigate to="/" />
            }
          />

          {/* 404 */}

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
