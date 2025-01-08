'use client'
import Link from "next/link"
import Image from "next/image"


export default function HolderCard({ src, alt, title, href }) {
    return (
        <div className="bg-[#FAFAFA]  min-w-[180px] flex justify-center items-center p-2 rounded-2xl shadow-md shadow-black/25">
            <Link
                href={href}
                className=""
            >
                <h2>
                    {title}
                </h2>
                <Image
                    src={src}
                    alt={alt}
                    width="120"
                    height="120"
                />
            </Link>
        </div>
    )
}