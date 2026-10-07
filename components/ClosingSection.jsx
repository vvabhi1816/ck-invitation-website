"use client";

import { motion } from "framer-motion";
import { weddingAssets } from "@/config/assets";
import { useContent } from "./LanguageContext";
import { OrnamentalDivider, LotusMark, FloralBottom } from "./Decorations";

// =============================================================================
// Section 10 — Closing Section (romantic dark mirror of the opening) + footer.
// =============================================================================
export default function ClosingSection() {
  const { bride, groom, event, venue, messages, ui } = useContent();

  return (
    <footer className="relative w-full overflow-hidden px-5 py-28 text-center sm:px-8">
      {/* CHANGE CLOSING BACKGROUND IMAGE HERE → config/assets.js (weddingAssets.couple).
          A deep maroon/brown overlay keeps the gold + ivory text readable even
          with a photo behind; if the file is missing, only the rich tone shows. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(42,18,22,0.82), rgba(28,14,10,0.9)), url('${weddingAssets.couple}')`,
          backgroundColor: "#3a1b20",
        }}
        aria-hidden="true"
      />

      {/* Lotus florals glowing softly along the bottom */}
      <FloralBottom width={160} className="opacity-70 sm:[&>svg]:w-[220px]" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-2xl"
      >
        <LotusMark size={58} className="mb-6" />
        <p className="eyebrow text-xs text-gold-soft sm:text-sm">{ui.withLoveJoy}</p>

        <h2 className="mt-5 font-heading leading-none">
          <span className="block text-gold-gradient text-4xl font-semibold tracking-wide sm:text-5xl md:text-6xl">
            {bride.shortName}
          </span>
          <span className="my-2 block font-heading text-2xl text-lotus">&amp;</span>
          <span className="block text-gold-gradient text-4xl font-semibold tracking-wide sm:text-5xl md:text-6xl">
            {groom.shortName}
          </span>
        </h2>

        <p className="mt-6 font-heading text-xl tracking-[0.3em] text-ivory/90 sm:text-2xl">
          {event.dateCompact}
        </p>

        <OrnamentalDivider className="my-8" />

        <p className="font-body text-lg italic text-ivory/85 sm:text-xl">“{messages.closing}”</p>

        <p className="mt-10 font-body text-sm text-ivory/50">
          {bride.shortName} &amp; {groom.shortName} &middot; {event.dateLabel} &middot; {venue.name}
        </p>
      </motion.div>
    </footer>
  );
}
