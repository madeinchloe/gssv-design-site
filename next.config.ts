import type { NextConfig } from "next";

/*
 * Redirections 301 des anciennes URL Wix (www.gssvdesign.com) vers les routes
 * du nouveau site. A conserver au moins 12 mois apres la bascule du domaine.
 * Source : sitemap Wix releve le 18 octobre 2026 (docs/migration-seo.md).
 */
const WIX_REDIRECTS: { source: string; destination: string }[] = [
  { source: "/projects-6", destination: "/projets" },
  { source: "/copie-de-particuliers-1", destination: "/projets" },
  { source: "/copie-de-particuliers", destination: "/projets" },
  { source: "/s-projects-side-by-side", destination: "/projets" },
  { source: "/contact-9", destination: "/contact" },
  { source: "/portfolio", destination: "/studio" },
  { source: "/portfolio/:slug", destination: "/studio" },
];

const IS_LIVE = process.env.SITE_LIVE === "1";

const nextConfig: NextConfig = {
  async redirects() {
    const wix = WIX_REDIRECTS.map((r) => ({ ...r, permanent: true }));
    if (!IS_LIVE) return wix;
    return [
      // L'ancienne URL de préproduction renvoie vers le domaine une fois en ligne.
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "gssv-design.vercel.app" }],
        destination: "https://www.gssvdesign.com/:path*",
        permanent: true,
      },
      ...wix,
    ];
  },
};

export default nextConfig;
