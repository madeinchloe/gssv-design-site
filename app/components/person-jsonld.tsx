import { SITE_URL, ORG_ID, PERSON_ID } from "@/lib/site";

/* Fiche entité de Sophie Vu, reliée à l'organisation par son @id. */
export function SophieVuJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Sophie Vu",
    jobTitle: "Architecte, architecte d'intérieur & designer",
    image: `${SITE_URL}/studio/sophie-vu.jpg`,
    url: `${SITE_URL}/studio`,
    worksFor: { "@id": ORG_ID },
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "38 Boulevard de Strasbourg",
        postalCode: "31000",
        addressLocality: "Toulouse",
        addressCountry: "FR",
      },
    },
    knowsAbout: ["Architecture d'intérieur", "Design global", "Rénovation", "Maison toulousaine"],
    sameAs: [
      "https://www.instagram.com/sophievu_gssvdesign/",
      "https://archi-panorama.fr/vu-sophie--gssv-design,502",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
