import type { MetadataRoute } from "next";
import { SITE_URL, IS_LIVE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!IS_LIVE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
