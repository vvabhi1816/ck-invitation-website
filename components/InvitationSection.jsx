"use client";

import { motion } from "framer-motion";
import { useContent } from "./LanguageContext";
import { OrnamentalDivider, LotusMark, TempleArchFrame } from "./Decorations";

// =============================================================================
// Section 2 — Main Invitation
// -----------------------------------------------------------------------------
// Recreates the atmosphere of the Tamil invitation card using REAL HTML text
// (never a single background image). Readable on narrow screens — no fixed
// height that could clip content.
// =============================================================================
export default function InvitationSection() {
  const { bride, groom, event, venue, messages, ui } = useContent();

  return (
    <section id="invitation" className="relative w-full px-5 py-20 sm:px-8 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="gold-frame relative mx-auto max-w-3xl overflow-hidden rounded-2xl bg-ivory/85 px-7 pb-16 pt-20 text-center shadow-sm sm:px-14 sm:pb-20 sm:pt-24 md:pt-28 lg:pt-32"
      >
        {/* Scalable gold temple-arch frame with lotus corners (fits any height) */}
        <TempleArchFrame />

        {/* All content sits inside the arch */}
        <div className="relative z-10">
        <LotusMark size={52} className="mb-5" />

        {/* Headings */}
        <p className="eyebrow text-xs text-gold sm:text-sm">{ui.invitedLine}</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-wide text-green sm:text-4xl">
          {event.title}
        </h2>
        <p className="mt-2 font-heading text-lg italic text-brown/70 sm:text-xl">{event.subtitle}</p>

        <OrnamentalDivider className="my-8" />

        {/* Invitation message */}
        <p className="mx-auto max-w-xl font-body text-lg leading-relaxed text-brown/90 sm:text-xl">
          “{messages.invitation}”
        </p>

        <OrnamentalDivider className="my-8" />

        {/* Couple details */}
        <div className="flex flex-col items-center gap-6">
          {/* Bride */}
          <div>
            <h3 className="font-heading text-2xl font-semibold text-gold-gradient sm:text-3xl">
              {bride.fullName} <span className="text-base text-brown/70">{bride.qualification}</span>
            </h3>
            <p className="mt-1 font-body text-base text-brown/80">{bride.parents}</p>
            <p className="font-body text-sm italic text-green/80">{bride.profession}</p>
          </div>

          {/* Weds separator */}
          <div className="flex items-center gap-3">
            <span className="hair-rule w-12" />
            <span className="font-heading text-xl italic tracking-widest text-lotus">{ui.weds}</span>
            <span className="hair-rule w-12" />
          </div>

          {/* Groom */}
          <div>
            <h3 className="font-heading text-2xl font-semibold text-gold-gradient sm:text-3xl">
              {groom.fullName} <span className="text-base text-brown/70">{groom.qualification}</span>
            </h3>
            <p className="mt-1 font-body text-base text-brown/80">{groom.parents}</p>
            <p className="font-body text-sm italic text-green/80">{groom.profession}</p>
          </div>
        </div>

        <OrnamentalDivider className="my-8" />

        {/* Date / time / venue */}
        <div className="space-y-1 font-body text-brown/90">
          <p className="font-heading text-xl font-semibold tracking-wide text-maroon sm:text-2xl">
            {event.dateLabel}
          </p>
          <p className="text-lg">{event.timeLabel}</p>
          <p className="mx-auto mt-2 max-w-md text-base leading-relaxed">
            <span className="font-semibold text-green">{venue.name}</span>
            <br />
            {venue.addressInline}
          </p>
        </div>
        </div>
      </motion.div>
    </section>
  );
}
