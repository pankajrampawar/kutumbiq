'use client'
import Link from "next/link"
import Image from "next/image"
import { montserrat } from "./fonts"


export default function HolderCard({ src, alt, title, href, end, start }) {
    return (
        <div className="w-full">
            <div className="w-fit relative">
                {/* div used as background */}
                <div className="absolute bg-gradient-to-t from-[#D4D0FF] to-[#F9F8FF] w-full bottom-4 min-h-[240px] -z-10 h-full"></div>
                {/* div used to hold title*/}
                <div className={`text-3xl ${montserrat.className} font-semibold text-center`}>
                    {title}
                </div>

                {/* div used to hold Image */}
                <div>
                    <Image
                        src={src}
                        alt={alt}
                        width="500"
                        height="500"
                    />
                </div>
            </div>
        </div>
    )
}