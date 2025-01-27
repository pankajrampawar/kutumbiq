'use client'

import TiffinCard from "@/app/ui/components/tiffin/tiffinCard";
import React, { useEffect, useState } from "react";

export default function MenuPage({ params }) {
    const id = React.use(params).id; // Extract restaurant name from params

    const [vendor, setVendor] = useState(null);

    useEffect(() => {
        const vendorListFromLS = localStorage.getItem('menuItems')
        if (vendorListFromLS) {
            const vendorList = JSON.parse(vendorListFromLS);
            const selectedVendor = vendorList.find(vendor => vendor._id == id);
            setVendor(selectedVendor);
        } else {
            console.log("nothing found")
        }

    }, [])

    if (!vendor) {
        return <div>Loading</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Top Image Section */}
            <div className="relative h-64 w-full bg-gray-300">
                <img
                    src={vendor.image}
                    alt={`${id} Restaurant`}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                    <h1 className="text-3xl font-bold">{vendor.name}</h1>
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
                <div className="flex flex-col gap-1">
                    {vendor.menu.length > 0 && vendor.menu.map((item) => {
                        return (
                            <div key={item.name}>
                                <TiffinCard
                                    id={item.name}
                                    title={item.name}
                                    price={item.price}
                                    description={item.description}
                                    src={item.image}
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