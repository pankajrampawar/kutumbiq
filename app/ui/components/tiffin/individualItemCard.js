'use client'

import Image from "next/image"
import BgBlurCard from "../../bgBlurCard"
import { montserrat } from "../../fonts"

export default function IndividualItemCard({ src, alt, itemName }) {
    return (
        <div className="max-w-[100px]">
            <div className="flex justify-center items-center overflow-hidden relative max-w-[100px] min-h-[80px] rounded-xl">
                <div className="absolute bg-rustOrange w-full h-1/2 blur-xl -z-10 bottom-0 translate-y-1/2">

                </div>

                <div>
                    <div>
                        <Image
                            src={src}
                            alt={alt}
                            width={90}
                            height={90}
                        />
                    </div>
                </div>
            </div>

            <div className={`${montserrat.className} font-medium text-black/60 text-center leading-tight mt-1`}>
                {itemName}
            </div>
        </div>
    )
}