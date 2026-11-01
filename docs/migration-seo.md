# Migration SEO : gssvdesign.com de Wix vers le nouveau site

Relevé effectué le 18 octobre 2026 sur https://www.gssvdesign.com (site Wix en production).

## 1. État des lieux

### Infrastructure actuelle
| Élément | Valeur relevée |
| --- | --- |
| Plateforme | Wix (Thunderbolt), site premium |
| Registrar du domaine | GoDaddy (création 4 octobre 2016, expiration 4 octobre 2029) |
| DNS | Serveurs Wix (ns2.wixdns.net, ns3.wixdns.net) |
| Version canonique | https://www.gssvdesign.com (avec www) |
| Redirection apex | http(s)://gssvdesign.com redirige en 301 vers https://www.gssvdesign.com |
| Title accueil | « Gssv Design Architecture d'intérieur \| Sophie Vu » |

### Visibilité Google (Haloscan, scan du 22 septembre 2026)
| Indicateur | Valeur |
| --- | --- |
| Mots-clés positionnés dans le top 100 | 5 |
| Mots-clés dans le top 10 | 0 |
| Trafic organique estimé | 1 visite par mois |
| Index de visibilité | 1 (pic à 9,1 en décembre 2023, chute à 1 depuis avril 2024) |
| Pages qui se positionnent | la page d'accueil uniquement |

Les 5 mots-clés relevés (tous sur la page d'accueil) :

| Mot-clé | Position | Volume SEO mensuel | Dernier scan |
| --- | --- | --- | --- |
| design global toulouse | 13 | 10 | 16 septembre 2026 |
| agence design global toulouse | 15 | non disponible | 23 décembre 2025 |
| global architecture toulouse | 20 | 20 | 23 décembre 2025 |
| architecte sophie | 29 | non disponible | 9 octobre 2025 |
| architecte d'intérieur designer global | 33 | non disponible | 7 octobre 2025 |

Lecture : le site actuel n'a presque aucun capital SEO organique à préserver. Il ne se positionne sur aucune requête commerciale locale (« architecte d'intérieur toulouse », « décoratrice toulouse ») et n'apporte aucun trafic mesurable. La refonte ne peut quasiment que faire mieux. Le vrai risque de la bascule n'est pas la perte de positions, ce sont trois erreurs classiques :

1. laisser le `noindex` du site de préproduction en ligne après la bascule ;
2. casser les liens externes et la fiche Google Business qui pointent vers le domaine ;
3. répondre 404 sur les anciennes URL Wix encore connues de Google.

### Pages indexables du site Wix (sitemap.xml du 18 octobre 2026)
| Ancienne URL Wix | Contenu | Redirigée vers |
| --- | --- | --- |
| / | Accueil | / |
| /projects-6 | « Architecture d'intérieur » (hub particuliers / professionnels) | /projets |
| /copie-de-particuliers-1 | « Particuliers » (galerie) | /projets |
| /copie-de-particuliers | « Professionnels » (galerie) | /projets |
| /s-projects-side-by-side | « Professionnels » (galerie, doublon) | /projets |
| /contact-9 | Contact | /contact |
| /portfolio | « Presse publications » | /studio |
| /portfolio/landscape-magazine-photoshoot- | page de démo Wix vide | /studio |
| /portfolio/wild-spirit- | page de démo Wix vide | /studio |
| /portfolio/espinas-mezcal-ad- | page de démo Wix vide | /studio |
| /portfolio/summer-secrets | page de démo Wix vide | /studio |
| /portfolio/under-the-sun | page de démo Wix vide | /studio |
| /portfolio/may-28th | page de démo Wix vide | /studio |

Ces 12 redirections permanentes sont déjà codées dans `next.config.ts` et testées en local (réponse 308, que Google traite comme un 301). Elles sont à conserver au moins 12 mois après la bascule.

Les images du site Wix sont hébergées sur static.wixstatic.com, pas sur le domaine. Elles ne peuvent pas être redirigées. Les éventuelles positions dans Google Images seront perdues, ce qui est négligeable au vu du trafic actuel.

### Liens externes connus
| Source | Cible | Action |
| --- | --- | --- |
| archi-panorama.fr, fiche 502 (Archi+ Tome 11 et 12) | https://www.gssvdesign.com/ | aucune, la page d'accueil garde la même URL |
| Fiche Google Business Profile | domaine gssvdesign.com | vérifier l'URL après bascule |
| Houzz (fiche GSSV Design) | à vérifier | vérifier l'URL après bascule |
| Instagram @sophievu_gssvdesign (bio) | à vérifier | vérifier l'URL après bascule |
| Facebook /gssvdesign | à vérifier | vérifier l'URL après bascule |

## 2. Plan de bascule

### Avant la bascule (J-7)

**Google Search Console**
1. Vérifier que Sophie a accès à une propriété Search Console pour gssvdesign.com. S'il n'y en a pas, en créer une de type « Domaine » avec validation par enregistrement TXT dans le DNS. Cet enregistrement devra être recopié dans le nouveau DNS le jour J, sinon la propriété se dévalide.
2. Exporter avant de quitter Wix : rapport Performances sur 16 mois (requêtes et pages), rapport Liens (sites référents), rapport Pages (URL indexées). Ces exports servent de référence pour comparer après bascule.

**Dans le code du nouveau site** (fait le 19 octobre 2026)
1. L'URL canonique `https://www.gssvdesign.com` est centralisée dans `lib/site.ts` et utilisée par le layout, le sitemap, les pages projets, le JSON-LD et llms.txt.
2. L'indexation dépend de la variable d'environnement `SITE_LIVE`. Sans elle : noindex et robots.txt fermé. Avec `SITE_LIVE=1` : index, robots.txt ouvert avec le sitemap, et redirection 308 de `gssv-design.vercel.app` vers le domaine.
3. `public/robots.txt` supprimé (doublon de `app/robots.ts`).
4. Title de l'accueil : « Architecte d'intérieur à Toulouse | GSSV Design, Sophie Vu ».
5. Mentions légales corrigées : la société est une EURL au capital de 1 000 € depuis le 1er juillet 2021 (ex-SAS, sources BODACC et societe.com), Sophie Vu gérante.

**Sur Vercel** (projet `gssv-design`)
1. Ajouter les deux domaines au projet : `www.gssvdesign.com` en domaine principal, `gssvdesign.com` en redirection vers www. Vercel génère la redirection apex vers www en 308, ce qui reproduit le comportement actuel.
2. Noter les enregistrements DNS que Vercel demande (un enregistrement A pour l'apex, un CNAME pour www).
3. Fait le 22 octobre 2026 : zone DNS Vercel activée sur gssvdesign.com (serveurs de noms cibles ns1.vercel-dns.com et ns2.vercel-dns.com). Les 5 MX Google, les 3 CNAME mail/calendar/docs et le TXT SPF sont recopiés dans la zone. Vercel gère lui-même les enregistrements ALIAS de l'apex et du wildcard ainsi que les CAA. Le TXT de vérification Search Console (google-site-verification=i1ZCU-E-qqGWMs4lPIG9oMj63O6jfd-Bzy5yno_unFA) est ajouté le même jour.

### Jour J (bascule DNS)

Deux options selon l'endroit où sont gérés les DNS. Le domaine est chez GoDaddy mais les serveurs de noms pointent vers Wix, donc la zone DNS est aujourd'hui éditée dans le tableau de bord Wix.

- Option A, la plus simple : chez GoDaddy, remplacer les serveurs de noms Wix par ceux de Vercel (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`), puis ajouter le domaine dans Vercel. Vercel gère ensuite toute la zone. Attention : les enregistrements MX (emails contact@gssvdesign.com) et le TXT Search Console doivent être recopiés dans Vercel avant de changer les serveurs de noms, sinon les emails s'arrêtent.
- Option B : garder les serveurs de noms Wix et modifier seulement les enregistrements A (apex) et CNAME (www) dans Wix. Les emails ne bougent pas. Wix peut toutefois réécrire certains enregistrements, ce qui rend l'option A plus fiable à moyen terme.

Dans les deux cas, relever les enregistrements MX et TXT existants avant toute modification. Relevé du 19 octobre 2026 : emails sur Google Workspace, aucun enregistrement TXT (pas de SPF, pas de vérification Search Console).

| Type | Nom | Valeur | Priorité |
| --- | --- | --- | --- |
| MX | @ | aspmx.l.google.com | 10 |
| MX | @ | alt1.aspmx.l.google.com | 20 |
| MX | @ | alt2.aspmx.l.google.com | 30 |
| MX | @ | aspmx2.googlemail.com | 40 |
| MX | @ | aspmx3.googlemail.com | 50 |
| CNAME | mail | ghs.googlehosted.com | |
| CNAME | calendar | ghs.googlehosted.com | |
| CNAME | docs | ghs.googlehosted.com | |
| TXT | @ | v=spf1 include:_spf.google.com ~all | (à ajouter) |

Pas de DNSSEC sur le domaine, pas de clé DKIM publiée.

Ajouté le 22 octobre 2026 dans la zone Vercel : TXT `_dmarc` = `v=DMARC1; p=none; rua=mailto:contact@gssvdesign.com` (surveillance seule, aucun rejet). DKIM reste à faire : la clé se génère dans la console d'administration Google Workspace (Applications, Google Workspace, Gmail, Authentifier les e-mails), rôle super-administrateur requis, puis TXT `google._domainkey` à ajouter dans la zone Vercel et « Lancer l'authentification » sous 48 h.

Puis, dans l'ordre :
1. Dans Vercel, Settings, Environment Variables : ajouter `SITE_LIVE` = `1` pour Production, puis redéployer.
   Fait le 22 octobre 2026 : variable posée, déploiement de production dpl_GSrKwyMXe7Pha1yZiUxrbmncR6gM. Vérifié sur l'URL du déploiement : robots.txt ouvert avec sitemap, meta robots index, 12 redirections 308 en place, gssv-design.vercel.app redirige en 308 vers www. L'en-tête x-robots-tag noindex visible sur l'URL hachée du déploiement est ajouté par Vercel sur ces URL techniques, il n'apparaît pas sur le domaine (à contrôler après bascule).
2. Attendre la propagation DNS (de quelques minutes à 24 h) et vérifier que `https://www.gssvdesign.com` sert bien le nouveau site avec un certificat valide.
3. Contrôler avec `curl -I` les 12 anciennes URL : chacune doit répondre 308 vers la nouvelle route.
4. Contrôler `https://www.gssvdesign.com/robots.txt` (doit autoriser l'exploration) et `https://www.gssvdesign.com/sitemap.xml`.
5. Dans Search Console : soumettre le sitemap, puis utiliser l'inspection d'URL et « Demander l'indexation » sur l'accueil, /projets, /studio et /contact.
6. Ne pas résilier l'abonnement Wix tout de suite : le garder un mois permet de revenir en arrière en cas de problème.

**Bascule effectuée le 22 octobre 2026** (option A, serveurs de noms Vercel chez GoDaddy). Relevé après bascule :
- registre .com et résolveurs publics (Google, Cloudflare, Quad9) sur ns1/ns2.vercel-dns.com en moins de 30 minutes ;
- certificat Let's Encrypt émis manuellement via l'API Vercel (cert_PN0nrd9accPyn4zSh5ZvTAFg) pour gssvdesign.com et www.gssvdesign.com, valable jusqu'au 20 janvier 2027, renouvellement automatique ;
- apex et http redirigent en 308 vers https://www.gssvdesign.com, accueil en 200 avec le title « Architecte d'intérieur à Toulouse | GSSV Design, Sophie Vu », meta robots index, canonical www, aucun en-tête x-robots-tag ;
- robots.txt ouvert avec sitemap, sitemap.xml de 14 URL, /projets /studio /contact /mentions-legales /confidentialite /llms.txt en 200 ;
- les 12 anciennes URL Wix répondent 308 vers /projets, /contact ou /studio ;
- MX Google Workspace, SPF et TXT Search Console servis par la zone Vercel.

### Après la bascule (J+1 à J+90)
1. Search Console, rapport Pages : surveiller chaque semaine pendant un mois les erreurs 404 et les « pages avec redirection ». Toute 404 sur une ancienne URL inconnue doit être ajoutée à la liste de redirections.
2. Search Console, rapport Performances : comparer avec l'export d'avant bascule. Les 5 requêtes relevées doivent réapparaître sur la nouvelle page d'accueil sous 2 à 6 semaines.
3. Mettre à jour les liens externes listés plus haut si l'un d'eux pointait vers une ancienne URL profonde.
4. Créer un projet de suivi Haloscan sur gssvdesign.com avec les 5 mots-clés actuels plus les requêtes cibles de la refonte (« architecte d'intérieur toulouse », « architecte intérieur toulouse », « décoration intérieur toulouse », « rénovation échoppe toulousaine »).

## 3. Résumé des décisions
- Le domaine ne change pas (gssvdesign.com en www), donc pas de « changement d'adresse » à déclarer dans Search Console.
- Les anciennes URL Wix sont déjà redirigées dans le code. Rien à configurer côté Wix.
- Le capital SEO à préserver tient à la marque et à la page d'accueil. La priorité est de ne pas lancer en noindex et de garder « Sophie Vu », « architecture d'intérieur » et « Toulouse » dans le title de l'accueil.
