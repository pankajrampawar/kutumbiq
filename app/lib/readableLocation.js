// lib/location.js

export const fetchReadableLocation = async (lat, lon) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
        );
        const data = await response.json();

        if (data && data.address) {
            console.log(data)
            return {
                neighbourhood: data.address?.neighbourhood || "",
                street: data.address?.road || "",
                suburb: data.address?.suburb || "",
                city: data.address?.city || "",
                state: data.address?.state || "",
                postalCode: data.address?.postcode || "",
                country: data.address?.country || "",
            };
        }

        return {
            street: "",
            suburb: "",
            city: "",
            state: "",
            postalCode: "Unknown ",
            country: "",
        };
    } catch (error) {
        console.error("Error fetching readable location.", error);
        return {
            street: "",
            suburb: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
        };
    }
};