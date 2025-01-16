'use client'

import { useCart } from "@/app/context/cartContext"
import CheckoutCrumb from "@/app/ui/components/tiffin/checkoutCrumb";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {

    const router = useRouter();
    const { cartItems, addItemToCart, removeItemFromCart, serviceProviderInCart } = useCart();

    return (
        <div className="mx-[3%]">
            <h1 className="text-xl mt-2 underline underline-offset-4 ">Checkout Page</h1>
            <div className="mt-10">
                {cartItems.length === 0
                    ?
                    <div className="w-full h-full fixed top-0 justify-center items-center flex flex-col gap-5">
                        <p>
                            No items in cart!
                        </p>
                        <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={() => router.back()}>
                            Go back
                        </button>
                    </div>
                    :
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