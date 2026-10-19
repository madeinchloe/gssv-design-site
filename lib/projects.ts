export type ProjectCategory = "Particuliers" | "Professionnels";

export type Photo = { src: string; w: number; h: number };

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  place: string;
  year: string;
  hero: Photo;
  photos: Photo[];
  intro?: string;
  description?: string;
};

const P = (src: string, w: number, h: number): Photo => ({ src, w, h });

/* Ordre de la grille : alterner bois, couleur, sombre, pour que deux voisines ne se ressemblent pas. */
export const PROJECTS: Project[] = [
  {
    slug: "50-rue-des-anges",
    title: "50 rue des Anges",
    category: "Particuliers",
    place: "Toulouse",
    year: "",
    hero: P("/projects/50-rue-des-anges/04.jpg", 3812, 5718),
    photos: [
      P("/projects/50-rue-des-anges/04.jpg", 3812, 5718),
      P("/projects/50-rue-des-anges/hero.jpg", 5741, 3827),
      P("/projects/50-rue-des-anges/02.jpg", 3812, 5718),
      P("/projects/50-rue-des-anges/03.jpg", 5682, 3788),
      P("/projects/50-rue-des-anges/05.jpg", 3816, 5724),
    ],
    intro:
      "Une échoppe toulousaine où la brique foraine et les galets d'une cheminée patrimoniale composent avec un piano droit, un fauteuil club en cuir et le parquet massif : un intérieur habité, chaleureux, résolument Sud-Ouest.",
  },
  {
    slug: "villa-boely",
    title: "Villa Boely",
    category: "Particuliers",
    place: "",
    year: "",
    hero: P("/projects/villa-boely/03.jpg", 2000, 1500),
    photos: [
      P("/projects/villa-boely/03.jpg", 2000, 1500),
      P("/projects/villa-boely/hero.jpg", 2000, 1500),
      P("/projects/villa-boely/02.jpg", 1500, 2000),
      P("/projects/villa-boely/04.jpg", 2000, 1500),
    ],
    intro:
      "Une villa contemporaine tournée vers son jardin et sa piscine, où le canapé Bubble, l'Eames et la suspension Vertigo dialoguent avec la lumière du sud.",
  },
  {
    slug: "gssv-albi",
    title: "GSSV Albi",
    category: "Professionnels",
    place: "Albi",
    year: "",
    hero: P("/projects/gssv-albi/06.jpg", 1333, 2000),
    photos: [
      P("/projects/gssv-albi/06.jpg", 1333, 2000),
      P("/projects/gssv-albi/hero.jpg", 2000, 1333),
      P("/projects/gssv-albi/02.jpg", 1333, 2000),
      P("/projects/gssv-albi/03.jpg", 2000, 1333),
      P("/projects/gssv-albi/04.jpg", 1333, 2000),
      P("/projects/gssv-albi/05.jpg", 2000, 1333),
      P("/projects/gssv-albi/07.jpg", 1333, 2000),
    ],
    intro:
      "Un espace fitness pensé avec un vocabulaire graphique franc : numéros géants, contrastes bleu / noir / blanc, éclairage indirect en grille métallique. Sport, jeu et lisibilité dans un même geste.",
  },
  {
    slug: "villa-lesueur",
    title: "Villa Lesueur",
    category: "Particuliers",
    place: "",
    year: "",
    hero: P("/projects/villa-lesueur/hero.jpg", 2000, 1333),
    photos: [
      P("/projects/villa-lesueur/hero.jpg", 2000, 1333),
      P("/projects/villa-lesueur/03.jpg", 1333, 2000),
      P("/projects/villa-lesueur/02.jpg", 1333, 2000),
      P("/projects/villa-lesueur/04.jpg", 1333, 2000),
    ],
    intro:
      "Un séjour ouvert autour d'un escalier hélicoïdal, où le bois clair, le boucle terracotta et le blanc mat composent une pièce à vivre à la fois généreuse et feutrée.",
  },
  {
    slug: "quartier-la-terrasse",
    title: "Quartier La Terrasse",
    category: "Particuliers",
    place: "Toulouse",
    year: "",
    hero: P("/projects/quartier-la-terrasse/hero.jpg", 602, 800),
    photos: [P("/projects/quartier-la-terrasse/hero.jpg", 602, 800)],
    intro:
      "Un appartement dans le quartier de La Terrasse, ponctué de claustras en tasseaux de chêne : jeu de plein et de vide, encadrant les vases et les compositions végétales du quotidien.",
  },
  {
    slug: "bufalino-saint-jean",
    title: "Bufalino Saint-Jean",
    category: "Professionnels",
    place: "Saint-Jean",
    year: "",
    hero: P("/projects/bufalino-saint-jean/hero.jpg", 2000, 1333),
    photos: [P("/projects/bufalino-saint-jean/hero.jpg", 2000, 1333)],
    intro:
      "Un restaurant pensé comme une salle vivante : carreaux de ciment au sol, coques bicolores, laque terracotta au plafond et suspensions industrielles pour rythmer les tablées.",
  },
  {
    slug: "villa-monplaisir-ferrage",
    title: "Villa Monplaisir / Ferrage",
    category: "Particuliers",
    place: "Toulouse",
    year: "",
    hero: P("/projects/villa-monplaisir-ferrage/03.jpg", 1333, 2000),
    photos: [
      P("/projects/villa-monplaisir-ferrage/03.jpg", 1333, 2000),
      P("/projects/villa-monplaisir-ferrage/hero.jpg", 1333, 2000),
      P("/projects/villa-monplaisir-ferrage/02.jpg", 2000, 1333),
      P("/projects/villa-monplaisir-ferrage/04.jpg", 1333, 2000),
    ],
    intro:
      "Un appartement toulousain repensé autour d'un couloir en parquet chevrons, ponctué de rangements sur-mesure et de salles d'eau habillées de mosaïque travertin.",
  },
  {
    slug: "coffee-lab",
    title: "Coffee Lab",
    category: "Professionnels",
    place: "",
    year: "",
    hero: P("/projects/coffee-lab/hero.jpg", 640, 800),
    photos: [P("/projects/coffee-lab/hero.jpg", 640, 800)],
    intro:
      "La réhabilitation d'un entrepôt en café-restaurant : le bardage industriel devient façade, le lettrage laiton signe l'enseigne, et le lieu prend son nom : Coffee Lab · Cafés Fins.",
  },
  {
    slug: "cabinet-gssv-balma",
    title: "Cabinet GSSV Balma",
    category: "Professionnels",
    place: "Balma",
    year: "",
    hero: P("/projects/cabinet-gssv-balma/02.jpg", 2000, 1333),
    photos: [
      P("/projects/cabinet-gssv-balma/02.jpg", 2000, 1333),
      P("/projects/cabinet-gssv-balma/04.jpg", 1333, 2000),
      P("/projects/cabinet-gssv-balma/hero.jpg", 1333, 2000),
      P("/projects/cabinet-gssv-balma/03.jpg", 1333, 2000),
    ],
    intro:
      "Un cabinet professionnel entièrement habillé de tasseaux de chêne, ponctué d'un plafond acoustique nuageux et d'un banc rouge : matière, silence et signal, dans un même geste.",
  },
  {
    slug: "villa-balma",
    title: "Villa Balma",
    category: "Particuliers",
    place: "Balma",
    year: "",
    hero: P("/projects/villa-balma/hero.jpg", 2000, 1333),
    photos: [
      P("/projects/villa-balma/hero.jpg", 2000, 1333),
      P("/projects/villa-balma/02.jpg", 2000, 1333),
      P("/projects/villa-balma/03.jpg", 2000, 1333),
      P("/projects/villa-balma/04.jpg", 2000, 1333),
    ],
    intro:
      "Une extension contemporaine greffée à une maison traditionnelle, posée dans un jardin d'oliviers et de cyprès : le volume blanc et son deck bois prolongent la villa vers le paysage.",
  },
];

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | null {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

/** Fiche projet au format TYPE / NOM / ANNEE / LIEU. Les champs vides sont omis. */
export function projectSheet(project: Project): { label: string; value: string }[] {
  const items = [
    { label: "Type", value: project.category },
    { label: "Nom", value: project.title },
    { label: "Année", value: project.year },
    { label: "Lieu", value: project.place },
  ];
  return items.filter((i) => i.value.trim() !== "");
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? PROJECTS[i - 1] : PROJECTS[PROJECTS.length - 1],
    next: i < PROJECTS.length - 1 ? PROJECTS[i + 1] : PROJECTS[0],
  };
}

export function getOtherProjects(slug: string, limit = 8): Project[] {
  return PROJECTS.filter((p) => p.slug !== slug).slice(0, limit);
}
