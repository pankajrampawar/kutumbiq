'use client'
import { montserrat } from "../../fonts";
import { useCart } from "@/app/context/cartContext";
import { useEffect, useState } from 'react';
import clsx from "clsx";

export default function TiffinCard({ id, title, price, description, src, alt, serviceProvider, deliveryBy, active }) {

    const { cartItems, addItemToCart, removeItemFromCart, serviceProviderInCart } = useCart();
    const [quantity, setQuantity] = useState(0);
    console.log(id)

    useEffect(() => {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            setQuantity(item.quantity);
        }
    }, [cartItems])

    const handleAddItem = () => {
        const now = new Date();
        const currentHour = now.getHours();

        if (currentHour >= 19) {
            alert("Orders cannot be placed after 7 PM. Please try again tomorrow.");
            return;
        }

        const item = { id, title, price, description, serviceProvider, quantity: 1 };
        const isItemAdded = addItemToCart(item);
        if (isItemAdded) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };

    const handleRemoveItem = () => {
        removeItemFromCart(id);
        setQuantity(prevQuantity => prevQuantity - 1);
    };

    return (
        <div className={clsx("flex flex-col gap-4 mx-[2%] border-t py-[5%]",
            { "text-zinc-400": !active }
        )}>
            <section className="flex justify-between gap-2 items-center ">
                <article className="flex-1 ">
                    <h2 className={`text-lg font-semibold ${montserrat.className}`}>{title}</h2>
                    <p className="text-lg"><span>Rs. {price}</span></p>
                    <p className="text-sm">{description}</p>
                </article>

                <div className="relative">
                    <div className="bg-gray-200 aspect-square min-w-[140px] rounded-xl">
                        <img
                            src={src}
                            alt={alt}
                        />
                    </div>
                    <div className="absolute bg-white border border-primary rounded-3xl bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                        {quantity > 0 ? (
                            <div className="flex items-center font-bold text-primary">
                                <button className="px-4 py-1 text-xl" onClick={handleRemoveItem}>-</button>
                                <div className="px-4 py-1 text-xl font-semibold">{quantity}</div>
                                <button className="px-4 py-1 text-xl" onClick={handleAddItem}>+</button>
                            </div>
                        ) : (
                            <button className="px-4 py-1 text-xl font-semibold text-primary" onClick={handleAddItem}>
                                <p>Add</p>
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}