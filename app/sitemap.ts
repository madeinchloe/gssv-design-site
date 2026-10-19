import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";

import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/projets`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/studio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  for (const p of projects) {
    routes.push({
      url: `${BASE}/projets/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    });
  }

  return routes;
}
