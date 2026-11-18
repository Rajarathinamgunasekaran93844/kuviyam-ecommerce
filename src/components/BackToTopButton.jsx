import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frameRequested = false;

    const updateVisibility = () => {
      if (frameRequested) return;
      frameRequested = true;

      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 480);
        frameRequested = false;
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) return null;

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-24 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-brand-purple-800 text-white shadow-lg transition hover:-translate-y-1 hover:bg-brand-purple-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple-300 sm:right-6"
    >
      <ChevronUp size={22} aria-hidden="true" />
    </button>
  );
};

export default BackToTopButton;
