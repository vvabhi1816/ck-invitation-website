"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";

import { LanguageProvider } from "@/components/LanguageContext";
import { SideBorder } from "@/components/Decorations";
import OpeningScreen from "@/components/OpeningScreen";
import Navigation from "@/components/Navigation";
import HeroBanner from "@/components/HeroBanner";
import InvitationSection from "@/components/InvitationSection";
import CoupleSection from "@/components/CoupleSection";
import Countdown from "@/components/Countdown";
import ReceptionDetails from "@/components/ReceptionDetails";
// import VenueSection from "@/components/VenueSection"; // Venue section hidden for now
// import PhotoGallery from "@/components/PhotoGallery"; // "Our Memories" gallery temporarily disabled — re-enable here + in Navigation.jsx
import FamilyBlessings from "@/components/FamilyBlessings";
import ClosingSection from "@/components/ClosingSection";
import MusicPlayer from "@/components/MusicPlayer";

// =============================================================================
// Home page — assembles the whole experience.
//
//   Opening Screen (overlay)
//     → Hero / Home
//     → Main Invitation
//     → Couple Showcase
//     → Countdown
//     → Reception Details
//     → Venue & Directions
//     → Photo Gallery
//     → Family Blessings
//     → Closing Screen
//   + floating Music control
//
// NOTE FOR THE FUTURE: to add a Muhurtham section later, create a
// <MuhurthamSection /> component and drop it into the flow below (e.g. after the
// invitation) and add a nav link in components/Navigation.jsx. Nothing else needs
// to change — details live in config/wedding.js.
// =============================================================================
export default function Home() {
  // `opened` controls the transition from the opening overlay to the main site.
  const [opened, setOpened] = useState(false);
  // Ref to the music player so pressing "Open Invitation" can start the song
  // within that user gesture (browsers allow audio started from a real click).
  const musicRef = useRef(null);

  // Opens the site AND starts the background music. The visitor can turn it off
  // anytime from the floating music button (bottom-right).
  const handleOpen = () => {
    setOpened(true);
    musicRef.current?.start();
  };

  // Freeze page scrolling while the opening screen is up. Scrolling is only
  // enabled after "Open Invitation" is clicked (opened === true). The opening
  // overlay itself can still scroll internally (it uses overflow-y-auto).
  // The <html> element is the real scroll container here, so lock it (and body)
  // — locking body alone still lets the document scroll.
  useEffect(() => {
    const value = opened ? "" : "hidden";
    document.documentElement.style.overflow = value;
    document.body.style.overflow = value;
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    // reducedMotion="user" makes Framer Motion honor the OS "reduce motion"
    // setting — entrance animations resolve instantly instead of fading in.
    <MotionConfig reducedMotion="user">
      {/* LanguageProvider makes the active language (English default / Tamil)
          available to every section and to the menu toggle. */}
      <LanguageProvider>
        <main className="relative w-full overflow-x-hidden">
          {/* Decorative lotus vines filling the empty left/right gutters on
              large screens (behind the content). */}
          <SideBorder side="left" />
          <SideBorder side="right" />

          {/* Opening overlay — fades out on "Open Invitation" */}
          <AnimatePresence>
            {!opened && <OpeningScreen onOpen={handleOpen} />}
          </AnimatePresence>

          {/* Navigation appears after the invitation is opened. Music starts on
              "Open Invitation" and can be turned off from the floating button. */}
          <Navigation visible={opened} />
          <MusicPlayer ref={musicRef} />

          {/* Main content */}
          <HeroBanner />
          <InvitationSection />
          <CoupleSection />
          <Countdown />
          <ReceptionDetails />
          {/* Venue ("Find Us Here") section hidden for now — the Reception
              section still has a working "Get Directions" link. Re-enable by
              uncommenting this and the "venue" nav link in Navigation.jsx. */}
          {/* <VenueSection /> */}
          {/* "Our Memories" photo gallery temporarily disabled (component + images
              kept in the project). Re-enable by uncommenting the import above, the
              line below, and the gallery nav link in Navigation.jsx. */}
          {/* <PhotoGallery /> */}
          <FamilyBlessings />
          <ClosingSection />
        </main>
      </LanguageProvider>
    </MotionConfig>
  );
}
