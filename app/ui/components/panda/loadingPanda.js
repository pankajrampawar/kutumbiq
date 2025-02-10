'use client'
import Image from "next/image"
import MessageCard from "../../messageCard"

export default function LoadingPanda() {
    return (
        <div className="w-full pt-40 flex pl-10">
            <div className="relative">
                <div className="absolute top-0 -right-28 w-full">
                    <MessageCard message="Loading your items!" />
                </div>
                <div className="absolute -top-14 right-10 w-6 h-6 rounded-full border-4 border-t-primary border-t-4 border-secondary animate-spin"></div>
                <Image
                    src="/pandaLaptop.svg"
                    alt="Panda with a laptop"
                    width={300}
                    height={300}
                    className="max-w-[200px] max-h-[200px]"
                />
            </div>
        </div>
    )
}