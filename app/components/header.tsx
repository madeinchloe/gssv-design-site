"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const LINKS = [
  { href: "/studio", label: "Le Studio" },
  { href: "/projets/particuliers", label: "Résidentiel" },
  { href: "/projets/professionnels", label: "Commerces" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      {/* Logo empilé, en haut à gauche, défile avec la page */}
      <div className="absolute top-0 left-0 z-40 pl-5 pt-5 md:pt-6">
        <Link href="/" aria-label="GSSV Design, accueil" className="block">
          <span className="grotesk logo hidden md:block text-[44px] leading-[0.95] text-[color:var(--color-ink)] select-none">
            gs
            <br />
            sv
            <br />
            design
          </span>
          <span className="grotesk logo md:hidden block text-[22px] leading-[1] text-[color:var(--color-ink)] select-none">
            gssv
            <br />
            design
          </span>
        </Link>
      </div>

      {/* Ouvre / ferme le menu plein écran. Le bouton est attiré par la souris. */}
      <div
        className="fixed z-[120] top-0 right-0 md:top-[16px] md:right-[16px] p-5 md:p-[34px]"
        onMouseMove={(e) => {
          const b = btn.current;
          if (!b) return;
          const r = e.currentTarget.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          b.style.transform = `translate(${dx * 0.35}px, ${dy * 0.35}px)`;
        }}
        onMouseLeave={() => {
          const b = btn.current;
          if (b) b.style.transform = "";
        }}
      >
      <button
        ref={btn}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className={`w-[56px] h-[26px] flex flex-col justify-between group transition-transform duration-300 ease-out ${
          open ? "text-white" : "text-[color:var(--color-ink)]"
        }`}
      >
        {open ? (
          <span className="relative block w-full h-full">
            <span className="absolute left-1/2 top-1/2 h-px w-[52px] bg-current -translate-x-1/2 -translate-y-1/2 rotate-45" />
            <span className="absolute left-1/2 top-1/2 h-px w-[52px] bg-current -translate-x-1/2 -translate-y-1/2 -rotate-45" />
          </span>
        ) : (
          <>
            <span className="flex items-center justify-between w-full">
              <span className="block h-px w-[10px] bg-current transition-all duration-300 group-hover:w-[18px]" />
              <span className="block h-px w-[36px] bg-current transition-all duration-300 group-hover:w-[28px]" />
            </span>
            <span className="block h-px w-full bg-current" />
          </>
        )}
      </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="fullscreen-menu"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[110] bg-black text-white overflow-hidden"
          >
            <nav className="absolute inset-0 flex items-center justify-center">
              <ul className="text-center space-y-2 md:space-y-3">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: reduce ? 0 : 0.1 + i * 0.06 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="menu-link grotesk font-medium text-[32px] md:text-[40px] tracking-[-0.02em]"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Logotype géant, coupé en bas comme un fond */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-0.3em] grotesk font-light tracking-[-0.02em] text-white leading-none whitespace-nowrap text-[22vw] md:text-[15.5vw] select-none"
            >
              gssv design
            </div>

            <a
              href="https://www.instagram.com/sophievu_gssvdesign/"
              target="_blank"
              rel="noreferrer"
              className="serif-italic absolute bottom-10 right-10 text-[18px] text-white"
            >
              Ins
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
