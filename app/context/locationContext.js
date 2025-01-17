'use client'

import { createContext, useContext, useState, useEffect } from "react"
import { fetchReadableLocation } from "../lib/readableLocation";

// create context
const LocationContext = createContext();

// Provider Component
export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null); // Stores user's location
    const [error, setError] = useState(null);       // Stores error message
    const [completeAddress, setCompleteAddress] = useState(null); // Stores complete address
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
            setCompleteAddress(readableLocation);
            const currentLocation = readableLocation.neighbourhood || readableLocation.street || readableLocation.city || readableLocation.postalCode || readableLocation.state || readableLocation.country;
            setLocation(currentLocation);
            setLoading(false);
        };

        const handleError = (error) => {
            setError(error.message);
            setLoading(false);
        };

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }, []);

    return (
        <LocationContext.Provider value={{ location, error, loading, completeAddress }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => useContext(LocationContext);