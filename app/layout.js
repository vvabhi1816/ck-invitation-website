import { Cormorant_Garamond, EB_Garamond, Noto_Serif_Tamil } from "next/font/google";
import "./globals.css";
import { wedding } from "@/config/wedding";

// -----------------------------------------------------------------------------
// FONTS (loaded efficiently via next/font, exposed as CSS variables)
// -----------------------------------------------------------------------------
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const notoTamil = Noto_Serif_Tamil({
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-tamil",
  display: "swap",
});

// -----------------------------------------------------------------------------
// METADATA / SEO / SHARING (WhatsApp-friendly Open Graph tags)
// -----------------------------------------------------------------------------
export const metadata = {
  // Base URL used to resolve the Open Graph / Twitter image to an absolute URL.
  // Set NEXT_PUBLIC_SITE_URL in your deploy env (e.g. https://your-site.vercel.app)
  // so WhatsApp/Facebook previews load the share image. Falls back to localhost.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: wedding.seo.title,
  description: wedding.seo.description,
  openGraph: {
    title: wedding.seo.title,
    description: wedding.seo.description,
    type: "website",
    images: [
      {
        url: wedding.seo.ogImage, // placeholder — replace with a custom graphic
        width: 1200,
        height: 630,
        alt: "Kiruthika & Chandraprakash Wedding Reception",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: wedding.seo.title,
    description: wedding.seo.description,
  },
  icons: {
    icon: "/favicon.svg", // placeholder favicon (lotus mark)
  },
};

export const viewport = {
  themeColor: wedding.seo.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${ebGaramond.variable} ${notoTamil.variable}`}>
      <head>
        {/* Fallback: if JavaScript never runs, Framer Motion's inline opacity:0
            would hide scroll-reveal content. Force everything visible instead. */}
        <noscript>
          <style>{`*{opacity:1!important;transform:none!important;visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}
