import "./globals.css";
import { LocationProvider } from "./context/locationContext";

export const metadata = {
  title: "Kutumbiq",
  description: "Kutumbiq solves daily problems of the common men",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <LocationProvider>
          {children}
        </LocationProvider>
      </body>
    </html>
  );
}