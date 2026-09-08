"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { BookForm } from "../../BookForm";
type BookFormData = {
  title: string;
  author: string;
  genre: string;
  price: string;
  coverUrl: string;
  description: string;
};

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [initialData, setInitialData] = useState<BookFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/books/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const book = await res.json();
        setInitialData({
          title: book.title,
          author: book.author,
          genre: book.genre,
          price: String(book.price),
          coverUrl: book.coverUrl || "",
          description: book.description || "",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (form: BookFormData) => {
    const res = await fetch(`/api/admin/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Error al guardar");
    }

    router.push("/admin/books");
  };

  if (loading) {
    return <p className="p-8 text-plum/60">Cargando...</p>;
  }

  if (notFound || !initialData) {
    return <p className="p-8 text-plum/60">Libro no encontrado.</p>;
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="font-display text-2xl font-bold text-plum mb-6">
          Editar libro
        </h1>
        <BookForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitLabel="Guardar cambios"
        />
      </div>
    </main>
  );
}
