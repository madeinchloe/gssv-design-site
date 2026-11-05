import type { Metadata } from "next";
import { ProjectGrid } from "@/app/components/project-grid";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projets professionnels | GSSV DESIGN",
  description:
    "Projets d'architecture d'intérieur pour professionnels signés GSSV Design à Toulouse et sa région : cabinets, boutiques et espaces de travail.",
  alternates: { canonical: "/projets/professionnels" },
};

export default function ProjetsProfessionnelsPage() {
  const projects = PROJECTS.filter((p) => p.category === "Professionnels");
  return (
    <section className="page">
      <h1 className="sr-only">Projets professionnels</h1>
      <ProjectGrid projects={projects} />
    </section>
  );
}
