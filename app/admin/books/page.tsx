"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Book } from "@/contexts/CartContext";

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-cream px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-plum">Libros</h1>
          <Link
            href="/admin/books/new"
            className="rounded-full bg-lilac px-4 py-2 font-display text-sm font-bold text-white"
          >
            + Nuevo libro
          </Link>
        </div>

        {loading ? (
          <p className="text-plum/60">Cargando...</p>
        ) : (
          <div className="space-y-2">
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/admin/books/${book.id}`}
                className="flex items-center justify-between rounded-xl bg-white px-4 py-3 hover:shadow-sm transition-shadow"
              >
                <div>
                  <p className="font-display font-bold text-sm">{book.title}</p>
                  <p className="text-xs text-plum/60">{book.author}</p>
                </div>
                <span className="text-sm font-bold text-lilac">
                  ${book.price}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
