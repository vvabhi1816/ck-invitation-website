"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { useContent } from "./LanguageContext";
import { OrnamentalDivider, LotusMark } from "./Decorations";

// =============================================================================
// Section 4 — Countdown (timezone-safe)
// -----------------------------------------------------------------------------
// Counts down to the reception START. The target comes from an ISO string with
// an explicit +05:30 offset (config/wedding.js → event.startISO), so the instant
// is identical in every visitor's timezone. We compare against Date.now() (UTC
// milliseconds), which is also timezone-independent.
//
// =============================================================================

// Pure helper — returns the remaining time + which phase we're in.
function getStatus(startMs, endMs, nowMs) {
  if (nowMs >= endMs) return { phase: "ended" };
  if (nowMs >= startMs) return { phase: "live" };

  const diff = Math.max(0, startMs - nowMs); // clamp — never negative
  const totalSeconds = Math.floor(diff / 1000);
  return {
    phase: "before",
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function Unit({ value, label }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="gold-frame flex h-20 w-20 items-center justify-center rounded-xl bg-ivory/80 sm:h-24 sm:w-24">
        {/* Animate the number so each tick updates smoothly */}
        <motion.span
          key={display}
          initial={{ opacity: 0.3, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-heading text-3xl font-semibold text-maroon sm:text-4xl"
        >
          {display}
        </motion.span>
      </div>
      <span className="eyebrow mt-2 text-[10px] text-green/80 sm:text-xs">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const { event, venue, ui } = useContent();
  // Timestamps are timezone-safe technical values — always from config/wedding.js.
  const startMs = new Date(wedding.event.startISO).getTime();
  const endMs = new Date(wedding.event.endISO).getTime();

  // `mounted` avoids a hydration mismatch (server has no "now"). Until mounted
  // we render a neutral placeholder with the same layout.
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState({ phase: "before", days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    const tick = () => setStatus(getStatus(startMs, endMs, Date.now()));
    tick(); // immediate first render
    const id = setInterval(tick, 1000);
    return () => clearInterval(id); // cleanup timer
  }, [startMs, endMs]);

  return (
    <section
      id="countdown"
      className="relative w-full overflow-hidden px-5 py-20 sm:px-8 sm:py-24"
    >
      {/* Countdown decorative background */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75"
        style={{
          backgroundImage: "url('/images/decorations/countdown-pattern.webp')",
        }}
        aria-hidden="true"
      />

      {/* Soft overlay for text readability */}
      <div
        className="pointer-events-none absolute inset-0 bg-ivory/35"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <LotusMark size={48} className="mb-4" />
        <p className="eyebrow text-xs text-gold">{ui.saveTheDate}</p>
        <h2 className="mt-2 font-heading text-4xl font-semibold text-maroon sm:text-5xl">
          {ui.countingDown}
        </h2>
        <OrnamentalDivider className="my-7" />

        {/* States */}
        {!mounted ? (
          <div className="flex justify-center gap-3 sm:gap-6">
            {[ui.days, ui.hours, ui.minutes, ui.seconds].map((l) => (
              <Unit key={l} value={0} label={l} />
            ))}
          </div>
        ) : status.phase === "before" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center gap-3 sm:gap-6"
          >
            <Unit value={status.days} label={ui.days} />
            <Unit value={status.hours} label={ui.hours} />
            <Unit value={status.minutes} label={ui.minutes} />
            <Unit value={status.seconds} label={ui.seconds} />
          </motion.div>
        ) : status.phase === "live" ? (
          <p className="font-heading text-3xl font-semibold text-green sm:text-4xl">
            {ui.celebrationBegun}
          </p>
        ) : (
          <div>
            <p className="font-heading text-3xl font-semibold text-green sm:text-4xl">
              {ui.gratitudeTitle}
            </p>
            <p className="mt-3 font-body text-lg italic text-brown/80">
              {ui.gratitudeSub}
            </p>
          </div>
        )}

        <p className="mt-8 font-body text-base text-brown/70">
          {event.dateLabel} &middot; {event.timeLabel} &middot; {venue.name}
        </p>
      </div>
    </section>
  );
}
