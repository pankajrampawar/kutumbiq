'use client'
import { montserrat } from "@/app/ui/fonts"
import SimpleFoodCard from "@/app/ui/simpleFoodCard"
import { useRouter } from "next/navigation"

export default function TiffinSection() {

    const router = useRouter();

    return (
        <div className="mx-[5%] mt-10">
            <article className="flex flex-col gap-2">
                <h2 className={`${montserrat.className} text-xl font-semibold`}>
                    Order Tiffin Online
                </h2>

                <p>Order the best tiffins in your area online, select the menu enter the address and bam save a load of money.</p>
            </article>

            <ul className="flex overflow-x-scroll gap-4 mt-6">
                <button className={`bg-black text-white text-xl ${montserrat.className} p-4 rounded-lg`} onClick={() => { router.push("/services/tiffin") }}>
                    Order Online
                </button>
            </ul>
        </div>
    )
}