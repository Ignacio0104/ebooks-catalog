"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  coverUrl: string | null;
  description: string | null;
};

type CartContextType = {
  items: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
};
const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Book[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (book: Book) => {
    setItems((prev) =>
      prev.some((b) => b.id === book.id) ? prev : [...prev, book],
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((b) => b.id !== id));
  };

  const isInCart = (id: string) => items.some((b) => b.id === id);

  return (
    <CartContext.Provider
      value={{ items, addToCart, isInCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
