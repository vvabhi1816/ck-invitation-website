"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation2 } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useContent } from "./LanguageContext";
import { OrnamentalDivider, LotusMark } from "./Decorations";

// =============================================================================
// Section 6 — Venue ("Find Us Here")
// -----------------------------------------------------------------------------
// Responsive embedded Google Map (keyless search embed). If the embed fails to
// load for any reason, a graceful fallback with the address + a working
// "Get Directions" link is always available — a missing map never breaks the page.
// =============================================================================
export default function VenueSection() {
  const { venue, ui } = useContent();
  // Map URLs are technical values — always from config/wedding.js.
  const { mapsSearchUrl, mapsEmbedUrl } = wedding.venue;
  const [mapFailed, setMapFailed] = useState(false);

  return (
    <section id="venue" className="relative w-full px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <LotusMark size={48} className="mb-4" />
          <p className="eyebrow text-xs text-gold">{ui.celebrationAwaits}</p>
          <h2 className="mt-2 font-heading text-4xl font-semibold text-maroon sm:text-5xl">
            {ui.findUsHere}
          </h2>
          <OrnamentalDivider className="mt-5" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Venue info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="gold-frame flex flex-col justify-center rounded-2xl bg-ivory/80 p-8 md:col-span-2"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green/10 text-green">
              <MapPin className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-heading text-2xl font-semibold text-green">{venue.name}</h3>
            <p className="mt-3 font-body leading-relaxed text-brown/90">
              {venue.addressLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </p>
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold bg-maroon px-6 py-3 font-heading text-sm font-medium tracking-wider text-ivory shadow transition-colors hover:bg-green"
            >
              <Navigation2 className="h-4 w-4" aria-hidden="true" />
              {ui.getDirections}
            </a>
          </motion.div>

          {/* Map (or graceful fallback) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="gold-frame overflow-hidden rounded-2xl md:col-span-3"
          >
            {!mapFailed ? (
              <iframe
                title={`Map showing ${venue.name}`}
                src={mapsEmbedUrl}
                className="h-[300px] w-full border-0 md:h-full md:min-h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onError={() => setMapFailed(true)}
              />
            ) : (
              <div className="flex h-[300px] w-full flex-col items-center justify-center gap-3 bg-ivory-deep p-6 text-center md:h-full md:min-h-[360px]">
                <MapPin className="h-10 w-10 text-gold" aria-hidden="true" />
                <p className="font-body text-brown/80">{venue.addressInline}</p>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-green underline"
                >
                  {ui.openInGoogleMaps}
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
