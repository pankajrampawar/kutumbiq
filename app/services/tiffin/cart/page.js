'use client'

import { useCart } from "@/app/context/cartContext"
import CheckoutCrumb from "@/app/ui/components/tiffin/checkoutCrumb";
import { useState } from "react";

export default function CartPage() {

    const { cartItems, addItemToCart, removeItemFromCart, serviceProviderInCart } = useCart();

    return (
        <div className="mx-[5%]">
            <h1 className="text-xl">Checkout Page</h1>
            <div className="mt-10">
                {
                    cartItems.map((item) => {
                        return (
                            <div key={item.id} className="flex justify-between w-full">
                                <CheckoutCrumb item={item} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
} 