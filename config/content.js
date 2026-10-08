// =============================================================================
// BILINGUAL CONTENT (English + Tamil)
// -----------------------------------------------------------------------------
// EVERY piece of visible text on the site lives here, in BOTH languages.
// The site shows English by default; the தமிழ் / English toggle in the menu
// swaps the whole site to the other language (see components/LanguageContext).
//
//   content.en  → English strings (default)
//   content.ta  → Tamil strings
//
// Purely technical, non-visible config (ISO timestamps, Google Maps URLs, SEO)
// still lives in config/wedding.js and is imported where needed.
//
// To edit a word, change it in BOTH `en` and `ta` so the two stay in sync.
// =============================================================================

export const content = {
  // ===========================================================================
  // ENGLISH (default)
  // ===========================================================================
  en: {
    bride: {
      shortName: "Kiruthika Shri",
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

    event: {
      title: "Wedding Reception",
      subtitle: "A Celebration of Love & Togetherness",
      dateLabel: "11 November 2026",
      dateCompact: "11 • 11 • 2026",
      timeLabel: "6:00 PM – 9:30 PM",
    },

    venue: {
      name: "SMB Vishesh Mahal",
      addressLines: ["Trichy Road, Sulur,", "Ravathur Pirivu,", "Coimbatore, Tamil Nadu, India"],
      addressInline: "Trichy Road, Sulur, Ravathur Pirivu, Coimbatore, Tamil Nadu, India",
    },

    family: {
      brideParents: "V. Vellingiri & V. Kavitha",
      groomParent: "S. R. Senthil Kumar",
    },

    messages: {
      invitation:
        "We cordially invite you to grace the occasion of our Wedding Reception and bless us as we begin this beautiful journey together.",
      blessing:
        "With the blessings of our families, we invite you to celebrate this beautiful beginning with us.",
      closing: "We look forward to celebrating with you.",
    },

    // ----- UI LABELS / HEADINGS ----------------------------------------------
    ui: {
      // Language toggle — always shows the name of the OTHER language.
      langName: "தமிழ்",
      langSwitchAria: "Switch to Tamil",

      nav: {
        home: "Home",
        couple: "The Couple",
        invitation: "Invitation",
        countdown: "Countdown",
        reception: "Reception",
        venue: "Venue",
        gallery: "Gallery",
      },

      // Opening screen + hero
      receptionInviteHeading: "Wedding Reception Invitation",
      celebrationTagline: "A Celebration of Love & Togetherness",
      openInvitation: "Open Invitation",
      scrollToExplore: "Scroll to explore",

      // Invitation + reception section intro line
      invitedLine: "You Are Cordially Invited",
      weds: "Weds",

      // Couple section
      beginningForever: "The Beginning of Forever",
      theCouple: "The Couple",
      theBride: "The Bride",
      theGroom: "The Groom",
      welcome: "You Are Warmly Welcome",
      twoHearts: "Two hearts, one beautiful journey.",

      // Countdown
      saveTheDate: "Save the Date",
      countingDown: "Counting Down to Our Celebration",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      celebrationBegun: "The Celebration Has Begun! 🎉",
      gratitudeTitle: "With Hearts Full of Gratitude",
      gratitudeSub: "Thank you for being part of our celebration.",

      // Reception details
      dateLabelIcon: "Date",
      timeLabelIcon: "Time",
      venueLabelIcon: "Venue",
      getDirections: "Get Directions",

      // Venue
      celebrationAwaits: "The Celebration Awaits",
      findUsHere: "Find Us Here",
      openInGoogleMaps: "Open in Google Maps",

      // Gallery
      momentsToCherish: "Moments to Cherish",
      ourMemories: "Our Memories",

      // Family blessings
      familiesLove: "With Our Families' Love",
      familyBlessings: "Family Blessings",
      brideParentsLabel: "Bride's Parents",
      groomParentLabel: "Groom's Parent",

      // Closing
      withLoveJoy: "With Love & Joy",
    },
  },

  // ===========================================================================
  // TAMIL (shown when the user selects தமிழ்)
  // ===========================================================================
  ta: {
    bride: {
      shortName: "கிருத்திகா ஸ்ரீ",
      fullName: "வி. கிருத்திகா ஸ்ரீ",
      qualification: "B.Sc., MSW.",
      parents: "திரு. வி. வெள்ளிங்கிரி & திருமதி. வி. கவிதா அவர்களின் மகள்",
      profession: "மனிதவள அதிகாரி, சுமனாஸ் டெக்னாலஜிஸ்",
    },
    groom: {
      shortName: "சந்திரபிரகாஷ்",
      fullName: "ச. சந்திரபிரகாஷ்",
      qualification: "B.Sc., MSW.",
      parents: "திரு. எஸ். ஆர். செந்தில் குமார் அவர்களின் மகன்",
      profession: "ஃபெலோ, பூமி ஃபெலோஷிப்",
    },

    event: {
      title: "திருமண வரவேற்பு",
      subtitle: "அன்பும் இணைவும் நிறைந்த கொண்டாட்டம்",
      dateLabel: "11 நவம்பர் 2026",
      dateCompact: "11 • 11 • 2026",
      timeLabel: "மாலை 6:00 – இரவு 9:30",
    },

    venue: {
      name: "எஸ்.எம்.பி விஷேஷ் மஹால்",
      addressLines: ["டிரிச்சி சாலை, சுலூர்,", "ரவத்தூர் பிரிவு,", "கோயம்புத்தூர், தமிழ்நாடு, இந்தியா"],
      addressInline: "டிரிச்சி சாலை, சுலூர், ரவத்தூர் பிரிவு, கோயம்புத்தூர், தமிழ்நாடு, இந்தியா",
    },

    family: {
      brideParents: "வி. வெள்ளிங்கிரி & வி. கவிதா",
      groomParent: "எஸ். ஆர். செந்தில் குமார்",
    },

    messages: {
      invitation:
        "இந்த அழகிய பயணத்தைத் தொடங்கும் எங்கள் திருமண வரவேற்பு விழாவில் கலந்து கொண்டு, எங்களை ஆசீர்வதிக்குமாறு அன்புடன் அழைக்கிறோம்.",
      blessing:
        "எங்கள் குடும்பத்தினரின் ஆசீர்வாதத்துடன், இந்த இனிய தொடக்கத்தை எங்களுடன் கொண்டாட அன்புடன் அழைக்கிறோம்.",
      closing: "உங்களுடன் இணைந்து கொண்டாட ஆவலுடன் காத்திருக்கிறோம்.",
    },

    ui: {
      langName: "English",
      langSwitchAria: "ஆங்கிலத்திற்கு மாற்று",

      nav: {
        home: "முகப்பு",
        couple: "மணமக்கள்",
        invitation: "அழைப்பிதழ்",
        countdown: "நாள் எண்ணிக்கை",
        reception: "வரவேற்பு",
        venue: "இடம்",
        gallery: "படங்கள்",
      },

      receptionInviteHeading: "திருமண வரவேற்பு அழைப்பிதழ்",
      celebrationTagline: "அன்பும் இணைவும் நிறைந்த கொண்டாட்டம்",
      openInvitation: "அழைப்பிதழைத் திறக்க",
      scrollToExplore: "கீழே உருட்டிப் பாருங்கள்",

      invitedLine: "அன்புடன் அழைக்கிறோம்",
      weds: "உடன்",

      beginningForever: "என்றென்றும் ஒரு புதிய தொடக்கம்",
      theCouple: "மணமக்கள்",
      theBride: "மணமகள்",
      theGroom: "மணமகன்",
      welcome: "அன்புடன் வரவேற்கிறோம்",
      twoHearts: "இரண்டு இதயங்கள், ஒரே அழகிய பயணம்.",

      saveTheDate: "இந்த நாளை நினைவில் கொள்ளுங்கள்",
      countingDown: "எங்கள் கொண்டாட்டத்திற்கான நாள் எண்ணிக்கை",
      days: "நாட்கள்",
      hours: "மணி",
      minutes: "நிமிடம்",
      seconds: "வினாடி",
      celebrationBegun: "கொண்டாட்டம் தொடங்கிவிட்டது! 🎉",
      gratitudeTitle: "நன்றி நிறைந்த இதயங்களுடன்",
      gratitudeSub: "எங்கள் கொண்டாட்டத்தின் ஒரு பகுதியாக இருந்தமைக்கு நன்றி.",

      dateLabelIcon: "தேதி",
      timeLabelIcon: "நேரம்",
      venueLabelIcon: "இடம்",
      getDirections: "வழி காட்டு",

      celebrationAwaits: "கொண்டாட்டம் காத்திருக்கிறது",
      findUsHere: "எங்களை இங்கே காணுங்கள்",
      openInGoogleMaps: "கூகுள் மேப்ஸில் திறக்க",

      momentsToCherish: "நினைவில் நிற்கும் தருணங்கள்",
      ourMemories: "எங்கள் நினைவுகள்",

      familiesLove: "எங்கள் குடும்பத்தின் அன்புடன்",
      familyBlessings: "குடும்ப ஆசீர்வாதம்",
      brideParentsLabel: "மணமகளின் பெற்றோர்",
      groomParentLabel: "மணமகனின் தந்தை",

      withLoveJoy: "அன்புடனும் மகிழ்ச்சியுடனும்",
    },
  },
};

export default content;
