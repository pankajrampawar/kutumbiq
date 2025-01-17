'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function ConfirmOrder() {

    const router = useRouter();

    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            if (session.user.phoneNumber === null) {
                const phone = localStorage.getItem("phoneNumber");
                if (!phone) {
                    router.push("/form/phoneNumber")
                }
            }

            if (!session.user.address) {
                const address = localStorage.getItem("address")
                if (!address) {
                    router.push('/form/address')
                }
            }
        }

        if (status === "unauthenticated") {
            signIn("google");
        }
    }, [status])

    return (
        <div>
            <h1>Placing Your Order</h1>
            <p>Hang on tight!</p>
        </div>
    )
}