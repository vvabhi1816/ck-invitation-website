// =============================================================================
// CENTRAL WEDDING CONFIGURATION
// -----------------------------------------------------------------------------
// Edit EVERYTHING about the reception here. No need to hunt through components.
// All text (English + Tamil), dates, venue and links live in this one file.
// =============================================================================

export const wedding = {
  // ---------------------------------------------------------------------------
  // COUPLE
  // ---------------------------------------------------------------------------
  bride: {
    shortName: "Kiruthika",
    fullName: "V. Kiruthika Shri",
    qualification: "B.Sc., MSW.",
    parents: "D/o V. Vellingiri & V. Kavitha",
    profession: "HR Executive, Sumanas Technologies",
  },
  groom: {
    shortName: "Chandraprakash",
    fullName: "S. Chandraprakash",
    qualification: "B.Sc., MSW.",
    parents: "S/o S. R. Senthil Kumar",
    profession: "Fellow, Bhumi Fellowship",
  },

  // ---------------------------------------------------------------------------
  // EVENT (Wedding Reception only — Muhurtham intentionally excluded for now)
  // ---------------------------------------------------------------------------
  event: {
    title: "Wedding Reception",
    subtitle: "A Celebration of Love & Togetherness",
    // Human-readable strings used across the site
    dateLabel: "11 November 2026",
    dateCompact: "11 • 11 • 2026",
    timeLabel: "6:00 PM – 9:30 PM",

    // ---- TIMEZONE-SAFE TIMESTAMPS -------------------------------------------
    // Explicit +05:30 offset (Asia/Kolkata) so the countdown is correct in
    // ANY visitor's browser timezone. Do NOT remove the offset.
    startISO: "2026-11-11T18:00:00+05:30", // 6:00 PM IST
    endISO: "2026-11-11T21:30:00+05:30", // 9:30 PM IST
    timezone: "Asia/Kolkata",
  },

  // ---------------------------------------------------------------------------
  // VENUE
  // ---------------------------------------------------------------------------
  venue: {
    name: "SMB Vishesh Mahal",
    addressLines: ["Trichy Road, Sulur,", "Ravathur Pirivu,", "Coimbatore, Tamil Nadu, India"],
    addressInline: "Trichy Road, Sulur, Ravathur Pirivu, Coimbatore, Tamil Nadu, India",

    // Google Maps SEARCH link (no invented pin/coordinates).
    // Replace with a CONFIRMED venue link later if you have the exact pin.
    mapsSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("SMB Vishesh Mahal, Trichy Road, Sulur, Ravathur Pirivu, Coimbatore, Tamil Nadu"),

    // Embedded map uses a keyless Google Maps search embed. If it ever fails
    // to load, the "Get Directions" button still works. Replace with an
    // official "Embed a map" iframe src when you have the confirmed location.
    mapsEmbedUrl:
      "https://www.google.com/maps?q=" +
      encodeURIComponent("SMB Vishesh Mahal, Trichy Road, Sulur, Ravathur Pirivu, Coimbatore, Tamil Nadu") +
      "&output=embed",
  },

  // ---------------------------------------------------------------------------
  // FAMILY
  // ---------------------------------------------------------------------------
  family: {
    brideParents: "V. Vellingiri & V. Kavitha",
    groomParent: "S. R. Senthil Kumar",
  },

  // ---------------------------------------------------------------------------
  // INVITATION MESSAGES
  // ---------------------------------------------------------------------------
  messages: {
    invitation:
      "We cordially invite you to grace the occasion of our Wedding Reception and bless us as we begin this beautiful journey together.",
    blessing:
      "With the blessings of our families, we invite you to celebrate this beautiful beginning with us.",
    closing: "We look forward to celebrating with you.",
  },

  // ---------------------------------------------------------------------------
  // TAMIL STRINGS (kept together so they can be reviewed / replaced easily)
  // ---------------------------------------------------------------------------
  tamil: {
    receptionHeading: "திருமண வரவேற்பு அழைப்பிதழ்",
    weds: "மணமக்கள்",
    blessing: "எங்கள் குடும்பத்தினரின் ஆசீர்வாதத்துடன், இந்த இனிய தொடக்கத்தை எங்களுடன் கொண்டாட அன்புடன் அழைக்கிறோம்.",
    welcome: "அன்புடன் வரவேற்கிறோம்",
  },

  // ---------------------------------------------------------------------------
  // SEO / SHARING
  // ---------------------------------------------------------------------------
  seo: {
    title: "Kiruthika & Chandraprakash | Wedding Reception Invitation",
    description:
      "Join us in celebrating the wedding reception of Kiruthika and Chandraprakash on 11 November 2026 in Coimbatore.",
    themeColor: "#315D20",
    ogImage: "/images/og-image.jpg", // placeholder — replace with a custom share graphic
  },
};

export default wedding;
