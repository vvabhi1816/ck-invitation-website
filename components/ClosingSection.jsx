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

  // Detect Tamil so long Tamil labels remain readable and responsive.
  const isTamil = /[\u0B80-\u0BFF]/.test(
    `${bride.shortName} ${groom.shortName} ${messages.closing}`
  );

  const nameStyle = {
    color: "#F4C65B",
    textShadow:
      "0 2px 3px rgba(25, 10, 8, 0.95), 0 0 12px rgba(25, 10, 8, 0.65)",
  };

  const readableTextStyle = {
    color: "#FFF8E8",
    textShadow: "0 2px 4px rgba(20, 8, 8, 0.95)",
  };

  return (
    <footer className="relative isolate w-full overflow-hidden px-4 py-12 text-center sm:px-8 sm:py-20">
      {/* Original couple photograph fills the entire closing section. */}
      <InnerBackground>
        <div
          className="absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/images/closing-couple1.jpg"
            alt=""
            className="h-full w-full object-cover object-[center_10%] md:object-[center_20%]"
            draggable="false"
          />
        </div>

        {/* Darker overlay improves contrast without blurring the photograph. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(24, 10, 12, 0.58) 0%, rgba(24, 10, 12, 0.48) 30%, rgba(24, 10, 12, 0.58) 65%, rgba(24, 10, 12, 0.76) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Soft central backing makes the text easier to read over busy areas. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 48%, rgba(28, 13, 14, 0.28) 0%, rgba(28, 13, 14, 0.10) 65%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </InnerBackground>

      {/* Decorative lotus flowers */}
      <FloralBottom
        width={160}
        className="pointer-events-none opacity-90 sm:[&>svg]:w-[220px]"
      />

      {/* Animated closing content */}
      <motion.div
        variants={stagger(0.14)}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        className="relative z-10 mx-auto flex w-full min-w-0 max-w-2xl flex-col items-center"
      >
        <motion.div variants={fadeUp}>
          <LotusMark size={52} className="mb-4 sm:mb-6" />
        </motion.div>

        {/* Closing heading */}
        <motion.p
          variants={fadeUp}
          className="eyebrow text-xs font-bold sm:text-sm"
          style={{
            color: "#FFE5A0",
            textShadow: "0 2px 5px rgba(20, 8, 8, 0.95)",
          }}
        >
          {ui.withLoveJoy}
        </motion.p>

        {/* Bride and groom names — brighter gold with a dark shadow. */}
        <motion.h2
          variants={fadeUp}
          className="mt-4 w-full min-w-0 font-heading leading-tight"
        >
          <span
            className={`block w-full font-semibold ${
              isTamil
                ? "whitespace-nowrap text-[clamp(1rem,5.8vw,3.5rem)]"
                : "break-words text-3xl tracking-normal sm:text-5xl md:text-6xl"
            }`}
            style={nameStyle}
          >
            {bride.shortName}
          </span>

          <span
            className="my-2 block font-heading text-xl font-semibold sm:text-2xl"
            style={{
              color: "#FF6B96",
              textShadow: "0 2px 4px rgba(20, 8, 8, 0.95)",
            }}
          >
            &amp;
          </span>

          <span
            className={`block w-full font-semibold ${
              isTamil
                ? "whitespace-nowrap text-[clamp(1rem,5.8vw,3.5rem)]"
                : "break-words text-3xl tracking-normal sm:text-5xl md:text-6xl"
            }`}
            style={nameStyle}
          >
            {groom.shortName}
          </span>
        </motion.h2>

        {/* Date */}
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-full break-words font-heading text-base font-semibold tracking-[0.18em] sm:mt-6 sm:text-2xl sm:tracking-[0.3em]"
          style={readableTextStyle}
        >
          {event.dateCompact}
        </motion.p>

        <motion.div variants={fadeUp} className="w-full">
          <OrnamentalDivider className="my-6 sm:my-8" />
        </motion.div>

        {/* Closing message */}
        <motion.p
          variants={fadeUp}
          className="max-w-full break-words rounded-xl px-3 py-2 font-body text-base font-semibold italic leading-relaxed sm:text-xl"
          style={{
          color: "#FFF8E8",
          textShadow: "none",
          backgroundColor: "transparent",
        }}
        >
          “{messages.closing}”
        </motion.p>

        {/* Invitation PDF button */}
        <motion.a
          variants={fadeUp}
          href={weddingAssets.invitationPdf}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mx-auto mt-7 box-border flex w-full min-w-0 max-w-[280px] items-center justify-center gap-2 rounded-full border-2 border-[#F4D17D] bg-[#321C20]/85 px-4 py-3 font-heading text-sm font-semibold leading-snug tracking-normal text-[#FFF8E8] shadow-[0_4px_18px_rgba(0,0,0,0.4)] transition-colors hover:bg-[#4A252B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE5A0] sm:mt-9 sm:max-w-sm sm:px-5 sm:text-base"
        >
          <FileText
            className="h-4 w-4 shrink-0 text-[#FFE08A]"
            aria-hidden="true"
          />

          <span className="min-w-0 flex-1 whitespace-normal break-words text-center">
            {ui.viewWeddingInvitationPdf}
          </span>
        </motion.a>

        {/* Event and venue details */}
        <motion.p
          variants={fadeUp}
          className="mt-7 w-full min-w-0 break-words rounded-lg px-2 py-2 font-body text-xs font-semibold leading-relaxed sm:mt-10 sm:text-sm"
          style={{
          color: "#FFF8E8",
          textShadow: "none",
          backgroundColor: "transparent",
        }}
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