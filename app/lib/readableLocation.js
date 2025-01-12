// lib/location.js

export const fetchReadableLocation = async (lat, lon) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();

        // Return the most readable location or fallback
        return (
            data.address?.neighbourhood ||
            data.address?.suburb ||
            data.address?.city ||
            data.address?.state ||
            "Unknown Location"
        );
    } catch (error) {
        console.error("Error fetching readable location:", error);
        return "Unknown Location";
    }
};
