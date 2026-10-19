"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "gssv-intro-seen";

/* Écran d'entrée : noir, logotype en bas, un clic pour entrer. Une fois par session. */
export function Intro() {
  const [closing, setClosing] = useState(false);
  const [gone, setGone] = useState(false);

  const enter = useCallback(() => {
    if (closing) return;
    setClosing(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    document.documentElement.classList.add("intro-seen");
    window.setTimeout(() => setGone(true), 900);
  }, [closing]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen) {
      setGone(true);
      return;
    }
    document.documentElement.classList.add("intro-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("intro-open");
    };
  }, [enter]);

  useEffect(() => {
    if (closing) document.documentElement.classList.remove("intro-open");
  }, [closing]);

  if (gone) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Entrer sur le site"
      data-cursor="Entrer"
      onClick={enter}
      className={`intro fixed inset-0 z-[200] bg-black text-white overflow-hidden select-none ${
        closing ? "intro-closing" : ""
      }`}
    >
      <p className="absolute top-6 left-5 md:top-[50px] md:left-[50px] max-w-[55%] md:max-w-none text-[11px] md:text-[12px] uppercase tracking-[0.08em] text-white/70">
        Architecture d&apos;intérieur &amp; design global · Toulouse
      </p>
      <p className="absolute top-6 right-5 md:top-[50px] md:right-[50px] text-right text-[11px] md:text-[12px] uppercase tracking-[0.08em] text-white/70 intro-hint">
        Cliquer pour entrer
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-[-0.3em] grotesk font-light tracking-[-0.02em] leading-none whitespace-nowrap text-[22vw] md:text-[15.5vw] intro-logo"
      >
        gssv design
      </div>
    </div>
  );
}
