// =============================================================================
// FEATURE FLAGS
// -----------------------------------------------------------------------------
// Build-time toggles driven by NEXT_PUBLIC_* environment variables. Because the
// name is referenced literally below, Next.js inlines the value into the static
// export at build time — so these work in the fully static `out/` site on
// Netlify (no server needed).
// =============================================================================

// Whether to show the invitation PDF download/view buttons.
//
//   NEXT_PUBLIC_SHOW_INVITATION_PDF="true"   → show the PDF buttons
//   NEXT_PUBLIC_SHOW_INVITATION_PDF="false"  → hide ALL PDF buttons
//   unset / empty (local dev)                → show the PDF buttons (default)
//
// Only the explicit string "false" hides the buttons; anything else (including
// an undefined or empty value) keeps them visible.
export const SHOW_INVITATION_PDF =
  process.env.NEXT_PUBLIC_SHOW_INVITATION_PDF !== "false";
