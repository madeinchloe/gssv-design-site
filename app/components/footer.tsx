import Link from "next/link";

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative mt-32 bg-[color:var(--color-footer)] text-white">
      <div className="mx-auto max-w-[1300px] px-[30px] md:px-10 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Accroche + Instagram + copyright */}
          <div>
            <h3 className="text-[20px] leading-[1.5] font-normal text-white md:pr-[5%]">
              Agence d&apos;architecture d&apos;intérieur et de design global
              fondée en 2017 par Sophie Vu.
            </h3>
            <a
              href="https://www.instagram.com/sophievu_gssvdesign/"
              target="_blank"
              rel="noreferrer"
              className="serif-italic inline-block mt-6 text-[20px] leading-[30px] text-white"
            >
              In
            </a>
            <p className="mt-2 text-[14px] text-white/80">
              © Copyright {year} - GSSV Design
            </p>
          </div>

          {/* Équipe + références */}
          <div className="md:pt-5">
            <h5 className="uppercase text-[16px] mb-4">L&apos;équipe</h5>
            <p className="text-[14px]">
              Sophie Vu · Emilie Libralato
            </p>
            <h5 className="uppercase text-[16px] mt-8 mb-4">Références pro</h5>
            <p className="text-[14px] flex flex-col gap-1">
              <a
                href="https://archi-panorama.fr/vu-sophie--gssv-design,502"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:no-underline"
              >
                archi-panorama.fr
              </a>
              <a
                href="https://www.houzz.fr/professionnels/architecte-d-interieur/gssv-design-pfvwfr-pf~1579088336"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:no-underline"
              >
                houzz.fr
              </a>
            </p>
          </div>

          {/* Contact */}
          <div className="md:pt-5">
            <h5 className="uppercase text-[16px] mb-4">Contact</h5>
            <p className="text-[14px]">
              GSSV Design - 38 Boulevard de Strasbourg
              <br />
              31000 TOULOUSE
            </p>
            <p className="text-[14px] mt-2">
              Téléphone:{" "}
              <a href="tel:+33642484820" className="hover:underline">
                06 42 48 48 20
              </a>
              {" / "}
              <a href="tel:+33561624654" className="hover:underline">
                05 61 62 46 54
              </a>
            </p>
            <p className="text-[14px] mt-2">
              <a href="mailto:contact@gssvdesign.com" className="hover:underline">
                contact@gssvdesign.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-2 text-[12px] uppercase text-white/60">
          <span className="flex gap-3">
            <Link href="/mentions-legales" className="hover:text-white">
              Mentions légales
            </Link>
            <span>·</span>
            <Link href="/confidentialite" className="hover:text-white">
              Confidentialité
            </Link>
          </span>
          <span>Toulouse - Occitanie</span>
        </div>
      </div>
    </footer>
  );
}
