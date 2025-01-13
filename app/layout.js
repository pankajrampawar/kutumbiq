import "./globals.css";
import { LocationProvider } from "./context/locationContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./lib/store";


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
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </Provider>
        </LocationProvider>
      </body>
    </html>
  );
}
