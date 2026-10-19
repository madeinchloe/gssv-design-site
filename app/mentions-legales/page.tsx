import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | GSSV DESIGN",
  description:
    "Mentions légales du site GSSV Design : informations éditeur, hébergement, propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

const SECTIONS = [
  {
    title: "Éditeur du site",
    items: [
      ["Raison sociale", "GSSV DESIGN"],
      ["Forme juridique", "EURL (SARL à associé unique)"],
      ["Capital social", "1 000 €"],
      ["Nom commercial", "GSSV Design"],
      ["Siège social", "38 Boulevard de Strasbourg, 31000 Toulouse"],
      ["SIREN", "824 136 030"],
      ["SIRET (siège)", "824 136 030 00015"],
      ["N° TVA intracommunautaire", "FR31 824 136 030"],
      ["Code APE / NAF", "74.10Z, activités spécialisées de design"],
      ["RCS", "Toulouse 824 136 030"],
      ["Gérante et directrice de publication", "Sophie Vu"],
      ["Email", "contact@gssvdesign.com"],
      ["Téléphone", "06 42 48 48 20 · 05 61 62 46 54"],
    ],
  },
  {
    title: "Hébergement",
    items: [
      ["Hébergeur", "Vercel Inc."],
      ["Adresse", "440 N Barranca Ave #4133, Covina, CA 91723, USA"],
      ["Site web", "https://vercel.com"],
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <section className="page">
      <div className="mx-auto max-w-[760px] md:pt-[14vh]">
        <h1 className="font-bold uppercase text-[22px] md:text-[25px] leading-[1.25] mb-12">
          Mentions légales
        </h1>

        <div className="space-y-14">
          {SECTIONS.map((sec) => (
            <div key={sec.title} className="sheet">
              <h2 className="uppercase text-[14px] underline underline-offset-4 mb-5">
                {sec.title}
              </h2>
              {sec.items.map(([label, value]) => (
                <p key={label} className="prose">
                  <span className="text-[color:var(--color-mute)]">{label} :</span>{" "}
                  {value}
                </p>
              ))}
            </div>
          ))}

          <div className="sheet">
            <h2 className="uppercase text-[14px] underline underline-offset-4 mb-5">
              Propriété intellectuelle
            </h2>
            <div className="space-y-4 text-[14px] leading-[1.7]">
              <p className="prose">
                L&apos;ensemble des contenus présents sur ce site (textes,
                photographies, croquis, plans, identité visuelle, architecture
                des pages) est la propriété exclusive de GSSV Design ou de ses
                partenaires, sauf mention contraire.
              </p>
              <p className="prose">
                Toute reproduction, représentation, adaptation ou exploitation,
                partielle ou intégrale, sans l&apos;autorisation écrite
                préalable de GSSV Design est interdite et constitue une
                contrefaçon sanctionnée par les articles L.335-2 et suivants du
                Code de la propriété intellectuelle.
              </p>
              <p className="prose">
                Les photographies des projets sont l&apos;œuvre de leurs
                photographes respectifs et sont utilisées avec leur accord dans
                le cadre exclusif de la présentation du travail du studio.
              </p>
            </div>
          </div>

          <div className="sheet">
            <h2 className="uppercase text-[14px] underline underline-offset-4 mb-5">
              Responsabilité
            </h2>
            <div className="space-y-4 text-[14px] leading-[1.7]">
              <p className="prose">
                Les informations figurant sur ce site sont données à titre
                indicatif. GSSV Design met tout en œuvre pour en garantir
                l&apos;exactitude et la mise à jour, sans pour autant pouvoir
                en assurer une garantie absolue.
              </p>
              <p className="prose">
                Les liens hypertextes vers des sites tiers ne sauraient engager
                la responsabilité de GSSV Design quant à leur contenu.
              </p>
            </div>
          </div>

          <p className="uppercase text-[13px]">
            Voir aussi :{" "}
            <Link
              href="/confidentialite"
              className="underline underline-offset-4 hover:no-underline"
            >
              Politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
