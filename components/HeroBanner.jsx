"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { weddingAssets } from "@/config/assets";
import { useContent } from "./LanguageContext";
import { LotusMark, OrnamentalDivider, InnerBackground } from "./Decorations";
import { stagger, fadeUp } from "./motion";

export default function HeroBanner() {
  const { bride, groom, event, ui } = useContent();

  // Detect Tamil from the actual displayed names.
  const isTamil = /[\u0B80-\u0BFF]/.test(
    `${bride.shortName} ${groom.shortName}`
  );

  // Apply these styles only to Tamil names.
  // The font scales down on narrow screens to prevent wrapping.
  const tamilNameStyle = {
    fontFamily: 'var(--font-noto-tamil), "Noto Serif Tamil", serif',
    fontSize: "clamp(1.15rem, 5.8vw, 3.6rem)",
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
  };

  const nameClass = isTamil
    ? "block w-full max-w-full text-center text-gold-gradient"
    : "block w-full max-w-full break-words text-gold-gradient text-[clamp(2.35rem,9vw,4.75rem)] font-semibold tracking-normal";

  return (
    <section
      id="home"
      className="px-inner relative flex min-h-[88vh] w-full items-center justify-center overflow-hidden py-24 text-center"
    >
      {/* Background remains confined between the lotus borders. */}
      <InnerBackground>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${weddingAssets.heroBackground}')`,
          }}
          aria-hidden="true"
        />

        {/* Preserve the existing ivory wash and text readability. */}
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

        {/* Names: Tamil stays on one line; English retains its styling. */}
        <motion.h1
          variants={fadeUp}
          className="mx-auto w-full min-w-0 max-w-[560px] text-center font-heading"
        >
          <span
            className={nameClass}
            style={isTamil ? tamilNameStyle : undefined}
          >
            {bride.shortName}
          </span>

          <span className="my-2 block font-heading text-xl text-lotus sm:my-3 sm:text-3xl">
            &amp;
          </span>

          <span
            className={nameClass}
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
