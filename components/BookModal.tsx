"use client";

import Image from "next/image";
import { Book, useCart } from "@/contexts/CartContext";

type Props = {
  book: Book;
  onClose: () => void;
};

export function BookModal({ book, onClose }: Props) {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const alreadyInCart = isInCart(book.id);

  const handleClick = () => {
    if (alreadyInCart) {
      removeFromCart(book.id);
    } else {
      addToCart(book);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-plum/40 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-cream p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mx-auto aspect-[2/3] w-40 overflow-hidden rounded-xl bg-white shadow-sm">
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-plum/30 text-sm">
              Sin portada
            </div>
          )}
        </div>

        <h3 className="mt-4 text-center font-display text-xl font-bold">
          {book.title}
        </h3>
        <p className="text-center text-plum/60">{book.author}</p>

        {book.description && (
          <p className="mt-3 text-sm text-plum/80">{book.description}</p>
        )}

        <p className="mt-4 text-center font-display text-2xl font-extrabold text-lilac">
          ${book.price}
        </p>

        <button
          onClick={handleClick}
          className={`mt-4 w-full rounded-full py-3 font-display font-bold transition-colors ${
            alreadyInCart
              ? "bg-pink/30 text-plum hover:bg-pink/50"
              : "bg-lilac text-white"
          }`}
        >
          {alreadyInCart ? "Sacar del carrito" : "Agregar al carrito"}
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full py-2 text-sm text-plum/60"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
