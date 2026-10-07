"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Languages, Menu, X } from "lucide-react";
import { useContent, useLang } from "./LanguageContext";

// =============================================================================
// Navigation
// -----------------------------------------------------------------------------
// Desktop: refined top bar. Mobile: hamburger → compact dropdown that closes
// after a selection. Smooth scrolling is handled by native CSS (scroll-behavior
// + scroll-padding in globals.css) via anchor links.
// Appears only after the invitation has been opened (controlled by `visible`).
// A language toggle (English ⇄ தமிழ்) lives in both the desktop bar and the
// mobile dropdown; labels are localized via useContent().
// =============================================================================

// Nav items — hrefs are fixed; labels come from the active language.
const LINKS = [
  { key: "home", href: "#home" },
  { key: "invitation", href: "#invitation" },
  { key: "couple", href: "#couple" },
  { key: "countdown", href: "#countdown" },
  { key: "reception", href: "#reception" },
  { key: "venue", href: "#venue" },
  { key: "gallery", href: "#gallery" },
];

export default function Navigation({ visible = true }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { ui } = useContent();
  const { toggle } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ivory/95 shadow-sm backdrop-blur" : "bg-ivory/70 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8"
      >
        {/* Monogram / brand */}
        <a
          href="#home"
          className="font-heading text-lg font-semibold tracking-wide text-maroon sm:text-xl"
        >
          K <span className="text-lotus">&amp;</span> C
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-heading text-[15px] tracking-wide text-brown/80 transition-colors hover:text-green"
              >
                {ui.nav[link.key]}
              </a>
            </li>
          ))}
          {/* Language toggle — shows the name of the OTHER language */}
          <li>
            <button
              type="button"
              onClick={toggle}
              aria-label={ui.langSwitchAria}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 px-3 py-1.5 font-heading text-[14px] tracking-wide text-green transition-colors hover:bg-gold/10"
            >
              <Languages className="h-4 w-4" aria-hidden="true" />
              {ui.langName}
            </button>
          </li>
        </ul>

        {/* Mobile controls: language toggle + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggle}
            aria-label={ui.langSwitchAria}
            className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3 py-2 font-heading text-sm tracking-wide text-green transition-colors hover:bg-gold/10"
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            {ui.langName}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-full border border-gold/50 p-2 text-green transition-colors hover:bg-gold/10"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gold/20 bg-ivory/98 backdrop-blur lg:hidden"
          >
            <ul className="flex flex-col px-5 py-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-gold/10 py-3 font-heading text-base tracking-wide text-brown/90 transition-colors hover:text-green"
                  >
                    {ui.nav[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
