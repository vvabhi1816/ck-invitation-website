"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { weddingAssets } from "@/config/assets";
import { useContent } from "./LanguageContext";
import {
  OrnamentalDivider,
  LotusMark,
  InnerBackground,
} from "./Decorations";
import { stagger, fadeUp, vp } from "./motion";

// Calculate the remaining time until the reception starts or ends.
function getStatus(startMs, endMs, nowMs) {
  if (nowMs >= endMs) return { phase: "ended" };
  if (nowMs >= startMs) return { phase: "live" };

  const diff = Math.max(0, startMs - nowMs);
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
    <div className="flex min-w-0 flex-col items-center">
      <div className="gold-frame flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ivory/85 min-[360px]:h-14 min-[360px]:w-14 min-[400px]:h-16 min-[400px]:w-16 sm:h-24 sm:w-24">
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

      <span className="eyebrow mt-2 text-center text-[9px] text-green/90 min-[360px]:text-[10px] sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const { event, venue, ui } = useContent();

  const startMs = new Date(wedding.event.startISO).getTime();
  const endMs = new Date(wedding.event.endISO).getTime();

  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState({
    phase: "before",
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);

    const tick = () => {
      setStatus(getStatus(startMs, endMs, Date.now()));
    };

    tick();

    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [startMs, endMs]);

  return (
    <section
      id="countdown"
      className="px-inner relative isolate w-full overflow-hidden py-16 sm:py-24"
    >
      {/* Background video stays inside the area between the lotus borders. */}
      <InnerBackground>
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
          >
            <source
              src={weddingAssets.countdownBackground}
              type="video/mp4"
            />
          </video>

          {/* Warm ivory overlay preserves the wedding theme and text contrast. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(248,241,222,0.58) 0%, rgba(248,241,222,0.38) 25%, rgba(248,241,222,0.32) 65%, rgba(248,241,222,0.72) 100%)",
            }}
          />
        </div>
      </InnerBackground>

      {/* Countdown content */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-1 text-center sm:px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
        >
          <LotusMark size={48} className="mb-4" />

          <p className="eyebrow text-xs text-gold">
            {ui.saveTheDate}
          </p>

          <h2 className="countdown-title mx-auto mt-2 w-full max-w-full break-words font-heading text-2xl font-semibold leading-tight text-maroon min-[360px]:text-3xl sm:text-5xl">
            {ui.countingDown}
          </h2>

          <OrnamentalDivider className="my-6 sm:my-7" />
        </motion.div>

        {/* Timer states */}
        {!mounted ? (
          <div className="flex w-full justify-center gap-2 min-[360px]:gap-3 sm:gap-6">
            {[ui.days, ui.hours, ui.minutes, ui.seconds].map((label) => (
              <Unit key={label} value={0} label={label} />
            ))}
          </div>
        ) : status.phase === "before" ? (
          <motion.div
            variants={stagger(0.14)}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            className="flex w-full justify-center gap-2 min-[360px]:gap-3 sm:gap-6"
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
          <p className="break-words font-heading text-2xl font-semibold text-green sm:text-4xl">
            {ui.celebrationBegun}
          </p>
        ) : (
          <div>
            <p className="break-words font-heading text-2xl font-semibold text-green sm:text-4xl">
              {ui.gratitudeTitle}
            </p>

            <p className="mt-3 font-body text-base italic text-brown/90 sm:text-lg">
              {ui.gratitudeSub}
            </p>
          </div>
        )}

        <p className="mx-auto mt-7 max-w-full break-words font-body text-sm leading-relaxed text-brown sm:mt-8 sm:text-base">
          {event.dateLabel} &middot; {event.timeLabel} &middot; {venue.name}
        </p>
      </div>
    </section>
  );
}