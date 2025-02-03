"use client";

import { useState } from "react";

export default function AddVendorForm() {
    const [vendorData, setVendorData] = useState({
        name: "",
        description: "",
        deliveryTime: "",
        rating: "",
        avgPrice: "",
        isPureVeg: false,
        menu: [],
        image: "",
    });

    const [menuItem, setMenuItem] = useState({
        name: "",
        price: "",
        tags: "",
        image: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVendorData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleMenuChange = (e) => {
        const { name, value } = e.target;
        setMenuItem((prev) => ({ ...prev, [name]: value }));
    };

    const addMenuItem = () => {
        setVendorData((prev) => ({
            ...prev,
            menu: [...prev.menu, { ...menuItem, tags: menuItem.tags.split(",") }],
        }));
        setMenuItem({ name: "", price: "", tags: "", image: "", description: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/tiffin/updateVendor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vendorData),
        });

        if (response.ok) {
            alert("Vendor added successfully!");
            setVendorData({
                name: "",
                description: "",
                deliveryTime: "",
                rating: "",
                avgPrice: "",
                isPureVeg: false,
                menu: [],
                image: "",
            });
        } else {
            alert("Error adding vendor.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                name="name"
                placeholder="Vendor Name"
                value={vendorData.name}
                onChange={handleChange}
                required
                className="border p-2"
            />
            <textarea
                name="description"
                placeholder="Description"
                value={vendorData.description}
                onChange={handleChange}
                required
                className="border p-2"
            />
            <input
                type="text"
                name="deliveryTime"
                placeholder="Delivery Time"
                value={vendorData.deliveryTime}
                onChange={handleChange}
                required
                className="border p-2"
            />
            <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={vendorData.rating}
                onChange={handleChange}
                step="0.1"
                required
                className="border p-2"
            />
            <input
                type="number"
                name="avgPrice"
                placeholder="Average Price"
                value={vendorData.avgPrice}
                onChange={handleChange}
                required
                className="border p-2"
            />
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="isPureVeg"
                    checked={vendorData.isPureVeg}
                    onChange={handleChange}
                />
                Is Pure Veg?
            </label>
            <input
                type="string"
                name="image"
                placeholder="Image URL"
                value={vendorData.image}
                onChange={handleChange}
                required
                className="border p-2"
            />

            <div className="border p-4">
                <h3>Add Menu Items</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    value={menuItem.name}
                    onChange={handleMenuChange}
                    required
                    className="border p-2"
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Item Price"
                    value={menuItem.price}
                    onChange={handleMenuChange}
                    required
                    className="border p-2"
                />
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma-separated)"
                    value={menuItem.tags}
                    onChange={handleMenuChange}
                    className="border p-2"
                />
                <input
                    type=""
                    name="image"
                    placeholder="Item Image URL"
                    value={menuItem.image}
                    onChange={handleMenuChange}
                    className="border p-2"
                />
                <textarea
                    name="description"
                    placeholder="Item Description"
                    value={menuItem.description}
                    onChange={handleMenuChange}
                    className="border p-2"
                />
                <button type="button" onClick={addMenuItem} className="bg-blue-500 text-white p-2">
                    Add Menu Item
                </button>
            </div>

            <button type="submit" className="bg-green-500 text-white p-2">
                Submit Vendor
            </button>
        </form>
    );
}