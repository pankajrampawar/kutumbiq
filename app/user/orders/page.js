'use client';

import { useEffect, useState } from "react";
import { useCustomUser } from "@/app/context/customUserContext";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { montserrat } from "@/app/ui/fonts";

export default function YourOrders() {

    const router = useRouter();
    const { data: session } = useSession();
    const { userData, fetchUserData } = useCustomUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);

    const handleGoBack = () => {
        router.push("/services/tiffin")
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(null);

                let userId = session?.user?._id || userData?._id;

                if (!userId && session?.user?.email) {
                    const user = await fetchUserData(session.user.email);
                    userId = user?._id;
                }

                if (!userId) {
                    signIn("google");
                    return;
                }

                const response = await fetch("/api/tiffin/getUserOrder", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to fetch orders");
                }

                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (session || userData) fetchOrders();
    }, [userData, session, fetchUserData]);

    const loadingAnimation = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.8, ease: "easeInOut" },
    };

    const containerAnimation = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.4 },
    };

    const itemAnimation = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: "easeOut" },
    };

    if (loading)
        return (
            <motion.div
                className="flex justify-center items-center h-screen"
                {...loadingAnimation}
            >
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-300"></div>
            </motion.div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg font-semibold">{error}</p>
            </div>
        );

    if (!orders.length)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg font-semibold">No orders found.</p>
            </div>
        );

    return (
        <motion.div
            className="p-8 max-w-4xl mx-auto"
            {...containerAnimation}
        >
            <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
            <motion.div
                className="space-y-6"
                {...containerAnimation}
            >
                {orders.map((order) => (
                    <motion.div
                        key={order._id}
                        className="p-4 bg-white shadow-sm rounded-lg border border-gray-200"
                        {...itemAnimation}
                    >
                        <h2 className="text-xl font-semibold mb-2 text-gray-700">
                            Order Total: ₹{order.totalPrice.toFixed(2)}
                        </h2>
                        <div className="space-y-2">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center text-gray-600"
                                >
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-sm">
                                        {item.quantity} x ₹{item.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bottom Section */}
            <div className="mt-12 border-t border-gray-300 pt-6 text-center pb-20">
                <p className="text-gray-600 text-lg mb-4">
                    Facing problems? Feel free to call us.
                </p>
                <a
                    href="tel:+919356446407"
                    className="inline-block px-6 py-3 border-black text-black  font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
                >
                    Call Now
                </a>
            </div>


            <motion.button
                initial={{ y: '100%' }}
                animate={{ y: '-20%' }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`fixed w-[90vw] bottom-0 left-0 right-0 mx-auto rounded-xl bg-zinc-900 flex justify-center items-center text-xl p-4 tracking-wide font-semibold ${montserrat.className} text-white`}
                onClick={handleGoBack}
            >
                <div>
                    Go Back
                </div>
            </motion.button>

        </motion.div>
    );
}