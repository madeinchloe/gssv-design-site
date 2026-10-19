import { SITE_URL, ORG_ID, PERSON_ID, IDENTITY, GEO } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": ORG_ID,
    name: "GSSV Design, Sophie Vu",
    alternateName: ["GSSV Design", "Sophie Vu Architecte d'intérieur"],
    description: IDENTITY,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/gssv-emblem.png`,
    image: `${SITE_URL}/opengraph-image.jpg`,
    geo: { "@type": "GeoCoordinates", ...GEO },
    founder: { "@id": PERSON_ID },
    employee: [
      {
        "@type": "Person",
        name: "Emilie Libralato",
        jobTitle: "Collaboratrice, architecte d'intérieur",
      },
    ],
    foundingDate: "2017",
    email: "contact@gssvdesign.com",
    telephone: ["+33642484820", "+33561624654"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "38 Boulevard de Strasbourg",
      addressLocality: "Toulouse",
      postalCode: "31000",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    areaServed: [
      { "@type": "City", name: "Toulouse" },
      { "@type": "AdministrativeArea", name: "Occitanie" },
      { "@type": "Country", name: "France" },
    ],
    knowsAbout: [
      "Architecture d'intérieur",
      "Design global",
      "Rénovation d'échoppes toulousaines",
      "Direction artistique",
      "Aménagement résidentiel",
      "Aménagement commercial",
    ],
    sameAs: [
      "https://www.instagram.com/sophievu_gssvdesign/",
      "https://archi-panorama.fr/vu-sophie--gssv-design,502",
      "https://www.houzz.fr/professionnels/architecte-d-interieur/gssv-design-pfvwfr-pf~1579088336",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations GSSV Design",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Architecture d'intérieur pour particuliers",
            description:
              "Conception, plans, matières et suivi de chantier pour l'aménagement d'appartements, maisons et échoppes toulousaines.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Architecture d'intérieur pour professionnels",
            description:
              "Aménagement d'espaces commerciaux, hospitalité, retail, bureaux avec direction artistique intégrée.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Design global & direction artistique",
            description:
              "Identité visuelle spatiale, scénographie et mobilier sur-mesure.",
          },
        },
      ],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "GSSV Design",
    inLanguage: "fr-FR",
    publisher: { "@id": ORG_ID },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
