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
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#c99a3d] bg-[#fffaf0]/95 shadow-[0_4px_14px_rgba(65,38,15,0.22)] min-[360px]:h-14 min-[360px]:w-14 min-[400px]:h-16 min-[400px]:w-16 sm:h-24 sm:w-24">
        <motion.span
          key={display}
          initial={{ opacity: 0.4, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="font-heading text-xl font-bold leading-none text-[#852337] min-[360px]:text-2xl min-[400px]:text-3xl sm:text-4xl"
        >
          {display}
        </motion.span>
      </div>

      <span className="mt-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-[#24491f] drop-shadow-[0_1px_1px_rgba(255,250,240,0.9)] min-[400px]:text-xs sm:tracking-[0.2em]">
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
      {/* Animated video background */}
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

          {/* Stronger warm overlay improves text contrast without hiding the video. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(248,241,222,0.78) 0%, rgba(248,241,222,0.62) 35%, rgba(248,241,222,0.60) 70%, rgba(248,241,222,0.82) 100%), linear-gradient(rgba(255,248,232,0.12), rgba(55,30,17,0.12))",
            }}
          />
        </div>
      </InnerBackground>

      {/* Countdown content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-1 text-center sm:px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
        >
          <LotusMark size={52} className="mb-4" />

          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#80520c] drop-shadow-[0_1px_1px_rgba(255,250,240,0.95)] sm:text-sm">
            {ui.saveTheDate}
          </p>

          <h2 className="countdown-title mx-auto mt-3 w-full max-w-full break-words font-heading text-3xl font-bold leading-tight text-[#842337] [text-shadow:0_1px_1px_rgba(255,250,240,0.95)] min-[400px]:text-4xl sm:text-5xl md:text-6xl">
            {ui.countingDown}
          </h2>

          <OrnamentalDivider className="my-6 sm:my-8" />
        </motion.div>

        {/* Timer */}
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
          <p className="break-words rounded-2xl border border-[#c99a3d] bg-[#fffaf0]/90 px-4 py-5 font-heading text-2xl font-bold text-[#24491f] shadow-md sm:text-4xl">
            {ui.celebrationBegun}
          </p>
        ) : (
          <div className="rounded-2xl border border-[#c99a3d] bg-[#fffaf0]/90 px-4 py-5 shadow-md">
            <p className="break-words font-heading text-2xl font-bold text-[#24491f] sm:text-4xl">
              {ui.gratitudeTitle}
            </p>

            <p className="mt-3 font-body text-base font-semibold text-[#493126] sm:text-lg">
              {ui.gratitudeSub}
            </p>
          </div>
        )}

        <p className="mx-auto mt-7 max-w-2xl rounded-xl border border-[#c99a3d]/60 bg-[#fffaf0]/85 px-3 py-3 font-body text-sm font-semibold leading-relaxed text-[#40281e] shadow-sm sm:mt-9 sm:text-base md:text-lg">
          {event.dateLabel} &middot; {event.timeLabel} &middot; {venue.name}
        </p>
      </div>
    </section>
  );
}