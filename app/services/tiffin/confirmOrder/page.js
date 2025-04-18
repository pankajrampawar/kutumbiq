'use client'
import { useEffect, useState, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cartContext";
import { useCustomUser } from "@/app/context/customUserContext";
import { useAlert } from "@/app/context/alertContext";
import { SignIn } from "@/app/ui/components/auth/sign-in";
import { montserrat } from "@/app/ui/fonts";

export default function ConfirmOrder() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false); // New state for order success UI
    const { data: session, status } = useSession();
    const { userData, fetchUserData } = useCustomUser();
    const router = useRouter();
    const { cartItems, serviceProviderInCart, clearCart } = useCart();
    const credentialsChecked = useRef(false);
    const { addAlert } = useAlert();
    const [finalConfirmation, setFinalConfirmation] = useState(false);

    const getTotalPrice = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    useEffect(() => {
        // Skip if we've already checked credentials
        if (credentialsChecked.current) return;

        const checkCredentials = async () => {
            if (cartItems.length === 0) {
                router.push("/services/tiffin/cart");
                return;
            }

            try {
                if (status === "unauthenticated") {
                    console.log("Signing in...");
                    signIn("google");
                    return;
                } else if (status === "authenticated") {
                    // Mark that we've checked credentials
                    credentialsChecked.current = true;

                    let user = session?.user;

                    if (!user?._id) {
                        const fetchedUser = await fetchUserData(user.email)
                        if (!fetchedUser._id) {
                            signIn("google");
                            return;
                        }
                        user = fetchedUser;
                    }

                    if (!user?.phoneNumber) {
                        const fetchedUser = await fetchUserData(user.email)
                        console.log("fetcehd user: ", fetchedUser)
                        if (!fetchedUser?.phoneNumber) {
                            router.push('/form/phoneNumber');
                            return;
                        }
                    }

                    if (!user?.address) {
                        const fetchedUser = await fetchUserData(user.email)
                        if (!fetchedUser?.address) {
                            router.push('/form/address');
                            return;
                        }
                    }
                    console.log("All requirements met. Placing order...");
                    setFinalConfirmation(true)
                } else {
                    signIn('google')
                }
            } catch (err) {
                console.error("Error in credential check:", err);
                setError("An error occurred while processing your order. Please try again.");
                setLoading(false);
            }
        };

        checkCredentials();
    }, [status]);

    const placeOrder = async () => {
        try {
            const totalPrice = getTotalPrice(cartItems);
            const coupon = sessionStorage.getItem('coupon') || null;
            let userId;
            let address;
            let name;
            let phoneNumber;

            if (!session.user.email) {
                signIn("google")
                return;
            }

            const fetchedUser = await fetchUserData(session.user.email)
            if (!fetchedUser) {
                return;
            }

            userId = fetchedUser._id;
            name = fetchedUser.name;
            phoneNumber = fetchedUser.phoneNumber;
            address = fetchedUser.address;

            const response = await fetch("/api/tiffin/placeOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: userId,
                    name: name,
                    phoneNumber: phoneNumber,
                    address: address,
                    vendorId: serviceProviderInCart,
                    totalPrice: totalPrice,
                    items: cartItems,
                    coupon
                }),
            });

            if (!response.ok) {
                router.push('/services/tiffin/cart')
                //throw new Error("Failed to place order");
            }

            // Show success UI
            clearCart();
            setOrderPlaced(true); // Set the success state
            setLoading(false);
            addAlert("All orders are COD!", "success");

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

    const handleFinalConfrimation = async (choice) => {
        if (choice) {
            await placeOrder()
            setFinalConfirmation(false)
        } else {
            setFinalConfirmation(false)
            router.push('/services/tiffin/cart')
        }
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                <p>{error}</p>
                <SignIn />
            </div>
        );
    }

    if (finalConfirmation) {
        return (
            <div className="mx-[5%] mt-40">
                <div className={`${montserrat.className} w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8 transform transition-all`}>
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Place a COD Order
                        </h1>

                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                            Your order will be placed and delivered by vendor on their respective timings
                        </p>

                        <div className="flex items-center justify-center gap-4 pt-6">
                            <button
                                className="px-6 py-2.5 rounded-lg border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors duration-200"
                                type="button"
                                onClick={() => handleFinalConfrimation(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
                                type="button"
                                onClick={() => handleFinalConfrimation(true)}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            {loading ? (
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    <p className="mt-4 text-gray-600">Processing your order...</p>
                </div>
            ) : orderPlaced ? (
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-md">Order placed successfully!</h1>
                    <p className="text-sm text-gray-600">
                        Redirecting you to the cart page in a few seconds...
                    </p>
                    <div className="mt-2 flex justify-center items-center">
                        <div className="relative h-12 w-12">
                            <div className="absolute top-0 left-0 w-full h-full bg-green-500 rounded-full animate-pulse"></div>
                            <svg
                                className="absolute w-full h-full"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="9 11 12 14 22 4"></polyline>
                                <polyline points="2 12 9 18 20 6"></polyline>
                            </svg>
                        </div>
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