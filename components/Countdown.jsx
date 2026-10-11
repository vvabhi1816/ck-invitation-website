"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { weddingAssets } from "@/config/assets";
import { useContent } from "./LanguageContext";
import { OrnamentalDivider, LotusMark, InnerBackground } from "./Decorations";
import { stagger, fadeUp, vp } from "./motion";

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
      {/* Cards step down on narrow phones so all four fit between the lotus
          borders without shrinking (shrink-0 keeps them square); the desktop
          size (h-24/w-24) is unchanged at sm+. */}
      <div className="gold-frame flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ivory/80 min-[360px]:h-14 min-[360px]:w-14 min-[400px]:h-16 min-[400px]:w-16 sm:h-24 sm:w-24">
        {/* Animate the number so each tick updates smoothly */}
        <motion.span
          key={display}
          initial={{ opacity: 0.3, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-heading text-xl font-semibold text-maroon min-[360px]:text-2xl min-[400px]:text-3xl sm:text-4xl"
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
      className="px-inner relative w-full overflow-hidden py-20 sm:py-24"
    >
      {/* Background confined to the inner area BETWEEN the lotus vines, so the Taj
          image + wash never reach the borders. The global vines render at the
          viewport edges and stay fully visible outside this box. */}
      <InnerBackground>
        {/* LAYER 1 (bottom) — animated golden-hour Taj Mahal GIF (gently slowed).
            CHANGE BACKGROUND HERE → config/assets.js (weddingAssets.countdownBackground).
            A very slow CSS drift (.countdown-bg-anim, see globals.css) adds smooth,
            elegant movement; it is hidden for visitors who prefer reduced motion. */}
        <div
          className="countdown-bg-anim absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${weddingAssets.countdownBackground}')` }}
        />
        {/* LAYER 1b — static first frame shown ONLY under prefers-reduced-motion
            (no GIF, no drift). Hidden by default via globals.css. */}
        <div
          className="countdown-bg-still absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${weddingAssets.countdownBackgroundStill}')` }}
        />
        {/* LAYER 2 (middle) — a LIGHT wash tuned to keep the Taj Mahal rich and
            visible (not washed out). The centre is almost clear so the sunset,
            gardens and reflection read cinematically; a gentle warm tint deepens
            the whole image slightly; strong ivory fades remain only at the very
            top and bottom so the heading and venue line stay readable and the
            section still melts into the surrounding ivory. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(248,241,222,0.94) 0%, rgba(248,241,222,0.30) 15%, rgba(248,241,222,0.06) 42%, rgba(248,241,222,0.06) 58%, rgba(248,241,222,0.38) 83%, rgba(248,241,222,0.96) 100%), linear-gradient(rgba(46,24,10,0.20), rgba(46,24,10,0.12))",
          }}
        />
      </InnerBackground>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Heading reveals first... */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          <LotusMark size={48} className="mb-4" />
          <p className="eyebrow text-xs text-gold">{ui.saveTheDate}</p>
          <h2 className="countdown-title mt-2 max-w-full font-heading text-4xl font-semibold text-maroon sm:text-5xl">
            {ui.countingDown}
          </h2>
          <OrnamentalDivider className="my-7" />
        </motion.div>

        {/* States */}
        {!mounted ? (
          <div className="flex justify-center gap-2 min-[400px]:gap-3 sm:gap-6">
            {[ui.days, ui.hours, ui.minutes, ui.seconds].map((l) => (
              <Unit key={l} value={0} label={l} />
            ))}
          </div>
        ) : status.phase === "before" ? (
          /* ...then the four boxes rise in sequence. */
          <motion.div
            variants={stagger()}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            className="flex justify-center gap-2 min-[400px]:gap-3 sm:gap-6"
          >
            <motion.div variants={fadeUp}>
              <Unit value={status.days} label={ui.days} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <Unit value={status.hours} label={ui.hours} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <Unit value={status.minutes} label={ui.minutes} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <Unit value={status.seconds} label={ui.seconds} />
            </motion.div>
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
