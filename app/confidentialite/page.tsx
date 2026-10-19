import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | GSSV DESIGN",
  description:
    "Politique de confidentialité et gestion des données personnelles du site GSSV Design.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false },
};

const linkClass = "underline underline-offset-4 hover:no-underline";

const SECTIONS: { title: string; content: React.ReactNode }[] = [
  {
    title: "1. Responsable du traitement",
    content: (
      <>
        <p>
          Le responsable du traitement des données personnelles collectées
          sur ce site est GSSV Design, EURL, 38 Boulevard de Strasbourg,
          31000 Toulouse.
        </p>
        <p>
          Contact&nbsp;:{" "}
          <a href="mailto:contact@gssvdesign.com" className={linkClass}>
            contact@gssvdesign.com
          </a>
        </p>
      </>
    ),
  },
  {
    title: "2. Données collectées",
    content: (
      <>
        <p>
          Ce site collecte des données personnelles uniquement lorsque vous
          nous écrivez volontairement via l&apos;adresse contact@gssvdesign.com
          ou l&apos;un des numéros de téléphone indiqués. Les données
          transmises (nom, prénom, coordonnées, description de projet) sont
          utilisées exclusivement pour répondre à votre demande.
        </p>
        <p>
          Le formulaire de la page Contact ouvre votre propre messagerie :
          aucune donnée n&apos;est enregistrée sur le site. Aucune création de
          compte, aucun achat en ligne, aucun paiement ne sont proposés.
        </p>
      </>
    ),
  },
  {
    title: "3. Durée de conservation",
    content: (
      <p>
        Les échanges par email sont conservés le temps nécessaire au
        traitement de votre demande, puis archivés pendant une durée
        maximale de trois ans à des fins de suivi commercial. Passé ce
        délai, ils sont supprimés, sauf obligation légale de conservation
        plus longue (facturation, comptabilité).
      </p>
    ),
  },
  {
    title: "4. Destinataires des données",
    content: (
      <p>
        Vos données ne sont jamais vendues, louées ou transmises à des
        tiers à des fins commerciales. Elles sont consultées uniquement par
        Sophie Vu et Emilie Libralato, dans le cadre strict du suivi de
        votre projet.
      </p>
    ),
  },
  {
    title: "5. Cookies & analyse d'audience",
    content: (
      <>
        <p>
          Ce site n&apos;utilise pas de cookies publicitaires ou de
          traçage. Aucun outil d&apos;analyse comportementale
          (Google Analytics, Meta Pixel, etc.) n&apos;est déployé.
        </p>
        <p>
          Des données techniques anonymes peuvent être collectées par notre
          hébergeur Vercel (adresses IP, type de navigateur) à des fins
          strictement techniques (performance, sécurité). Ces données ne
          sont pas exploitées à des fins marketing.
        </p>
      </>
    ),
  },
  {
    title: "6. Vos droits",
    content: (
      <>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD) et à la loi Informatique et Libertés, vous disposez
          d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
          de limitation et d&apos;opposition sur vos données personnelles.
        </p>
        <p>
          Pour exercer ces droits, écrivez à{" "}
          <a href="mailto:contact@gssvdesign.com" className={linkClass}>
            contact@gssvdesign.com
          </a>{" "}
          en précisant l&apos;objet de votre demande.
        </p>
        <p>
          Vous pouvez également adresser une réclamation à la CNIL
          (Commission Nationale de l&apos;Informatique et des Libertés) :{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            www.cnil.fr
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "7. Hébergement",
    content: (
      <p>
        Le site est hébergé par Vercel Inc. (440 N Barranca Ave #4133,
        Covina, CA 91723, USA). Vercel s&apos;engage à respecter le RGPD
        via des clauses contractuelles types validées par la Commission
        européenne.
      </p>
    ),
  },
];

export default function ConfidentialitePage() {
  return (
    <section className="page">
      <div className="mx-auto max-w-[760px] md:pt-[14vh]">
        <h1 className="font-bold uppercase text-[22px] md:text-[25px] leading-[1.25]">
          Politique de confidentialité
        </h1>
        <p className="mt-4 mb-12 text-[14px] leading-[1.7]">
          Nous ne collectons vos données que si vous nous écrivez. Aucun
          cookie de suivi, aucun outil d&apos;analyse comportementale.
          Voilà comment tout cela fonctionne.
        </p>

        <div className="space-y-12">
          {SECTIONS.map((sec) => (
            <div key={sec.title}>
              <h2 className="uppercase text-[14px] underline underline-offset-4 mb-4">
                {sec.title}
              </h2>
              <div className="space-y-4 text-[14px] leading-[1.7]">
                {sec.content}
              </div>
            </div>
          ))}

          <p className="uppercase text-[13px]">
            Voir aussi :{" "}
            <Link href="/mentions-legales" className="underline underline-offset-4 hover:no-underline">
              Mentions légales
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
