"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Colonne de la grille : défile à une vitesse légèrement différente des autres
   et révèle ses vignettes quand elles entrent dans l'écran. */
export function ParallaxColumn({
  speed,
  children,
  className = "",
}: {
  speed: number;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>(".masonry-item"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((i) => io.observe(i));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 900px)").matches;
    if (reduce || !desktop || speed === 0) return () => io.disconnect();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      el.style.transform = "";
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
