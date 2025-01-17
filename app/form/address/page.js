'use client'
import { useEffect, useState } from "react";
import { useLocationContext } from "@/app/context/locationContext";
import { useRouter } from "next/navigation";

function AddressForm() {

    const router = useRouter();

    const [formData, setFormData] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        country: "",
        postalCode: "",
    });

    const { location, error, loading, completeAddress } = useLocationContext();

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
    }, [location]); // Add location to the dependency array

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        router.push('/services/tiffin/cart')
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
        </div>
    );
}

export default AddressForm;