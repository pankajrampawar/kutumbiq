'use client'
import HolderCard from "@/app/ui/holderCard"
import { useRouter } from "next/navigation"

export default function ServiceListing() {

    const router = useRouter();

    const serviceList = [
        {
            title: "Housing",
            src: "/housing.png",
            alt: "Image/Illustration of an apartment.",
            href: "/services/housing",
        },
        {
            title: "Tiffin",
            src: "/tiffin.png",
            alt: "Image/Illustration of a typical Indian tiffin (dabba) with pulses curry and chapati.",
            href: "/services/tiffin",
        },
        {
            title: "Maid",
            src: "/maid.png",
            alt: "Image/Illustration of a maid in saree holding a tray.",
            href: "/services/maid",
        },
        {
            title: "Furniture",
            src: "/furniture.png",
            alt: "Image/ Illustration of a cupboard, study table and chair showcasing our furniture rental service",
            href: "/services/furniture",
        },
    ]

    return (
        <div className="mx-[5%] my-8 lg:my-[10%]">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl lg:pb-10">Services We Offer</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-y-28">
                {
                    serviceList.map((service) => {
                        return (
                            <li key={service.title} className="flex justify-center">
                                <HolderCard
                                    title={service.title}
                                    src={service.src}
                                    alt={service.alt}
                                    href={service.href}
                                    end={service.title === "Furniture"}
                                    start={service.title === "Housing"}
                                    handleClick={() => router.push(service.href)}
                                />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
} 