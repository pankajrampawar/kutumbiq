'use client'

import { createContext, useContext, useState, useEffect } from "react";
import { fetchReadableLocation } from "../lib/readableLocation";

// Create context
const LocationContext = createContext();

// Provider Component
export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null); // Stores user's location
    const [error, setError] = useState(null);       // Stores error message
    const [completeAddress, setCompleteAddress] = useState(null); // Stores complete address
    const [loading, setLoading] = useState(true);   // Indicates loading state
    const [retryPrompt, setRetryPrompt] = useState(false); // Tracks retry requests

    const requestLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        setLoading(true);

        const handleSuccess = async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const readableLocation = await fetchReadableLocation(latitude, longitude);
                setCompleteAddress(readableLocation);
                const currentLocation = readableLocation.neighbourhood || readableLocation.street || readableLocation.city || readableLocation.postalCode || readableLocation.state || readableLocation.country;
                setLocation(currentLocation);
            } catch (err) {
                setError("Failed to fetch readable location.");
            } finally {
                setLoading(false);
            }
        };

        const handleError = (error) => {
            if (error.code === error.PERMISSION_DENIED) {
                setError("Location access denied. We need your location to check for delivery availability.");
                setRetryPrompt(true); // Show retry prompt
            } else {
                setError("An error occurred while fetching your location. Please try again.");
            }
            setLoading(false);
        };

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    };

    useEffect(() => {
        requestLocation();
    }, []);

    const retryLocationAccess = () => {
        setRetryPrompt(false); // Hide retry prompt
        requestLocation(); // Retry location access
    };

    return (
        <LocationContext.Provider value={{ location, error, loading, completeAddress, retryPrompt, retryLocationAccess }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => useContext(LocationContext);