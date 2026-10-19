"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Revenir en haut"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed z-[90] bottom-20 right-5 md:bottom-[100px] md:right-[50px] w-10 h-10 flex items-center justify-center bg-black text-white border border-black hover:bg-white hover:text-black transition-all duration-300 ${
        on ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M1 9l6-6 6 6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </button>
  );
}
