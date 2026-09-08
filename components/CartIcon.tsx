"use client";

import { useCart } from "@/contexts/CartContext";

export function CartIcon() {
  const { items, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      aria-label="Ver carrito"
      className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4A3868"
        strokeWidth="2"
      >
        <path
          d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-1.5 6h11.5M9 21a1 1 0 100-2 1 1 0 000 2zM18 21a1 1 0 100-2 1 1 0 000 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {items.length > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-sunny text-xs font-bold text-plum">
          {items.length}
        </span>
      )}
    </button>
  );
}
