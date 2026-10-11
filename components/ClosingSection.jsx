"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { weddingAssets } from "@/config/assets";
import { useContent } from "./LanguageContext";
import {
  OrnamentalDivider,
  LotusMark,
  FloralBottom,
  InnerBackground,
} from "./Decorations";
import { stagger, fadeUp, vp } from "./motion";

export default function ClosingSection() {
  const { bride, groom, event, venue, messages, ui } = useContent();

  return (
    <footer className="relative isolate w-full overflow-hidden px-4 py-12 text-center sm:px-8 sm:py-20">
      {/* Full closing background image */}
      <InnerBackground>
        <div
          className="absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/images/closing-couple1.jpg"
            alt=""
            className="h-full w-full object-cover object-center md:object-[center_30%]"
            style={{ objectPosition: "center 10%" }}
            draggable="false"
          />
        </div>

        {/* Readability overlay without blurring the original image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(35,16,18,0.28) 0%, rgba(35,16,18,0.42) 55%, rgba(35,16,18,0.58) 100%)",
          }}
          aria-hidden="true"
        />
      </InnerBackground>

      {/* Decorative lotus flowers */}
      <FloralBottom
        width={160}
        className="pointer-events-none opacity-70 sm:[&>svg]:w-[220px]"
      />

      {/* Closing content and reveal animations */}
      <motion.div
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        className="relative z-10 mx-auto flex w-full min-w-0 max-w-2xl flex-col items-center"
      >
        <motion.div variants={fadeUp}>
          <LotusMark size={52} className="mb-4 sm:mb-6" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="eyebrow text-xs text-gold-soft sm:text-sm"
        >
          {ui.withLoveJoy}
        </motion.p>

        {/* Bride and groom names */}
        <motion.h2
          variants={fadeUp}
          className="mt-4 w-full min-w-0 font-heading leading-tight"
        >
          <span className="block break-words text-gold-gradient text-3xl font-semibold tracking-normal sm:text-5xl md:text-6xl">
            {bride.shortName}
          </span>

          <span className="my-2 block font-heading text-xl text-lotus sm:text-2xl">
            &amp;
          </span>

          <span className="block break-words text-gold-gradient text-3xl font-semibold tracking-normal sm:text-5xl md:text-6xl">
            {groom.shortName}
          </span>
        </motion.h2>

        {/* Wedding date */}
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-full break-words font-heading text-base tracking-[0.18em] text-ivory/95 sm:mt-6 sm:text-2xl sm:tracking-[0.3em]"
        >
          {event.dateCompact}
        </motion.p>

        <motion.div variants={fadeUp} className="w-full">
          <OrnamentalDivider className="my-6 sm:my-8" />
        </motion.div>

        {/* Closing message */}
        <motion.p
          variants={fadeUp}
          className="max-w-full break-words px-1 font-body text-base italic leading-relaxed text-ivory/95 sm:text-xl"
        >
          “{messages.closing}”
        </motion.p>

        {/* Responsive PDF button */}
        <motion.a
          variants={fadeUp}
          href={weddingAssets.invitationPdf}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mx-auto mt-7 box-border flex w-full min-w-0 max-w-[240px] items-center justify-center gap-2 rounded-full border border-gold-soft bg-ivory/15 px-3 py-3 font-heading text-sm font-medium leading-snug tracking-normal text-ivory shadow-md backdrop-blur-sm transition-colors hover:bg-ivory/25 focus-visible:outline-none sm:mt-9 sm:max-w-sm sm:px-5 sm:text-base"
        >
          <FileText
            className="h-4 w-4 shrink-0 text-gold-soft"
            aria-hidden="true"
          />

          <span className="min-w-0 flex-1 whitespace-normal break-words text-center">
            {ui.viewWeddingInvitationPdf}
          </span>
        </motion.a>

        {/* Event and venue details */}
        <motion.p
          variants={fadeUp}
          className="mt-7 w-full min-w-0 break-words px-1 font-body text-xs leading-relaxed text-ivory/90 sm:mt-10 sm:text-sm"
        >
          {bride.shortName} &amp; {groom.shortName}
          {" · "}
          {event.dateLabel}
          {" · "}
          {venue.name}
        </motion.p>
      </motion.div>
    </footer>
  );
}
