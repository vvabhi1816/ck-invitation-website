
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Languages, Menu, X } from "lucide-react";
import { useContent, useLang } from "./LanguageContext";

// Navigation items. Set `hidden: true` to temporarily remove a menu item from
// BOTH the desktop and mobile menus without deleting its section/component.
// To restore Venue or Gallery later, simply remove their `hidden: true` flag
// (and re-enable the matching section in app/page.js).
const LINKS = [
  { key: "home", href: "#home" },
  { key: "invitation", href: "#invitation" },
  { key: "couple", href: "#couple" },
  { key: "countdown", href: "#countdown" },
  { key: "reception", href: "#reception" },
  { key: "venue", href: "#venue", hidden: true }, // Venue hidden for now
  { key: "gallery", href: "#gallery", hidden: true }, // Gallery hidden for now
];

// Only the visible items are rendered in either menu layout.
const VISIBLE_LINKS = LINKS.filter((link) => !link.hidden);

export default function Navigation({ visible = true }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef(null);
  const { ui } = useContent();
  const { toggle } = useLang();

  // Update the header appearance while scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the mobile menu with Escape or when switching to desktop width.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Close the menu when the user taps outside the navigation.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Reliable section navigation on both mobile and desktop.
  // Accounts for the fixed navigation bar so section headings aren't hidden.
  const handleNavigate = useCallback((event, href) => {
    event.preventDefault();

    const id = href.replace(/^#/, "");
    const target = document.getElementById(id);

    setOpen(false);

    if (!target) {
      window.location.hash = id;
      return;
    }

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }

    const headerHeight =
      headerRef.current?.querySelector("nav")?.getBoundingClientRect()
        .height ?? 72;

    const targetTop =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      12;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, []);

  if (!visible) return null;

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 ${
        scrolled
          ? "bg-ivory/95 shadow-sm backdrop-blur-md"
          : "bg-ivory/90 backdrop-blur-md"
      } transition-colors duration-300`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex min-h-[64px] max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8"
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={(event) => handleNavigate(event, "#home")}
          className="shrink-0 font-heading text-lg font-semibold tracking-wide text-maroon sm:text-xl"
        >
          K <span className="text-lotus">&amp;</span> C
        </a>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
          {VISIBLE_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) => handleNavigate(event, link.href)}
                className="whitespace-nowrap font-heading text-[15px] tracking-wide text-brown/90 transition-colors hover:text-green"
              >
                {ui.nav[link.key]}
              </a>
            </li>
          ))}

          <li>
            <button
              type="button"
              onClick={toggle}
              aria-label={ui.langSwitchAria}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gold/60 px-3 py-1.5 font-heading text-sm tracking-wide text-green transition-colors hover:bg-gold/10"
            >
              <Languages className="h-4 w-4" aria-hidden="true" />
              {ui.langName}
            </button>
          </li>
        </ul>

        {/* Mobile language toggle and menu button */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => {
              toggle();
              setOpen(false);
            }}
            aria-label={ui.langSwitchAria}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-gold/60 px-3 py-2 font-heading text-sm text-green transition-colors hover:bg-gold/10"
          >
            <Languages className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{ui.langName}</span>
          </button>

          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-ivory text-green transition-colors hover:bg-gold/10 focus-visible:outline-none"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown: positioned below the fixed header */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-[60] max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-gold/30 bg-ivory shadow-lg backdrop-blur-md lg:hidden"
          >
            <ul className="mx-auto flex w-full max-w-6xl flex-col px-4 py-2 sm:px-8">
              {VISIBLE_LINKS.map((link) => (
                <li key={link.href} className="w-full">
                  <a
                    href={link.href}
                    onClick={(event) => handleNavigate(event, link.href)}
                    className="flex min-h-12 w-full items-center rounded-md border-b border-gold/15 px-3 py-3 text-left font-heading text-base text-brown transition-colors hover:bg-gold/10 hover:text-green focus-visible:outline-none"
                  >
                    {ui.nav[link.key]}
                  </a>
                </li>
              ))}

              {/* Language option inside the menu for easy mobile access */}
              <li className="py-2">
                <button
                  type="button"
                  onClick={() => {
                    toggle();
                    setOpen(false);
                  }}
                  className="flex min-h-12 w-full items-center gap-2 rounded-md px-3 py-3 text-left font-heading text-base text-green transition-colors hover:bg-gold/10"
                >
                  <Languages className="h-5 w-5" aria-hidden="true" />
                  {ui.langName}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
