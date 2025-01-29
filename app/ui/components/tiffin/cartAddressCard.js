'use client'

import BgBlurCard from "../../bgBlurCard"
import { MapPinIcon } from "lucide-react"
import { useCustomUser } from "@/app/context/customUserContext"
import { lato, montserrat } from "../../fonts"

export default function CartAddressCard() {

    const { userData, fetchUserData } = useCustomUser

    return (
        <BgBlurCard>
            <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-center">
                    <MapPinIcon />
                    <p className={`${montserrat.className} text-xl font-medium`}>Delivery Address</p>
                </div>

                <div className={`${lato.className} text-lg text-black/50 mx-[2%]`}>
                    You haven’t provided us with your deliver address yet, you can provide us with your delivery address by clicking below
                </div>

                <div className="w-full mx-[2%]">
                    <button className={`text-primary ${montserrat.className} font-semibold text-xl`}>
                        Add Delivery Address
                    </button>
                </div>
            </div>
        </BgBlurCard>
    )
}