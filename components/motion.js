// =============================================================================
// Shared scroll-reveal animation variants (Framer Motion)
// -----------------------------------------------------------------------------
// Reused across every section so the whole site reveals consistently as the
// visitor scrolls: gentle fades, soft upward reveals, and alternating left/right
// slide-ins, with staggered timing for related elements.
//
// Accessibility: prefers-reduced-motion is honoured GLOBALLY by
// <MotionConfig reducedMotion="user"> in app/page.js — it makes these transforms
// resolve instantly, so reduced-motion users still see all content (no movement).
//
// HOW TO TUNE (one place):
//   • DUR  — reveal SPEED in seconds (higher = slower).
//   • DIST — reveal DISTANCE in px (how far elements travel in). Lower = subtler.
//   • default stagger gap is the first arg of stagger() below.
// All sections import these, so changing a value here updates the whole site.
// =============================================================================

export const EASE = [0.22, 1, 0.36, 1]; // gentle, premium ease-out
export const DUR = 0.85; // seconds — each element eases in slowly/elegantly
export const DIST = 40; // px of travel (kept modest so mobile never scrolls sideways)

// Shared viewport trigger: animate ONCE, and only after the visitor has actually
// scrolled the section into view — it fires when ~35% of the element is on screen
// (not the moment its top edge peeks in), so reveals feel lazy and intentional.
export const vp = { once: true, amount: 0.35 };

export const fadeUp = {
  hidden: { opacity: 0, y: DIST },
  show: { opacity: 1, y: 0, transition: { duration: DUR, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR, ease: EASE } },
};

// Enters from the LEFT (good for left-hand cards / details).
export const fromLeft = {
  hidden: { opacity: 0, x: -DIST },
  show: { opacity: 1, x: 0, transition: { duration: DUR, ease: EASE } },
};

// Enters from the RIGHT (good for right-hand cards / details).
export const fromRight = {
  hidden: { opacity: 0, x: DIST },
  show: { opacity: 1, x: 0, transition: { duration: DUR, ease: EASE } },
};

// Subtle rise + scale — ideal for cards and images.
export const popUp = {
  hidden: { opacity: 0, y: DIST * 0.6, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: DUR, ease: EASE } },
};

// Parent container that staggers its children's reveals in sequence.
// Children just need `variants={fadeUp}` (etc.) and NO own initial/whileInView —
// they inherit the hidden -> show transition from this parent.
export const stagger = (staggerChildren = 0.22, delayChildren = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
