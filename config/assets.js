// =============================================================================
// ASSET CONFIGURATION
// -----------------------------------------------------------------------------
// All image and audio paths in ONE place. Drop your real files into /public at
// the matching paths and they appear automatically. Until then, the site shows
// elegant styled placeholders (never broken-image icons).
// =============================================================================

export const weddingAssets = {
  // Couple photographs.
  // These paths are used BOTH as foreground images AND as background images.
  // (See CoupleSection.jsx for the clearly-commented background-image spots.)
  bride: "/images/bride.jpg", // CHANGE BRIDE IMAGE HERE
  groom: "/images/groom.jpg", // CHANGE GROOM IMAGE HERE
  couple: "/images/couple.jpg", // CHANGE COUPLE IMAGE HERE

  // Optional photo of the reception hall / mandap (shown in Reception Details).
  receptionHall: "/images/reception-hall.jpg", // CHANGE RECEPTION HALL IMAGE HERE

  // Hero background — vintage sepia South-Indian temple courtyard art. Already
  // ivory/sepia toned, so it blends into the page's ivory theme. CHANGE HERE.
  heroBackground: "/images/hero-temple.png",

  // Background music (optional, user-controlled — never autoplays).
  // Replace with an appropriately licensed track.
  music: "/music/wedding-melody.mp3",
};

// -----------------------------------------------------------------------------
// PHOTO GALLERY
// Add or remove photos simply by editing this array. The gallery and lightbox
// adapt automatically. Missing files are hidden gracefully.
// -----------------------------------------------------------------------------
export const galleryImages = [
  { src: "/images/gallery/photo-1.jpg", alt: "Kiruthika and Chandraprakash — memory 1" },
  { src: "/images/gallery/photo-2.jpg", alt: "Kiruthika and Chandraprakash — memory 2" },
  { src: "/images/gallery/photo-3.jpg", alt: "Kiruthika and Chandraprakash — memory 3" },
  { src: "/images/gallery/photo-4.jpg", alt: "Kiruthika and Chandraprakash — memory 4" },
  { src: "/images/gallery/photo-5.jpg", alt: "Kiruthika and Chandraprakash — memory 5" },
  { src: "/images/gallery/photo-6.jpg", alt: "Kiruthika and Chandraprakash — memory 6" },
];

export default weddingAssets;
