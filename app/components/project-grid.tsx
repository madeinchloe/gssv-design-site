import Link from "next/link";
import { PROJECTS, type Project } from "@/lib/projects";
import { ParallaxColumn } from "./parallax-column";
import { TileSlideshow } from "./tile-slideshow";

/* Décalages type collage : chaque vignette est posée différemment dans sa colonne.
   Ordre : haut, droite, bas, gauche (en % de la largeur de colonne). */
const OFFSETS: [number, number, number, number][] = [
  [0, 0, 5, 5],
  [0, 15, 10, 0],
  [20, 0, 0, 20],
  [0, 5, 0, 0],
  [15, 15, 30, 15],
  [0, 10, 0, 0],
  [30, 30, 30, 0],
  [0, 0, 0, 5],
  [10, 5, 0, 5],
  [0, 0, 0, 10],
];

/* Un survol différent par vignette : pincement latéral, pincement vertical,
   glissement vers le bas, zoom avant, zoom arrière. */
const HOVERS = ["hv-x", "hv-in", "hv-drop", "hv-out", "hv-y"];

const COLUMNS = 3;
const SPEEDS = [0, -0.06, 0.035];

type Placed = { project: Project; index: number; offset: [number, number, number, number] };

/* Répartition type masonry : chaque projet va dans la colonne la plus courte. */
function distribute(projects: Project[]): Placed[][] {
  const cols: Placed[][] = Array.from({ length: COLUMNS }, () => []);
  const heights = new Array(COLUMNS).fill(0);
  projects.forEach((project, index) => {
    const offset = OFFSETS[index % OFFSETS.length];
    const [t, r, b, l] = offset;
    const width = 1 - (r + l) / 100;
    const h = width * (project.hero.h / project.hero.w) + (t + b) / 100 + 0.35;
    const c = heights.indexOf(Math.min(...heights));
    cols[c].push({ project, index, offset });
    heights[c] += h;
  });
  return cols;
}

export function ProjectGrid({ projects = PROJECTS }: { projects?: Project[] }) {
  const columns = distribute(projects);
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 md:gap-x-[50px] md:pb-24">
      {columns.map((col, c) => (
        <ParallaxColumn key={c} speed={SPEEDS[c]} className="contents md:block">
          {col.map(({ project: p, index, offset }) => (
            <article
              key={p.slug}
              className={`masonry-item ${HOVERS[index % HOVERS.length]}`}
              style={{
                order: index,
                padding: `${offset[0]}% ${offset[1]}% ${offset[2]}% ${offset[3]}%`,
                transitionDelay: `${(index % COLUMNS) * 60}ms`,
              }}
            >
              <Link href={`/projets/${p.slug}`} className="block" data-cursor="Voir">
                <div className="hv-frame">
                  <TileSlideshow
                    photos={p.photos}
                    alt={p.title}
                    priority={index < 3}
                    seed={index}
                  />
                </div>
                <h2 className="grid-title">{p.title}</h2>
              </Link>
            </article>
          ))}
        </ParallaxColumn>
      ))}
    </div>
  );
}
