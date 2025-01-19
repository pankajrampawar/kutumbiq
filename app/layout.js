import "./globals.css";
import { LocationProvider } from "./context/locationContext";
import { CartProvider } from "./context/cartContext";
import UserProvider from "./context/userContext";
import User from "@/models/User";
import { CustomCartProvider, CustomUserProvider } from "./context/customUserContext";

export const metadata = {
  title: "Kutumbiq",
  description: "Kutumbiq solves daily problems of the common men",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CustomUserProvider>
        <body className={``}>
          <LocationProvider>
            <CartProvider>
              <UserProvider>
                {children}
              </UserProvider>
            </CartProvider>
          </LocationProvider>
        </body>
      </CustomUserProvider>
    </html>
  );
}
