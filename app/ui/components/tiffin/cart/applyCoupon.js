'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { getUserOrders } from "@/lib/api";
import { Layers } from "lucide-react";

export default function CouponCard({ coupon, setCoupon, status, userMail, userId, setCouponApplied }) {

    const [loading, setLoading] = useState(false)
    const [showLogin, setShowLogin] = useState(false);


    const handleApplyCoupon = async () => {
        if (coupon.toUpperCase() === "NEW50") {
            setLoading(true)
            if (status === "authenticated") {
                let id;
                if (!userId) {
                    return;
                }

                id = userId;

                const result = await getUserOrders(id)

                if (result.length > 0) {
                    alert('Coupon valid for first orders only')
                    setCoupon("");
                    setLoading(false);
                    return;
                } else {
                    setCouponApplied(0.5)
                    setLoading(false)
                }
            } else {
                alert("Login to apply coupon")
                signIn('google')
                setShowLogin(true);
            }
        } else {
            alert("Invalid coupon code.");
        }
    };


    return (
        <div className="flex gap-4 mt-4 items-center">
            <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="border px-3 py-2 rounded-lg w-full"
            />
            <button
                onClick={handleApplyCoupon}
                className="bg-primary text-white px-4 py-2 rounded-lg"
            >
                Apply
            </button>

            {loading &&
                (
                    <div className="fixed top-0 left-0 h-[120vh] w-screen bg-black/10 backdrop-blur-sm z-50 flex justify-center items-center">
                        <div className="flex gap-4 items-center h-screen">
                            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                            <div className="text-2xl font-semibold">
                                {showLogin ? "Logging You In" : "Validating Coupon"}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}