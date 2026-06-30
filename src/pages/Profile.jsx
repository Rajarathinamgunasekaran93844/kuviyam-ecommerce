import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  Sparkles,
  ShieldCheck,
  Save,
  BookOpen,
  Truck,
} from "lucide-react";

import {
  toast,
} from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/authContextValue";
import { validatePhone, cleanPhone } from "../utils/validators";
import { orderAPI, wishlistAPI } from "../utils/api";

const getProfileFormData = (user) => ({
  name: user?.name || "",
  phone: user?.phone || "",
  address: user?.address || "",
});

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, updateProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(true);

  // Initialize form when user data loads
  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    const syncFormData = async () => {
      await Promise.resolve();
      if (!cancelled) {
        setFormData(getProfileFormData(user));
      }
    };

    syncFormData();

    return () => {
      cancelled = true;
    };
  }, [user]);

  // Fetch orders and wishlist when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        setOrdersLoading(true);
        const ordersRes = await orderAPI.getOrders();
        console.log("✅ Orders API Response:", ordersRes.data);
        setOrders(ordersRes.data.orders || ordersRes.data.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
        toast.error("Failed to load orders");
      } finally {
        setOrdersLoading(false);
      }

      try {
        setWishlistLoading(true);
        console.log("🔄 Fetching wishlist...");
        const wishlistRes = await wishlistAPI.getWishlist();
        console.log("✅ Wishlist API Response:", wishlistRes.data);
        // Handle both possible response formats
        const data = wishlistRes.data.wishlist || wishlistRes.data.data || [];
        console.log("✅ Parsed Wishlist Data:", data);
        setWishlist(data);
      } catch (err) {
        console.error("❌ Failed to fetch wishlist:", err);
        toast.error("Failed to load wishlist");
      } finally {
        setWishlistLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  // Remove from wishlist handler
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      setWishlist(prev => prev.filter(item => item.id !== productId));
      toast.success("Removed from wishlist!");
    } catch (err) {
      console.error("Failed to remove item:", err);
      toast.error("Failed to remove from wishlist");
    }
  };

  // Auth check
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

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully 👋", {
      position: "top-right",
      autoClose: 2200,
      theme: "colored",
    });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!validatePhone(formData.phone)) errors.phone = "Please enter a valid 10-digit phone number starting with 6-9.";
    if (!formData.address.trim()) errors.address = "Address is required.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);
    try {
      await updateProfile({
        ...formData,
        phone: cleanPhone(formData.phone)
      });
      toast.success("Profile updated successfully! ✨", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
      setEditing(false);
    } catch (err) {
      const backendError = err.response?.data?.message || "Failed to update profile";
      toast.error(backendError, {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    if (user) {
      setFormData(getProfileFormData(user));
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-brand-purple-50 via-brand-gold-50 to-brand-teal-50 px-4 sm:px-5 md:px-8 py-10 md:py-14">
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-40">☁️</div>
          <div className="absolute top-20 right-16 text-5xl animate-pulse opacity-40">🌈</div>
          <div className="absolute bottom-10 left-20 text-5xl animate-bounce opacity-40">🧸</div>
          <div className="absolute bottom-16 right-10 text-5xl animate-pulse opacity-40">🚀</div>
          <div className="absolute top-1/2 left-1/3 text-4xl animate-spin opacity-30">⭐</div>
        </div>

        {/* Main Container */}
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Profile Header */}
          <div className="relative overflow-hidden bg-white/90 backdrop-blur-md rounded-[32px] shadow-2xl p-6 md:p-10 border border-white">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-purple-300 rounded-full opacity-20"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-gold-300 rounded-full opacity-20"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-brand-purple-400 to-brand-teal-400 flex items-center justify-center text-white shadow-2xl shrink-0">
                <User size={60} />
                <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                  <Sparkles size={18} className="text-brand-gold-500" />
                </div>
              </div>

              <div className="text-center lg:text-left flex-1">
                <h1 className="text-3xl md:text-5xl font-black text-gray-900">Welcome Back 👋</h1>
                <h2 className="mt-4 text-2xl md:text-3xl font-black text-brand-purple-500">{user?.name || "Kuviyam User"}</h2>
                <p className="mt-4 text-base md:text-lg text-gray-600 leading-8">
                  Manage your Kuviyam Publications account, orders, wishlist, and Tamil learning collections.
                </p>
                <div className="mt-6 inline-flex items-center gap-3 bg-brand-purple-100 px-5 py-3 rounded-full">
                  <ShieldCheck size={20} className="text-brand-purple-500" />
                  <span className="font-bold text-brand-purple-500">{user?.email || "user@example.com"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-10">
            <div className="group bg-white/90 backdrop-blur-md rounded-[30px] p-8 shadow-xl hover:-translate-y-3 transition duration-300 border border-white">
              <div className="w-16 h-16 rounded-2xl bg-brand-purple-100 flex items-center justify-center">
                <ShoppingBag size={36} className="text-brand-purple-500" />
              </div>
              <h2 className="text-2xl font-black mt-6 text-gray-900">My Orders</h2>
              <p className="text-gray-600 mt-4 leading-7">Track all your purchased books ({orders.length} orders).</p>
            </div>

            <div className="group bg-white/90 backdrop-blur-md rounded-[30px] p-8 shadow-xl hover:-translate-y-3 transition duration-300 border border-white">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center">
                <Heart size={36} className="text-pink-500" />
              </div>
              <h2 className="text-2xl font-black mt-6 text-gray-900">Wishlist</h2>
              <p className="text-gray-600 mt-4 leading-7">Your saved favourite books ({wishlist.length} items).</p>
            </div>

            <div className="group bg-white/90 backdrop-blur-md rounded-[30px] p-8 shadow-xl hover:-translate-y-3 transition duration-300 border border-white">
              <div className="w-16 h-16 rounded-2xl bg-brand-teal-100 flex items-center justify-center">
                <MapPin size={36} className="text-brand-teal-500" />
              </div>
              <h2 className="text-2xl font-black mt-6 text-gray-900">Addresses</h2>
              <p className="text-gray-600 mt-4 leading-7">Manage shipping, billing, and delivery addresses.</p>
            </div>

            <button
              onClick={handleLogout}
              className="group text-left bg-white/90 backdrop-blur-md rounded-[30px] p-8 shadow-xl hover:-translate-y-3 transition duration-300 border border-white"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
                <LogOut size={36} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-black mt-6 text-gray-900">Logout</h2>
              <p className="text-gray-600 mt-4 leading-7">Sign out of your Kuviyam Publications account securely.</p>
            </button>
          </div>

          {/* My Orders Section */}
          <div className="mt-10">
            <div className="relative bg-white/90 backdrop-blur-md rounded-[32px] shadow-2xl p-6 md:p-10 border border-white overflow-hidden">
              <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-brand-purple-300 rounded-full opacity-20"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-brand-purple-100 rounded-2xl flex items-center justify-center">
                    <ShoppingBag size={24} className="text-brand-purple-500" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900">My Orders</h2>
                </div>

                {ordersLoading ? (
                  <div className="text-center py-12">
                    <div className="text-6xl animate-bounce mb-4">📦</div>
                    <p className="text-gray-600">Loading your orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h3>
                    <p className="text-gray-600">Start shopping to see your orders here!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-brand-purple-50 rounded-[20px] p-6 border border-brand-purple-100">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">Order #{order.id}</h3>
                            <p className="text-gray-600 text-sm">
                              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}
                            </p>
                          </div>
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${
                            order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                            order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                            'bg-brand-gold-100 text-brand-gold-700'
                          }`}>
                            <Truck size={16} />
                            {order.status || 'PLACED'}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-gray-500 text-sm font-semibold">Customer</p>
                            <p className="text-gray-800">{order.customer?.name || order.customerName}</p>
                            <p className="text-gray-600 text-sm">{order.customer?.phone || order.customerPhone}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm font-semibold">Total</p>
                            <p className="text-2xl font-black text-brand-purple-600">₹{Number(order.total || 0).toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-brand-purple-200">
                          <p className="text-gray-500 text-sm font-semibold mb-3">Items:</p>
                          <div className="space-y-2">
                            {(order.items || []).map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden">
                                    {item.productImage ? (
                                      <img src={item.productImage} alt={item.productTitle} className="w-full h-full object-cover" />
                                    ) : (
                                      <BookOpen size={20} className="text-brand-purple-400" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-800">{item.productTitle}</p>
                                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                                <p className="font-bold text-gray-700">₹{Number(item.lineTotal || item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* My Wishlist Section */}
          <div className="mt-10">
            <div className="relative bg-white/90 backdrop-blur-md rounded-[32px] shadow-2xl p-6 md:p-10 border border-white overflow-hidden">
              <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-300 rounded-full opacity-20"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center">
                    <Heart size={24} className="text-pink-500" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900">My Wishlist</h2>
                </div>

                {wishlistLoading ? (
                  <div className="text-center py-12">
                    <div className="text-6xl animate-bounce mb-4">❤️</div>
                    <p className="text-gray-600">Loading your wishlist...</p>
                  </div>
                ) : wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📖</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600">Browse books and save your favourites!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((product) => (
                      <div key={product.id} className="bg-white rounded-[20px] p-6 shadow-lg border border-gray-100 hover:shadow-xl transition duration-300">
                        <div className="w-full h-40 rounded-xl bg-brand-gold-50 flex items-center justify-center overflow-hidden mb-4">
                          {product.images && product.images[0] ? (
                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-contain" />
                          ) : (
                            <BookOpen size={40} className="text-brand-gold-500" />
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{product.category}</p>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-2xl font-black text-brand-purple-600">₹{Number(product.price).toFixed(2)}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 text-white font-bold rounded-full text-sm hover:scale-105 transition duration-300"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleRemoveFromWishlist(product.id)}
                            className="px-4 py-2 bg-red-100 text-red-600 font-bold rounded-full text-sm hover:bg-red-200 hover:scale-105 transition duration-300"
                          >
                            <Heart size={16} fill="currentColor" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Edit Form */}
          <div className="mt-10">
            <div className="relative bg-white/90 backdrop-blur-md rounded-[32px] shadow-2xl p-6 md:p-10 border border-white overflow-hidden">
              <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-brand-gold-300 rounded-full opacity-20"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-purple-100 rounded-2xl flex items-center justify-center">
                      <User size={24} className="text-brand-purple-500" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900">Edit Profile</h2>
                  </div>
                  {!editing && (
                    <button
                      onClick={() => setEditing(true)}
                      className="px-6 py-3 bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 hover:from-brand-purple-600 hover:to-brand-gold-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition duration-300 flex items-center gap-2"
                    >
                      <Sparkles size={20} />
                      Edit Details
                    </button>
                  )}
                </div>

                {editing ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-lg font-bold text-gray-800 mb-3">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full bg-brand-purple-50 border-2 ${fieldErrors.name ? 'border-red-400' : 'border-transparent'} rounded-2xl px-5 py-4 text-lg outline-none focus:border-brand-purple-400 transition duration-300`}
                          required
                        />
                        {fieldErrors.name && (
                          <p className="text-red-500 text-sm font-semibold mt-2">{fieldErrors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-lg font-bold text-gray-800 mb-3">Phone Number</label>
                        <input
                          type="text"
                          name="phone"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full bg-brand-gold-50 border-2 ${fieldErrors.phone ? 'border-red-400' : 'border-transparent'} rounded-2xl px-5 py-4 text-lg outline-none focus:border-brand-gold-400 transition duration-300`}
                          required
                        />
                        {fieldErrors.phone && (
                          <p className="text-red-500 text-sm font-semibold mt-2">{fieldErrors.phone}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-bold text-gray-800 mb-3">Delivery Address</label>
                      <textarea
                        name="address"
                        rows={4}
                        placeholder="Your full delivery address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={`w-full bg-brand-teal-50 border-2 ${fieldErrors.address ? 'border-red-400' : 'border-transparent'} rounded-2xl px-5 py-4 text-lg outline-none focus:border-brand-teal-400 transition duration-300 resize-none`}
                        required
                      />
                      {fieldErrors.address && (
                        <p className="text-red-500 text-sm font-semibold mt-2">{fieldErrors.address}</p>
                      )}
                    </div>

                    <div className="flex gap-4 justify-end pt-4">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={loading}
                        className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-full shadow-lg hover:bg-gray-50 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="group px-8 py-4 bg-gradient-to-r from-brand-purple-500 to-brand-gold-400 hover:from-brand-purple-600 hover:to-brand-gold-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save size={20} className="group-hover:scale-110 transition duration-300" />
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-brand-purple-50 rounded-[24px] p-6">
                      <h3 className="font-black text-gray-800 text-lg mb-2">Full Name</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{user?.name || "Not set"}</p>
                    </div>
                    <div className="bg-brand-gold-50 rounded-[24px] p-6">
                      <h3 className="font-black text-gray-800 text-lg mb-2">Phone Number</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{user?.phone || "Not set"}</p>
                    </div>
                    <div className="md:col-span-2 bg-brand-teal-50 rounded-[24px] p-6">
                      <h3 className="font-black text-gray-800 text-lg mb-2">Delivery Address</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{user?.address || "Not set"}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
