'use client'
import { useEffect, useState } from "react";
import { useLocationContext } from "@/app/context/locationContext";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useCustomUser } from '@/app/context/customUserContext'

const convertAddressToString = (formData) => {
    // Destructure the address fields from the formData
    const { addressLine1, addressLine2, city, country, postalCode } = formData;

    // Create an array to hold non-empty address components
    const addressParts = [];

    // Add fields to the array only if they are truthy (not empty, null, or undefined)
    if (addressLine1) addressParts.push(addressLine1);
    if (addressLine2) addressParts.push(addressLine2);
    if (city) addressParts.push(city);
    if (country) addressParts.push(country);
    if (postalCode) addressParts.push(postalCode);

    // If there are no address parts, return a default message or empty string
    if (addressParts.length === 0) {
        return "Address not provided"; // Or return an empty string if desired
    }

    // Join the address parts with commas and ensure proper spacing
    return addressParts.join(", ").trim();
};

function AddressForm() {
    const router = useRouter();
    const { data: session, status } = useSession()
    const { userData, fetchUserData } = useCustomUser();
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        country: "",
        postalCode: "",
    });
    const { location, error, loading, completeAddress } = useLocationContext();

    // Adds the location using location context
    useEffect(() => {
        if (location) {
            console.log("Location Data:", completeAddress);
            setFormData({
                addressLine1: "", // You may want to leave addressLine1 empty or set it to location data if available
                addressLine2: completeAddress.neighbourhood || "",
                city: completeAddress.city || "",
                country: completeAddress.country || "",
                postalCode: completeAddress.postalCode || "",
            });
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            // Make sure to set loading state before starting the request
            setIsLoading(true);
            let userId;
            if (session?.user?._id) {
                userId = session.user._id
            } else if (userData?._id) {
                userId = userData._id;
            } else if (session?.user?.email) {
                const fetchedUser = fetchUserData(session.user.email);
                if (fetchedUser?._id) {
                    userId = fetchUserData._id
                }
            } else {
                signIn("google")
            }

            const address = convertAddressToString(formData)
            const response = await fetch('/api/user/addUserAddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: address,
                    _id: userId
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update your address");
            }

            setIsLoading(false);
            router.push('/services/tiffin/confirmOrder')
        } catch (error) {
            console.error("Error:", error.message); // Log only the error message for clarity
        } finally {
            setIsLoading(false);
            router.push('/services/tiffin/confirmOrder')
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Enter Your Address</h2>

                <form onSubmit={handleSubmit}>
                    {/* Address Line 1 */}
                    <div className="mb-4">
                        <label
                            htmlFor="addressLine1"
                            className="block text-gray-700 text-sm font-medium mb-2"
                        >
                            Address Line 1
                        </label>
                        <input
                            type="text"
                            id="addressLine1"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleChange}
                            placeholder="flat Number, apartment / society name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Address Line 2 */}
                    <div className="mb-4">
                        <label
                            htmlFor="addressLine2"
                            className="block text-gray-700 text-sm font-medium mb-2"
                        >
                            Address Line 2 (Optional)
                        </label>
                        <input
                            type="text"
                            id="addressLine2"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleChange}
                            placeholder="Apt, Suite, etc."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* City */}
                    <div className="mb-4">
                        <label
                            htmlFor="city"
                            className="block text-gray-700 text-sm font-medium mb-2"
                        >
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    {/* Country */}
                    <div className="mb-4">
                        <label
                            htmlFor="country"
                            className="block text-gray-700 text-sm font-medium mb-2"
                        >
                            Country
                        </label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Postal Code */}
                    <div className="mb-6">
                        <label
                            htmlFor="postalCode"
                            className="block text-gray-700 text-sm font-medium mb-2"
                        >
                            Postal Code
                        </label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="12345"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
                        >
                            Submit Address
                        </button>
                    </div>
                </form>
            </div>

            {
                isLoading &&
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                    <div className="text-white text-lg">Loading...</div>
                </div>
            }

        </div>
    );
}

export default AddressForm;