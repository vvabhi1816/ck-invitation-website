"use client";

import { motion } from "framer-motion";
import { useContent } from "./LanguageContext";
import { OrnamentalDivider, LotusMark, FloralBottom, MandalaCorner } from "./Decorations";

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
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <p className="eyebrow text-xs text-gold">{ui.brideParentsLabel}</p>
            <p className="mt-2 font-heading text-xl font-semibold text-green sm:text-2xl">
              {family.brideParents}
            </p>
          </div>
          <div>
            <p className="eyebrow text-xs text-gold">{ui.groomParentLabel}</p>
            <p className="mt-2 font-heading text-xl font-semibold text-green sm:text-2xl">
              {family.groomParent}
            </p>
          </div>
        </div>
        </div>
      </motion.div>
    </section>
  );
}
