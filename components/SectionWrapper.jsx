"use client";

import { motion } from "framer-motion";

// =============================================================================
// SectionWrapper
// -----------------------------------------------------------------------------
// A reusable <section> that fades/slides its children in when scrolled into
// view. Content is authored to be fully visible even if JS/animation fails
// (we animate from a near-visible state and whileInView settles it).
// `id` is used by the navigation for smooth scrolling.
// =============================================================================
export default function SectionWrapper({ id, className = "", children, delay = 0 }) {
  return (
    <motion.section
      id={id}
      className={`relative w-full px-5 py-16 sm:px-8 sm:py-20 md:py-24 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}
