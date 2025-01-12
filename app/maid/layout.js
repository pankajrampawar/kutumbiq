import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/navbar";

export const metadata = {
    title: "Kutumbiq",
    description: "Kutumbiq solves daily problems of the common men",
};

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body
                className={``}
            >
                {children}
            </body>
        </html>
    );
}
