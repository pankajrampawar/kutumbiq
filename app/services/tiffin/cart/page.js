'use client'
import { useCart } from "@/app/context/cartContext"
import CheckoutCrumb from "@/app/ui/components/tiffin/checkoutCrumb";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { lato, montserrat } from "@/app/ui/fonts";
import { useSession } from "next-auth/react";
import { useCustomUser } from "@/app/context/customUserContext";
import { motion } from "framer-motion";
import CartCard from "@/app/ui/components/tiffin/cartCard";
import CartAddressCard from "@/app/ui/components/tiffin/cartAddressCard";
import BackButton from "@/app/ui/backButton";
import BillCard from "@/app/ui/components/tiffin/billCard";

export default function CartPage() {
    const router = useRouter();
    const { cartItems } = useCart();
    const { userData, fetchUserData, getUserId, getUserAddress } = useCustomUser();
    const { data: session, status } = useSession();
    const [address, setAddress] = useState(null);

    useEffect(() => {
        if (status === "authenticated") {
            const updateUserAndGiveAddress = async () => {
                const user = await fetchUserData(session.user.email);
                return user?.address || null;
            };

            const fetchAddress = async () => {
                if (userData?.address) {
                    setAddress(userData.address);
                } else {
                    const fetchedAddress = await updateUserAndGiveAddress();
                    setAddress(fetchedAddress);
                }
            };

            fetchAddress();
        }
    }, [status, session, fetchUserData, userData]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    const handlePlaceOrder = () => {
        const now = new Date();
        const currentHour = now.getHours();

        if (currentHour >= 19) {
            alert("Orders cannot be placed after 7 PM. Please try again tomorrow.");
            return;
        }
        router.push("confirmOrder");
    };


    return (
        <div className="mx-[3%] pb-32 flex flex-col gap-8">

            <div className="mt-4 relative">
                <div className="flex items-center">
                    <BackButton />
                    <h1 className={`text-xl font-semibold ${montserrat.className}`}>Your Cart</h1>
                </div>
                <div className="mt-2     flex flex-col gap-2">
                    {cartItems.length === 0 ? (
                        <div className="w-full h-full fixed top-0 justify-center items-center flex flex-col gap-5">
                            <p>No items in cart!</p>
                            <button
                                className="bg-black text-white px-4 py-2 rounded-lg"
                                onClick={() => router.push('/services/tiffin')}
                            >
                                Go back
                            </button>
                        </div>
                    ) : <CartCard cartItems={cartItems} />
                    }
                </div>

                <div className="absolute top-0 right-10 min-w-[35px] min-h-[35px] bg-rustOrange blur-2xl -z-10">

                </div>
            </div>


            {cartItems.length > 0
                &&
                <div className="relative">
                    <CartAddressCard address={address} />

                    <div className="absolute top-0 left-10 min-w-[35px] min-h-[35px] bg-brightYellow blur-2xl -z-10" />
                    <div className="absolute -bottom-10 left-40 min-w-[35px] min-h-[35px] bg-rustOrange blur-2xl -z-10" />
                </div>
            }
            {
                cartItems.length > 0 && (
                    <div>
                        <BillCard />
                    </div>
                )
            }

            {
                cartItems.length > 0 && (
                    <section className="fixed bottom-0 w-screen left-0 p-4">
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: '-20%' }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="fixed w-[90vw] bottom-0 left-0 right-0 mx-auto rounded-[20px] overflow-hidden bg-white/20 backdrop-blur-xl shadow-xl flex justify-between items-center py-4 px-2"
                        >
                            <div>
                                <p><span className={`${montserrat.className} text-lg font-medium`}>Total ₹{calculateTotal().toFixed(2)}</span></p>
                                <p className={`${lato.className} text-sm text-black/70`}>Pay on delivery</p>
                            </div>

                            <div className="relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-2/3 h-2/3 blur-2xl bg-primary"></div>
                                <button className={`bg-primary p-2 text-white ${montserrat.className} tracking-wide  text-xl px-4 font-semibold rounded-[10px] relative z-10`}
                                    onClick={handlePlaceOrder}
                                >
                                    PLACE ORDER
                                </button>
                            </div>
                        </motion.div>
                    </section>
                )
            }
        </div >
    );
}   