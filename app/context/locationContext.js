'use client'

import { createContext, useContext, useState, useEffect } from "react"

// create context
const LocationContext = createContext();

// Provider Component
const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)


    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        const handleSuccess = (position) => {
            setLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });
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
    )
}

export const useLocationContext = () => useContext(LocationContext);