'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for managing the user data
const CustomUserContext = createContext();

// Custom provider component
export const CustomUserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    // Function to fetch user data from the backend
    const fetchUserData = async (email) => {
        try {
            const response = await fetch(`/api/user/getUserInfo?email=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error("Failed to fetch user data");
            const data = await response.json()
            setUserData(data)
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // You can use this function to get user ID or address from the userData
    const getUserId = () => userData?.userId || null;
    const getUserAddress = () => userData?.userAddress || null;

    // Optional: Automatically fetch user data if an email exists (based on your app's logic)
    useEffect(() => {
        // Simulate fetching email from session or cookies
        const email = localStorage.getItem('userEmail'); // Example: get email from local storage
        if (email) {
            fetchUserData(email); // Fetch user data if the email is present
        }
    }, []);

    return (
        <CustomUserContext.Provider value={{ userData, fetchUserData, getUserId, getUserAddress }}>
            {children}
        </CustomUserContext.Provider>
    );
};

// Custom hook to use the CustomUserContext
export const useCustomUser = () => {
    return useContext(CustomUserContext);
};