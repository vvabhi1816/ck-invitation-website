"use client";

import { useState } from "react";
import { Flower2 } from "lucide-react";

// =============================================================================
// SafeImage
// -----------------------------------------------------------------------------
// A plain <img> that NEVER shows a broken-image icon. If the file is missing
// (or fails to load), it renders an elegant styled placeholder instead.
// Used everywhere a real photo will eventually be dropped into /public.
// =============================================================================
export default function SafeImage({
  src,
  alt = "",
  className = "",
  placeholderLabel = "Photo coming soon",
  rounded = "rounded-xl",
  priority = false,
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt || placeholderLabel}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-ivory-deep via-ivory to-[#ead9b0] text-green/60 ${rounded} ${className}`}
      >
        <Flower2 className="h-10 w-10 text-gold/70" aria-hidden="true" />
        <span className="font-heading text-sm tracking-wide text-brown/50">{placeholderLabel}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`${rounded} ${className}`}
    />
  );
}
