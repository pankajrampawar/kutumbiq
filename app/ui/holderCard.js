'use client'
import Link from "next/link"
import Image from "next/image"
import { montserrat } from "./fonts"


export default function HolderCard({ src, alt, title, href }) {
    return (
        <div className="bg-[#FAFAFA] hover:shadow-lg  min-w-[130px] min-[375px]:min-w-[160px] min-[425px]:min-w-[184px] flex justify-center items-center p-2 rounded-2xl shadow-md shadow-black/25 hover:shadow-black/25">
            <Link
                href={href}
                className="w-full"
            >
                <h2 className={`text-lg font-semibold ${montserrat.className}`}>
                    {title}
                </h2>
                <div className="flex justify-end">
                    <Image
                        src={src}
                        alt={alt}
                        width="120"
                        height="120"
                    />
                </div>
            </Link>
        </div>
    )
}