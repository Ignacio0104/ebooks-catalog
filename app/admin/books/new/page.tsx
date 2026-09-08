"use client";

import { useRouter } from "next/navigation";
import { BookForm } from "../../BookForm";

export default function NewBookPage() {
  const router = useRouter();

  const handleSubmit = async (form: {
    title: string;
    author: string;
    genre: string;
    price: string;
    coverUrl: string;
    description: string;
  }) => {
    const res = await fetch("/api/admin/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Error al guardar");
    }

    router.push("/admin/books");
  };

  return (
    <main className="min-h-screen bg-cream px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="font-display text-2xl font-bold text-plum mb-6">
          Cargar nuevo libro
        </h1>
        <BookForm onSubmit={handleSubmit} submitLabel="Guardar libro" />
      </div>
    </main>
  );
}
