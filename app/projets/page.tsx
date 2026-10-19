import type { Metadata } from "next";
import { ProjectGrid } from "../components/project-grid";

export const metadata: Metadata = {
  title: "Projets | GSSV DESIGN",
  description:
    "Sélection de projets d'architecture d'intérieur signés GSSV Design à Toulouse et sa région : villas, appartements, cabinets et espaces professionnels.",
  alternates: { canonical: "/projets" },
};

export default function ProjectsIndexPage() {
  return (
    <section className="page">
      <h1 className="sr-only">Projets</h1>
      <ProjectGrid />
    </section>
  );
}
