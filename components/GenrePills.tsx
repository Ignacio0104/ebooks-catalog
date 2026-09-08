import { useEffect, useRef, useState } from "react";

type Props = {
  genres: string[];
  selected: string | null;
  onSelect: (genre: string | null) => void;
};

export function GenrePills({ genres, selected, onSelect }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [genres]);

  const scrollBy = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative px-4 sm:px-8">
      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-2 overflow-x-auto py-3"
      >
        <button
          onClick={() => onSelect(null)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
            selected === null ? "bg-lilac text-white" : "bg-white text-plum/70"
          }`}
        >
          Todos
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelect(genre)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
              selected === genre
                ? "bg-lilac text-white"
                : "bg-white text-plum/70"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {canScrollLeft && (
        <>
          <div className="pointer-events-none absolute left-4 top-0 h-full w-8 bg-gradient-to-r from-cream to-transparent sm:left-8" />
          <button
            onClick={() => scrollBy(-120)}
            aria-label="Ver filtros anteriores"
            className="absolute left-1 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm sm:left-5"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A3868"
              strokeWidth="2.5"
            >
              <path
                d="M15 18l-6-6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {canScrollRight && (
        <>
          <div className="pointer-events-none absolute right-4 top-0 h-full w-8 bg-gradient-to-l from-cream to-transparent sm:right-8" />
          <button
            onClick={() => scrollBy(120)}
            aria-label="Ver más filtros"
            className="absolute right-1 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm sm:right-5"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A3868"
              strokeWidth="2.5"
            >
              <path
                d="M9 18l6-6-6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
