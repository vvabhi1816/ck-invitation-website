"use client";

import { useState } from "react";
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
import VenueSection from "@/components/VenueSection";
import PhotoGallery from "@/components/PhotoGallery";
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
            {!opened && <OpeningScreen onOpen={() => setOpened(true)} />}
          </AnimatePresence>

          {/* Navigation appears after the invitation is opened.
              Music stays OFF until the visitor presses play (see MusicPlayer). */}
          <Navigation visible={opened} />
          <MusicPlayer />

          {/* Main content */}
          <HeroBanner />
          <InvitationSection />
          <CoupleSection />
          <Countdown />
          <ReceptionDetails />
          <VenueSection />
          <PhotoGallery />
          <FamilyBlessings />
          <ClosingSection />
        </main>
      </LanguageProvider>
    </MotionConfig>
  );
}
