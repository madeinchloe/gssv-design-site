import type { Metadata } from "next";
import { ProjectGrid } from "@/app/components/project-grid";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projets particuliers | GSSV DESIGN",
  description:
    "Projets d'architecture d'intérieur pour particuliers signés GSSV Design à Toulouse et sa région : villas, maisons et appartements.",
  alternates: { canonical: "/projets/particuliers" },
};

export default function ProjetsParticuliersPage() {
  const projects = PROJECTS.filter((p) => p.category === "Particuliers");
  return (
    <section className="page">
      <h1 className="sr-only">Projets particuliers</h1>
      <ProjectGrid projects={projects} />
    </section>
  );
}
