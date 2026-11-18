import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const configuredSiteUrl = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_SITE_URL
  : import.meta.env.VITE_SITE_URL;
const SITE_URL = (
  configuredSiteUrl ||
  (import.meta.env.DEV ? window.location.origin : "https://kuviyam-ecommerce.vercel.app")
).replace(/\/$/, "");

const metadataForPath = (pathname) => {
  if (pathname === "/") {
    return {
      title: "Tamil Children's Books, Rhymes & Stories | Paachcharam",
      description: "Explore Tamil rhymes, stories and early learning books for young readers from Paachcharam and Kuviyam Publications.",
    };
  }
  if (pathname.startsWith("/product/")) {
    return {
      title: "Tamil Learning Book | Kuviyam Publications",
      description: "View book details, images and pricing from the Paachcharam Tamil learning collection.",
    };
  }
  if (pathname === "/shop") {
    return {
      title: "Shop Tamil Books for Young Readers | Paachcharam",
      description: "Browse Tamil rhymes, stories and early learning books from Paachcharam.",
    };
  }
  if (pathname === "/about") {
    return {
      title: "About Kuviyam Publications | Paachcharam",
      description: "Learn about Kuviyam Publications and the Paachcharam Tamil learning collection.",
    };
  }
  if (pathname === "/contact") {
    return {
      title: "Contact Kuviyam Publications",
      description: "Contact Kuviyam Publications about books, orders or the Paachcharam collection.",
    };
  }
  if (pathname === "/gallery") {
    return {
      title: "Gallery | Kuviyam Publications",
      description: "Browse photos and media from Kuviyam Publications.",
    };
  }
  if (pathname === "/blog") {
    return {
      title: "Journal | Kuviyam Publications",
      description: "Read articles and updates from Kuviyam Publications.",
    };
  }

  return {
    title: "Kuviyam Publications | Paachcharam",
    description: "Explore Tamil books and learning stories from Kuviyam Publications.",
    noindex: true,
  };
};

const setMetaContent = (selector, attribute, value) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(selector.startsWith("link") ? "link" : "meta");
    if (selector.startsWith("link")) element.rel = "canonical";
    else {
      const [, name, nameValue] = selector.match(/\[(name|property)="([^"]+)"\]/) || [];
      if (name && nameValue) element.setAttribute(name, nameValue);
    }
    document.head.append(element);
  }
  element.setAttribute(attribute, value);
};

const DocumentMetadata = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = metadataForPath(pathname);
    const canonicalUrl = `${SITE_URL}${pathname}`;

    document.title = metadata.title;
    setMetaContent('meta[name="description"]', "content", metadata.description);
    const noindex = metadata.noindex || import.meta.env.DEV;
    setMetaContent('meta[name="robots"]', "content", noindex ? "noindex, nofollow" : "index, follow");
    setMetaContent('meta[property="og:title"]', "content", metadata.title);
    setMetaContent('meta[property="og:description"]', "content", metadata.description);
    setMetaContent('meta[property="og:url"]', "content", canonicalUrl);
    setMetaContent('link[rel="canonical"]', "href", canonicalUrl);
  }, [pathname]);

  return null;
};

export default DocumentMetadata;
