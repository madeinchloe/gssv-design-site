"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/projects";

/* Vignette de la grille : les photos du projet défilent toutes seules en fondu,
   chacune avec son propre rythme, seulement quand la vignette est à l'écran. */
export function TileSlideshow({
  photos,
  alt,
  priority = false,
  seed = 0,
}: {
  photos: Photo[];
  alt: string;
  priority?: boolean;
  seed?: number;
}) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef<Set<number>>(new Set());
  const first = photos[0];

  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let timer = 0;
    const period = 3200 + (seed % 5) * 450;
    const start = () => {
      stop();
      timer = window.setInterval(() => {
        /* On n'avance que si la photo suivante est déjà chargée : jamais de cadre vide. */
        setIndex((i) => {
          const next = (i + 1) % photos.length;
          return loaded.current.has(next) ? next : i;
        });
      }, period);
    };
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = 0;
    };
    const io = new IntersectionObserver(
      ([en]) => (en.isIntersecting ? start() : stop()),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      stop();
      io.disconnect();
    };
  }, [photos.length, seed]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden bg-neutral-100"
      style={{ aspectRatio: `${first.w} / ${first.h}` }}
    >
      {photos.map((ph, i) => (
        <Image
          key={ph.src}
          src={ph.src}
          alt={i === 0 ? alt : `${alt}, vue ${i + 1}`}
          fill
          sizes="(max-width: 900px) 100vw, 30vw"
          priority={priority && i === 0}
          loading={i <= index + 1 ? "eager" : "lazy"}
          onLoad={() => loaded.current.add(i)}
          className="object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
