'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConfirmOrder() {

    const router = useRouter();

    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            if (session.user.phoneNumber === null) {
                router.push("/form/phoneNumber")
            }
        }
    }, [status])

    return (
        <div>
            <h1>Placing Your Order</h1>
            <p>Hang on tight!</p>
        </div>
    )
}