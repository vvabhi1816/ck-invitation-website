"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Navigation2 } from "lucide-react";
import { wedding } from "@/config/wedding";
import { weddingAssets } from "@/config/assets";
import { useContent } from "./LanguageContext";
import SafeImage from "./SafeImage";
import {
  OrnamentalDivider,
  LotusMark,
  InnerBackground,
} from "./Decorations";
import { stagger, fromLeft, fromRight, popUp, vp } from "./motion";

// =============================================================================
// Reception Details
// Improved text contrast while preserving the original layout, silk background,
// venue image, bilingual content, animations, and directions link.
// =============================================================================

function DetailRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3 text-left sm:gap-4">
      <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D6B36A] bg-[#E8E1C7] text-[#28551F] shadow-sm">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <p
          className="eyebrow text-xs font-bold tracking-[0.2em] text-[#87550A] sm:text-sm"
          style={{ textShadow: "0 1px 0 rgba(255,255,255,0.75)" }}
        >
          {label}
        </p>

        <div className="mt-1 font-body leading-relaxed text-[#34251B]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ReceptionDetails() {
  const { event, venue, ui } = useContent();
  const mapsSearchUrl = wedding.venue.mapsSearchUrl;

  return (
    <section
      id="reception"
      className="px-inner relative w-full overflow-hidden py-20 sm:py-24"
    >
      {/* Background texture stays between the lotus borders. */}
      <InnerBackground>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${weddingAssets.receptionBackground}')`,
          }}
          aria-hidden="true"
        />

        {/* Gentle wash preserves the silk texture while improving contrast. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(255, 249, 233, 0.40)",
          }}
          aria-hidden="true"
        />
      </InnerBackground>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={vp}
          variants={stagger(0.12)}
          className="text-center"
        >
          <motion.div variants={popUp}>
            <LotusMark size={48} className="mb-4" />
          </motion.div>

          <motion.p
            variants={fromLeft}
            className="eyebrow text-xs font-bold text-[#87550A] sm:text-sm"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.8)" }}
          >
            {ui.invitedLine}
          </motion.p>

          <motion.h2
            variants={fromRight}
            className="mt-2 font-heading text-3xl font-bold text-[#7E1F2D] sm:text-5xl"
            style={{
              textShadow: "0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {event.title}
          </motion.h2>

          <motion.p
            variants={fromLeft}
            className="mt-2 font-heading text-base font-semibold italic text-[#493326] sm:text-lg"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.7)" }}
          >
            {event.subtitle}
          </motion.p>

          <motion.div variants={popUp}>
            <OrnamentalDivider className="my-8" />
          </motion.div>
        </motion.div>

        {/* Panoramic reception-hall photograph */}
        <motion.div
          variants={popUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          className="gold-frame overflow-hidden rounded-2xl bg-[#FFF9E9] p-1.5 shadow-md"
        >
          <SafeImage
            src={weddingAssets.receptionHall}
            alt={`${venue.name} illuminated at night`}
            placeholderLabel="Venue photo — add reception-hall.jpg"
            rounded="rounded-xl"
            className="aspect-[2/1] w-full object-cover object-[60%_center] sm:aspect-[5/2]"
          />
        </motion.div>

        {/* Reception details — dark text on a translucent ivory panel. */}
        <motion.div
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          className="mx-auto mt-10 max-w-md rounded-2xl border border-[#D6B36A] bg-[#FFF9E9]/90 p-5 shadow-[0_8px_28px_rgba(74,48,20,0.13)] backdrop-blur-sm sm:mt-12 sm:p-7"
        >
          <div className="space-y-7">
            <motion.div variants={fromLeft}>
              <DetailRow icon={Calendar} label={ui.dateLabelIcon}>
                <p className="break-words font-heading text-lg font-bold text-[#28551F] sm:text-xl">
                  {event.dateLabel}
                </p>
              </DetailRow>
            </motion.div>

            <motion.div variants={fromRight}>
              <DetailRow icon={Clock} label={ui.timeLabelIcon}>
                <p className="break-words font-heading text-lg font-bold text-[#28551F] sm:text-xl">
                  {event.timeLabel}
                </p>
              </DetailRow>
            </motion.div>

            <motion.div variants={fromLeft}>
              <DetailRow icon={MapPin} label={ui.venueLabelIcon}>
                <p className="break-words font-heading text-lg font-bold text-[#28551F] sm:text-xl">
                  {venue.name}
                </p>

                <p className="mt-2 text-sm font-medium leading-7 text-[#34251B] sm:text-base">
                  {venue.addressLines.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </DetailRow>
            </motion.div>
          </div>

          {/* Get Directions */}
          <motion.div variants={fromRight} className="mt-8 text-center">
            <motion.a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border-2 border-[#D6B36A] bg-[#851F32] px-6 py-3 font-heading text-sm font-bold tracking-wide text-[#FFF9E9] shadow-md transition-colors hover:bg-[#28551F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87550A] focus-visible:ring-offset-2 sm:px-8 sm:text-base"
            >
              <Navigation2
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              />
              <span className="text-center">{ui.getDirections}</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}