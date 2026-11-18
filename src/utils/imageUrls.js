const optimizedLegacyBookImages = new Map([
  ["/arivuamudhu_book.png", "/Arivuamudhu_book.optimized.jpg"],
  ["/inithuinithu_book.jpeg", "/inithuinithu_book.optimized.jpg"],
]);

export const toDisplayImageUrl = (imageUrl) => {
  if (typeof imageUrl !== "string" || !imageUrl) return imageUrl;

  try {
    const parsedUrl = new URL(imageUrl, "https://kuviyam-asset.invalid");
    if (parsedUrl.origin !== "https://kuviyam-asset.invalid") return imageUrl;
    return optimizedLegacyBookImages.get(parsedUrl.pathname.toLowerCase()) || imageUrl;
  } catch {
    return imageUrl;
  }
};
