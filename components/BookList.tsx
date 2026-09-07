"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Book } from "@/contexts/CartContext";
import { BookCard } from "./BookCard";
import { BookGridSkeleton } from "./BookGridSkeleton";
import { BookModal } from "./BookModal";

type Props = {
  initialBooks: Book[];
  query: string;
};

export function BookList({ initialBooks, query }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Book | null>(null);
  const debouncedQuery = useDebounce(query, 1000);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/books?q=${encodeURIComponent(debouncedQuery)}`,
      );
      const data = await res.json();
      setBooks(data);
      setLoading(false);
    };

    fetchBooks();
  }, [debouncedQuery]);

  const isSearching = debouncedQuery.trim() !== "";

  return (
    <section className="mt-6">
      {!isSearching && (
        <h2 className="px-4 font-display text-xl font-bold sm:px-8">
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
