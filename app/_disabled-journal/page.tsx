import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles, formatDateFr } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal — GSSV Design · Notes d'architecture d'intérieur",
  description:
    "Le journal de Sophie Vu, architecte d'intérieur à Toulouse. Méthodes de rénovation, matières, tarifications, guides pratiques. Notes du studio GSSV Design.",
};

export default function JournalIndex() {
  const articles = getAllArticles();
  const [featured, ...rest] = articles;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-40 md:pt-52 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 flex items-start gap-4">
              <span className="mt-3 block h-px w-8 bg-[color:var(--color-ink)]/60" />
              <div>
                <div className="mono-caps text-[color:var(--color-stone)]">
                  Le Journal · GSSV Design
                </div>
                <h1
                  className="mt-6 font-display text-[13vw] md:text-[8.5vw] leading-[0.9] tracking-[-0.03em]"
                  style={{ fontVariationSettings: '"SOFT" 50' }}
                >
                  Notes du{" "}
                  <span
                    className="italic text-[color:var(--color-clay)]"
                    style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
                  >
                    studio.
                  </span>
                </h1>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 mono-caps text-[color:var(--color-stone)] md:text-right">
              Méthodes · Matières · Repères
              <br />
              Regards d&apos;une architecte à Toulouse
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <Link
              href={`/journal/${featured.slug}`}
              className="group grid grid-cols-12 gap-6 md:gap-10 items-center border-t border-[color:var(--color-ink)]/15 pt-10 md:pt-14"
            >
              <div className="col-span-12 md:col-span-6 relative aspect-[4/3] overflow-hidden bg-[color:var(--color-bone-deep)]">
                <Image
                  src={featured.hero}
                  alt={featured.heroAlt ?? featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  priority
                />
                <div className="absolute top-4 left-4 mono-caps rounded-full bg-[color:var(--color-bone)]/90 backdrop-blur px-3 py-1.5 text-[color:var(--color-ink)]">
                  À la une · {featured.category}
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="mono-caps text-[color:var(--color-stone)]">
                  {formatDateFr(featured.date)} · {featured.readingMinutes} min de lecture
                </div>
                <h2
                  className="mt-6 font-display text-4xl md:text-6xl leading-[1] tracking-[-0.02em] text-[color:var(--color-ink)] group-hover:text-[color:var(--color-clay)] transition-colors duration-500"
                  style={{ fontVariationSettings: '"SOFT" 50' }}
                >
                  {featured.title}
                </h2>
                <p className="mt-6 text-[17px] leading-[1.7] text-[color:var(--color-ink-soft)] max-w-xl">
                  {featured.description}
                </p>
                <div className="mt-8 mono-caps inline-flex items-center gap-3 text-[color:var(--color-ink)]">
                  Lire l&apos;article
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <section className="pb-32 md:pb-48">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="mono-caps text-[color:var(--color-stone)] mb-8">
              Tous les articles
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-ink)]/15 border-y border-[color:var(--color-ink)]/15">
              {rest.map((a) => (
                <li key={a.slug} className="bg-[color:var(--color-bone)]">
                  <Link
                    href={`/journal/${a.slug}`}
                    className="group block p-6 md:p-8 h-full"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-bone-deep)] mb-6">
                      <Image
                        src={a.hero}
                        alt={a.heroAlt ?? a.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                      />
                      <div className="absolute top-3 left-3 mono-caps rounded-full bg-[color:var(--color-bone)]/85 backdrop-blur px-2.5 py-1 text-[color:var(--color-ink)]">
                        {a.category}
                      </div>
                    </div>
                    <div className="mono-caps text-[color:var(--color-stone)]">
                      {formatDateFr(a.date)} · {a.readingMinutes} min
                    </div>
                    <h3
                      className="mt-4 font-display text-2xl md:text-3xl leading-tight tracking-[-0.01em] text-[color:var(--color-ink)] group-hover:text-[color:var(--color-clay)] transition-colors"
                      style={{ fontVariationSettings: '"SOFT" 60' }}
                    >
                      {a.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-[color:var(--color-ink-soft)] line-clamp-3">
                      {a.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
