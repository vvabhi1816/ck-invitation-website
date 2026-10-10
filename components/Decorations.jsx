// =============================================================================
// Decorations — original inline SVG motifs (lotus blooms, floral borders,
// dividers, corners, mandalas). Pure SVG so they always render (no external
// asset dependency) and blend into the ivory background. All are decorative →
// aria-hidden. Solid fills (no gradient ids) keep multiple instances safe.
// =============================================================================

// -----------------------------------------------------------------------------
// BloomFan — a single side-view lotus bloom (a fan of layered petals).
// Returns an SVG <g>; compose several into a cluster.
// -----------------------------------------------------------------------------
function BloomFan({ cx, cy, scale = 1, tilt = 0 }) {
  const petal = "M0 0 C -9 -22 -6 -40 0 -48 C 6 -40 9 -22 0 0 Z";
  const back = [-74, -50, -26, 0, 26, 50, 74];
  const front = [-54, -31, -10, 10, 31, 54];
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale}) rotate(${tilt})`}>
      {/* back row — deeper rose */}
      {back.map((a, i) => (
        <path key={`b${i}`} d={petal} transform={`rotate(${a})`} fill="#A62A4E" opacity="0.8" />
      ))}
      {/* front row — brighter lotus pink, a touch smaller */}
      {front.map((a, i) => (
        <path key={`f${i}`} d={petal} transform={`rotate(${a}) scale(0.82)`} fill="#D94E77" opacity="0.96" />
      ))}
      {/* innermost petal */}
      <path d={petal} transform="scale(0.5)" fill="#EC8FA8" />
      {/* golden seed-pod centre */}
      <ellipse cx="0" cy="-7" rx="5.5" ry="4.5" fill="#C99A3D" />
      <circle cx="-3" cy="-8" r="1.3" fill="#8a6a1f" />
      <circle cx="3" cy="-8" r="1.3" fill="#8a6a1f" />
      <circle cx="0" cy="-5" r="1.3" fill="#8a6a1f" />
    </g>
  );
}

// -----------------------------------------------------------------------------
// LotusCluster — a bottom-anchored cluster of blooms, leaves and a bud.
// Designed to sit in a bottom corner; mirror with scaleX(-1) for the other side.
// -----------------------------------------------------------------------------
function LotusCluster({ className = "", flip = false, width = 240 }) {
  const leaf = "M0 0 C -30 -4 -42 -22 -38 -40 C -16 -34 -2 -18 0 0 Z";
  return (
    <svg
      width={width}
      height={width * 0.78}
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* leaves at the base */}
      <path d={leaf} transform="translate(70 196) rotate(8)" fill="#3f7129" opacity="0.7" />
      <path d={leaf} transform="translate(120 198) scale(-1 1) rotate(6)" fill="#315D20" opacity="0.8" />
      <path d={leaf} transform="translate(185 196) scale(0.9) rotate(4)" fill="#4e7d38" opacity="0.7" />
      <path d={leaf} transform="translate(205 198) scale(-0.8 0.8)" fill="#315D20" opacity="0.65" />
      {/* slender leaf blades */}
      <path d="M150 198 C 158 150 170 120 196 98" stroke="#4e7d38" strokeWidth="3" opacity="0.6" />
      <path d="M96 198 C 86 160 70 140 44 126" stroke="#3f7129" strokeWidth="3" opacity="0.5" />

      {/* a bud on a stem */}
      <g transform="translate(214 150)">
        <path d="M0 48 C 0 30 0 14 0 0" stroke="#3f7129" strokeWidth="3" opacity="0.7" />
        <path d="M0 2 C -7 -12 -5 -24 0 -32 C 5 -24 7 -12 0 2 Z" fill="#D94E77" opacity="0.92" />
        <path d="M0 2 C -3 -11 -2 -22 0 -30 C 2 -22 3 -11 0 2 Z" fill="#A62A4E" opacity="0.6" />
      </g>

      {/* blooms */}
      <BloomFan cx={92} cy={158} scale={1.05} tilt={-6} />
      <BloomFan cx={170} cy={170} scale={0.72} tilt={10} />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// FloralBottom — lush lotus clusters anchored in the bottom corners of a
// section (the signature decorative motif). Place inside a `relative` container.
// -----------------------------------------------------------------------------
export function FloralBottom({ className = "", width = 240 }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <LotusCluster width={width} />
      <LotusCluster width={width} flip />
    </div>
  );
}

// -----------------------------------------------------------------------------
// OrnamentalDivider — a delicate gold divider with a central lotus bud.
// -----------------------------------------------------------------------------
export function OrnamentalDivider({ className = "", width = 220 }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <svg width={width} height="28" viewBox="0 0 220 28" fill="none" className="max-w-full" role="presentation">
        <line x1="6" y1="14" x2="86" y2="14" stroke="#C99A3D" strokeWidth="1" opacity="0.7" />
        <circle cx="6" cy="14" r="2" fill="#C99A3D" opacity="0.7" />
        <line x1="134" y1="14" x2="214" y2="14" stroke="#C99A3D" strokeWidth="1" opacity="0.7" />
        <circle cx="214" cy="14" r="2" fill="#C99A3D" opacity="0.7" />
        <path d="M110 4c3 4 4 7 4 10 0 4-2 7-4 9-2-2-4-5-4-9 0-3 1-6 4-10z" fill="#C83B62" opacity="0.85" />
        <path d="M110 23c-5-1-9-4-11-8 4-1 8 0 11 3 3-3 7-4 11-3-2 4-6 7-11 8z" fill="#315D20" opacity="0.8" />
        <circle cx="110" cy="14" r="2.4" fill="#C99A3D" />
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// MandalaCorner — a gold filigree quarter-mandala for card corners.
// -----------------------------------------------------------------------------
export function MandalaCorner({ position = "top-left", className = "", size = 110 }) {
  const placement = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 -scale-x-100",
    "bottom-right": "bottom-0 right-0 -scale-x-100 -scale-y-100",
    "bottom-left": "bottom-0 left-0 -scale-y-100",
  };
  const petals = [0, 15, 30, 45, 60, 75, 90];
  return (
    <div className={`pointer-events-none absolute ${placement[position]} ${className}`} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
        {/* concentric arcs */}
        <path d="M6 6 A 60 60 0 0 1 114 114" stroke="#C99A3D" strokeWidth="1" opacity="0.25" fill="none" />
        {[22, 40, 58].map((r) => (
          <path key={r} d={`M6 6 A ${r} ${r} 0 0 1 ${6 + r} ${6 + r}`} stroke="#C99A3D" strokeWidth="0.9" opacity="0.5" fill="none" />
        ))}
        {/* radiating petals from the corner */}
        {petals.map((a) => (
          <path
            key={a}
            d="M0 0 C 6 10 6 20 0 28 C -6 20 -6 10 0 0 Z"
            transform={`translate(6 6) rotate(${a}) translate(0 10)`}
            fill="#C99A3D"
            opacity="0.3"
          />
        ))}
        <circle cx="6" cy="6" r="3" fill="#C99A3D" opacity="0.6" />
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// LotusCorner — lighter floral corner flourish (stem + leaves + small bloom).
// -----------------------------------------------------------------------------
export function LotusCorner({ position = "top-left", className = "" }) {
  const rotations = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  };
  const placement = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };
  return (
    <div className={`pointer-events-none absolute ${placement[position]} ${className}`} aria-hidden="true">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className={`${rotations[position]} opacity-70`}>
        <path d="M8 8 C 8 45, 28 60, 55 64" stroke="#C99A3D" strokeWidth="1.3" fill="none" opacity="0.8" />
        <path d="M8 8 C 45 8, 60 28, 64 55" stroke="#C99A3D" strokeWidth="1.3" fill="none" opacity="0.8" />
        <path d="M22 30 C 30 34, 34 42, 32 52 C 24 48, 20 40, 22 30z" fill="#315D20" opacity="0.75" />
        <path d="M30 22 C 34 30, 42 34, 52 32 C 48 24, 40 20, 30 22z" fill="#315D20" opacity="0.6" />
        <g transform="translate(60 60)">
          <path d="M0 -16 C 4 -8, 4 -2, 0 4 C -4 -2, -4 -8, 0 -16z" fill="#C83B62" opacity="0.9" />
          <path d="M-14 -8 C -6 -6, -2 -2, 0 4 C -7 3, -12 -1, -14 -8z" fill="#C83B62" opacity="0.7" />
          <path d="M14 -8 C 6 -6, 2 -2, 0 4 C 7 3, 12 -1, 14 -8z" fill="#C83B62" opacity="0.7" />
          <circle cx="0" cy="0" r="3" fill="#C99A3D" />
        </g>
        <circle cx="48" cy="20" r="2.5" fill="#C83B62" opacity="0.7" />
        <circle cx="20" cy="48" r="2.5" fill="#C83B62" opacity="0.7" />
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// TempleArchFrame — a scalable gold ogee (temple) arch that frames a card, with
// a lotus bloom in each corner. Recreates the "temple arch" invitation art, but
// as pure SVG so it fits ANY content height (mobile, desktop, long Tamil text)
// with no cropping or distortion. Place inside a `relative overflow-hidden`
// container; the arch outline uses non-scaling strokes so the gold line stays a
// constant weight however the card is stretched.
// -----------------------------------------------------------------------------
export function TempleArchFrame({ className = "" }) {
  // Corner blooms scale down on phones so they never crowd the text. The arch
  // height (below) and the card's top padding (in InvitationSection) are kept in
  // step at each breakpoint so the content always clears the curve.
  const corner = "scale-[0.58] sm:scale-75 md:scale-90 lg:scale-100";
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {/* Top ogee arch — a BOUNDED height so the content below always clears the
          curve, at every screen size and in both languages. */}
      <svg
        className="absolute inset-x-0 top-0 h-16 w-full sm:h-20 md:h-24 lg:h-28"
        viewBox="0 0 100 52"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M4 52 L4 24 C 6 12 20 13 30 13 C 40 13 47 6 50 2 C 53 6 60 13 70 13 C 80 13 94 12 96 24 L96 52"
          stroke="#C99A3D"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
          opacity="0.65"
        />
        <path
          d="M7 52 L7 26 C 9 16 21 17 30 17 C 39 17 46 10 50 6 C 54 10 61 17 70 17 C 79 17 91 16 93 26 L93 52"
          stroke="#C99A3D"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.4"
        />
        {/* finial at the peak */}
        <path d="M50 0 C 51.4 2.5 51.4 4.5 50 6.5 C 48.6 4.5 48.6 2.5 50 0 Z" fill="#C99A3D" opacity="0.8" />
        <circle cx="50" cy="8" r="1" fill="#C83B62" opacity="0.85" />
      </svg>

      {/* Side + bottom rails. Plain bordered DIVS (not an SVG) so they stretch to
          the REAL content height and close the frame at the bottom. An absolutely
          positioned <svg> with top/bottom offsets sizes itself to its viewBox
          aspect ratio instead of filling, which made the rails stop short of the
          venue details. Divs honour top + bottom, so the arch always grows with
          the content — in English and Tamil, at every width. */}
      <div className="absolute inset-x-[4%] bottom-0 top-16 rounded-b-xl border-x-[1.6px] border-b-[1.6px] border-gold/60 sm:top-20 md:top-24 lg:top-28" />
      <div className="absolute inset-x-[7%] bottom-[5px] top-16 rounded-b-lg border-x border-b border-gold/35 sm:top-20 md:top-24 lg:top-28" />

      {/* lotus blooms in all four corners, echoing the arch art */}
      <LotusCorner position="top-left" className={`origin-top-left ${corner}`} />
      <LotusCorner position="top-right" className={`origin-top-right ${corner}`} />
      <LotusCorner position="bottom-left" className={`origin-bottom-left ${corner}`} />
      <LotusCorner position="bottom-right" className={`origin-bottom-right ${corner}`} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// SideBorder — a seamless vertical lotus-and-leaf vine along the LEFT or RIGHT
// viewport edge. The vine lives in /images/decorations/side-vine.svg and is used
// as a background that SCALES to the element's width (background-size: 100% auto)
// and repeats down the full height — so it stays complete and crisp at ANY width.
// Visible on every screen size (narrow on phones, wider on desktop); sits behind
// the content (-z-10) so it never overlaps text or controls, and never causes
// horizontal scroll. Mirrored on the right so the two sides frame the page.
// -----------------------------------------------------------------------------
export function SideBorder({ side = "left", className = "" }) {
  return (
    <div
      className={`pointer-events-none fixed inset-y-0 -z-10 bg-repeat-y opacity-50 sm:opacity-60 lg:opacity-70 w-[34px] sm:w-[60px] md:w-[88px] lg:w-[120px] xl:w-[150px] ${
        side === "left" ? "left-0" : "right-0 -scale-x-100"
      } ${className}`}
      style={{
        backgroundImage: "url('/images/decorations/side-vine.svg')",
        backgroundSize: "100% auto",
      }}
      aria-hidden="true"
    />
  );
}

// -----------------------------------------------------------------------------
// LotusMark — a small centered lotus emblem used above headings / hero.
// -----------------------------------------------------------------------------
export function LotusMark({ size = 56, className = "" }) {
  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <g transform="translate(32 40)">
          <path d="M0 -28 C 6 -16, 6 -6, 0 2 C -6 -6, -6 -16, 0 -28z" fill="#C83B62" opacity="0.9" />
          <path d="M-12 -24 C -4 -14, -2 -6, 0 2 C -9 -2, -15 -12, -12 -24z" fill="#C83B62" opacity="0.7" />
          <path d="M12 -24 C 4 -14, 2 -6, 0 2 C 9 -2, 15 -12, 12 -24z" fill="#C83B62" opacity="0.7" />
          <path d="M-24 -10 C -12 -6, -4 0, 0 4 C -12 6, -22 0, -24 -10z" fill="#315D20" opacity="0.75" />
          <path d="M24 -10 C 12 -6, 4 0, 0 4 C 12 6, 22 0, 24 -10z" fill="#315D20" opacity="0.75" />
          <circle cx="0" cy="-4" r="3.5" fill="#C99A3D" />
        </g>
      </svg>
    </div>
  );
}
