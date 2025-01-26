'use client'
import Furniture from "@/app/services/furniture/page"
import HolderCard from "@/app/ui/holderCard"

export default function ServiceListing() {

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
            title: "Furniture",
            src: "/furniture.png",
            alt: "Image/ Illustration of a cupboard, study table and chair showcasing our furntiure rental service",
            href: "/services/furniture",
        },
    ]

    return (
        <div>
            <div className="">
                <h2 className="text-3xl font-bold">Services We Offer</h2>
            </div>
            <ul className="flex flex-col mx-[5%] gap-10">
                {
                    serviceList.map((service) => {
                        return (
                            <li key={service.title}>
                                <HolderCard
                                    title={service.title}
                                    src={service.src}
                                    alt={service.alt}
                                    href={service.href}
                                    end={service.title === "Furniture" ? true : false}
                                    start={service.title === "Housing" ? true : false}
                                />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}