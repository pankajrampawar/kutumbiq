import "./globals.css";
import { LocationProvider } from "./context/locationContext";
import { CartProvider } from "./context/cartContext";
import UserProvider from "./context/userContext";
import { AlertProvider } from "./context/alertContext";
import { CustomCartProvider, CustomUserProvider } from "./context/customUserContext";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Kutumbiq",
  description: "Kutumbiq solves daily problems of the common men",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
        <CustomUserProvider>
          <AlertProvider>
            <CartProvider>
              <UserProvider>
                {children}
                <Analytics />
              </UserProvider>
            </CartProvider>
          </AlertProvider>
        </CustomUserProvider>
      </body>
    </html>
  );
}
