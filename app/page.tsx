"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { BookList } from "@/components/BookList";
import { Book } from "@/contexts/CartContext";

export const dynamic = "force-dynamic";

export default function Home({ initialBooks }: { initialBooks: Book[] }) {
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen pb-10">
      <Header />
      <div className="mt-2">
        <SearchBar value={query} onChange={setQuery} />
      </div>
      <BookList initialBooks={initialBooks} query={query} />
    </main>
  );
}
