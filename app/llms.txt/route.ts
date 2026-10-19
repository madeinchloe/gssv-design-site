import { getAllProjects } from "@/lib/projects";

import { SITE_URL, IDENTITY } from "@/lib/site";

const BASE = SITE_URL;

export const dynamic = "force-static";

export function GET() {
  const projects = getAllProjects();

  const body = `# GSSV Design, Sophie Vu

> ${IDENTITY}
> L'agence conçoit des projets d'architecture d'intérieur pour particuliers
> (maisons, appartements, maisons toulousaines) et professionnels (restaurants,
> cafés, cabinets, bureaux), à Toulouse, en Occitanie et en France.

## À propos

- **Nom** : GSSV Design
- **Fondatrice** : Sophie Vu, architecte, architecte d'intérieur et designer
- **Collaboratrice** : Emilie Libralato
- **Métier** : Architecture d'intérieur & design global
- **Fondée en** : 2017
- **Adresse** : 38 Boulevard de Strasbourg, 31000 Toulouse, France
- **Téléphone** : +33 6 42 48 48 20 / +33 5 61 62 46 54
- **Email** : contact@gssvdesign.com
- **Site** : ${BASE}

## Prestations

- Architecture d'intérieur pour particuliers : rénovation de maisons, d'appartements et de maisons toulousaines, plans, choix des matières, suivi de chantier
- Architecture d'intérieur pour professionnels : restaurants, cafés, cabinets, bureaux, commerces
- Design global et direction artistique : mobilier sur mesure, matières, identité des lieux
- Méthode : écoute du lieu, dessin, choix des matières en atelier, direction artistique du chantier jusqu'à la remise des clés

## Presse

- Marie Claire Maison, 19 février 2022 : portrait et projets
- Archi+ Tome 11 (2024) et Tome 12 (2025) : sélection d'architectes toulousains, https://archi-panorama.fr/vu-sophie--gssv-design,502

## Pages principales

- [Accueil](${BASE}/) : présentation du studio, projets, contact
- [Projets](${BASE}/projets) : sélection de projets particuliers & professionnels
- [Studio](${BASE}/studio) : bio de Sophie Vu et Emilie Libralato
- [Contact](${BASE}/contact) : formulaire, adresse et téléphones du studio

## Projets

${projects
  .map(
    (p) =>
      `- [${p.title}](${BASE}/projets/${p.slug}) : ${p.category}${
        p.place ? ` · ${p.place}` : ""
      }`,
  )
  .join("\n")}

## Contact

Pour toute demande de partenariat, presse ou collaboration :
- Email : contact@gssvdesign.com
- Téléphone : +33 6 42 48 48 20
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
