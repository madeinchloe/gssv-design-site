"use client";

import { useEffect, useRef } from "react";

/* Curseur graphique : un point qui suit la souris, un cercle qui la suit avec retard.
   data-cursor="Voir" sur un élément affiche ce mot dans le cercle. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const d = dot.current;
    const r = ring.current;
    const l = label.current;
    if (!d || !r || !l) return;

    document.documentElement.classList.add("has-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let mode = "";
    let raf = 0;

    const setModeFor = (t: Element | null) => {
      const tagged = t?.closest<HTMLElement>("[data-cursor]");
      const link = t?.closest("a, button, input, textarea, [role=button]");
      const next = tagged?.dataset.cursor ?? (link ? "link" : "");
      if (next !== mode) {
        mode = next;
        r.dataset.mode = mode === "" ? "idle" : mode === "link" ? "link" : "text";
        l.textContent = mode !== "link" ? mode : "";
      }
    };
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      d.style.opacity = "1";
      r.style.opacity = "1";
      setModeFor(e.target as Element | null);
    };
    const onLeave = () => {
      d.style.opacity = "0";
      r.style.opacity = "0";
    };
    const onDown = () => r.classList.add("is-down");
    const onUp = () => {
      r.classList.remove("is-down");
      /* L'élément sous la souris peut disparaître au clic (intro, menu) : on repart au neutre. */
      window.setTimeout(() => setModeFor(document.elementFromPoint(mx, my)), 950);
    };

    const loop = () => {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      d.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" data-mode="idle" aria-hidden>
        <span ref={label} />
      </div>
    </>
  );
}
