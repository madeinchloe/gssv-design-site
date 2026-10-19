"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Photo } from "@/lib/projects";

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      width="22"
      height="40"
      viewBox="0 0 22 40"
      fill="none"
      aria-hidden
      className={dir === "prev" ? "" : "rotate-180"}
    >
      <path d="M20 1L2 20l18 19" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ProjectSlider({
  photos,
  title,
}: {
  photos: Photo[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const touchX = useRef<number | null>(null);
  const count = photos.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, count]);

  /* Défilement automatique toutes les 4 s, en pause au survol. Repart de zéro après une action manuelle. */
  useEffect(() => {
    if (count < 2 || paused || reduce) return;
    const t = window.setInterval(() => go(1), 4000);
    return () => window.clearInterval(t);
  }, [count, paused, reduce, go, index]);

  const photo = photos[index];

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="relative h-[58vh] md:h-[72vh] md:mx-14">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={photo.src}
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image
              src={photo.src}
              alt={`${title}, vue ${index + 1}`}
              fill
              sizes="(max-width: 900px) 100vw, 70vw"
              className="object-contain object-top md:object-center"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Image précédente"
            className="absolute left-0 top-[42%] -translate-y-1/2 p-3 text-[color:var(--color-ink)] hover:opacity-50 transition-opacity"
          >
            <Chevron dir="prev" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Image suivante"
            className="absolute right-0 top-[42%] -translate-y-1/2 p-3 text-[color:var(--color-ink)] hover:opacity-50 transition-opacity"
          >
            <Chevron dir="next" />
          </button>
          <p className="mt-4 text-center md:text-left md:ml-14 text-[12px] uppercase text-[color:var(--color-mute)]">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </>
      )}
    </div>
  );
}
