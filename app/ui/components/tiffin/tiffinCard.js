'use client'
import { montserrat } from "../../fonts";
import { useCart } from "@/app/context/cartContext";
import { useEffect, useState } from 'react';
import clsx from "clsx";
import Image from "next/image";
import { PriceCard } from "@/app/testComponents/priceCard";

export default function TiffinCard({ id, title, price, description, src, alt, serviceProvider, deliveryBy, active, alertMessage }) {

    const { cartItems, addItemToCart, removeItemFromCart, serviceProviderInCart } = useCart();
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            setQuantity(item.quantity);
        } else {
            setQuantity(0)
        }
    }, [cartItems])

    const handleAddItem = () => {
        const now = new Date();

        if (!active) {
            alert(alertMessage);
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
        <div className={clsx("flex flex-col gap-4 mx-[2%] border-t py-[5%] relative",
            { "text-zinc-400": !active }
        )}>
            <section className="flex justify-between gap-2 items-center ">
                <div className="absolute top-0 left-0">
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
                        50% OFF
                    </span>
                </div>
                <article className="flex-1 ">
                    <h2 className={`text-lg font-semibold ${montserrat.className}`}>{title}</h2>
                    <div className="text-lg"><span><PriceCard price={price} /></span></div>
                    <p className="text-sm">{description}</p>
                </article>

                <div className="relative">
                    <div className="bg-gray-200 aspect-square min-w-[140px] max-w-[140px] max-h-[140px] overflow-hidden rounded-xl">
                        <img
                            src={src}
                            alt={alt}
                            width="140"
                            height="140"
                            className={`rounded-xl object-cover object-center w-full h-full ${active ? "" : "opacity-70 grayscale"}`}
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