'use client'
import Navbar from "../navbar"
import Image from "next/image"
import { lato, montserrat } from "../../fonts"
import { motion } from "motion/react"

export default function Hero() {
    return (
        <header className="w-full bg-cover">
            <div className="fixed top-0 w-screen">
                <Navbar />
            </div>

            <motion
                className="mt-40 flex flex-col gap-6 sm:gap-3 min-[425px]:mx-[5%]"
            >
                <motion
                    className={`${montserrat.className} order-1 font-bold text-center 
                    text-4xl leading-snug min-[455px]:text-[48px] min-[455px]:leading-tight sm:text-5xl md:text-6xl md:leading-tight lg:text-7xl lg:leading-[84px]`}
                >
                    All Your Needs At <br /> <span className="text-primary"> One Stop</span>
                </motion>

                <div className="flex justify-center overflow-hidden order-2 sm:order-3 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14">
                    <Image
                        src="/heroBg.png"
                        alt="Sutudents sittinga and having a good time"
                        width="1200"
                        height="600"
                        className="min-w-[400px] pr-4 sm:pr-0"
                    />
                </div>

                <div className={`text-center text-black/70 font ${lato.className} order-3 sm:order-2 lg:text-2xl lg:tracking-wide sm:mt-4`}>
                    <p>We take care of your smaller problems so you could freely focus on bigger one's.</p>
                    <p className="text-textAlt">By the sutudents for the sutudents 👨🏻‍🎓.</p>
                </div>
            </motion>
        </header>
    )
}
