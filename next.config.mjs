/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export → produces ./out with a real index.html at the root,
  // so Netlify can serve "/" as a plain static site (Publish directory: out).
  // Safe here: the site is fully static (no SSR, no API routes, no next/image).
  output: "export",
};

export default nextConfig;
