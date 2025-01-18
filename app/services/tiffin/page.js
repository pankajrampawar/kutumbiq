'use client'
import TiffinCard from "@/app/ui/components/tiffin/tiffinCard";
import { comfortaa } from "@/app/ui/fonts";
import { useCart } from "@/app/context/cartContext";
import { useEffect, useState } from "react";

export default function Tiffin() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { serviceProviderInCart } = useCart();

    const getMenuItems = async () => {
        try {
            const response = await fetch("/api/tiffin/getMenu", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!response) {
                const errorData = await response.json();
                throw new Error(errorData || "unable to Fetch the menuItems")
            }

            const data = await response.json();
            console.log(data);
            setMenuItems(data)
            setLoading(false);
        } catch (error) {
            console.log("Error", error)
        }
    }

    useEffect(() => {
        getMenuItems();
    }, [])

    return (
        <div>
            {/* hero section */}
            <section className="flex flex-col items-center gap-6">
                <div className="flex justify-center items-center text-center">
                    <h1 className={`text-2xl font-bold ${comfortaa.className}`}>Budget Friendly And Truly Good Meal.</h1>
                </div>

                <div>
                    Location
                </div>
            </section>

            {/* items section */}
            <section>
                {/* section for filters */}
                <section className="flex gap-4">
                    <div>
                        Veg
                    </div>
                    <div>
                        Non Veg
                    </div>
                    <div>
                        Filter
                    </div>
                </section>

                <section>
                    {
                        menuItems.map((item) => {
                            if (serviceProviderInCart) {
                                if (serviceProviderInCart === item.serviceProvider) {
                                    return (
                                        < TiffinCard key={item._id}
                                            id={item._id}
                                            title={item.title}
                                            price={item.price}
                                            description={item.description}
                                            serviceProvider={item.serviceProvider}
                                            deliveryBy={item.deliveryBy}
                                        />
                                    )
                                }
                            } else
                                return (
                                    < TiffinCard key={item._id}
                                        id={item._id}
                                        title={item.title}
                                        price={item.price}
                                        description={item.description}
                                        serviceProvider={item.serviceProvider}
                                        deliveryBy={item.deliveryBy}
                                    />
                                )
                        })
                    }
                </section>
            </section>
        </div >
    )
}   