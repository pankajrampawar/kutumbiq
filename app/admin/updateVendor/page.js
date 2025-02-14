"use client";

import { useState, useEffect } from "react";
import { getMenuItemsFromServer } from "@/app/actions/tiffinActions";
import { useRouter } from "next/navigation";

export default function updateVendors() {

    const router = useRouter();

    const [loadingMenuItems, setLoadingMenuItems] = useState(true)
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const getMenuItems = async () => {
            try {
                const timestampFromLocalStorage = localStorage.getItem('menuItemsTimestamp');
                if (!timestampFromLocalStorage) {
                    localStorage.removeItem('menuItems')
                }
                const menuItemsFromLocalStorage = localStorage.getItem('menuItems');

                // Check if the data exists and if it is older than 45 minutes (2700000ms)
                const isDataExpired = timestampFromLocalStorage && (Date.now() - timestampFromLocalStorage > 250000);

                // If no menu items or data is expired, fetch from the server
                if (!menuItemsFromLocalStorage || isDataExpired) {
                    const menuItemsFromServer = await getMenuItemsFromServer();

                    if (!menuItemsFromServer) {
                        console.error("Some error occurred while fetching menu items.");
                    } else {
                        // Save the menu items and current timestamp to localStorage
                        localStorage.setItem('menuItems', JSON.stringify(menuItemsFromServer));
                        localStorage.setItem('menuItemsTimestamp', Date.now().toString());
                        setMenuItems(menuItemsFromServer);
                    }
                } else {
                    const readableMenuItems = JSON.parse(menuItemsFromLocalStorage);
                    setMenuItems(readableMenuItems);
                }

                setLoadingMenuItems(false);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };
        getMenuItems();
    }, []);

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
        <div className="w-full">
            <h1 className="text-3xl text-center p-4 tracking-wide">Choose the vendor to update</h1>
            <div>
                {menuItems.map((vendor) => (
                    <div key={vendor._id} className="flex justify-center items-center">
                        <button className="bg-blue-500 text-white p-2 m-2" onClick={() => router.push(`/admin/updateVendor/${vendor._id}`)}>{vendor.name}</button>
                    </div>
                ))}
            </div>
        </div>
    );
}