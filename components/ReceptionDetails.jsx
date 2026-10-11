"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Navigation2 } from "lucide-react";
import { wedding } from "@/config/wedding";
import { weddingAssets } from "@/config/assets";
import { useContent } from "./LanguageContext";
import SafeImage from "./SafeImage";
import { OrnamentalDivider, LotusMark, InnerBackground } from "./Decorations";
import { stagger, fromLeft, fromRight, popUp, vp } from "./motion";

// =============================================================================
// Section 5 — Reception Details
// -----------------------------------------------------------------------------
// Editorial two-column layout: details (date / time / venue) on the left with a
// working "Get Directions" button, and a reception-hall photo on the right.
// Stacks vertically on mobile.
// =============================================================================

function DetailRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-4 text-left">
      <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="eyebrow text-xs text-gold">{label}</p>
        <div className="mt-1 font-body text-brown/90">{children}</div>
      </div>
    </div>
  );
}

export default function ReceptionDetails() {
  const { event, venue, ui } = useContent();
  // Map link is a technical value — always from config/wedding.js.
  const mapsSearchUrl = wedding.venue.mapsSearchUrl;

  return (
    <section
      id="reception"
      className="px-inner relative w-full overflow-hidden py-20 sm:py-24"
    >
      {/* Background texture confined to the inner area BETWEEN the lotus vines, so
          it fills only the space enclosed by the borders and never reaches under
          or over them (see InnerBackground). */}
      <InnerBackground>
        {/* LAYER 1 — the silk texture, scaled to cover the inner area without
            distortion (cover crops gracefully; the texture is abstract/soft). */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${weddingAssets.receptionBackground}')` }}
        />
        {/* LAYER 2 — a very subtle ivory wash to keep the left-column details
            crisply readable while letting the texture show through. */}
        <div className="absolute inset-0 bg-ivory/25" />
      </InnerBackground>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Heading */}
        <div className="text-center">
          <LotusMark size={48} className="mb-4" />
          <p className="eyebrow text-xs text-gold sm:text-sm">{ui.invitedLine}</p>
          <h2 className="mt-2 font-heading text-4xl font-semibold text-maroon sm:text-5xl">
            {event.title}
          </h2>
          <p className="mt-2 font-heading text-lg italic text-brown/70">{event.subtitle}</p>
          <OrnamentalDivider className="my-8" />
        </div>

        {/* Venue photo — a full-width PANORAMIC banner shown at the photograph's
            own ~5:1 aspect ratio, so the whole illuminated venue is visible with no
            cropping, stretching, or distortion. It lives inside the section's
            px-inner padding, so on every screen it stays between the vertical lotus
            borders with equal side spacing and never overlaps them. Keeps the gold
            frame + rounded corners to match the wedding theme. */}
        <motion.div
          variants={popUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          className="gold-frame overflow-hidden rounded-2xl p-1 shadow-md"
        >
          {/* CHANGE RECEPTION HALL IMAGE HERE → config/assets.js (weddingAssets.receptionHall).
              A taller aspect ratio (2:1 on phones → 5:2 on larger screens) gives the
              venue more vertical presence than the raw ~5:1 panorama. object-cover
              with a slightly right-of-centre focus keeps the illuminated building and
              the "SMB Vishesh Mahal" sign in frame while still showing the lit
              canopy; it never stretches or distorts the photo. */}
          <SafeImage
            src={weddingAssets.receptionHall}
            alt={`${venue.name} illuminated at night`}
            placeholderLabel="Venue photo — add reception-hall.jpg"
            rounded="rounded-xl"
            className="aspect-[2/1] w-full object-cover object-[60%_center] sm:aspect-[5/2]"
          />
        </motion.div>

        {/* Date / time / venue / address + Get Directions — unchanged content,
            centred beneath the banner. */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          className="mx-auto mt-12 max-w-md space-y-7"
        >
          {/* Rows alternate: left, right, left — then the button slides in. */}
          <motion.div variants={fromLeft}>
            <DetailRow icon={Calendar} label={ui.dateLabelIcon}>
              <p className="font-heading text-xl font-semibold text-green">{event.dateLabel}</p>
            </DetailRow>
          </motion.div>
          <motion.div variants={fromRight}>
            <DetailRow icon={Clock} label={ui.timeLabelIcon}>
              <p className="font-heading text-xl font-semibold text-green">{event.timeLabel}</p>
            </DetailRow>
          </motion.div>
          <motion.div variants={fromLeft}>
            <DetailRow icon={MapPin} label={ui.venueLabelIcon}>
              <p className="font-heading text-lg font-semibold text-green">{venue.name}</p>
              <p className="mt-1 text-sm leading-relaxed">
                {venue.addressLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </DetailRow>
          </motion.div>

          <motion.a
            variants={fromRight}
            href={mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold bg-maroon px-8 py-3 font-heading text-base font-medium tracking-wider text-ivory shadow-md transition-colors hover:bg-green"
          >
            <Navigation2 className="h-5 w-5" aria-hidden="true" />
            {ui.getDirections}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
