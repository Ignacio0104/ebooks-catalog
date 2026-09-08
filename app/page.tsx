"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { BookList } from "@/components/BookList";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen pb-10">
      <Header />
      <div className="mt-2">
        <SearchBar value={query} onChange={setQuery} />
      </div>
      <BookList query={query} />
    </main>
  );
}
