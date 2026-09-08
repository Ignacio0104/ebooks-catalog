"use client";

import { useState } from "react";

type BookFormData = {
  title: string;
  author: string;
  genre: string;
  price: string;
  coverUrl: string;
  description: string;
};

type Props = {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => Promise<void>;
  submitLabel: string;
};

export function BookForm({ initialData, onSubmit, submitLabel }: Props) {
  const [form, setForm] = useState<BookFormData>(
    initialData ?? {
      title: "",
      author: "",
      genre: "",
      price: "",
      coverUrl: "",
      description: "",
    },
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof BookFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-bold text-plum">Título *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
          className="mt-1 w-full rounded-xl border-2 border-lilac/30 bg-white px-4 py-2 outline-none focus:border-lilac"
        />
      </div>

      <div>
        <label className="text-sm font-bold text-plum">Autor *</label>
        <input
          type="text"
          value={form.author}
          onChange={(e) => handleChange("author", e.target.value)}
          required
          className="mt-1 w-full rounded-xl border-2 border-lilac/30 bg-white px-4 py-2 outline-none focus:border-lilac"
        />
      </div>

      <div>
        <label className="text-sm font-bold text-plum">Género *</label>
        <input
          type="text"
          value={form.genre}
          onChange={(e) => handleChange("genre", e.target.value)}
          required
          className="mt-1 w-full rounded-xl border-2 border-lilac/30 bg-white px-4 py-2 outline-none focus:border-lilac"
        />
      </div>

      <div>
        <label className="text-sm font-bold text-plum">Precio *</label>
        <input
          type="number"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
          required
          min="0"
          className="mt-1 w-full rounded-xl border-2 border-lilac/30 bg-white px-4 py-2 outline-none focus:border-lilac"
        />
      </div>

      <div>
        <label className="text-sm font-bold text-plum">
          URL de portada (Cloudinary)
        </label>
        <input
          type="text"
          value={form.coverUrl}
          onChange={(e) => handleChange("coverUrl", e.target.value)}
          placeholder="https://res.cloudinary.com/..."
          className="mt-1 w-full rounded-xl border-2 border-lilac/30 bg-white px-4 py-2 outline-none focus:border-lilac"
        />
      </div>

      <div>
        <label className="text-sm font-bold text-plum">Descripción</label>
        <textarea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-xl border-2 border-lilac/30 bg-white px-4 py-2 outline-none focus:border-lilac"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-full bg-lilac py-3 font-display font-bold text-white disabled:opacity-50"
      >
        {saving ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
