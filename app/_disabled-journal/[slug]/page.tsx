import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  formatDateFr,
  type Article,
} from "@/lib/journal";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article introuvable" };
  const url = `/journal/${article.slug}`;
  return {
    title: `${article.title} — GSSV Design`,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      url,
      images: article.hero ? [article.hero] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: article.hero ? [article.hero] : undefined,
    },
  };
}

function articleJsonLd(article: Article) {
  const base = "https://gssv-design.vercel.app";
  const url = `${base}/journal/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.hero ? [article.hero] : undefined,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "fr-FR",
    author: {
      "@type": "Person",
      name: article.author,
      jobTitle: article.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "GSSV Design",
      logo: {
        "@type": "ImageObject",
        url: `${base}/favicon.ico`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: article.category,
    keywords: article.tags.join(", "),
  };
}

function faqJsonLd(article: Article) {
  if (!article.faq?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

function breadcrumbJsonLd(article: Article) {
  const base = "https://gssv-design.vercel.app";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: base },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal",
        item: `${base}/journal`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${base}/journal/${article.slug}`,
      },
    ],
  };
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="font-display text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] mt-16 mb-6"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-display text-3xl md:text-4xl leading-[1.15] tracking-[-0.015em] mt-16 mb-5 text-[color:var(--color-ink)]"
      style={{ fontVariationSettings: '"SOFT" 60' }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-display text-2xl md:text-3xl leading-[1.2] mt-12 mb-4 text-[color:var(--color-ink)]"
      style={{ fontVariationSettings: '"SOFT" 60' }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-[18px] md:text-[19px] leading-[1.75] mb-6 text-[color:var(--color-ink-soft)]"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-[color:var(--color-clay)] underline underline-offset-4 decoration-[color:var(--color-clay)]/40 hover:decoration-[color:var(--color-clay)] transition-colors"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-6 space-y-3 text-[18px] leading-[1.7] text-[color:var(--color-ink-soft)] list-disc pl-6"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-6 space-y-3 text-[18px] leading-[1.7] text-[color:var(--color-ink-soft)] list-decimal pl-6"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="pl-1" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-[color:var(--color-ink)] font-semibold" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-10 border-l-2 border-[color:var(--color-clay)] pl-6 py-2 font-display italic text-2xl md:text-3xl leading-snug text-[color:var(--color-ink)]"
      style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-10 overflow-x-auto border border-[color:var(--color-ink)]/15">
      <table
        className="w-full text-[15px] leading-[1.6] border-collapse"
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className="bg-[color:var(--color-bone-soft)] mono-caps text-[color:var(--color-ink)]"
      {...props}
    />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-left px-4 py-3 border-b border-[color:var(--color-ink)]/15"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-3 border-b border-[color:var(--color-ink)]/10 align-top text-[color:var(--color-ink-soft)]"
      {...props}
    />
  ),
};

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug, 2);
  const faqSchema = faqJsonLd(article);

  return (
    <article className="min-h-screen">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(article)) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero */}
      <header className="pt-40 md:pt-52 pb-14 md:pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <nav className="mono-caps text-[color:var(--color-stone)] mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-[color:var(--color-clay)]">
              Accueil
            </Link>
            <span>›</span>
            <Link href="/journal" className="hover:text-[color:var(--color-clay)]">
              Journal
            </Link>
            <span>›</span>
            <span className="truncate">{article.category}</span>
          </nav>

          <div className="mono-caps text-[color:var(--color-clay)] mb-6">
            {article.category}
          </div>
          <h1
            className="font-display text-[9vw] md:text-[5vw] leading-[0.98] tracking-[-0.025em] text-[color:var(--color-ink)] max-w-4xl"
            style={{ fontVariationSettings: '"SOFT" 40' }}
          >
            {article.title}
          </h1>
          <p className="mt-10 text-xl md:text-2xl leading-[1.55] text-[color:var(--color-ink-soft)] max-w-3xl font-display">
            {article.description}
          </p>

          <div className="mt-10 pt-8 border-t border-[color:var(--color-ink)]/15 flex flex-wrap items-center gap-6 mono-caps text-[color:var(--color-stone)]">
            <span>
              <span className="text-[color:var(--color-ink)]">{article.author}</span>{" "}
              · {article.authorRole}
            </span>
            <span>·</span>
            <span>{formatDateFr(article.date)}</span>
            <span>·</span>
            <span>{article.readingMinutes} min de lecture</span>
          </div>
        </div>
      </header>

      {/* Hero image */}
      {article.hero && (
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="relative aspect-[16/9] overflow-hidden bg-[color:var(--color-bone-deep)]">
            <Image
              src={article.hero}
              alt={article.heroAlt ?? article.title}
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-[780px] px-6 md:px-10">
          <MDXRemote
            source={article.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: "wrap" }],
                ],
              },
            }}
          />
        </div>
      </div>

      {/* FAQ */}
      {article.faq?.length ? (
        <section className="pb-16 md:pb-24 bg-[color:var(--color-bone-soft)] py-16 md:py-24">
          <div className="mx-auto max-w-[900px] px-6 md:px-10">
            <div className="flex items-start gap-4 mb-10">
              <span className="mt-3 block h-px w-8 bg-[color:var(--color-ink)]/60" />
              <div>
                <div className="mono-caps text-[color:var(--color-stone)]">
                  Questions fréquentes
                </div>
                <h2
                  className="mt-4 font-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em]"
                  style={{ fontVariationSettings: '"SOFT" 60' }}
                >
                  Réponses{" "}
                  <span
                    className="italic text-[color:var(--color-clay)]"
                    style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
                  >
                    directes.
                  </span>
                </h2>
              </div>
            </div>

            <dl className="divide-y divide-[color:var(--color-ink)]/15 border-y border-[color:var(--color-ink)]/15">
              {article.faq.map((f, i) => (
                <div key={i} className="py-8">
                  <dt className="font-display text-xl md:text-2xl text-[color:var(--color-ink)] leading-snug">
                    {f.question}
                  </dt>
                  <dd className="mt-4 text-[17px] leading-[1.7] text-[color:var(--color-ink-soft)]">
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {/* Related */}
      {related.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="mono-caps text-[color:var(--color-stone)] mb-10">
              À lire ensuite
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/journal/${r.slug}`}
                  className="group flex flex-col md:flex-row gap-6 border-t border-[color:var(--color-ink)]/15 pt-6"
                >
                  <div className="relative w-full md:w-56 aspect-[4/3] flex-shrink-0 overflow-hidden bg-[color:var(--color-bone-deep)]">
                    <Image
                      src={r.hero}
                      alt={r.heroAlt ?? r.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 224px"
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mono-caps text-[color:var(--color-stone)]">
                      {r.category} · {formatDateFr(r.date)}
                    </div>
                    <h3
                      className="mt-3 font-display text-xl md:text-2xl leading-tight text-[color:var(--color-ink)] group-hover:text-[color:var(--color-clay)] transition-colors"
                      style={{ fontVariationSettings: '"SOFT" 60' }}
                    >
                      {r.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-[color:var(--color-ink-soft)] line-clamp-2">
                      {r.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[color:var(--color-ink)] text-[color:var(--color-bone)]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 text-center">
          <p className="mono-caps text-[color:var(--color-clay)]">
            Envie d&apos;en discuter ?
          </p>
          <p
            className="mt-6 font-display text-4xl md:text-6xl leading-[1] tracking-[-0.02em] max-w-3xl mx-auto"
            style={{ fontVariationSettings: '"SOFT" 50' }}
          >
            Un projet à Toulouse ou ailleurs&nbsp;?{" "}
            <span
              className="italic text-[color:var(--color-clay)]"
              style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
            >
              Écrivons-nous.
            </span>
          </p>
          <a
            href="mailto:contact@gssvdesign.com"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[color:var(--color-bone)] text-[color:var(--color-ink)] px-6 py-3 text-sm hover:bg-[color:var(--color-clay)] hover:text-[color:var(--color-bone)] transition-colors"
          >
            contact@gssvdesign.com
            <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </article>
  );
}
