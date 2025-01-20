'use client'

import { useCart } from "@/app/context/cartContext"
import CheckoutCrumb from "@/app/ui/components/tiffin/checkoutCrumb";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { montserrat } from "@/app/ui/fonts";
import { useSession } from "next-auth/react";
import { useCustomUser } from "@/app/context/customUserContext";
import { motion } from "framer-motion";


export default function CartPage() {

    const router = useRouter();
    const { cartItems } = useCart();
    const { userData, fetchUserData, getUserId, getUserAddress } = useCustomUser();
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
        router.push("confirmOrder")
    }

    return (
        <div className="mx-[3%]">
            <h1 className="text-xl mt-2 underline underline-offset-4 ">Checkout Page</h1>
            <div className="mt-10 flex flex-col gap-2">
                {cartItems.length === 0
                    ?
                    <div className="w-full h-full fixed top-0 justify-center items-center flex flex-col gap-5">
                        <p>
                            No items in cart!
                        </p>
                        <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={() => router.push('/services/tiffin')}>
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
                    <motion.button
                        initial={{ y: '100%' }}
                        animate={{ y: '-20%' }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`fixed w-[90vw] bottom-0 left-0 right-0 mx-auto rounded-xl bg-zinc-900 flex justify-center items-center text-xl p-4 tracking-wide font-semibold ${montserrat.className}`}
                        onClick={handlePlaceOrder}
                    >
                        <div>
                            Place Order
                        </div>
                    </motion.button>
                </section>}
        </div>
    )
} 