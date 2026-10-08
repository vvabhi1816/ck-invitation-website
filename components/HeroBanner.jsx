"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { weddingAssets } from "@/config/assets";
import { useContent } from "./LanguageContext";
import { LotusMark, OrnamentalDivider } from "./Decorations";

// =============================================================================
// HeroBanner — the #home landing shown once the invitation is opened.
// Uses the couple photo as a soft background (graceful: a warm gradient shows
// through / instead when the file is missing).
// =============================================================================
export default function HeroBanner() {
  const { bride, groom, event, ui } = useContent();

  return (
    <section
      id="home"
      className="relative flex min-h-[88vh] w-full items-center justify-center overflow-hidden px-5 py-24 text-center"
    >
      {/* CHANGE HERO/COUPLE BACKGROUND IMAGE HERE → config/assets.js (weddingAssets.couple).
          Layered gradients keep the ivory tone and ensure readable contrast even
          with a photo behind. If the file is missing, only the gradient shows. */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{ backgroundImage: `url('${weddingAssets.couple}')` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(248,241,222,0.85), rgba(248,241,222,0.75), rgba(248,241,222,0.95))",
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-2xl"
      >
        <LotusMark size={56} className="mb-5" />
        <p className="font-heading text-xl leading-relaxed text-maroon sm:text-2xl">
          {ui.receptionInviteHeading}
        </p>
        <p className="eyebrow mt-3 text-[11px] text-green/80 sm:text-xs">
          {ui.celebrationTagline}
        </p>

        <OrnamentalDivider className="my-6" />

        <h1 className="mx-auto w-full max-w-[560px] font-heading leading-[0.95]">
        <span className="block max-w-full break-words text-gold-gradient text-[clamp(2.35rem,9vw,4.75rem)] font-semibold tracking-normal">
          {bride.shortName}
        </span>

        <span className="my-2 block font-heading text-xl text-lotus sm:my-3 sm:text-3xl">
          &amp;
        </span>

        <span className="block max-w-full break-words text-gold-gradient text-[clamp(2.35rem,9vw,4.75rem)] font-semibold tracking-normal">
          {groom.shortName}
        </span>
      </h1>

        <p className="mt-6 font-heading text-xl tracking-[0.3em] text-brown sm:text-2xl">
          {event.dateCompact}
        </p>

        <a
          href="#couple"
          className="mt-10 inline-flex flex-col items-center gap-1 font-body text-sm text-green/80 transition-colors hover:text-green"
          aria-label={ui.scrollToExplore}
        >
          {ui.scrollToExplore}
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
