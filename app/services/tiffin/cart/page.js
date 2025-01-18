'use client'

import { useCart } from "@/app/context/cartContext"
import CheckoutCrumb from "@/app/ui/components/tiffin/checkoutCrumb";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { montserrat } from "@/app/ui/fonts";
import { useSession } from "next-auth/react";


export default function CartPage() {

    const router = useRouter();
    const { cartItems } = useCart();
    const { data: session, status } = useSession();
    const [address, setAddress] = useState(null);

    useEffect(() => {
        const addressJson = localStorage.getItem("address");
        if (addressJson) {
            const address = JSON.parse(addressJson);
            setAddress(address);
            console.log("Address:", address);
        }
    }, [])

    const handlePlaceOrder = () => {
        if (!address) router.push("/form/address")
        router.push("confirmOrder")
    }

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

            {cartItems.length > 0 &&
                <section className="fixed bottom-0 w-screen left-0 text-white p-4">
                    {
                        status === "authenticated" && !session.user.address && !address && <div className="text-black mb-14 w-full text-center">
                            <button className="underline" onClick={() => router.push("/form/address")}>
                                Add Deliver Address
                            </button>
                        </div>
                    }
                    <div className={`fixed w-screen bottom-0 left-0 bg-zinc-900 flex justify-center items-center text-xl p-4 tracking-wide font-semibold ${montserrat.className}`}>
                        <button onClick={handlePlaceOrder}>
                            Place Order
                        </button>
                    </div>
                </section>}
        </div>
    )
} 