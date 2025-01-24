'use client'
import Navbar from "../navbar"
import Image from "next/image"
import { comfortaa } from "@/app/ui/fonts"

export default function Hero() {
    return (
        <header className="w-full bg-cover" style={{ backgroundImage: "url('/heroBg.png')" }}
        >
            <div className="fixed top-0 w-screen">
                <Navbar />
            </div>

            <section className="pt-28 w-full pb-4">
                {/* heading title */}
                <h1 className={`text-4xl text-center font-bold leading-snug ${comfortaa.className}`}>
                    All Student Needs <br />At One Stop
                </h1>

                {/* location and input box here */}
                <div className="flex w-full justify-center mt-10">
                    <div className="flex border border-black rounded-full bg-white max-w-[280px] w-full">
                        {/* search box here */}
                        <div className="flex items-center flex-grow">
                            <input
                                className="w-full rounded-r-full pl-2 pr-4 py-2 sm:py-3 text-sm focus:outline-none bg-inherit"
                                placeholder="Search here..."
                            />
                        </div>
                    </div>
                </div>
            </section>
        </header>
    )
}
