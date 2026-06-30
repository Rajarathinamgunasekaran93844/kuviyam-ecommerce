import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  FileText,
  Heart,
  LoaderCircle,
  Mail,
  Package,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  ShoppingBag,
  Sparkles,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/authContextValue";
import { toast } from "react-toastify";
import { adminAPI, galleryAPI } from "../utils/api";

const menuItems = [
  { key: "dashboard", title: "Dashboard", icon: TrendingUp, path: "/admin" },
  { key: "orders", title: "Orders", icon: ShoppingBag, path: "/admin/orders" },
  { key: "products", title: "Products", icon: Sparkles, path: "/admin/products" },
  { key: "blogs", title: "Blogs", icon: FileText, path: "/admin/blogs" },
  { key: "users", title: "Users", icon: Users, path: "/admin/users" },
  { key: "wishlist", title: "Wishlist", icon: Heart, path: "/admin/wishlist" },
  { key: "messages", title: "Messages", icon: Mail, path: "/admin/messages" },
];

const sectionConfig = {
  dashboard: {
    title: "Recent Orders",
    description: "The latest purchases across the store.",
    request: adminAPI.getOrders,
    responseKey: "orders",
  },
  orders: {
    title: "All Orders",
    description: "Review every customer order and its current status.",
    request: adminAPI.getOrders,
    responseKey: "orders",
  },
  products: {
    title: "Products",
    description: "All books currently available in the shop.",
    request: adminAPI.getProducts,
    responseKey: "products",
  },
  blogs: {
    title: "Blogs",
    description: "Create, update, publish, and delete blog posts.",
    request: adminAPI.getBlogs,
    responseKey: "data",
  },
  users: {
    title: "Users",
    description: "Registered customer and administrator accounts.",
    request: adminAPI.getUsers,
    responseKey: "users",
  },
  wishlist: {
    title: "Wishlist",
    description: "Books customers have saved for later.",
    request: adminAPI.getWishlist,
    responseKey: "wishlist",
  },
  messages: {
    title: "Messages",
    description: "Enquiries submitted through the contact form.",
    request: adminAPI.getMessages,
    responseKey: "messages",
  },
};

const formatMoney = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(Number(value) || 0);

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || "The admin data could not be loaded.";

const initialBlogForm = {
  title: "",
  excerpt: "",
  content: "",
  imageUrl: "",
  author: "",
  isPublished: false,
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="rounded-2xl border border-brand-lavender-100 bg-white p-5 shadow-lg">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="mb-1 text-sm font-bold text-gray-500">{title}</p>
        <h3 className="text-3xl font-black text-brand-purple-600">{value}</h3>
      </div>
      <div className={`rounded-2xl p-4 ${color}`}>{icon}</div>
    </div>
  </div>
);

const EmptyState = ({ icon: Icon, title, description }) => (
  <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-lavender-200 bg-brand-purple-50/60 px-6 py-12 text-center">
    <div className="mb-4 rounded-2xl bg-white p-4 text-brand-purple-500 shadow-sm">
      <Icon size={34} />
    </div>
    <h3 className="text-xl font-black text-gray-800">{title}</h3>
    <p className="mt-2 max-w-md text-gray-600">{description}</p>
  </div>
);

const LoadingState = () => (
  <div className="space-y-3" aria-label="Loading admin data">
    {[1, 2, 3].map((item) => (
      <div
        key={item}
        className="h-20 animate-pulse rounded-2xl bg-brand-purple-100/70"
      />
    ))}
  </div>
);

const StatusBadge = ({ status }) => {
  const normalizedStatus = String(status || "PLACED").toUpperCase();
  const colors = {
    DELIVERED: "bg-green-100 text-green-700",
    SHIPPED: "bg-blue-100 text-blue-700",
    CANCELLED: "bg-red-100 text-red-700",
    PLACED: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${
        colors[normalizedStatus] || "bg-gray-100 text-gray-700"
      }`}
    >
      {normalizedStatus}
    </span>
  );
};

const OrdersSection = ({ orders, compact = false }) => {
  const visibleOrders = compact ? orders.slice(0, 3) : orders;

  if (visibleOrders.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="No orders yet"
        description="Customer orders will appear here as soon as they are placed."
      />
    );
  }

  return (
    <div className="space-y-4">
      {visibleOrders.map((order) => (
        <article
          key={order.id}
          className="rounded-2xl border border-brand-lavender-200 bg-brand-purple-50/70 p-4"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-black text-brand-purple-700">#ORD{order.id}</p>
                <StatusBadge status={order.status} />
              </div>
              <p className="mt-1 font-bold text-gray-800">
                {order.customer?.name || "Customer"}
              </p>
              <p className="text-sm text-gray-500">
                {order.items?.length || 0} item(s) · {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-xl font-black text-gray-900">
                {formatMoney(order.total)}
              </p>
              <p className="text-sm font-bold text-gray-500">
                {order.paymentMethod || "COD"}
              </p>
            </div>
          </div>

          {!compact && (
            <div className="mt-4 grid gap-3 border-t border-brand-lavender-200 pt-4 md:grid-cols-2">
              <div className="text-sm text-gray-600">
                <p>
                  <span className="font-bold text-gray-800">Phone:</span>{" "}
                  {order.customer?.phone || "—"}
                </p>
                <p className="mt-1">
                  <span className="font-bold text-gray-800">Address:</span>{" "}
                  {order.customer?.address || "—"}
                </p>
              </div>
              <ul className="space-y-1 text-sm text-gray-600 md:text-right">
                {(order.items || []).map((item, index) => (
                  <li key={`${order.id}-${item.id || index}`}>
                    {item.title} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      ))}
    </div>
  );
};

const initialProductForm = {
  title: "",
  category: "",
  price: "",
  description: "",
  images: "",
};

const ProductsSection = ({ products, onChanged }) => {
  const [form, setForm] = useState(initialProductForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const resetForm = () => {
    setForm(initialProductForm);
    setSelectedFile(null);
    setEditingProduct(null);
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      category: product.category,
      price: product.price,
      description: product.description,
      images: product.images[0] || "",
    });
    setSelectedFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.category.trim() || !form.price) {
      toast.error("Title, category, and price are required.");
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = form.images.trim();

      if (selectedFile) {
        // First upload the file to gallery
        const uploadResponse = await galleryAPI.uploadMedia(
          selectedFile,
          {
            title: `${form.title.trim()} - Product Image`,
            category: "Products"
          }
        );
        imageUrl = uploadResponse.data.media.url;
      }

      const payload = {
        title: form.title.trim(),
        category: form.category.trim(),
        price: Number(form.price),
        description: form.description.trim(),
        images: imageUrl ? [imageUrl] : [],
      };

      if (editingProduct) {
        await adminAPI.updateProduct(editingProduct.id, payload);
        toast.success("Product updated successfully!");
      } else {
        await adminAPI.createProduct(payload);
        toast.success("Product added successfully!");
      }

      resetForm();
      onChanged();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProduct = async (product) => {
    const confirmed = window.confirm(`Delete "${product.title}" permanently?`);
    if (!confirmed) return;

    setDeletingId(product.id);

    try {
      await adminAPI.deleteProduct(product.id);
      toast.success("Product deleted successfully!");
      onChanged();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Create/Edit Product Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-brand-lavender-200 bg-brand-purple-50/70 p-5"
      >
        <h3 className="text-xl font-black text-gray-900 mb-4">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-black text-gray-700">
              Title
            </span>
            <input
              name="title"
              value={form.title}
              onChange={updateField}
              className="w-full rounded-xl border border-brand-lavender-200 bg-white px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-brand-purple-500 focus:ring-4 focus:ring-brand-purple-100"
              placeholder="Book title"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-black text-gray-700">
              Category
            </span>
            <input
              name="category"
              value={form.category}
              onChange={updateField}
              className="w-full rounded-xl border border-brand-lavender-200 bg-white px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-brand-purple-500 focus:ring-4 focus:ring-brand-purple-100"
              placeholder="e.g. Children's Books"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-black text-gray-700">
              Price (₹)
            </span>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={updateField}
              className="w-full rounded-xl border border-brand-lavender-200 bg-white px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-brand-purple-500 focus:ring-4 focus:ring-brand-purple-100"
              placeholder="299"
              min="0"
              step="0.01"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-black text-gray-700">
              Image URL (optional)
            </span>
            <input
              name="images"
              value={form.images}
              onChange={updateField}
              disabled={selectedFile !== null}
              className="w-full rounded-xl border border-brand-lavender-200 bg-white px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-brand-purple-500 focus:ring-4 focus:ring-brand-purple-100 disabled:opacity-50"
              placeholder="https://example.com/book.jpg"
            />
          </label>
        </div>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-black text-gray-700">
            Upload Image (optional)
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileChange}
            disabled={form.images.trim().length > 0}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-black file:bg-brand-purple-600 file:text-white hover:file:bg-brand-purple-700 disabled:opacity-50"
          />
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {selectedFile.name}
            </p>
          )}
        </label>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-black text-gray-700">
            Description (optional)
          </span>
          <textarea
            name="description"
            value={form.description}
            onChange={updateField}
            rows={3}
            className="w-full resize-y rounded-xl border border-brand-lavender-200 bg-white px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-brand-purple-500 focus:ring-4 focus:ring-brand-purple-100"
            placeholder="Product description..."
          />
        </label>

        <div className="mt-5 flex justify-between items-center">
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-black text-gray-700 border border-brand-lavender-200 shadow-sm transition hover:bg-brand-purple-100"
          >
            {editingProduct ? "Cancel" : "Clear"}
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple-500 to-brand-teal-500 px-6 py-3 font-black text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : editingProduct ? (
              <Save size={18} />
            ) : (
              <Plus size={18} />
            )}
            {submitting
              ? editingProduct
              ? "Updating Product..."
              : "Adding Product..."
              : editingProduct
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>
      </form>

      {/* Products List */}
      {products.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No products found"
          description="Products added to the store will be listed here."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="flex flex-col gap-4 rounded-3xl border border-brand-lavender-200 bg-white p-5 shadow-lg hover:shadow-xl transition"
            >
              <div className="flex flex-col gap-4">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-40 w-full rounded-2xl bg-brand-purple-50 object-contain"
                  />
                ) : (
                  <div className="flex h-40 w-full items-center justify-center rounded-2xl bg-brand-purple-50 text-brand-purple-500">
                    <Package size={40} />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-wide text-brand-teal-700 mb-1">
                    {product.category || "Uncategorised"}
                  </p>
                  <h3 className="font-black text-gray-900 text-lg line-clamp-2">{product.title}</h3>
                  <p className="mt-2 text-2xl font-black text-brand-purple-700">
                    {formatMoney(product.price)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Product #{product.id}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-auto">
                <button
                  type="button"
                  onClick={() => editProduct(product)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-purple-100 px-4 py-3 font-black text-brand-purple-700 transition hover:bg-brand-purple-200"
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteProduct(product)}
                  disabled={deletingId === product.id}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-100 px-4 py-3 font-black text-red-700 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deletingId === product.id ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

const BlogsSection = ({ blogs, onChanged }) => {
  const [form, setForm] = useState(initialBlogForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [busyBlogId, setBusyBlogId] = useState(null);
  const isEditing = Boolean(editingId);

  const resetForm = () => {
    setForm(initialBlogForm);
    setEditingId(null);
  };

  const updateField = (event) => {
    const { checked, name, type, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const editBlog = (blog) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      imageUrl: blog.imageUrl || "",
      author: blog.author || "",
      isPublished: Boolean(blog.isPublished),
    });
  };

  const saveBlog = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      imageUrl: form.imageUrl.trim(),
      author: form.author.trim(),
      isPublished: form.isPublished,
    };

    setSubmitting(true);

    try {
      if (isEditing) {
        await adminAPI.updateBlog(editingId, payload);
        toast.success("Blog updated successfully.");
      } else {
        await adminAPI.createBlog(payload);
        toast.success("Blog created successfully.");
      }

      resetForm();
      onChanged();
    } catch (requestError) {
      toast.error(getErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublished = async (blog) => {
    setBusyBlogId(blog.id);

    try {
      await adminAPI.updateBlog(blog.id, {
        isPublished: !blog.isPublished,
      });
      toast.success(blog.isPublished ? "Blog unpublished." : "Blog published.");
      onChanged();
    } catch (requestError) {
      toast.error(getErrorMessage(requestError));
    } finally {
      setBusyBlogId(null);
    }
  };

  const deleteBlog = async (blog) => {
    const confirmed = window.confirm(`Delete "${blog.title}" permanently?`);

    if (!confirmed) return;

    setBusyBlogId(blog.id);

    try {
      await adminAPI.deleteBlog(blog.id);
      toast.success("Blog deleted successfully.");

      if (editingId === blog.id) {
        resetForm();
      }

      onChanged();
    } catch (requestError) {
      toast.error(getErrorMessage(requestError));
    } finally {
      setBusyBlogId(null);
    }
  };

  const previewText = (blog) => {
    const text = blog.excerpt || blog.content || "";
    return text.length > 150 ? `${text.slice(0, 150).trim()}...` : text;
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={saveBlog}
        className="rounded-2xl border border-brand-lavender-200 bg-brand-purple-50/70 p-5"
      >
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-black text-gray-900">
              {isEditing ? "Edit Blog" : "Create Blog"}
            </h3>
            <p className="mt-1 text-sm font-semibold text-gray-600">
              Only admins can save changes here.
            </p>
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 font-black text-gray-700 shadow-sm transition hover:bg-brand-purple-100"
            >
              <X size={17} />
              Cancel
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-black text-gray-700">
              Title
            </span>
            <input
              name="title"
              value={form.title}
              onChange={updateField}
              className="w-full rounded-xl border border-brand-lavender-200 bg-white px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-brand-purple-500 focus:ring-4 focus:ring-brand-purple-100"
              placeholder="Blog title"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-black text-gray-700">
              Author
            </span>
            <input
              name="author"
              value={form.author}
              onChange={updateField}
              className="w-full rounded-xl border border-brand-lavender-200 bg-white px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-brand-purple-500 focus:ring-4 focus:ring-brand-purple-100"
              placeholder="Kuviyam Publications"
            />
          </label>
        </div>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-black text-gray-700">
            Image URL
          </span>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={updateField}
            className="w-full rounded-xl border border-brand-lavender-200 bg-white px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-brand-purple-500 focus:ring-4 focus:ring-brand-purple-100"
            placeholder="https://example.com/blog-image.jpg"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-black text-gray-700">
            Excerpt
          </span>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={updateField}
            rows={3}
            className="w-full resize-y rounded-xl border border-brand-lavender-200 bg-white px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-brand-purple-500 focus:ring-4 focus:ring-brand-purple-100"
            placeholder="Short summary shown on the blog page"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-black text-gray-700">
            Content
          </span>
          <textarea
            name="content"
            value={form.content}
            onChange={updateField}
            rows={8}
            className="w-full resize-y rounded-xl border border-brand-lavender-200 bg-white px-4 py-3 font-semibold leading-7 text-gray-800 outline-none transition focus:border-brand-purple-500 focus:ring-4 focus:ring-brand-purple-100"
            placeholder="Write the full blog content"
          />
        </label>

        <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <label className="inline-flex items-center gap-3 font-black text-gray-700">
            <input
              type="checkbox"
              name="isPublished"
              checked={form.isPublished}
              onChange={updateField}
              className="h-5 w-5 rounded border-brand-lavender-300 text-brand-purple-600"
            />
            Publish blog
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple-500 to-brand-teal-500 px-6 py-3 font-black text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isEditing ? <Save size={18} /> : <Plus size={18} />}
            {submitting ? "Saving..." : isEditing ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </form>

      {blogs.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No blogs yet"
          description="Created blog posts will appear here."
        />
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="rounded-2xl border border-brand-lavender-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        blog.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {blog.isPublished ? "PUBLISHED" : "DRAFT"}
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      {formatDate(blog.updatedAt)}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-black text-gray-900">
                    {blog.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gray-500">
                    {blog.author || "Kuviyam Publications"}
                  </p>
                  <p className="mt-3 line-clamp-3 whitespace-pre-line text-gray-700">
                    {previewText(blog)}
                  </p>
                </div>

                {blog.imageUrl ? (
                  <img
                    src={blog.imageUrl}
                    alt=""
                    className="h-28 w-full rounded-xl bg-brand-purple-50 object-cover lg:w-40"
                  />
                ) : (
                  <div className="flex h-28 w-full items-center justify-center rounded-xl bg-brand-purple-50 text-brand-purple-500 lg:w-40">
                    <FileText size={30} />
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-wrap gap-3 border-t border-brand-lavender-100 pt-4">
                <button
                  type="button"
                  onClick={() => editBlog(blog)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-purple-100 px-4 py-2 font-black text-brand-purple-700 transition hover:bg-brand-purple-200"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => togglePublished(blog)}
                  disabled={busyBlogId === blog.id}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-teal-100 px-4 py-2 font-black text-brand-teal-800 transition hover:bg-brand-teal-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {blog.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                  {blog.isPublished ? "Unpublish" : "Publish"}
                </button>

                <button
                  type="button"
                  onClick={() => deleteBlog(blog)}
                  disabled={busyBlogId === blog.id}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-100 px-4 py-2 font-black text-red-700 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

const UsersSection = ({ users }) => {
  if (users.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No users found"
        description="Newly registered accounts will be listed here."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-brand-lavender-200">
      <table className="w-full min-w-160 text-left">
        <thead className="bg-brand-purple-50 text-sm text-brand-purple-800">
          <tr>
            <th className="px-4 py-3 font-black">User</th>
            <th className="px-4 py-3 font-black">Contact</th>
            <th className="px-4 py-3 font-black">Role</th>
            <th className="px-4 py-3 font-black">Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-lavender-100 bg-white">
          {users.map((account) => (
            <tr key={account.id}>
              <td className="px-4 py-4">
                <p className="font-black text-gray-900">{account.name}</p>
                <p className="text-xs text-gray-500">User #{account.id}</p>
              </td>
              <td className="px-4 py-4 text-sm text-gray-600">
                <p>{account.email}</p>
                <p>{account.phone || "No phone number"}</p>
              </td>
              <td className="px-4 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black ${
                    account.isAdmin
                      ? "bg-brand-gold-100 text-brand-gold-800"
                      : "bg-brand-teal-100 text-brand-teal-800"
                  }`}
                >
                  {account.isAdmin ? "ADMIN" : "CUSTOMER"}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-gray-600">
                {formatDate(account.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const WishlistSection = ({ wishlist }) => {
  if (wishlist.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="No wishlist items"
        description="Books saved by customers will appear here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {wishlist.map((entry) => (
        <article
          key={entry.id}
          className="flex flex-col justify-between gap-4 rounded-2xl border border-brand-lavender-200 bg-white p-4 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-pink-100 p-3 text-pink-600">
              <Heart size={24} fill="currentColor" />
            </div>
            <div>
              <h3 className="font-black text-gray-900">
                {entry.product?.title || "Unavailable product"}
              </h3>
              <p className="text-sm text-gray-600">
                Saved by {entry.user?.name || "Unknown user"}
                {entry.user?.email ? ` · ${entry.user.email}` : ""}
              </p>
            </div>
          </div>
          <div className="sm:text-right">
            <p className="font-black text-brand-purple-700">
              {formatMoney(entry.product?.price)}
            </p>
            <p className="text-xs text-gray-500">{formatDate(entry.createdAt)}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

const MessagesSection = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <EmptyState
        icon={Mail}
        title="No messages yet"
        description="Contact form enquiries will appear here."
      />
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <article
          key={message.id}
          className="rounded-2xl border border-brand-lavender-200 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div>
              <h3 className="font-black text-gray-900">{message.name}</h3>
              <a
                href={`mailto:${message.email}`}
                className="text-sm font-bold text-brand-teal-700 hover:underline"
              >
                {message.email}
              </a>
            </div>
            <p className="text-xs text-gray-500">{formatDate(message.createdAt)}</p>
          </div>
          <p className="mt-4 whitespace-pre-wrap text-gray-700">{message.message}</p>
        </article>
      ))}
    </div>
  );
};

const Admin = () => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const activeItem =
    menuItems.find((item) => item.path === pathname) || menuItems[0];
  const activeSection = activeItem.key;
  const currentConfig = sectionConfig[activeSection];

  const [stats, setStats] = useState({
    orders: 0,
    users: 0,
    products: 0,
    revenue: 0,
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [sectionResult, setSectionResult] = useState({
    requestKey: "",
    data: [],
    error: "",
  });
  const requestKey = `${activeSection}:${refreshKey}`;
  const loading = sectionResult.requestKey !== requestKey;
  const sectionData = loading ? [] : sectionResult.data;
  const error = loading ? "" : sectionResult.error;

  useEffect(() => {
    let cancelled = false;

    adminAPI
      .getStats()
      .then((response) => {
        if (!cancelled) setStats(response.data.stats);
      })
      .catch((requestError) => {
        if (!cancelled) toast.error(getErrorMessage(requestError));
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  useEffect(() => {
    let cancelled = false;

    currentConfig
      .request()
      .then((response) => {
        if (!cancelled) {
          setSectionResult({
            requestKey,
            data: response.data[currentConfig.responseKey] || [],
            error: "",
          });
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          const message = getErrorMessage(requestError);
          setSectionResult({ requestKey, data: [], error: message });
          toast.error(message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentConfig, requestKey]);

  const refresh = () => {
    setRefreshKey((key) => key + 1);
  };

  const renderSection = () => {
    if (loading) return <LoadingState />;

    if (error) {
      return (
        <EmptyState
          icon={RefreshCw}
          title="Unable to load this section"
          description={error}
        />
      );
    }

    switch (activeSection) {
      case "products":
        return <ProductsSection products={sectionData} onChanged={refresh} />;
      case "blogs":
        return <BlogsSection blogs={sectionData} onChanged={refresh} />;
      case "users":
        return <UsersSection users={sectionData} />;
      case "wishlist":
        return <WishlistSection wishlist={sectionData} />;
      case "messages":
        return <MessagesSection messages={sectionData} />;
      case "orders":
        return <OrdersSection orders={sectionData} />;
      default:
        return <OrdersSection orders={sectionData} compact />;
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-brand-purple-50 via-brand-gold-50 to-brand-teal-50 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 rounded-3xl border border-brand-lavender-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <h1 className="text-3xl font-black text-gray-900 sm:text-4xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 font-semibold text-gray-600">
              Welcome back, {user?.name || "Admin"}! 👋
            </p>
          </header>

          <section
            aria-label="Store statistics"
            className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <StatCard
              title="Total Orders"
              value={stats.orders}
              icon={<ShoppingBag size={26} className="text-white" />}
              color="bg-gradient-to-r from-brand-purple-500 to-brand-purple-600"
            />
            <StatCard
              title="Total Users"
              value={stats.users}
              icon={<Users size={26} className="text-white" />}
              color="bg-gradient-to-r from-brand-teal-500 to-brand-teal-600"
            />
            <StatCard
              title="Total Products"
              value={stats.products}
              icon={<Sparkles size={26} className="text-white" />}
              color="bg-gradient-to-r from-brand-gold-500 to-brand-gold-600"
            />
            <StatCard
              title="Total Revenue"
              value={formatMoney(stats.revenue)}
              icon={<TrendingUp size={26} className="text-white" />}
              color="bg-gradient-to-r from-emerald-500 to-green-600"
            />
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <aside className="lg:col-span-1">
              <nav
                aria-label="Admin sections"
                className="rounded-3xl border border-brand-lavender-200 bg-white/90 p-4 shadow-xl backdrop-blur lg:sticky lg:top-32"
              >
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.key === activeSection;

                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          aria-current={isActive ? "page" : undefined}
                          className={`flex items-center gap-3 rounded-2xl px-4 py-4 font-bold transition duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-brand-purple-500 to-brand-teal-500 text-white shadow-lg"
                              : "text-gray-700 hover:bg-brand-purple-50"
                          }`}
                        >
                          <Icon size={20} />
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            <section className="lg:col-span-3">
              <div className="rounded-3xl border border-brand-lavender-200 bg-white/90 p-5 shadow-xl backdrop-blur sm:p-6">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">
                      {currentConfig.title}
                    </h2>
                    <p className="mt-1 text-gray-600">{currentConfig.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={refresh}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-brand-purple-100 px-4 py-2 font-black text-brand-purple-700 transition hover:bg-brand-purple-200 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
                  >
                    <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
                    Refresh
                  </button>
                </div>

                {renderSection()}

                {activeSection === "dashboard" && !loading && !error && (
                  <Link
                    to="/admin/orders"
                    className="mt-6 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-brand-purple-500 to-brand-teal-500 py-4 font-black text-white shadow-lg transition hover:scale-[1.01]"
                  >
                    View All Orders
                  </Link>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Admin;
