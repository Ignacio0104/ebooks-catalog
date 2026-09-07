import { CartIcon } from "./CartIcon";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-4 sm:px-8">
      <div className="w-11" />
      <h1 className="font-display text-2xl font-extrabold text-lilac sm:text-3xl">
        bookxs<span className="text-pink">1000</span>
      </h1>
      <CartIcon />
    </header>
  );
}
