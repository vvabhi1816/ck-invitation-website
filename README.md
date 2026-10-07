<<<<<<< HEAD
# Kiruthika & Chandraprakash — Wedding Reception Invitation

A premium, responsive wedding **reception** invitation website combining traditional South Indian
(Tamil) wedding aesthetics with modern web design — elegant animations, a timezone-safe countdown,
a photo gallery with lightbox, user-controlled background music, and a WhatsApp-friendly share preview.

> **Reception:** 11 November 2026 · 6:00 PM – 9:30 PM (IST) · SMB Vishesh Mahal, Coimbatore.

---

## ✨ Tech stack

- **Next.js 14** (App Router) + **React 18** + **JavaScript**
- **Tailwind CSS 3** for styling
- **Framer Motion** for animation
- **Lucide React** for icons
- **next/font** — Cormorant Garamond (English), Noto Serif Tamil (Tamil), EB Garamond (body)

---

## 🚀 Run locally

```bash
npm install     # install dependencies (already done if you were handed this folder)
npm run dev     # start the dev server
```

Open <http://localhost:3000>.

To build for production:

```bash
npm run build
npm start
```

---

## 🖼️ Where to add your photos

Drop real files into `public/` at these paths (styled placeholders show until you do — no broken images):

| File | Used for |
| --- | --- |
| `public/images/bride.jpg` | Bride portrait **and** background |
| `public/images/groom.jpg` | Groom portrait **and** background |
| `public/images/couple.jpg` | Hero + couple banner background |
| `public/images/gallery/photo-1.jpg` … | Photo gallery |
| `public/images/og-image.jpg` | Social share preview (1200×630) for WhatsApp/Facebook |
| `public/music/wedding-melody.mp3` | Background music (optional) |

All paths are centralised in **`config/assets.js`** — change filenames there if you like.
To add more gallery photos, just add entries to the `galleryImages` array in the same file.

---

## ✏️ Editing the reception details

Everything — names, qualifications, parents, date/time, venue, map link, Tamil text, SEO — lives in
**`config/wedding.js`**. Edit that one file; no need to touch the components.

- **Countdown / event time:** `event.startISO` and `event.endISO` use an explicit `+05:30`
  (Asia/Kolkata) offset so the countdown is correct in every visitor's timezone. Keep the offset.
- **Map / directions:** `venue.mapsSearchUrl` (the Get Directions button) and `venue.mapsEmbedUrl`
  (the embedded map) default to a Google Maps **search** for the venue. Replace them with a confirmed
  pin/embed link when you have one.

---

## 🧩 Project structure

```
app/
  layout.js        fonts, metadata / Open Graph, favicon
  page.js          assembles all sections + opening→main transition
  globals.css      color variables, texture, reduced-motion
components/
  OpeningScreen · Navigation · HeroBanner · InvitationSection · CoupleSection
  Countdown · ReceptionDetails · VenueSection · PhotoGallery · MusicPlayer
  FamilyBlessings · ClosingSection
  Decorations.jsx  inline SVG lotus / dividers / corners
  SafeImage.jsx    graceful image fallback (no broken-image icons)
  SectionWrapper.jsx  scroll-reveal section helper
config/
  wedding.js       all reception details + Tamil strings
  assets.js        all image / music paths
public/
  images/ (bride, groom, couple, gallery/, decorations/)  ·  music/
```

### Adding a Muhurtham section later

The site is reception-only by design, but it's built to extend:

1. Create `components/MuhurthamSection.jsx` (copy `ReceptionDetails.jsx` as a starting point).
2. Add its details to `config/wedding.js`.
3. Drop `<MuhurthamSection />` into `app/page.js` and add a nav link in `components/Navigation.jsx`.

Nothing else needs to change.

---

## ♿ Accessibility & performance

- Semantic HTML, keyboard-navigable gallery (← → Esc) and menus, visible focus states, alt text.
- Respects `prefers-reduced-motion` (content stays visible without animation).
- Timers and listeners are cleaned up; images lazy-load; fonts load efficiently.

---

## 🌐 Deploy

### Vercel (recommended)

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. Import it at <https://vercel.com/new>. Framework: **Next.js** (auto-detected).
3. No environment variables are required. Click **Deploy**.

### Netlify

1. Push to a Git repo and “Add new site → Import an existing project”.
2. Build command `npm run build`, and install the official **Next.js runtime** plugin
   (`@netlify/plugin-nextjs`) if prompted. No environment variables required.

> No backend, database, or API keys are needed — this is a static-first invitation site.
=======
# ck-invitation-website
A premium South Indian wedding reception invitation website for Kiruthika &amp; Chandraprakash.
>>>>>>> 331007efa3fbc10aa21d928b208dc1fdf3e5667f
