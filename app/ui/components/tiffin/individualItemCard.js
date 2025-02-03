'use client'

import Image from "next/image"
import BgBlurCard from "../../bgBlurCard"
import { montserrat } from "../../fonts"

export default function IndividualItemCard({ src, alt, itemName, onClick }) {



    return (
        <button className="max-w-[100px] border-2 p-1 py-2 rounded-xl relative overflow-hidden border-rustOrange/30" onClick={onClick}>
            <div className="absolute bg-rustOrange w-full h-3/4 blur-2xl -z-10 top-0 -translate-y-1/2"></div>
            <div className="flex justify-center items-center overflow-hidden relative max-w-[100px] min-h-[80px] rounded-xl">

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

            <div className={`${montserrat.className} font-semibold text-black/60 text-center leading-tight mt-1 text-rustOrange`}>
                {itemName}
            </div>
        </button>
    )
}