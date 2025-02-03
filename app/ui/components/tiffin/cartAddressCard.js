'use client'

import BgBlurCard from "../../bgBlurCard"
import { MapPinIcon } from "lucide-react"
import { lato, montserrat } from "../../fonts"
import { useRouter } from "next/navigation"

export default function CartAddressCard({ address }) {

    const router = useRouter();

    return (
        <BgBlurCard>
            <div className="flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                    <MapPinIcon />
                    <p className={`${montserrat.className} text-lg font-semibold tracking-wide`}>Delivery Address</p>
                </div>

                <div className={`${lato.className} text-base text-black/50 mx-[2%]`}>
                    {address ? address : "You haven’t provided us with your deliver address yet, Click on place order, you'll be redirected to required pages."}
                </div>

                <div className="flex justify-start w-full text-primary">
                    <button className="mx-[2%] text-xl font-semibold " onClick={() => { router.push('/form/address') }}>
                        {address ? "Edit Address" : ""}
                    </button>
                </div>
            </div>
        </BgBlurCard>
    )
}