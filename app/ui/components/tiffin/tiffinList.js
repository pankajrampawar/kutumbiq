'use client'
import TiffinCard from "./tiffinCard";
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/cartContext";
import { useAlert } from "@/app/context/alertContext";

export default function TiffinList({ filter }) {
    const [menuItems, setMenuItems] = useState([])
    const { serviceProviderInCart } = useCart();
    const { addAlert } = useAlert();

    useEffect(() => {
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
                addAlert('Online order closes at 7PM', 'warning')
                setLoading(false);
            } catch (error) {
                console.log("Error", error)
            }
        }

        getMenuItems();
    }, [])

    return (
        <div>
            {
                menuItems.map((item) => {
                    if (serviceProviderInCart) {
                        if (filter) {
                            return
                        }
                        return (
                            < TiffinCard key={item._id}
                                id={item._id}
                                tags={item.tags || "veg"}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                serviceProvider={item.serviceProvider}
                                deliveryBy={item.deliveryBy}
                                active={serviceProviderInCart === item.serviceProvider ? true : false}
                            />
                        )
                    } else
                        return (
                            < TiffinCard key={item._id}
                                id={item._id}
                                tags={item.tags || "veg"}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                serviceProvider={item.serviceProvider}
                                deliveryBy={item.deliveryBy}
                                active={true}
                            />
                        )
                })
            }
        </div>
    )
}