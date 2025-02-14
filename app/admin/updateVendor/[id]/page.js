'use client'

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Define your color palette
const colors = {
    primary: "#3B82F6", // A shade of blue
    rustOrange: "#FF7F50", // Rust orange
};

export default function UpdateVendor({ params }) {
    const id = React.use(params).id;
    const router = useRouter();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMenuItems = async () => {
            try {
                const menuItemsFromLocalStorage = localStorage.getItem('menuItems');
                const readableMenuItems = JSON.parse(menuItemsFromLocalStorage);
                const selectedVendor = readableMenuItems.find(vendor => vendor._id == id);
                if (!selectedVendor) {
                    alert("Vendor not found!")
                    return;
                }

                setVendor(selectedVendor);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };
        getMenuItems();
    }, []);

    const handleDeleteItem = (index) => {
        const updatedMenu = vendor.menu.filter((_, i) => i !== index);
        setVendor({ ...vendor, menu: updatedMenu });
    };

    const handleAddItem = () => {
        const newItem = {
            name: "",
            price: "",
            image: "",
            description: "",
            tags: [],
        };
        setVendor({ ...vendor, menu: [...vendor.menu, newItem] });
    };

    const handleMenuChange = (index, field, value) => {
        const updatedMenu = vendor.menu.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setVendor({ ...vendor, menu: updatedMenu });
    };

    const handleSaveChanges = () => {
        // Save the updated vendor data back to localStorage
        const menuItemsFromLocalStorage = localStorage.getItem('menuItems');
        const readableMenuItems = JSON.parse(menuItemsFromLocalStorage);
        const updatedMenuItems = readableMenuItems.map(v => (v._id === vendor._id ? vendor : v));
        localStorage.setItem('menuItems', JSON.stringify(updatedMenuItems));
        alert("Changes saved successfully!");
    };

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center h-screen"
            >
                <div className="text-xl text-gray-700">Loading...</div>
            </motion.div>
        );
    }

    if (vendor) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 bg-gray-50 min-h-screen"
        >
            <h1 className="text-center text-3xl font-bold mb-8" style={{ color: colors.primary }}>
                Update {vendor.name}
            </h1>

            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: colors.rustOrange }}>Description</h2>
                    <textarea
                        name="description"
                        placeholder="Item Description"
                        value={vendor.description}
                        onChange={(e) => setVendor({ ...vendor, description: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ focusBorderColor: colors.primary }}
                    />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-2" style={{ color: colors.rustOrange }}>Delivery Time</h2>
                        <input
                            type="text"
                            name="Delivery Time"
                            placeholder="Delivery Time"
                            value={vendor.deliveryTime}
                            onChange={(e) => setVendor({ ...vendor, deliveryTime: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                            style={{ focusBorderColor: colors.primary }}
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2" style={{ color: colors.rustOrange }}>Rating</h2>
                        <input
                            type="number"
                            name="Rating"
                            value={vendor.rating}
                            onChange={(e) => setVendor({ ...vendor, rating: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                            style={{ focusBorderColor: colors.primary }}
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2" style={{ color: colors.rustOrange }}>Average Price</h2>
                        <input
                            type="number"
                            name="Average Price"
                            value={vendor.avgPrice}
                            onChange={(e) => setVendor({ ...vendor, avgPrice: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                            style={{ focusBorderColor: colors.primary }}
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2" style={{ color: colors.rustOrange }}>Is Pure Veg</h2>
                        <input
                            type="checkbox"
                            name="Is Pure Veg"
                            checked={vendor.isPureVeg}
                            onChange={(e) => setVendor({ ...vendor, isPureVeg: e.target.checked })}
                            className="w-5 h-5"
                            style={{ accentColor: colors.primary }}
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2" style={{ color: colors.rustOrange }}>Image URL</h2>
                        <input
                            type="text"
                            name="Image URL"
                            value={vendor.image}
                            onChange={(e) => setVendor({ ...vendor, image: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                            style={{ focusBorderColor: colors.primary }}
                        />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4" style={{ color: colors.rustOrange }}>Menu Items</h2>
                    <div className="space-y-4">
                        {vendor.menu.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="border p-4 rounded-lg"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <input
                                        type="text"
                                        name="Item Name"
                                        value={item.name}
                                        onChange={(e) => handleMenuChange(index, "name", e.target.value)}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{ focusBorderColor: colors.primary }}
                                    />
                                    <input
                                        type="text"
                                        name="Item Price"
                                        value={item.price}
                                        onChange={(e) => handleMenuChange(index, "price", e.target.value)}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{ focusBorderColor: colors.primary }}
                                    />
                                    <input
                                        type="text"
                                        name="Item Image"
                                        value={item.image}
                                        onChange={(e) => handleMenuChange(index, "image", e.target.value)}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{ focusBorderColor: colors.primary }}
                                    />
                                    <textarea
                                        name="description"
                                        placeholder="Item Description"
                                        value={item.description}
                                        onChange={(e) => handleMenuChange(index, "description", e.target.value)}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{ focusBorderColor: colors.primary }}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {item.tags?.map((tag, tagIndex) => (
                                        <input
                                            key={tagIndex}
                                            type="text"
                                            value={tag}
                                            onChange={(e) => {
                                                const updatedTags = [...item.tags];
                                                updatedTags[tagIndex] = e.target.value;
                                                handleMenuChange(index, "tags", updatedTags);
                                            }}
                                            className="p-2 border rounded-lg focus:outline-none focus:ring-2"
                                            style={{ focusBorderColor: colors.primary }}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleDeleteItem(index)}
                                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Delete Item
                                </button>
                            </motion.div>
                        ))}
                        <button
                            onClick={handleAddItem}
                            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Add New Item
                        </button>
                    </div>
                </section>

                <button
                    onClick={handleSaveChanges}
                    className="mt-8 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Save Changes
                </button>
            </div>
        </motion.div>
    );
}