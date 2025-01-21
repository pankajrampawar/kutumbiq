'use client';

import TiffinCard from "./tiffinCard";
import { useCart } from "@/app/context/cartContext";

export default function TiffinList({ menuItems, filter }) {
    const { serviceProviderInCart } = useCart();

    return (
        <div>
            {menuItems.map((item) => {
                // Apply filter if specified
                console.log(filter)
                console.log(item.tag)
                if (filter) {
                    if (item.tag === filter) return (
                        <TiffinCard
                            key={item._id}
                            id={item._id}
                            tags={item.tags || "veg"}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            serviceProvider={item.serviceProvider}
                            deliveryBy={item.deliveryBy}
                            active={!serviceProviderInCart || serviceProviderInCart === item.serviceProvider}
                        />
                    );
                } else return (
                    <TiffinCard
                        key={item._id}
                        id={item._id}
                        tags={item.tags || "veg"}
                        title={item.title}
                        price={item.price}
                        description={item.description}
                        serviceProvider={item.serviceProvider}
                        deliveryBy={item.deliveryBy}
                        active={!serviceProviderInCart || serviceProviderInCart === item.serviceProvider}
                    />
                );
            })}
        </div>
    );
}
