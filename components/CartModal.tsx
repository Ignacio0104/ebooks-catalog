"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

type Step = "cart" | "form" | "success";

export function CartModal() {
  const { items, removeFromCart, clearCart, isCartOpen, closeCart } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isCartOpen) return;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const total = items.reduce((sum, book) => sum + book.price, 0);

  const handleClose = () => {
    setStep("cart");
    setEmail("");
    setInstagram("");
    setError("");
    closeCart();
  };

  const handleSendOrder = async () => {
    if (!email.trim()) {
      setError("Ingresá tu email para poder contactarte.");
      return;
    }

    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          instagram,
          books: items.map((b) => ({
            title: b.title,
            author: b.author,
            price: b.price,
          })),
          total,
        }),
      });

      if (!res.ok) throw new Error("Error en el envío");

      clearCart();
      setStep("success");
    } catch (err) {
      console.error(err);
      setError("Hubo un problema al enviar el pedido. Probá de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed h-screen inset-0 z-50 flex items-end sm:items-center justify-center bg-plum/40 p-0 sm:p-4"
      onClick={handleClose}
    >
      <div
        className="flex w-full sm:max-w-md flex-col rounded-t-3xl sm:rounded-3xl bg-cream max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <h3 className="font-display text-xl font-bold">
            {step === "cart" && "Tu carrito"}
            {step === "form" && "Tus datos"}
            {step === "success" && "¡Listo!"}
          </h3>
          <button onClick={handleClose} className="text-plum/60 text-sm">
            Cerrar
          </button>
        </div>

        {step === "cart" && (
          <>
            {items.length === 0 ? (
              <p className="px-6 py-10 text-center text-plum/60">
                Todavía no agregaste libros.
              </p>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {items.map((book) => (
                  <div
                    key={book.id}
                    className="flex items-center gap-3 rounded-2xl bg-white p-2"
                  >
                    <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-lg bg-cream">
                      {book.coverUrl ? (
                        <Image
                          src={book.coverUrl}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm font-bold leading-tight line-clamp-1">
                        {book.title}
                      </p>
                      <p className="text-xs text-plum/60 line-clamp-1">
                        {book.author}
                      </p>
                      <p className="text-sm font-bold text-lilac">
                        ${book.price}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(book.id)}
                      aria-label="Quitar del carrito"
                      className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-pink/20 text-plum"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="border-t border-plum/10 px-6 py-4">
                <div className="flex justify-between mb-4">
                  <span className="font-body text-plum/70">Total</span>
                  <span className="font-display font-extrabold text-lilac text-lg">
                    ${total}
                  </span>
                </div>
                <button
                  onClick={() => setStep("form")}
                  className="w-full rounded-full bg-lilac py-3 font-display font-bold text-white"
                >
                  Confirmar pedido
                </button>
              </div>
            )}
          </>
        )}

        {step === "form" && (
          <div className="px-6 py-4 space-y-3">
            <p className="text-sm text-plum/70">
              Dejanos tus datos para coordinar el pago y la entrega.
            </p>

            <div>
              <label className="text-sm font-bold text-plum">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="mt-1 w-full rounded-xl border-2 border-lilac/30 bg-white px-4 py-2 outline-none focus:border-lilac"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-plum">
                Instagram (opcional)
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@tu_usuario"
                className="mt-1 w-full rounded-xl border-2 border-lilac/30 bg-white px-4 py-2 outline-none focus:border-lilac"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              onClick={handleSendOrder}
              disabled={sending}
              className="w-full rounded-full bg-lilac py-3 font-display font-bold text-white disabled:opacity-50"
            >
              {sending ? "Enviando..." : "Enviar pedido"}
            </button>

            <button
              onClick={() => setStep("cart")}
              className="w-full py-2 text-sm text-plum/60"
            >
              Volver
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="px-6 py-10 text-center">
            <p className="text-lg font-display font-bold text-lilac mb-2">
              ¡Pedido enviado!
            </p>
            <p className="text-plum/70 text-sm mb-6">
              Te vamos a contactar pronto para coordinar el pago y la entrega.
            </p>
            <button
              onClick={handleClose}
              className="w-full rounded-full bg-lilac py-3 font-display font-bold text-white"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
