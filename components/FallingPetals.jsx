"use client";

import { motion, useReducedMotion } from "framer-motion";

const petals = [
  { left: "8%", delay: 0, duration: 8, drift: 35, size: 11 },
  { left: "18%", delay: 2, duration: 10, drift: -25, size: 8 },
  { left: "30%", delay: 4, duration: 9, drift: 30, size: 10 },
  { left: "43%", delay: 1, duration: 11, drift: -35, size: 9 },
  { left: "56%", delay: 5, duration: 8.5, drift: 28, size: 12 },
  { left: "68%", delay: 2.5, duration: 10, drift: -30, size: 8 },
  { left: "79%", delay: 4.5, duration: 9.5, drift: 35, size: 10 },
  { left: "91%", delay: 1.5, duration: 11, drift: -25, size: 9 },
  { left: "24%", delay: 6, duration: 9, drift: 25, size: 7 },
  { left: "74%", delay: 7, duration: 10, drift: -32, size: 11 },
];

export default function FallingPetals() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      {petals.map((petal, index) => (
        <motion.span
          key={index}
          className="absolute top-[-24px] block rounded-[80%_10%_80%_10%] bg-[#E66B91]"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.5,
            opacity: 0.72,
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, petal.drift, -petal.drift * 0.4, petal.drift * 0.6],
            rotate: [0, 120, 260, 420],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0,
          }}
        />
      ))}
    </div>
  );
}