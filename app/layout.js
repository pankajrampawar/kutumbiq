import "./globals.css";
import { LocationProvider } from "./context/locationContext";
import { CartProvider } from "./context/cartContext";

export const metadata = {
  title: "Kutumbiq",
  description: "Kutumbiq solves daily problems of the common men",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
        <LocationProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
