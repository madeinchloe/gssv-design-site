import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
  getOtherProjects,
  projectSheet,
  type Project,
} from "@/lib/projects";
import { ProjectSlider } from "@/app/components/project-slider";

type Params = Promise<{ slug: string }>;

import { SITE_URL, ORG_ID } from "@/lib/site";

const BASE = SITE_URL;

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

/* Meta description : 155 caractères maximum, coupée sur un mot. */
function clip(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Projet introuvable" };
  const url = `/projets/${project.slug}`;
  const description = clip(
    project.intro ??
      `${project.title}, projet ${project.category.toLowerCase()} signé GSSV Design à ${project.place || "Toulouse"}.`,
  );
  return {
    title: `${project.title.toUpperCase()} | GSSV DESIGN`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description,
      type: "article",
      url,
      images: [project.hero.src],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [project.hero.src],
    },
  };
}

function projectJsonLd(project: Project) {
  const url = `${BASE}/projets/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.intro,
    image: project.photos.map((p) => `${BASE}${p.src}`),
    creator: { "@id": ORG_ID },
    locationCreated: project.place
      ? { "@type": "Place", name: project.place }
      : undefined,
    inLanguage: "fr-FR",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

function breadcrumbJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
      { "@type": "ListItem", position: 2, name: "Projets", item: `${BASE}/projets` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${BASE}/projets/${project.slug}`,
      },
    ],
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(project.slug);
  const others = getOtherProjects(project.slug, 8);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(project)) }}
      />

      <div className="page">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
          {/* Diaporama */}
          <div className="md:col-span-9 relative">
            <ProjectSlider photos={project.photos} title={project.title} />

            {prev && (
              <Link
                href={`/projets/${prev.slug}`}
                className="hidden lg:block absolute -left-[4.5%] top-[72%] -rotate-90 origin-center text-[13px] text-[color:var(--color-mute)] whitespace-nowrap hover:text-[color:var(--color-ink)] transition-colors"
              >
                Projet précédent
              </Link>
            )}
            {next && (
              <Link
                href={`/projets/${next.slug}`}
                className="hidden lg:block absolute -right-[4.5%] top-[72%] rotate-90 origin-center text-[13px] text-[color:var(--color-mute)] whitespace-nowrap hover:text-[color:var(--color-ink)] transition-colors"
              >
                Projet suivant
              </Link>
            )}
          </div>

          {/* Fiche */}
          <div className="md:col-span-3 md:pt-10 sheet">
            <h1 className="font-bold uppercase text-[22px] md:text-[25px] leading-[1.25] mb-6">
              {project.title}
            </h1>
            {projectSheet(project).map((m) => (
              <p key={m.label}>
                {m.label}: {m.value}
              </p>
            ))}
            {project.intro && (
              <p>
                ADN: {project.intro}
              </p>
            )}
            {project.description && <p className="prose">{project.description}</p>}

            <p className="mt-12">
              <Link
                href="/projets"
                className="font-bold uppercase underline underline-offset-4 hover:no-underline"
              >
                Revenir aux projets
              </Link>
            </p>

            <div className="mt-6 flex gap-5 lg:hidden text-[12px] uppercase">
              {prev && (
                <Link href={`/projets/${prev.slug}`} className="hover:underline">
                  ‹ Projet précédent
                </Link>
              )}
              {next && (
                <Link href={`/projets/${next.slug}`} className="hover:underline">
                  Projet suivant ›
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Autres projets */}
      {others.length > 0 && (
        <section className="mx-auto max-w-[1300px] px-[30px] md:px-10 mt-28">
          <h3 className="clignoter text-center text-[20px] mb-6" aria-hidden>
            _
          </h3>
          <h2 className="sr-only">Autres projets</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {others.map((r) => (
              <Link
                key={r.slug}
                href={`/projets/${r.slug}`}
                className="group relative block aspect-square overflow-hidden bg-neutral-100"
              >
                <Image
                  src={r.hero.src}
                  alt={r.title}
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white uppercase text-[12px] md:text-[13px] text-center px-3">
                    {r.title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
