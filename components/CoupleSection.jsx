"use client";

import { motion } from "framer-motion";
import { weddingAssets } from "@/config/assets";
import { useContent } from "./LanguageContext";
import SafeImage from "./SafeImage";
import { OrnamentalDivider, LotusMark } from "./Decorations";
import { fromLeft, fromRight, fadeUp, vp } from "./motion";

// =============================================================================
// Couple Showcase
// Ornate antique-gold portrait frames inspired by the supplied reference image.
// The frame uses layered arch lines, gold foliage, delicate flourishes and a
// soft ivory/gold surround. There is NO rose/lotus at the top of the frame.
// Original source photos are not edited.
// =============================================================================

const cardReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

function OrnateGoldPortraitFrame() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 700"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      fill="none"
    >
      <defs>
        <linearGradient id="couple-antique-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff1c6" />
          <stop offset="24%" stopColor="#c18a2b" />
          <stop offset="48%" stopColor="#f8dfa0" />
          <stop offset="72%" stopColor="#b87b20" />
          <stop offset="100%" stopColor="#f3d27f" />
        </linearGradient>
        <linearGradient id="couple-gold-leaves" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#fce6a5" />
          <stop offset="50%" stopColor="#c38a2a" />
          <stop offset="100%" stopColor="#9c681d" />
        </linearGradient>
      </defs>

      <g
        stroke="url(#couple-antique-gold)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Three concentric, matching arch outlines with straight sides and a full base */}
        <path d="M20 690 V190 C20 88 88 18 200 18 C312 18 380 88 380 190 V690 Z" strokeWidth="2.8" />
        <path d="M27 690 V191 C27 96 94 27 200 27 C306 27 373 96 373 191 V690 Z" strokeWidth="1.4" />
        <path d="M35 690 V193 C35 106 101 39 200 39 C299 39 365 106 365 193 V690" strokeWidth="1" />

        {/* Horizontal line separates the portrait opening from the caption panel */}
        <path d="M35 451 H365" strokeWidth="1.4" />
        <path d="M47 458 H353" strokeWidth="0.7" opacity="0.8" />
        <path d="M20 690 H380" strokeWidth="2.4" />
        <path d="M27 683 H373" strokeWidth="0.8" />

        {/* Small restrained gold crest — no flower or rose */}
        <path d="M200 10 L205 18 L200 26 L195 18 Z" fill="url(#couple-gold-leaves)" strokeWidth="1" />
        <path d="M181 34 Q190 27 200 34 Q210 27 219 34" strokeWidth="1.2" />
        <path d="M170 43 Q179 36 188 43 M212 43 Q221 36 230 43" strokeWidth="0.9" />

        {/* Symmetrical side vines. Leaves remain inside the outer frame. */}
        <path d="M25 125 C17 180 24 235 25 285 C26 340 23 390 27 442" strokeWidth="1" />
        <path d="M375 125 C383 180 376 235 375 285 C374 340 377 390 373 442" strokeWidth="1" />

        <path d="M25 155 C10 148 10 137 17 130 C25 138 27 147 25 155 Z" fill="url(#couple-gold-leaves)" strokeWidth="0.7" />
        <path d="M25 205 C39 196 41 185 34 177 C27 185 23 196 25 205 Z" fill="url(#couple-gold-leaves)" strokeWidth="0.7" />
        <path d="M25 260 C10 253 10 242 17 235 C25 243 27 252 25 260 Z" fill="url(#couple-gold-leaves)" strokeWidth="0.7" />
        <path d="M25 315 C39 306 41 295 34 287 C27 295 23 306 25 315 Z" fill="url(#couple-gold-leaves)" strokeWidth="0.7" />
        <path d="M26 370 C11 363 11 352 18 345 C26 353 28 362 26 370 Z" fill="url(#couple-gold-leaves)" strokeWidth="0.7" />
        <path d="M27 420 C39 411 41 400 34 392 C28 400 25 411 27 420 Z" fill="url(#couple-gold-leaves)" strokeWidth="0.7" />

        <path d="M375 155 C390 148 390 137 383 130 C375 138 373 147 375 155 Z" fill="url(#couple-gold-leaves)" strokeWidth="0.7" />
        <path d="M375 205 C361 196 359 185 366 177 C373 185 377 196 375 205 Z" fill="url(#couple-gold-leaves)" strokeWidth="0.7" />
        <path d="M375 260 C390 253 390 242 383 235 C375 243 373 252 375 260 Z" fill="url(#couple-gold-leaves)" strokeWidth="0.7" />
        <path d="M375 315 C361 306 359 295 366 287 C373 295 377 306 375 315 Z" fill="url(#couple-gold-leaves)" strokeWidth="0.7" />
        <path d="M374 370 C389 363 389 352 382 345 C374 353 372 362 374 370 Z" fill="url(#couple-gold-leaves)" strokeWidth="0.7" />
        <path d="M373 420 C361 411 359 400 366 392 C372 400 375 411 373 420 Z" fill="url(#couple-gold-leaves)" strokeWidth="0.7" />

        {/* Clean, uninterrupted bottom rail; no extra corner or centre flourishes. */}
        <circle cx="27" cy="470" r="1.8" fill="#c58d2b" strokeWidth="0.5" />
        <circle cx="373" cy="470" r="1.8" fill="#c58d2b" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

function PersonCard({ title, name, detail, src, alt, placeholder, variant = cardReveal }) {
  return (
    <motion.article
      variants={variant}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="flex min-w-0 flex-col items-center rounded-2xl border border-[#e8c779]/45 bg-gradient-to-b from-[#fff9e9] via-[#fbf0d4] to-[#f5e2b4] p-3 text-center shadow-[0_10px_30px_rgba(150,105,34,0.10)] sm:p-5"
    >
      {/* One unified portrait + caption frame. Its bottom is deliberately extended
          so the name and profession sit INSIDE the same gold arch, not underneath it. */}
      <div className="relative mx-auto w-full max-w-[460px]">
        <div className="relative aspect-[4/6.2] w-full">
          {/* Warm ivory/gold backing fills the arch. No white card is placed behind
              the photo, so white studio backgrounds blend into this warm surface. */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fff9e8] via-[#fff3d2] to-[#f5dfaa]" />

          {/* Portrait opening follows the inner arch. mix-blend-multiply makes the
              original white studio background blend into the ivory backing while
              preserving the couple and their clothing. object-contain avoids cropping. */}
          <div
            className="absolute overflow-hidden bg-[#fff9e8]"
            style={{
              left: "15.5%",
              right: "15.5%",
              top: "6.5%",
              height: "57.8%",
              borderRadius: "50% 50% 0 0 / 35% 35% 0 0",
            }}
          >
            <SafeImage
              src={src}
              alt={alt}
              placeholderLabel={placeholder}
              rounded="rounded-none"
              className="h-full w-full object-contain object-bottom mix-blend-multiply"
            />
          </div>

          {/* Captions sit inside the extended lower part of the same arch frame. */}
          <div
            className="absolute z-10 flex flex-col items-center justify-center px-[12%] text-center"
            style={{ top: "65%", left: "8%", right: "8%", bottom: "8%" }}
          >
            <p className="eyebrow text-[9px] font-medium tracking-[0.22em] text-[#a96e16] sm:text-xs">
              {title}
            </p>
            <h3 className="mt-1 w-full break-words font-heading text-lg font-semibold leading-tight text-[#285b28] sm:text-2xl md:text-[1.7rem]">
              {name}
            </h3>
            <p className="mt-1 max-w-full break-words font-body text-[10px] italic leading-snug text-[#6f5540] sm:text-sm">
              {detail}
            </p>
            <div className="mt-2 flex w-full max-w-[190px] items-center gap-2 text-[#c28a28]" aria-hidden="true">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c28a28] to-[#c28a28]" />
              <span className="h-1.5 w-1.5 rotate-45 border border-[#c28a28]" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#c28a28] to-[#c28a28]" />
            </div>
          </div>

          {/* The same SVG outlines the arch, portrait opening, separator, and extended
              lower panel. Because it shares the exact box, the borders stay aligned. */}
          <OrnateGoldPortraitFrame />
        </div>
      </div>
    </motion.article>
  );
}

export default function CoupleSection() {
  const { bride, groom, ui } = useContent();

  return (
    <section
      id="couple"
      className="relative w-full overflow-hidden px-4 py-16 sm:px-8 sm:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <LotusMark size={48} className="mb-4" />
          <p className="eyebrow text-xs text-gold">{ui.beginningForever}</p>
          <h2 className="mt-2 font-heading text-4xl font-semibold text-maroon sm:text-5xl">
            {ui.theCouple}
          </h2>
          <OrnamentalDivider className="mt-5" />
        </div>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.26 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:gap-9"
        >
          {/* Bride card glides in from the LEFT, groom card from the RIGHT. */}
          <PersonCard
            title={ui.theBride}
            name={bride.fullName}
            detail={bride.profession}
            src={weddingAssets.bride}
            alt={`Portrait of ${bride.fullName}, the bride`}
            placeholder="Bride's photo — add bride.jpg"
            variant={fromLeft}
          />

          <PersonCard
            title={ui.theGroom}
            name={groom.fullName}
            detail={groom.profession}
            src={weddingAssets.groom}
            alt={`Portrait of ${groom.fullName}, the groom`}
            placeholder="Groom's photo — add groom.jpg"
            variant={fromRight}
          />
        </motion.div>

        {/* Couple photo banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          className="relative mt-10 overflow-hidden rounded-2xl shadow-md sm:mt-12"
        >
          <div
            className="flex min-h-[260px] items-center justify-center bg-green/90 bg-cover bg-center bg-no-repeat px-6 py-16 text-center sm:min-h-[340px]"
            style={{
              backgroundImage: `linear-gradient(rgba(30,20,10,0.45), rgba(30,20,10,0.6)), url('${weddingAssets.couple}')`,
            }}
          >
            <div className="mx-auto max-w-4xl">
              <p className="font-heading text-lg text-ivory/90 sm:text-xl">
                {ui.welcome}
              </p>
              <h3 className="mt-3 font-heading text-3xl font-semibold text-ivory sm:text-4xl md:text-5xl">
                {bride.shortName}{" "}
                <span className="text-gold-soft">&amp;</span>{" "}
                {groom.shortName}
              </h3>
              <p className="mt-3 font-body text-base italic text-ivory/85 sm:text-lg">
                {ui.twoHearts}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
