"use client";

import { motion } from "framer-motion";
import { weddingAssets } from "@/config/assets";
import { useContent } from "./LanguageContext";
import SafeImage from "./SafeImage";
import { OrnamentalDivider, LotusMark, FloralBottom } from "./Decorations";

// =============================================================================
// Section 3 — Couple Showcase
// -----------------------------------------------------------------------------
// Bride, groom and couple cards. Photographs are used BOTH as foreground images
// (the portrait cards) AND as background images (the full-width couple banner).
//
//   Foreground portraits .............. <SafeImage src={weddingAssets.bride} />
//   Background photography ............ style={{ backgroundImage: ... }}
//
// Drop real files at the paths in config/assets.js. Until then, styled
// placeholders show (no broken-image icons). Never reuse one photo for another.
// =============================================================================

const cardReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

function PersonCard({ title, name, detail, src, alt, placeholder }) {
  return (
    <motion.div
      variants={cardReveal}
      className="flex flex-col items-center rounded-2xl bg-ivory/70 p-5 text-center shadow-sm"
    >
      {/* Temple-arch photo frame with a fine gold border */}
      <div
        className="w-full overflow-hidden border-2 border-gold/60 p-1 shadow-sm"
        style={{ borderRadius: "46% 46% 12px 12px / 32% 32% 3% 3%" }}
      >
        <SafeImage
          src={src}
          alt={alt}
          placeholderLabel={placeholder}
          rounded="rounded-none"
          className="aspect-[3/4] w-full object-cover"
        />
      </div>
      <p className="eyebrow mt-5 text-xs text-gold">{title}</p>
      <h3 className="mt-1 font-heading text-2xl font-semibold text-green sm:text-3xl">{name}</h3>
      <p className="mt-1 font-body text-sm italic text-brown/70">{detail}</p>
    </motion.div>
  );
}

export default function CoupleSection() {
  const { bride, groom, ui } = useContent();

  return (
    <section id="couple" className="relative w-full overflow-hidden px-5 py-20 sm:px-8 sm:py-24">
      {/* soft lotus florals peeking along the bottom edge */}
      <FloralBottom width={150} className="opacity-60 sm:[&>svg]:w-[210px]" />
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Heading */}
        <div className="text-center">
          <LotusMark size={48} className="mb-4" />
          <p className="eyebrow text-xs text-gold">{ui.beginningForever}</p>
          <h2 className="mt-2 font-heading text-4xl font-semibold text-maroon sm:text-5xl">
            {ui.theCouple}
          </h2>
          <OrnamentalDivider className="mt-5" />
        </div>

        {/* Bride + Groom foreground portraits */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.2 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2"
        >
          {/* CHANGE BRIDE IMAGE HERE → config/assets.js (weddingAssets.bride) */}
          <PersonCard
            title={ui.theBride}
            name={bride.fullName}
            detail={`${bride.profession}`}
            src={weddingAssets.bride}
            alt={`Portrait of ${bride.fullName}, the bride`}
            placeholder="Bride's photo — add bride.jpg"
          />

          {/* CHANGE GROOM IMAGE HERE → config/assets.js (weddingAssets.groom) */}
          <PersonCard
            title={ui.theGroom}
            name={groom.fullName}
            detail={`${groom.profession}`}
            src={weddingAssets.groom}
            alt={`Portrait of ${groom.fullName}, the groom`}
            placeholder="Groom's photo — add groom.jpg"
          />
        </motion.div>

        {/* Couple BACKGROUND-IMAGE banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mt-10 overflow-hidden rounded-2xl shadow-md"
        >
          {/* CHANGE COUPLE BACKGROUND IMAGE HERE → config/assets.js (weddingAssets.couple).
              A dark gradient is layered over the photo so the text stays readable
              (accessible contrast) whatever the photograph looks like. */}
          <div
            className="flex min-h-[260px] items-center justify-center bg-green/90 bg-cover bg-center bg-no-repeat px-6 py-16 text-center sm:min-h-[340px]"
            style={{
              backgroundImage: `linear-gradient(rgba(30,20,10,0.45), rgba(30,20,10,0.6)), url('${weddingAssets.couple}')`,
            }}
          >
            <div>
              <p className="font-heading text-lg text-ivory/90 sm:text-xl">{ui.welcome}</p>
              <h3 className="mt-3 font-heading text-3xl font-semibold text-ivory sm:text-4xl md:text-5xl">
                {bride.shortName} <span className="text-gold-soft">&amp;</span> {groom.shortName}
              </h3>
              <p className="mt-3 font-body text-base italic text-ivory/85 sm:text-lg">
                {ui.twoHearts}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
