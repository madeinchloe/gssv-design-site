import { getAllArticles } from "@/lib/journal";

const BASE = "https://gssv-design.vercel.app";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const articles = getAllArticles();
  const now = new Date().toUTCString();

  const items = articles
    .map((a) => {
      const url = `${BASE}/journal/${a.slug}`;
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <description>${escapeXml(a.description)}</description>
      <category>${escapeXml(a.category)}</category>
      <author>contact@gssvdesign.com (${escapeXml(a.author)})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Journal — GSSV Design</title>
    <link>${BASE}/journal</link>
    <atom:link href="${BASE}/journal/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Notes du studio GSSV Design par Sophie Vu, architecte d'intérieur à Toulouse.</description>
    <language>fr-FR</language>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
