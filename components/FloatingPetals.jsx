"use client";

import { motion } from "framer-motion";

// =============================================================================
// FloatingPetals — soft lotus petals drifting down the screen. Purely
// decorative (aria-hidden) and non-interactive. Configs are a fixed list (no
// Math.random) so server and client render identically — no hydration mismatch.
// Honors reduced-motion via the global MotionConfig in app/page.js.
// =============================================================================

// A single side-view lotus petal.
function Petal({ size = 22, color = "#D94E77" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 1 C 17 7, 18 15, 12 23 C 6 15, 7 7, 12 1 Z"
        fill={color}
        opacity="0.85"
      />
      <path d="M12 6 C 14 10, 14 15, 12 20 C 10 15, 10 10, 12 6 Z" fill="#A62A4E" opacity="0.35" />
    </svg>
  );
}

// left% , size, color, duration(s), delay(s), horizontal sway(px), spin(deg)
const PETALS = [
  { left: 6, size: 20, color: "#D94E77", dur: 15, delay: 0, sway: 34, spin: 160 },
  { left: 16, size: 14, color: "#EC8FA8", dur: 19, delay: 3.5, sway: -28, spin: -140 },
  { left: 27, size: 24, color: "#C83B62", dur: 13, delay: 1.5, sway: 26, spin: 200 },
  { left: 38, size: 16, color: "#D94E77", dur: 21, delay: 6, sway: -34, spin: -180 },
  { left: 49, size: 12, color: "#EC8FA8", dur: 17, delay: 2.2, sway: 30, spin: 150 },
  { left: 60, size: 22, color: "#C83B62", dur: 14, delay: 4.5, sway: -24, spin: -170 },
  { left: 71, size: 15, color: "#D94E77", dur: 20, delay: 0.8, sway: 32, spin: 190 },
  { left: 82, size: 26, color: "#EC8FA8", dur: 12, delay: 5.5, sway: -30, spin: -150 },
  { left: 91, size: 17, color: "#C83B62", dur: 18, delay: 2.8, sway: 28, spin: 170 },
  { left: 97, size: 13, color: "#D94E77", dur: 16, delay: 7, sway: -22, spin: -160 },
];

export default function FloatingPetals({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {PETALS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute -top-[6%]"
          style={{ left: `${p.left}%` }}
          initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: ["-10vh", "110vh"],
            x: [0, p.sway, 0, -p.sway, 0],
            rotate: [0, p.spin],
            opacity: [0, 0.9, 0.9, 0.7, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.1, 0.5, 0.9, 1],
          }}
        >
          <Petal size={p.size} color={p.color} />
        </motion.div>
      ))}
    </div>
  );
}
