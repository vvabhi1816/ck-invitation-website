"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { weddingAssets } from "@/config/assets";
import { useContent } from "./LanguageContext";
import { LotusMark, OrnamentalDivider, InnerBackground } from "./Decorations";
import { stagger, fadeUp } from "./motion";

export default function HeroBanner() {
  const { bride, groom, event, ui } = useContent();

  // Detect Tamil based on the currently displayed names.
  const isTamil = /[\u0B80-\u0BFF]/.test(
    `${bride.shortName} ${groom.shortName}`
  );

  // Tamil names stay on one line and shrink on smaller screens.
  const tamilNameStyle = {
    fontFamily: 'var(--font-noto-tamil), "Noto Serif Tamil", serif',
    fontSize: "clamp(1rem, 5.8vw, 3.6rem)",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "0",
    whiteSpace: "nowrap",
    wordBreak: "keep-all",
    overflowWrap: "normal",
    maxWidth: "100%",
    width: "100%",
    display: "block",
    textAlign: "center",
    marginInline: "auto",
    color: "#A66B08",
    textShadow: "0 1px 1px rgba(255, 250, 230, 0.9)",
  };

  // Rich gold for English and Tamil names.
  const nameClass =
    "block w-full max-w-full text-center font-semibold text-[#B47B12] [text-shadow:0_1px_1px_rgba(255,250,230,0.95),0_2px_5px_rgba(92,54,9,0.18)]";

  return (
    <section
      id="home"
      className="px-inner relative flex min-h-[88vh] w-full items-center justify-center overflow-hidden py-24 text-center"
    >
      {/* Background stays between the lotus borders. */}
      <InnerBackground>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${weddingAssets.heroBackground}')`,
          }}
          aria-hidden="true"
        />

        {/* Existing ivory overlay preserved. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 50% 48%, rgba(248,241,222,0.70) 0%, rgba(248,241,222,0.12) 70%), linear-gradient(to bottom, rgba(248,241,222,0.92) 0%, rgba(248,241,222,0.32) 26%, rgba(248,241,222,0.38) 66%, rgba(248,241,222,0.97) 100%)",
          }}
          aria-hidden="true"
        />
      </InnerBackground>

      <motion.div
        variants={stagger()}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full min-w-0 max-w-2xl px-2 text-center sm:px-4"
      >
        <motion.div variants={fadeUp}>
          <LotusMark size={56} className="mb-5" />
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

        <motion.div variants={fadeUp}>
          <OrnamentalDivider className="my-6" />
        </motion.div>

        {/* Names: rich gold, centered, and responsive in both languages. */}
        <motion.h1
          variants={fadeUp}
          className="mx-auto w-full min-w-0 max-w-[560px] text-center font-heading"
        >
          <span
            className={`${nameClass} ${
              isTamil
                ? ""
                : "break-words text-[clamp(2.35rem,9vw,4.75rem)] tracking-normal"
            }`}
            style={isTamil ? tamilNameStyle : undefined}
          >
            {bride.shortName}
          </span>

          <span className="my-2 block font-heading text-xl text-lotus sm:my-3 sm:text-3xl">
            &amp;
          </span>

          <span
            className={`${nameClass} ${
              isTamil
                ? ""
                : "break-words text-[clamp(2.35rem,9vw,4.75rem)] tracking-normal"
            }`}
            style={isTamil ? tamilNameStyle : undefined}
          >
            {groom.shortName}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 font-heading text-xl tracking-[0.3em] text-brown sm:text-2xl"
        >
          {event.dateCompact}
        </motion.p>

        <motion.a
          variants={fadeUp}
          href="#couple"
          className="mt-10 inline-flex flex-col items-center gap-1 font-body text-sm text-green/80 transition-colors hover:text-green"
          aria-label={ui.scrollToExplore}
        >
          {ui.scrollToExplore}

          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}