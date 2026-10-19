import Image from "next/image";
import type { Metadata } from "next";
import { SophieVuJsonLd } from "../components/person-jsonld";
import { LocalBusinessJsonLd } from "../components/local-business-jsonld";

export const metadata: Metadata = {
  title: "Le Studio | GSSV DESIGN",
  description:
    "GSSV Design est l'agence d'architecture d'intérieur et de design global fondée par Sophie Vu à Toulouse en 2017. Sophie Vu et Emilie Libralato.",
  alternates: { canonical: "/studio" },
};

const METHODE = [
  {
    n: "01",
    title: "Écoute",
    text: "Comprendre le lieu, ses contraintes, son histoire, et celles et ceux qui vont l'habiter.",
  },
  {
    n: "02",
    title: "Dessin",
    text: "Plans, coupes, perspectives. Un travail d'atelier, précis, mené à la main autant qu'à l'écran.",
  },
  {
    n: "03",
    title: "Matière",
    text: "Bois, pierre, linge, chaux, laiton. Les échantillons se choisissent en atelier, avant de partir en chantier.",
  },
  {
    n: "04",
    title: "Mise en œuvre",
    text: "Direction artistique du chantier, dialogue quotidien avec les artisans, jusqu'à la remise des clés.",
  },
];

const PRESSE = [
  {
    outlet: "Marie Claire Maison",
    title: "Portrait & projets",
    date: "19 février 2022",
    note: "Parution presse écrite",
  },
  {
    outlet: "Archi+ · Tome 12",
    title: "Sélection d'architectes toulousains",
    date: "2025",
    note: "Magazine annuel, Toulouse et sa région",
    href: "https://archi-panorama.fr/vu-sophie--gssv-design,502",
  },
  {
    outlet: "Archi+ · Tome 11",
    title: "Sélection d'architectes toulousains",
    date: "2024",
    note: "Magazine annuel, Toulouse et sa région",
    href: "https://archi-panorama.fr/vu-sophie--gssv-design,502",
  },
];

export default function StudioPage() {
  return (
    <section className="page">
      <SophieVuJsonLd />
      <LocalBusinessJsonLd />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {/* Deux photos, collées à gauche comme une planche de matières */}
        <div className="md:-ml-[11%] md:mr-0 space-y-10 md:space-y-16">
          <div className="relative aspect-[3/4] bg-neutral-100">
            <Image
              src="/projects/50-rue-des-anges/02.jpg"
              alt="Escalier en chêne et murs blancs, maison toulousaine du 50 rue des Anges"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="relative aspect-[3/4] md:w-[78%] md:ml-auto bg-neutral-100">
            <Image
              src="/projects/villa-boely/02.jpg"
              alt="Suspension laiton et céramiques, Villa Boely"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Fiche du studio */}
        <div className="sheet md:pt-[22vh] md:pr-[6%]">
          <Image
            src="/brand/gssv-emblem.png"
            alt="Emblème GSSV Design, architecture d'intérieur"
            width={120}
            height={120}
            className="mb-8 h-[96px] w-[96px] md:h-[120px] md:w-[120px]"
            priority
          />
          <h1 className="font-bold text-[22px] md:text-[25px] leading-[1.25] mb-8 uppercase">
            Habiter la matière.
          </h1>

          <p>
            <span className="label">Type :</span> Agence d&apos;architecture
            d&apos;intérieur &amp; design global
          </p>
          <p>
            <span className="label">Nom :</span> GSSV Design
          </p>
          <p>
            <span className="label">Année :</span> 2017
          </p>
          <p>
            <span className="label">Lieu :</span> 38 Boulevard de Strasbourg,
            31000 Toulouse
          </p>
          <p>
            <span className="label">Zone :</span> France &amp; international
          </p>

          <p>
            <span className="label">ADN :</span> Imaginer des projets créatifs,
            singuliers, porteurs d&apos;une identité forte et cohérente.
          </p>
          <p>
            Lancée en 2017, l&apos;agence GSSV Design partage une philosophie
            personnelle&nbsp;: imaginer des projets créatifs, singuliers,
            porteurs d&apos;une identité forte et cohérente. Architecte,
            architecte d&apos;intérieur et designer, nous nous investissons
            avec passion au quotidien pour donner vie à vos espaces.
          </p>

          <p>
            <span className="label">Pratique :</span> Sur-mesure, de la première
            esquisse à la remise des clés
          </p>
          <p>
            Nous vous offrons des services sur-mesure adaptés à chaque étape de
            votre projet, de la première esquisse à la remise des clés. Un
            dialogue continu entre la structure et l&apos;objet, la lumière et
            l&apos;ombre, la fonction et le geste.
          </p>

          <p>
            <span className="label">Mission :</span> Écoute du lieu / plans /
            choix des matières / direction artistique du chantier
          </p>

          <p className="mt-8">
            <span className="label">Méthode :</span>
          </p>
          <ul className="mb-2">
            {METHODE.map((m) => (
              <li key={m.n}>
                {m.n} {m.title}
                <span className="block">{m.text}</span>
              </li>
            ))}
          </ul>

          <p className="mt-14">
            <span className="label">Équipe :</span>
          </p>
          <figure className="mt-5 mb-10 max-w-[400px]">
            <Image
              src="/studio/sophie-vu-emilie-libralato.jpg"
              alt="Portraits de Sophie Vu, fondatrice, et d'Emilie Libralato, collaboratrice, GSSV Design"
              width={400}
              height={400}
              className="w-full h-auto bg-neutral-100"
            />
            <figcaption className="grid grid-cols-[194fr_206fr] mt-3">
              <span>
                Sophie Vu
                <span className="block opacity-60">Fondatrice</span>
              </span>
              <span>
                Emilie Libralato
                <span className="block opacity-60">Collaboratrice</span>
              </span>
            </figcaption>
          </figure>
          <p>
            <span className="label">Sophie Vu :</span> Architecte, architecte
            d&apos;intérieur &amp; designer
            <span className="block mt-2">
              Sophie a fondé GSSV Design en 2017 à Toulouse. Elle conduit
              chaque projet de la première esquisse à la remise des clés :
              écoute du lieu, plans, choix des matières, direction artistique
              du chantier.
            </span>
          </p>
          <p className="mt-6">
            <span className="label">Emilie Libralato :</span> Collaboratrice
            <span className="block mt-2">
              Emilie travaille aux côtés de Sophie sur l&apos;ensemble des
              projets du studio, particuliers et professionnels, en France et
              à l&apos;international.
            </span>
          </p>

          <p className="mt-14">
            <span className="label">Presse :</span>
          </p>
          <ul className="mb-2">
            {PRESSE.map((p) => (
              <li key={`${p.outlet}-${p.date}`}>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 hover:no-underline"
                  >
                    {p.outlet}
                  </a>
                ) : (
                  p.outlet
                )}
                , {p.date} · {p.title}
                <span className="block">
                  {p.note}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8">
            <span className="label">Instagram :</span>{" "}
            <a
              href="https://www.instagram.com/sophievu_gssvdesign/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              @sophievu_gssvdesign
            </a>
          </p>

          <p className="mt-10">
            « Chaque choix est une méditation silencieuse sur la symbiose entre
            l&apos;espace et l&apos;âme. »
          </p>
        </div>
      </div>
    </section>
  );
}
