'use client'
import HolderCard from "@/app/ui/holderCard"

export default function ServiceListing() {

    const serviceList = [
        {
            title: "Tiffin",
            src: "/tiffin.png",
            alt: "Image/Illustration of an typical Indian tiffin (dabba) with pulses curry and chapati.",
            href: "/services/tiffin",
        },
        {
            title: "Maid",
            src: "/maid.png",
            alt: "Image/Illustration of a maid in sarre hoding a tray.",
            href: "/services/maid",
        },
        {
            title: "Housing",
            src: "/housing.png",
            alt: "Image/Illustration of an apartment.",
            href: "/services/housing",
        },
        {
            title: "Furniture",
            src: "/furniture.png",
            alt: "Image/ Illustration of a cupboard, study table and chair showcasing our furntiure rental service",
            href: "/services/furniture",
        },
    ]

    return (
        <ul className="grid grid-cols-2 grid-rows-2 place-items-center gap-4 mx-[5%]">
            {
                serviceList.map((service) => {
                    return (
                        <li key={service.title}>
                            <HolderCard
                                title={service.title}
                                src={service.src}
                                alt={service.alt}
                                href={service.href}
                            />
                        </li>
                    )
                })
            }
        </ul>
    )
}