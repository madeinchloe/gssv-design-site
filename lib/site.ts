/*
 * URL canonique du site et interrupteur de mise en ligne.
 * SITE_LIVE=1 (variable d'environnement Vercel, Production) active l'indexation
 * Google, le robots.txt ouvert et la redirection de l'URL vercel.app vers le domaine.
 * Tant qu'elle n'est pas posée, le site reste en noindex.
 */
export const SITE_URL = "https://www.gssvdesign.com";
export const IS_LIVE = process.env.SITE_LIVE === "1";

/* Phrase d'identité : reprise telle quelle sur le site, dans llms.txt et les données structurées. */
export const IDENTITY =
  "GSSV Design est l'agence d'architecture d'intérieur et de design global fondée en 2017 par Sophie Vu, architecte, architecte d'intérieur et designer, au 38 Boulevard de Strasbourg à Toulouse.";

export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/studio#sophie-vu`;

/* Coordonnées : Base Adresse Nationale (api-adresse.data.gouv.fr), relevé du 19 octobre 2026. */
export const GEO = { latitude: 43.60837, longitude: 1.446217 };
