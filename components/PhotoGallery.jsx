"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryImages } from "@/config/assets";
import { useContent } from "./LanguageContext";
import SafeImage from "./SafeImage";
import { OrnamentalDivider, LotusMark } from "./Decorations";

// =============================================================================
// Section 7 — Photo Gallery ("Our Memories")
// -----------------------------------------------------------------------------
// Responsive masonry-ish grid with a full-screen lightbox. Supports:
//   • hover effects (desktop) + tap (mobile)
//   • prev / next / close controls
//   • keyboard navigation (← → Esc)
//   • mobile swipe (touch)
//   • lazy loading + graceful placeholders for missing files
// Extend the gallery by editing `galleryImages` in config/assets.js.
// =============================================================================

// Varied aspect ratios for an editorial grid feel.
const RATIOS = ["aspect-[4/5]", "aspect-square", "aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[4/3]"];

export default function PhotoGallery() {
  const { ui } = useContent();
  const [index, setIndex] = useState(null); // null = closed
  const touchStartX = useRef(null);

  const isOpen = index !== null;
  const count = galleryImages.length;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % count)), [count]);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + count) % count)), [count]);

  // Keyboard navigation while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    // Prevent background scroll while lightbox is open.
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, next, prev]);

  // Mobile swipe.
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  if (count === 0) return null;

  return (
    <section id="gallery" className="relative w-full px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <LotusMark size={48} className="mb-4" />
          <p className="eyebrow text-xs text-gold">{ui.momentsToCherish}</p>
          <h2 className="mt-2 font-heading text-4xl font-semibold text-maroon sm:text-5xl">
            {ui.ourMemories}
          </h2>
          <OrnamentalDivider className="mt-5" />
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {galleryImages.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative block overflow-hidden rounded-xl border border-gold/30 shadow-sm focus-visible:outline-none"
              aria-label={`Open photo ${i + 1}: ${img.alt}`}
            >
              <SafeImage
                src={img.src}
                alt={img.alt}
                placeholderLabel={`Photo ${i + 1}`}
                rounded="rounded-none"
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${RATIOS[i % RATIOS.length]}`}
              />
              <span className="pointer-events-none absolute inset-0 bg-green/0 transition-colors duration-300 group-hover:bg-green/15" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-brown/90 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close photo viewer"
              className="absolute right-4 top-4 rounded-full bg-ivory/15 p-2 text-ivory transition-colors hover:bg-ivory/30"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-2 rounded-full bg-ivory/15 p-2 text-ivory transition-colors hover:bg-ivory/30 sm:left-6"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            {/* Image */}
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-h-[80vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <SafeImage
                src={galleryImages[index].src}
                alt={galleryImages[index].alt}
                placeholderLabel={`Photo ${index + 1}`}
                priority
                rounded="rounded-xl"
                className="mx-auto max-h-[80vh] w-auto max-w-full object-contain"
              />
              <p className="mt-3 text-center font-body text-sm text-ivory/80">
                {index + 1} / {count}
              </p>
            </motion.div>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-2 rounded-full bg-ivory/15 p-2 text-ivory transition-colors hover:bg-ivory/30 sm:right-6"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
