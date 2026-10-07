"use client";

import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { weddingAssets } from "@/config/assets";
import { useContent, useLang } from "./LanguageContext";
import FloatingPetals from "./FloatingPetals";
import { LotusMark, OrnamentalDivider, FloralBottom, MandalaCorner } from "./Decorations";

// =============================================================================
// Section 1 — OpeningScreen
// -----------------------------------------------------------------------------
// Full-screen welcome. Staged reveal: background → florals → names → date →
// button. Clicking "Open Invitation" calls onOpen() (handled in page.js), which
// fades this overlay out and may start the music.
// =============================================================================

// Staggered container so children reveal in sequence (steps 1→5 in the spec).
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.28, delayChildren: 0.2 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: "easeOut" } },
};

export default function OpeningScreen({ onOpen }) {
  const { bride, groom, event, ui } = useContent();
  const { toggle } = useLang();

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-ivory px-5 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Bride & groom photo as the hero background, with a slow Ken-Burns
          zoom for gentle life. A warm ivory overlay keeps the invitation text
          readable. If the photo is missing, only the ivory tone shows. */}
      <motion.div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url('${weddingAssets.couple}')`,
          // Anchor near the top so the couple's faces (not just the hands) stay
          // in frame, and zoom from the top so they remain visible.
          backgroundPosition: "center 12%",
          transformOrigin: "center top",
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: [1.1, 1.02, 1.1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(248,241,222,0.42) 0%, rgba(248,241,222,0.72) 52%, rgba(248,241,222,0.93) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Lotus petals drifting down the screen */}
      <FloatingPetals />

      {/* Language toggle (so the opening can be read in Tamil too) */}
      <button
        type="button"
        onClick={toggle}
        aria-label={ui.langSwitchAria}
        className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-ivory/80 px-3 py-1.5 font-heading text-sm tracking-wide text-green shadow-sm backdrop-blur transition-colors hover:bg-gold/10"
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
        {ui.langName}
      </button>

      {/* Lush lotus florals along the bottom (signature motif) */}
      <FloralBottom width={200} className="sm:[&>svg]:w-[260px]" />

      {/* Ornamental frame */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="gold-frame relative z-10 mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-ivory/85 px-6 py-12 text-center shadow-lg backdrop-blur-md sm:px-12 sm:py-16"
      >
        <MandalaCorner position="top-left" />
        <MandalaCorner position="top-right" />
        <MandalaCorner position="bottom-left" />
        <MandalaCorner position="bottom-right" />

        {/* Lotus mark with a soft pulsing golden glow behind it */}
        <motion.div variants={fadeIn} className="relative">
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,154,61,0.45) 0%, transparent 70%)" }}
            animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <LotusMark size={60} className="relative mb-6" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="font-heading text-xl leading-relaxed text-maroon sm:text-2xl"
        >
          {ui.receptionInviteHeading}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="eyebrow mt-3 text-[11px] text-green/80 sm:text-xs"
        >
          {ui.celebrationTagline}
        </motion.p>

        <motion.div variants={fadeIn}>
          <OrnamentalDivider className="my-7" />
        </motion.div>

        {/* Couple names */}
        <motion.h1 variants={fadeUp} className="font-heading leading-none">
          <span className="block text-gold-gradient text-5xl font-semibold tracking-wide sm:text-6xl md:text-7xl">
            {bride.shortName}
          </span>
          <motion.span
            className="my-2 block font-heading text-2xl text-lotus sm:text-3xl"
            animate={{ scale: [1, 1.18, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            &amp;
          </motion.span>
          <span className="block text-gold-gradient text-5xl font-semibold tracking-wide sm:text-6xl md:text-7xl">
            {groom.shortName}
          </span>
        </motion.h1>

        {/* Date */}
        <motion.p
          variants={fadeUp}
          className="mt-7 font-heading text-xl tracking-[0.3em] text-brown sm:text-2xl"
        >
          {event.dateCompact}
        </motion.p>

        {/* Open Invitation button */}
        <motion.button
          variants={fadeUp}
          type="button"
          onClick={onOpen}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group mt-10 inline-flex items-center gap-2 rounded-full border border-gold bg-green px-8 py-3 font-heading text-base font-medium tracking-wider text-ivory shadow-md transition-colors hover:bg-maroon focus-visible:outline-none sm:text-lg"
        >
          {ui.openInvitation}
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
