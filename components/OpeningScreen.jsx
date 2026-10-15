"use client";

import { motion } from "framer-motion";
import { Languages, FileText } from "lucide-react";
import { weddingAssets } from "@/config/assets";
import { SHOW_INVITATION_PDF } from "@/config/features";
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
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-ivory px-3 py-3 sm:px-5 sm:py-5 md:px-6 md:py-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Bride & groom photo as the hero background. On mobile it is sized with
          `contain` + top anchor (bg-contain bg-top) and gets NO zoom, so the WHOLE
          couple — both faces, torsos and the henna hands — is always visible, never
          zoomed-in or cropped; the ivory tone fills the area below. On sm+ the
          original `cover` composition with a slow Ken-Burns zoom is preserved (the
          zoom lives in the .opening-kenburns CSS, gated to sm+). If the photo is
          missing, only the ivory tone shows. */}
      <div
        className="opening-kenburns absolute inset-0 bg-contain bg-top bg-no-repeat sm:bg-cover sm:bg-[center_12%]"
        style={{ backgroundImage: `url('${weddingAssets.couple}')` }}
        aria-hidden="true"
      />
      {/* MOBILE overlay — transparent over the top (keeps both faces clear and
          bright) and fading to ivory lower down so it blends into the section. */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(248,241,222,0) 0%, rgba(248,241,222,0.04) 34%, rgba(248,241,222,0.5) 66%, rgba(248,241,222,0.9) 100%)",
        }}
        aria-hidden="true"
      />
      {/* DESKTOP overlay — the original soft radial halo for the cover image. */}
      <div
        className="absolute inset-0 hidden sm:block"
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
        className="gold-frame relative z-10 mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-ivory/85 px-4 py-7 text-center shadow-lg backdrop-blur-md sm:px-8 sm:py-10 md:px-12 md:py-12"
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
       className="opening-invitation-title font-heading text-xl leading-relaxed text-maroon sm:text-2xl md:text-3xl"
        >
          {ui.receptionInviteHeading}
        </motion.p>

        <motion.p
  variants={fadeUp}
  className="opening-invitation-tagline eyebrow mt-2 text-xs leading-relaxed text-green sm:mt-3 sm:text-sm md:text-base"
>
          {ui.celebrationTagline}
        </motion.p>

        <motion.div variants={fadeIn}>
          <OrnamentalDivider className="my-7" />
        </motion.div>

        {/* Couple names */}
          <motion.h1
            variants={fadeUp}
            className="mx-auto w-full max-w-[560px] font-heading leading-[0.95]"
          >
            {/* Bride name */}
            <span className="opening-couple-name block whitespace-nowrap text-gold-gradient text-[clamp(1.7rem,5.5vw,4.75rem)] font-semibold tracking-normal">
              {bride.shortName}
            </span>

            {/* Weds separator */}
            <motion.span
              className="my-2 block font-heading text-xl text-lotus sm:my-3 sm:text-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              &amp;
            </motion.span>

            {/* Groom name */}
            <span className="opening-couple-name block whitespace-nowrap text-gold-gradient text-[clamp(1.7rem,5.5vw,4.75rem)] font-semibold tracking-normal">
              {groom.shortName}
            </span>
          </motion.h1>

        {/* Date */}
        <motion.p
  variants={fadeUp}
  className="opening-invitation-date mt-6 font-sans text-lg font-semibold tracking-[0.12em] text-brown sm:mt-7 sm:text-xl sm:tracking-[0.18em] md:text-2xl"
>
  {event.dateCompact}
</motion.p>

        {/* Action buttons — Open Invitation (primary) + View Invitation PDF
            (secondary). They sit side-by-side on larger screens and stack neatly
            on phones. */}
        <motion.div
          variants={fadeUp}
          className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row sm:gap-4"
        >
          <motion.button
            type="button"
            onClick={onOpen}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 rounded-full border border-gold bg-green px-6 py-2.5 font-heading text-sm font-medium tracking-wide text-ivory shadow-md transition-colors hover:bg-maroon focus-visible:outline-none sm:px-8 sm:py-3 sm:text-lg"
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

          {/* Opens the real invitation PDF in a new tab (see weddingAssets.invitationPdf).
              Hidden when NEXT_PUBLIC_SHOW_INVITATION_PDF="false" (see config/features.js). */}
          {SHOW_INVITATION_PDF && (
            <motion.a
              href={weddingAssets.invitationPdf}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold bg-ivory/90 px-6 py-2.5 font-heading text-sm font-medium tracking-wide text-green shadow-md transition-colors hover:bg-gold/15 focus-visible:outline-none sm:px-8 sm:py-3 sm:text-lg"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              {ui.viewInvitationPdf}
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
