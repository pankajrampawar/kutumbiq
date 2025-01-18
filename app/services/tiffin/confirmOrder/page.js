'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { useCart } from "@/app/context/cartContext";

export default function ConfirmOrder() {

    const router = useRouter();
    const { cartItems, serviceProviderInCart, clearCart } = useCart();
    console.log(cartItems);
    const { data: session, status } = useSession();
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const orderPlacedRef = useRef(false); // Prevent multiple orders

    const getTotalPrice = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    useEffect(() => {
        if (status === "authenticated") {
            if (session.user.phoneNumber === null) {
                const phone = localStorage.getItem("phoneNumber");
                if (!phone) {
                    router.push("/form/phoneNumber");
                    return;
                }
            }

            if (!session.user.address) {
                const address = localStorage.getItem("address");
                if (!address) {
                    router.push('/form/address');
                    return;
                }
            }

            const placeOrder = async () => {
                if (orderPlacedRef.current || !cartItems.length) return;
                orderPlacedRef.current = true; // Prevent multiple orders
                const totalPrice = getTotalPrice(cartItems);

                try {
                    const response = await fetch("/api/tiffin/placeOrder", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            userId: session.user._id,
                            vendorId: serviceProviderInCart,
                            totalPrice: totalPrice,
                            items: cartItems
                        })
                    });

                    if (!response.ok) {
                        throw new Error("Unable to place the order");
                    }
                    clearCart();
                    setIsOrderPlaced(true);
                } catch (error) {
                    alert("Unable to place your order, please try again later.");
                    router.push("/services/tiffin/cart");
                }
            };

            if (!isOrderPlaced) {
                placeOrder();
            }
        }

        if (status === "unauthenticated") {
            signIn("google");
        }
    }, [status, cartItems, serviceProviderInCart]);

    return (
        <div className="h-full">
            {isOrderPlaced
                ?
                <div className="fixed h-screen w-screen top-0 left-0 flex items-center justify-center z-10 flex-col gap-2">
                    <h1 className="text-xl">Order Placed successfully</h1>
                    <button className="text-md bg-zinc-900 text-white p-3 rounded-lg" onClick={() => { router.push('/services/tiffin') }}>
                        Go Back
                    </button>
                </div>
                :
                <div>
                    <h1>Placing Your Order</h1>
                    <p>Hang on tight!</p>
                </div>
            }
        </div>
    );
}