import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type FAQItem = { question: string; answer: string };

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  hero: string;
  heroAlt?: string;
  tags: string[];
  faq?: FAQItem[];
  author: string;
  authorRole: string;
  readingMinutes: number;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "journal");

function readArticleFile(fileName: string): Article {
  const filePath = path.join(CONTENT_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const slug = fileName.replace(/\.mdx?$/, "");
  return {
    slug,
    title: String(data.title ?? "Sans titre"),
    description: String(data.description ?? ""),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    category: String(data.category ?? "Note"),
    hero: String(data.hero ?? ""),
    heroAlt: data.heroAlt ? String(data.heroAlt) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    faq: Array.isArray(data.faq) ? (data.faq as FAQItem[]) : undefined,
    author: String(data.author ?? "Sophie Vu"),
    authorRole: String(data.authorRole ?? "Architecte d'intérieur — GSSV Design"),
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    content,
  };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  return files
    .map(readArticleFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  const all = getAllArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

export function getRelatedArticles(slug: string, limit = 2): Article[] {
  const all = getAllArticles();
  const current = all.find((a) => a.slug === slug);
  if (!current) return all.slice(0, limit);
  const scored = all
    .filter((a) => a.slug !== slug)
    .map((a) => {
      const shared = a.tags.filter((t) => current.tags.includes(t)).length;
      const sameCat = a.category === current.category ? 1 : 0;
      return { a, score: shared * 2 + sameCat };
    })
    .sort((x, y) => y.score - x.score);
  return scored.slice(0, limit).map((s) => s.a);
}

export function formatDateFr(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}
