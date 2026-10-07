"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, Pause, Play, X } from "lucide-react";
import { weddingAssets } from "@/config/assets";
import { LotusMark } from "./Decorations";

// =============================================================================
// Section 8 — Background Music (floating control with an expandable card)
// -----------------------------------------------------------------------------
// • OFF by default — NEVER autoplays (spec + browsers block pre-interaction audio).
// • Tap the floating lotus button to open the player card, then Play / Pause.
// • The button + card clearly show the playing / paused state.
// • Missing or unplayable audio is handled gracefully (shows a gentle note;
//   nothing breaks). Replace the track at config/assets.js (weddingAssets.music).
// =============================================================================
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      // File missing / unplayable or autoplay blocked — fail quietly.
      setPlaying(false);
      setMissing(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingAssets.music}
        loop
        preload="none"
        onError={() => setMissing(true)}
        onEnded={() => setPlaying(false)}
      />

      <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
        {/* Expandable player card */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="gold-frame w-64 rounded-2xl bg-ivory/95 p-4 shadow-xl backdrop-blur"
              role="region"
              aria-label="Background music player"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <LotusMark size={28} />
                  <div className="text-left">
                    <p className="font-heading text-base font-semibold text-maroon">Wedding Melody</p>
                    <p className="font-body text-xs text-brown/60">
                      {missing ? "Music coming soon" : "Play our special music"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close music player"
                  className="rounded-full p-1 text-brown/60 transition-colors hover:bg-gold/10 hover:text-brown"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <button
                  type="button"
                  onClick={toggle}
                  disabled={missing}
                  aria-label={playing ? "Pause music" : "Play music"}
                  aria-pressed={playing}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-green text-ivory shadow transition-colors hover:bg-maroon disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-[1px]" />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating toggle button */}
        <motion.button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            // Convenience: opening the card for the first time doesn't autoplay;
            // the user presses Play. But tapping the button while the card is
            // already open acts as a quick play/pause toggle.
            if (open) toggle();
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={open ? (playing ? "Pause background music" : "Play background music") : "Open music player"}
          aria-pressed={playing}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-green text-ivory shadow-lg transition-colors hover:bg-maroon"
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-gold-soft/50"
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={playing ? { duration: 8, repeat: Infinity, ease: "linear" } : { duration: 0 }}
          />
          {playing ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
        </motion.button>
      </div>
    </>
  );
}
