'use client'

import { createContext, useContext, useState, useEffect } from "react"
import { fetchReadableLocation } from "../lib/readableLocation";

// create context
const LocationContext = createContext();

// Provider Component
export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null); // Stores user's location
    const [error, setError] = useState(null);       // Stores error message
    const [loading, setLoading] = useState(true);   // Indicates loading state

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        const handleSuccess = async (position) => {
            const { latitude, longitude } = position.coords;

            const readableLocation = await fetchReadableLocation(latitude, longitude)
            setLocation(readableLocation);
            setLoading(false);
        };

        const handleError = (error) => {
            setError(error.message);
            setLoading(false);
        };

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }, []);

    return (
        <LocationContext.Provider value={{ location, error, loading }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => useContext(LocationContext);