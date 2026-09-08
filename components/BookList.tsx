"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Book } from "@/contexts/CartContext";
import { BookCard } from "./BookCard";
import { BookGridSkeleton } from "./BookGridSkeleton";
import { BookModal } from "./BookModal";
import { GenrePills } from "./GenrePills";

type Props = {
  initialBooks: Book[];
  query: string;
};

export function BookList({ initialBooks, query }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Book | null>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 500);
  const isFirstRender = useRef(true);

  useEffect(() => {
    fetch("/api/genres")
      .then((res) => res.json())
      .then(setGenres);
  }, []);

  useEffect(() => {
    if (isFirstRender.current && selectedGenre === null) {
      isFirstRender.current = false;
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (debouncedQuery) params.set("q", debouncedQuery);
      if (selectedGenre) params.set("genre", selectedGenre);

      const res = await fetch(`/api/books?${params.toString()}`);
      const data = await res.json();
      setBooks(data);
      setLoading(false);
    };

    fetchBooks();
  }, [debouncedQuery, selectedGenre]);

  const isFiltering = debouncedQuery.trim() !== "" || selectedGenre !== null;

  return (
    <section className="mt-2">
      <GenrePills
        genres={genres}
        selected={selectedGenre}
        onSelect={setSelectedGenre}
      />

      {!isFiltering && (
        <h2 className="px-4 font-display text-xl font-bold sm:px-8 mt-4">
          Últimos libros
        </h2>
      )}

      <div className="mt-4">
        {loading ? (
          <BookGridSkeleton />
        ) : books.length === 0 ? (
          <p className="px-4 text-plum/60 sm:px-8">
            No encontramos libros con esa búsqueda.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:px-8 lg:grid-cols-4">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => setSelected(book)}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <BookModal book={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
