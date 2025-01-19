'use client'
import { useEffect, useState, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cartContext";
import { useCustomUser } from "@/app/context/customUserContext";

export default function ConfirmOrder() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false); // New state for order success UI
    const { data: session, status } = useSession();
    const { userData, fetchUserData } = useCustomUser();
    const router = useRouter();
    const { cartItems, serviceProviderInCart, clearCart } = useCart();
    const credentialsChecked = useRef(false);

    const getTotalPrice = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    useEffect(() => {
        // Skip if we've already checked credentials
        if (credentialsChecked.current) return;

        const checkCredentials = async () => {
            if (cartItems.length === 0) {
                //router.push("/services/tiffin/cart");
                return;
            }

            try {
                if (status === "unauthenticated") {
                    console.log("Signing in...");
                    await signIn("google");
                    return;
                }

                if (status === "authenticated") {
                    // Mark that we've checked credentials
                    credentialsChecked.current = true;

                    if (!session?.user?._id) {
                        if (userData._id) {
                            return;
                        }
                    }

                    if (!session?.user?.phoneNumber) { // Check for phone number in user data
                        await fetchUserData(session.user.email);
                        if (!userData.phoneNumber) {
                            router.push("/form/phoneNumber");
                        }
                        return;
                    }

                    if (!session?.user?.address) { // Check for address in user data
                        await fetchUserData(session.user.email);
                        if (!userData?.address) {
                            router.push("/form/address");
                        }
                        return;
                    }

                    console.log("All requirements met. Placing order...");
                    await placeOrder();
                }
            } catch (err) {
                console.error("Error in credential check:", err);
                setError("An error occurred while processing your order. Please try again.");
                setLoading(false);
            }
        };

        checkCredentials();
    }, [status]); // Only depend on status, not session

    const placeOrder = async () => {
        try {
            const totalPrice = getTotalPrice(cartItems);
            const response = await fetch("/api/tiffin/placeOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: session.user._id,
                    vendorId: serviceProviderInCart,
                    totalPrice: totalPrice,
                    items: cartItems,
                }),
            });

            if (!response.ok) throw new Error("Failed to place order");

            // Show success UI
            clearCart();
            setOrderPlaced(true); // Set the success state
            setLoading(false);

            // Delay redirect by 3 seconds
            setTimeout(() => {
                router.push("/services/tiffin/");
            }, 3000); // Delay for 3 seconds
        } catch (err) {
            console.error("Order placement error:", err);
            setError("Failed to place your order. Please try again.");
            setLoading(false);
        }
    };

    if (error) {
        return (
            <div className="p-4 text-red-500">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            {loading ? (
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    <p className="mt-4 text-gray-600">Processing your order...</p>
                </div>
            ) : orderPlaced ? ( // Show success UI
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-md">Order placed successfully!</h1>
                    <p className="text-sm text-gray-600">
                        Redirecting you to the cart page in a few seconds...
                    </p>
                    <div className="mt-2">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-md">Order Processing...</h1>
                </div>
            )}
        </div>
    );
}