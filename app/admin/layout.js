'use client';

import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import BackButton from "../ui/backButton";

// Helper function to check if the email is authorized
const isAuthorized = (email) =>
    [
        "rohangotnochil@gmail.com",
        "sujalpakhale1@gmail.com",
        "2022.pankaj.pawar@ves.ac.in",
        "pankajpawars123@gmail.com"
    ].includes(email);

// Loading state component
const LoadingComponent = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-600">Checking credentials...</p>
        </div>
    </div>
);

// Unauthorized state component with animation
const UnauthorizedComponent = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gray-50"
    >
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
            <p className="text-gray-700 mb-6">
                You do not have permission to access this page. Please log in with an admin account.
            </p>
            <button
                onClick={() => signIn("google")}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
                Log in with Google
            </button>
        </div>
    </motion.div>
);

// Main AdminLayout component
export default function AdminLayout({ children }) {
    const { data: session, status } = useSession();

    // Loading state
    if (status === "loading") {
        return <LoadingComponent />;
    }

    // Unauthorized state (either not signed in or not an admin)
    if (
        status === "unauthenticated" ||
        (status === "authenticated" && !isAuthorized(session.user.email))
    ) {
        return <UnauthorizedComponent />;
    }

    // Authorized state
    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <div className="mb-4">
                <BackButton className="text-blue-600 hover:text-blue-800" />
            </div>
            {children}
        </div>
    );
}