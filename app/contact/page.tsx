import Image from "next/image";
import type { Metadata } from "next";
import { ContactForm } from "../components/contact-form";

export const metadata: Metadata = {
  title: "Contact | GSSV DESIGN",
  description:
    "Contacter GSSV Design, agence d'architecture d'intérieur à Toulouse : 38 Boulevard de Strasbourg, 31000 Toulouse. contact@gssvdesign.com",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="page">
      <div className="mx-auto max-w-[1100px] md:pt-[18vh] grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-14">
        <div className="md:col-span-2">
          <h1 className="font-bold uppercase text-[22px] md:text-[25px] leading-[1.25]">
            Prenons rendez-vous.
          </h1>
          <p className="mt-3 mb-12 text-[14px]">
            Un projet en tête ? Écrivez-nous.
          </p>
          <ContactForm />
        </div>

        <div className="sheet md:pt-[62px]">
          <Image
            src="/brand/gssv-emblem.png"
            alt="Emblème GSSV Design, architecture d'intérieur"
            width={120}
            height={120}
            className="mb-6 h-[96px] w-[96px] md:h-[120px] md:w-[120px]"
          />
          <p>GSSV Design</p>
          <p>
            38 Boulevard de Strasbourg
            <br />
            31000 Toulouse
          </p>
          <p>
            <a href="tel:+33642484820" className="hover:underline">
              06 42 48 48 20
            </a>
            <br />
            <a href="tel:+33561624654" className="hover:underline">
              05 61 62 46 54
            </a>
          </p>
          <p>
            <a href="mailto:contact@gssvdesign.com" className="hover:underline">
              contact@gssvdesign.com
            </a>
          </p>

          <p className="mt-10">
            <span className="label">Presse :</span>
          </p>
          <p className="prose">
            Pour toute demande presse, sollicitation éditoriale ou
            collaboration magazine, écrivez directement au studio.
          </p>
          <p>
            <a
              href="mailto:contact@gssvdesign.com?subject=Demande%20presse"
              className="underline underline-offset-4 hover:no-underline"
            >
              Contacter la presse
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
