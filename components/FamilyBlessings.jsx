"use client";

import { motion } from "framer-motion";
import { useContent } from "./LanguageContext";
import { OrnamentalDivider, LotusMark, FloralBottom, MandalaCorner } from "./Decorations";
import { stagger, fromLeft, fromRight, fadeUp, vp } from "./motion";

// =============================================================================
// Section 9 — Family Blessings
// -----------------------------------------------------------------------------
// Warm, decorated section with the families' blessing. The blessing text is
// localized (English default / Tamil) via config/content.js (messages.blessing).
// =============================================================================
export default function FamilyBlessings() {
  const { family, messages, ui } = useContent();

  return (
    <section className="relative w-full px-5 py-20 sm:px-8 sm:py-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        className="gold-frame relative mx-auto max-w-3xl overflow-hidden rounded-2xl bg-ivory/85 px-6 pb-36 pt-14 text-center shadow-sm sm:px-12"
      >
        <MandalaCorner position="top-left" />
        <MandalaCorner position="top-right" />
        <FloralBottom width={150} className="opacity-95 sm:[&>svg]:w-[200px]" />

        <div className="relative z-10">
        <LotusMark size={52} className="mb-5" />
        <p className="eyebrow text-xs text-gold">{ui.familiesLove}</p>
        <h2 className="mt-2 font-heading text-4xl font-semibold text-maroon sm:text-5xl">
          {ui.familyBlessings}
        </h2>

        <OrnamentalDivider className="my-7" />

        <p className="mx-auto max-w-xl font-body text-lg leading-relaxed text-brown/90 sm:text-xl">
          “{messages.blessing}”
        </p>

        <OrnamentalDivider className="my-7" />

        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2"
        >
          <motion.div variants={fromLeft}>
            <p className="eyebrow text-xs text-gold">{ui.brideParentsLabel}</p>
            <p className="mt-2 font-heading text-xl font-semibold text-green sm:text-2xl">
              {family.brideParents}
            </p>
          </motion.div>
          <motion.div variants={fromRight}>
            <p className="eyebrow text-xs text-gold">{ui.groomParentLabel}</p>
            <p className="mt-2 font-heading text-xl font-semibold text-green sm:text-2xl">
              {family.groomParent}
            </p>
          </motion.div>
        </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
