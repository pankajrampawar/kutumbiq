'use client'

import TiffinCard from "@/app/ui/components/tiffin/tiffinCard";
import React, { useEffect, useState } from "react";

export default function MenuPage({ params }) {
    const id = React.use(params).id; // Extract restaurant name from params

    const [menuItems, setMenuItems] = useState([]);
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        const storedMenu = localStorage.getItem('menuItems')
        if (storedMenu) {
            setMenuItems(JSON.parse(storedMenu))
        }

        if (id === "mauli") {
            setFilter("Mauli Hotel");
        } else {
            setFilter("Nalli's Kitchen");
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Top Image Section */}
            <div className="relative h-64 w-full bg-gray-300">
                <img
                    src={`/${id}.png`}
                    alt={`${id} Restaurant`}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                    <h1 className="text-3xl font-bold">{filter}</h1>
                </div>
            </div>

            {/* Placeholder for Future Component */}
            <section className="px-4 py-6">
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Additional features.</h2>
                    <p className="text-sm text-gray-600">Coming Soon</p>
                    <p className="text-sm">Working to give you a better experiance 😊</p>
                </div>
            </section>

            {/* Menu Items Section */}
            <section className="px-4 py-6 pb-40">
                <h2 className="text-2xl font-bold mb-4">Menu</h2>
                <div className="grid grid-cols-1 gap-4">
                    {console.log(filter)}
                    {console.log(menuItems)}
                    {menuItems.filter(item => item.serviceProvider === filter).map((item) => {
                        return (
                            <div key={item._id}>
                                <TiffinCard
                                    id={item._id}
                                    title={item.title}
                                    price={item.price}
                                    description={item.description}
                                    src={item.src}
                                    alt={item.alt}
                                    serviceProvider={item.serviceProvider}
                                    deliveryBy={item.deliveryBy}
                                    active={true}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}