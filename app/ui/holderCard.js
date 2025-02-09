'use client'
import Link from "next/link"
import Image from "next/image"
import { montserrat } from "./fonts"
import clsx from "clsx"
import { motion } from "framer-motion";


export default function HolderCard({ src, alt, title, href, end, start, handleClick }) {
    return (
        <div className="w-full max-w-[420px] flex flex-col justify-between">
            <div className="w-fit relative pb-2">
                {/* div used as background */}
                <div className={clsx("absolute bg-gradient-to-t from-[#D4D0FF] to-[#F9F8FF] w-full bottom-4 min-h-[240px] -z-10 h-[95%]",
                    { "rounded-tl-full": end }, { "rounded-tr-full": start }, { "rounded-t-full": !end && !start }
                )}></div>
                {/* div used to hold title*/}
                <div className={`text-3xl ${montserrat.className} font-semibold text-center`}>
                    {title}
                </div>

                {/* div used to hold Image */}
                <motion.div
                    initial={{ scale: 0.95, y: 40, opacity: 0 }}
                    whileInView={{ scale: 1, y: 0, opacity: 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Image
                        src={src}
                        alt={alt}
                        width="500"
                        height="500"
                    />
                </motion.div>
            </div>

            <div>
                <button
                    onClick={handleClick}
                    className="flex w-full justify-center p-2 hover:bg-primary text-black tracking-wide hover:text-white font-semibold text-xl rounded-xl border-2 border-primary"
                >
                    Explore
                </button>
            </div>
        </div >
    )
}