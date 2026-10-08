"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Navigation2 } from "lucide-react";
import { wedding } from "@/config/wedding";
import { weddingAssets } from "@/config/assets";
import { useContent } from "./LanguageContext";
import SafeImage from "./SafeImage";
import { OrnamentalDivider, LotusMark } from "./Decorations";

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
      className="relative w-full overflow-hidden px-5 py-20 sm:px-8 sm:py-24"
    >
      {/* Reception decorative background */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: "url('/images/decorations/reception-pattern.webp')",
        }}
        aria-hidden="true"
      />

      {/* Soft overlay for text readability */}
      <div
        className="pointer-events-none absolute inset-0 bg-ivory/30"
        aria-hidden="true"
      />
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

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Left — details */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            <DetailRow icon={Calendar} label={ui.dateLabelIcon}>
              <p className="font-heading text-xl font-semibold text-green">{event.dateLabel}</p>
            </DetailRow>
            <DetailRow icon={Clock} label={ui.timeLabelIcon}>
              <p className="font-heading text-xl font-semibold text-green">{event.timeLabel}</p>
            </DetailRow>
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

            <motion.a
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

          {/* Right — reception hall photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="gold-frame overflow-hidden rounded-2xl p-1 shadow-md"
          >
            {/* CHANGE RECEPTION HALL IMAGE HERE → config/assets.js (weddingAssets.receptionHall) */}
            <SafeImage
              src={weddingAssets.receptionHall}
              alt={`${venue.name} reception venue`}
              placeholderLabel="Venue photo — add reception-hall.jpg"
              rounded="rounded-xl"
              className="aspect-[4/3] w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
