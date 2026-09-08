import { Baloo_2, Nunito } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
import { CartModal } from "@/components/CartModal";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "bookxs1000",
  description: "Catálogo de ebooks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${baloo.variable} ${nunito.variable} font-body bg-cream text-plum`}
      >
        <CartProvider>
          {children}
          <CartModal />
        </CartProvider>
      </body>
    </html>
  );
}
