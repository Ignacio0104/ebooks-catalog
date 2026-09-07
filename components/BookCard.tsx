import Image from "next/image";
import { Book } from "@/contexts/CartContext";

type Props = {
  book: Book;
  onClick: () => void;
};

export function BookCard({ book, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start text-left rounded-2xl bg-white p-2 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl bg-cream">
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
      <p className="mt-2 font-display text-sm font-bold leading-tight line-clamp-2">
        {book.title}
      </p>
      <p className="text-xs text-plum/60 line-clamp-1">{book.author}</p>
      <p className="mt-1 font-body text-sm font-bold text-lilac">
        ${book.price}
      </p>
    </button>
  );
}
