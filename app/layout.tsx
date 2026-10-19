import type { Metadata } from "next";
import { Space_Mono, Spectral, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { SideInstagram } from "./components/side-instagram";
import { BackToTop } from "./components/back-to-top";
import { Intro } from "./components/intro";
import { Cursor } from "./components/cursor";
import { SITE_URL, IS_LIVE } from "@/lib/site";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Architecte d'intérieur à Toulouse | GSSV Design, Sophie Vu",
  description:
    "Architecte d'intérieur à Toulouse depuis 2017, Sophie Vu et GSSV Design rénovent maisons, appartements et lieux professionnels, de l'esquisse au chantier.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: IS_LIVE
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
      },
  openGraph: {
    title: "GSSV Design, architecte d'intérieur à Toulouse",
    description:
      "Architecte d'intérieur à Toulouse depuis 2017, Sophie Vu et GSSV Design rénovent maisons, appartements et lieux professionnels, de l'esquisse au chantier.",
    type: "website",
    siteName: "GSSV Design",
    locale: "fr_FR",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${spaceMono.variable} ${spectral.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Avant hydratation : si l'intro a déjà été vue dans cette session, on la masque tout de suite. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('gssv-intro-seen')==='1'){document.documentElement.classList.add('intro-seen')}else{document.documentElement.classList.add('intro-open')}}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Intro />
        <Header />
        <main className="flex-1 relative">{children}</main>
        <Footer />
        <SideInstagram />
        <BackToTop />
        <Cursor />
      </body>
    </html>
  );
}
