import { useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Film,
  Image as ImageIcon,
  LoaderCircle,
  Play,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { AuthContext } from "../context/authContextValue";
import { galleryAPI } from "../utils/api";
import inithuinithuBook from "../assets/inithuinithu_book.jpeg";
import arivuamudhuBook from "../assets/Arivuamudhu_book.png";

const featuredMedia = [
  {
    id: "featured-reading",
    url: inithuinithuBook,
    title: "Inithinithu Reading Time",
    category: "Kids",
    mediaType: "IMAGE",
    featured: true,
  },
  {
    id: "featured-collection",
    url: arivuamudhuBook,
    title: "Arivuamudhu Collection",
    category: "Books",
    mediaType: "IMAGE",
    featured: true,
  },
];

const filters = [
  { key: "ALL", label: "All media", icon: ImageIcon },
  { key: "IMAGE", label: "Images", icon: ImageIcon },
  { key: "VIDEO", label: "Videos", icon: Film },
];

const allowedFileTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/webm",
]);

const getErrorMessage = (error) =>
  error?.response?.data?.message || "Something went wrong. Please try again.";

const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";
  const megabytes = bytes / 1024 / 1024;
  return megabytes >= 1
    ? `${megabytes.toFixed(megabytes >= 10 ? 0 : 1)} MB`
    : `${Math.ceil(bytes / 1024)} KB`;
};

const GallerySkeleton = () => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <div
        key={item}
        className="h-96 animate-pulse rounded-[32px] bg-brand-purple-100"
      />
    ))}
  </div>
);

const AdminUploadPanel = ({ onUploaded }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Memories");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const chooseFile = (event) => {
    const selectedFile = event.target.files?.[0] || null;

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!allowedFileTypes.has(selectedFile.type)) {
      toast.error("Use a JPG, PNG, GIF, WebP, MP4, or WebM file.");
      event.target.value = "";
      setFile(null);
      return;
    }

    const limit = selectedFile.type.startsWith("image/")
      ? 10 * 1024 * 1024
      : 50 * 1024 * 1024;

    if (selectedFile.size > limit) {
      toast.error(
        `${selectedFile.type.startsWith("image/") ? "Images" : "Videos"} must be smaller than ${
          limit / 1024 / 1024
        } MB.`
      );
      event.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setProgress(0);

    if (!title) {
      setTitle(selectedFile.name.replace(/\.[^.]+$/, ""));
    }
  };

  const upload = async (event) => {
    event.preventDefault();

    if (!file) {
      toast.error("Choose an image or video first.");
      return;
    }

    const form = event.currentTarget;

    try {
      setUploading(true);
      setProgress(0);

      const response = await galleryAPI.uploadMedia(
        file,
        { title: title.trim(), category },
        (progressEvent) => {
          if (progressEvent.total) {
            setProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }
        }
      );

      onUploaded(response.data.media);
      toast.success("Gallery media uploaded successfully.");
      form.reset();
      setFile(null);
      setTitle("");
      setCategory("Memories");
      setProgress(0);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto mt-12 max-w-5xl rounded-[32px] border border-brand-lavender-200 bg-white/90 p-6 shadow-xl backdrop-blur md:p-8"
      aria-labelledby="gallery-upload-title"
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 font-black text-brand-teal-700">
            <ShieldCheck size={20} />
            Administrator controls
          </div>
          <h2 id="gallery-upload-title" className="text-2xl font-black text-gray-900">
            Upload gallery media
          </h2>
          <p className="mt-1 text-gray-600">
            Add an image up to 10 MB or an MP4/WebM video up to 50 MB.
          </p>
        </div>
        <div className="rounded-2xl bg-brand-teal-50 p-3 text-brand-teal-700">
          <Upload size={28} />
        </div>
      </div>

      <form onSubmit={upload} className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="md:col-span-2">
          <span className="mb-2 block font-black text-gray-800">Media file</span>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.gif,.webp,.mp4,.webm,image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm"
            onChange={chooseFile}
            disabled={uploading}
            className="block w-full cursor-pointer rounded-2xl border-2 border-dashed border-brand-lavender-300 bg-brand-purple-50 p-4 text-gray-700 file:mr-4 file:rounded-xl file:border-0 file:bg-brand-purple-600 file:px-4 file:py-2 file:font-black file:text-white hover:border-brand-purple-400"
          />
        </label>

        <label>
          <span className="mb-2 block font-black text-gray-800">Title</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={120}
            placeholder="A joyful reading moment"
            disabled={uploading}
            className="w-full rounded-2xl border border-brand-lavender-200 bg-white px-4 py-3 outline-none transition focus:border-brand-purple-500 focus:ring-4 focus:ring-brand-purple-100"
          />
        </label>

        <label>
          <span className="mb-2 block font-black text-gray-800">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            disabled={uploading}
            className="w-full rounded-2xl border border-brand-lavender-200 bg-white px-4 py-3 outline-none transition focus:border-brand-purple-500 focus:ring-4 focus:ring-brand-purple-100"
          >
            <option>Memories</option>
            <option>Kids</option>
            <option>Books</option>
            <option>Events</option>
            <option>Awards</option>
          </select>
        </label>

        {file && (
          <div className="flex items-center justify-between rounded-2xl bg-brand-gold-50 p-4 md:col-span-2">
            <div className="min-w-0">
              <p className="truncate font-black text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-600">
                {file.type.startsWith("video/") ? "Video" : "Image"} · {formatFileSize(file.size)}
              </p>
            </div>
            {file.type.startsWith("video/") ? <Film /> : <ImageIcon />}
          </div>
        )}

        {uploading && (
          <div className="md:col-span-2" aria-live="polite">
            <div className="mb-2 flex justify-between text-sm font-black text-brand-purple-700">
              <span>Uploading</span>
              <span>{progress}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-brand-purple-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-purple-500 to-brand-teal-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || uploading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-purple-600 to-brand-teal-500 px-6 py-4 font-black text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 md:col-span-2"
        >
          {uploading ? (
            <LoaderCircle size={20} className="animate-spin" />
          ) : (
            <Upload size={20} />
          )}
          {uploading ? "Uploading…" : "Upload to gallery"}
        </button>
      </form>
    </motion.section>
  );
};

const GalleryCard = ({ item, index, isAdmin, deleting, onOpen, onDelete }) => (
  <motion.article
    initial={{ opacity: 0, scale: 0.92 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
    whileHover={{ y: -8 }}
    className="group relative overflow-hidden rounded-[32px] border border-white bg-white shadow-xl"
  >
    <button
      type="button"
      onClick={onOpen}
      className="relative block h-96 w-full overflow-hidden text-left"
      aria-label={`Open ${item.mediaType === "VIDEO" ? "video" : "image"}: ${item.title}`}
    >
      {item.mediaType === "VIDEO" ? (
        <video
          src={item.url}
          muted
          playsInline
          preload="metadata"
          className="h-full w-full bg-black object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <img
          src={item.url}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-brand-purple-700 shadow-lg">
        {item.category || "Memories"}
      </div>

      {item.mediaType === "VIDEO" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-brand-purple-600 shadow-2xl transition group-hover:scale-110">
            <Play size={28} fill="currentColor" />
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h2 className="text-2xl font-black">{item.title}</h2>
        <p className="mt-1 font-semibold text-white/80">
          {item.mediaType === "VIDEO" ? "Play video" : "View image"}
        </p>
      </div>
    </button>

    {isAdmin && !item.featured && (
      <button
        type="button"
        onClick={onDelete}
        disabled={deleting}
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition hover:scale-105 hover:bg-red-700 disabled:opacity-60"
        aria-label={`Delete ${item.title}`}
      >
        {deleting ? (
          <LoaderCircle size={19} className="animate-spin" />
        ) : (
          <Trash2 size={19} />
        )}
      </button>
    )}
  </motion.article>
);

const Gallery = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = Boolean(user?.isAdmin);
  const [filter, setFilter] = useState("ALL");
  const [refreshKey, setRefreshKey] = useState(0);
  const [galleryState, setGalleryState] = useState({
    requestKey: -1,
    media: [],
    error: "",
  });
  const [currentIndex, setCurrentIndex] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loading = galleryState.requestKey !== refreshKey;
  const allMedia = useMemo(
    () => [...(loading ? [] : galleryState.media), ...featuredMedia],
    [galleryState.media, loading]
  );
  const filteredMedia = useMemo(
    () =>
      filter === "ALL"
        ? allMedia
        : allMedia.filter((item) => item.mediaType === filter),
    [allMedia, filter]
  );
  const selectedMedia =
    currentIndex === null ? null : filteredMedia[currentIndex] || null;

  useEffect(() => {
    let cancelled = false;

    galleryAPI
      .getMedia()
      .then((response) => {
        if (!cancelled) {
          setGalleryState({
            requestKey: refreshKey,
            media: response.data.media || [],
            error: "",
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setGalleryState({
            requestKey: refreshKey,
            media: [],
            error: getErrorMessage(error),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  useEffect(() => {
    if (!selectedMedia) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setCurrentIndex(null);
      if (event.key === "ArrowRight") {
        setCurrentIndex((index) => (index + 1) % filteredMedia.length);
      }
      if (event.key === "ArrowLeft") {
        setCurrentIndex(
          (index) => (index - 1 + filteredMedia.length) % filteredMedia.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filteredMedia.length, selectedMedia]);

  const chooseFilter = (nextFilter) => {
    setCurrentIndex(null);
    setFilter(nextFilter);
  };

  const nextMedia = () => {
    setCurrentIndex((index) => (index + 1) % filteredMedia.length);
  };

  const previousMedia = () => {
    setCurrentIndex(
      (index) => (index - 1 + filteredMedia.length) % filteredMedia.length
    );
  };

  const addUploadedMedia = (media) => {
    setGalleryState((state) => ({
      ...state,
      media: [media, ...state.media],
    }));
    setFilter("ALL");
  };

  const removeMedia = async (media) => {
    const confirmed = window.confirm(
      `Delete “${media.title}” from the gallery? This cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(media.id);
      await galleryAPI.deleteMedia(media.id);
      setGalleryState((state) => ({
        ...state,
        media: state.media.filter((item) => item.id !== media.id),
      }));
      setCurrentIndex(null);
      toast.success("Gallery media deleted.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-brand-purple-50 via-brand-gold-50 to-brand-teal-50">
      <Navbar />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-10 top-20 animate-bounce text-6xl opacity-20">🌈</div>
        <div className="absolute right-20 top-40 animate-pulse text-5xl opacity-20">⭐</div>
        <div className="absolute bottom-20 left-20 animate-bounce text-5xl opacity-20">📚</div>
        <div className="absolute bottom-32 right-16 animate-pulse text-6xl opacity-20">🎈</div>
      </div>

      <main className="relative z-10 px-5 pb-20 pt-20">
        <div className="mx-auto max-w-7xl">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white bg-white/80 px-6 py-3 shadow-xl backdrop-blur-md">
              <ImageIcon size={22} className="text-brand-purple-600" />
              <span className="text-lg font-black text-brand-purple-600">
                Paachcharam Memories
              </span>
            </div>
            <h1 className="mt-8 text-5xl font-black leading-tight text-gray-900 md:text-7xl">
              Magical
              <span className="block bg-gradient-to-r from-brand-purple-500 via-pink-500 to-brand-teal-500 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
              Explore joyful reading, learning, event, and book memories through photos and videos.
            </p>
          </motion.header>

          {isAdmin && <AdminUploadPanel onUploaded={addUploadedMedia} />}

          <section className="mt-16" aria-labelledby="gallery-media-title">
            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <h2 id="gallery-media-title" className="text-3xl font-black text-gray-900">
                  Gallery moments
                </h2>
                <p className="mt-2 text-gray-600">
                  {allMedia.length} {allMedia.length === 1 ? "memory" : "memories"} to explore
                </p>
              </div>

              <div className="flex flex-wrap gap-2" aria-label="Filter gallery media">
                {filters.map((item) => {
                  const Icon = item.icon;
                  const active = filter === item.key;

                  return (
                    <button
                      type="button"
                      key={item.key}
                      onClick={() => chooseFilter(item.key)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-black transition ${
                        active
                          ? "bg-brand-purple-600 text-white shadow-lg"
                          : "bg-white text-gray-700 shadow-sm hover:bg-brand-purple-50"
                      }`}
                    >
                      <Icon size={17} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {loading ? (
              <GallerySkeleton />
            ) : galleryState.error ? (
              <div className="rounded-[32px] border border-red-200 bg-white p-10 text-center shadow-lg">
                <RefreshCw size={36} className="mx-auto text-red-500" />
                <h3 className="mt-4 text-xl font-black text-gray-900">Unable to load the gallery</h3>
                <p className="mt-2 text-gray-600">{galleryState.error}</p>
                <button
                  type="button"
                  onClick={() => setRefreshKey((key) => key + 1)}
                  className="mt-5 rounded-2xl bg-brand-purple-600 px-5 py-3 font-black text-white"
                >
                  Try again
                </button>
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="rounded-[32px] border-2 border-dashed border-brand-lavender-300 bg-white/70 px-6 py-16 text-center">
                <Film size={44} className="mx-auto text-brand-purple-400" />
                <h3 className="mt-4 text-2xl font-black text-gray-900">No videos yet</h3>
                <p className="mt-2 text-gray-600">
                  {isAdmin
                    ? "Use the upload panel above to add the first one."
                    : "New gallery videos will appear here soon."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {filteredMedia.map((item, index) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    index={index}
                    isAdmin={isAdmin}
                    deleting={deletingId === item.id}
                    onOpen={() => setCurrentIndex(index)}
                    onDelete={() => removeMedia(item)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedMedia.title}
            onClick={() => setCurrentIndex(null)}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-10"
          >
            <button
              type="button"
              onClick={() => setCurrentIndex(null)}
              className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
              aria-label="Close gallery viewer"
            >
              <X size={26} />
            </button>

            {filteredMedia.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    previousMedia();
                  }}
                  className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 md:left-7"
                  aria-label="Previous gallery item"
                >
                  <ChevronLeft size={30} />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    nextMedia();
                  }}
                  className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 md:right-7"
                  aria-label="Next gallery item"
                >
                  <ChevronRight size={30} />
                </button>
              </>
            )}

            <motion.figure
              key={selectedMedia.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[88vh] max-w-[88vw] flex-col items-center"
            >
              {selectedMedia.mediaType === "VIDEO" ? (
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[76vh] max-w-full rounded-2xl bg-black shadow-2xl"
                />
              ) : (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="max-h-[76vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                />
              )}
              <figcaption className="mt-4 text-center text-white">
                <p className="text-xl font-black">{selectedMedia.title}</p>
                <p className="text-sm text-white/70">{selectedMedia.category}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Gallery;
