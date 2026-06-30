import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("kuviyamToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
  updateProfile: (data) => api.put("/auth/profile", data),
  forgotPassword: (data) => api.post("/auth/forgot-password", data),
  resetPassword: (data) => api.post("/auth/reset-password", data),
};

// Product APIs
export const productAPI = {
  getProducts: (params) => api.get("/products", { params }),
  getProductById: (id) => api.get(`/products/${id}`),
};

// Cart APIs
export const cartAPI = {
  getCart: () => api.get("/cart"),
  addToCart: (data) => api.post("/cart", data),
  updateCartItem: (productId, quantity) => api.patch(`/cart/${productId}`, { quantity }),
  removeFromCart: (productId) => api.delete(`/cart/${productId}`),
  clearCart: () => api.delete("/cart"),
};

// Order APIs
export const orderAPI = {
  createOrder: (data) => api.post("/orders", data),
  getOrders: () => api.get("/orders"),
  getOrderById: (id) => api.get(`/orders/${id}`),
  getLatestOrder: () => api.get("/orders/latest"),
};

// Wishlist APIs
export const wishlistAPI = {
  getWishlist: () => api.get("/wishlist"),
  addToWishlist: (productId) => api.post("/wishlist", { productId }),
  removeFromWishlist: (productId) => api.delete(`/wishlist/${productId}`),
};

// Contact API
export const contactAPI = {
  sendMessage: (data) => api.post("/contact", data),
};

// Blog APIs
export const blogAPI = {
  getBlogs: () => api.get("/blogs"),
  getBlogBySlug: (slug) => api.get(`/blogs/${slug}`),
};

// Gallery APIs
export const galleryAPI = {
  getMedia: () => api.get("/gallery"),
  uploadMedia: (file, metadata, onUploadProgress) =>
    api.post("/gallery", file, {
      params: {
        title: metadata.title,
        category: metadata.category,
        originalName: file.name,
      },
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress,
    }),
  deleteMedia: (id) => api.delete(`/gallery/${id}`),
};

// OTP APIs
export const otpAPI = {
  sendOTP: (data) => api.post("/otp/send", data),
  verifyOTP: (data) => api.post("/otp/verify", data),
};

// Payment APIs
export const paymentAPI = {
  createOrder: (data) => api.post("/payment/create-order", data),
  verifyPayment: (data) => api.post("/payment/verify", data),
};

// Admin APIs
export const adminAPI = {
  getStats: () => api.get("/admin/stats"),
  getOrders: () => api.get("/admin/orders"),
  getUsers: () => api.get("/admin/users"),
  getProducts: () => api.get("/admin/products"),
  getWishlist: () => api.get("/admin/wishlist"),
  getMessages: () => api.get("/admin/messages"),
  getBlogs: () => api.get("/admin/blogs"),
  createBlog: (data) => api.post("/admin/blogs", data),
  updateBlog: (id, data) => api.put(`/admin/blogs/${id}`, data),
  deleteBlog: (id) => api.delete(`/admin/blogs/${id}`),
  createProduct: (data) => api.post("/admin/products", data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
};

export default api;
