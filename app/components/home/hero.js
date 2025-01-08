'use client'
import Navbar from "../navbar"
import Image from "next/image"

export default function Hero() {
    return (
        <header className="w-full bg-cover" style={{ backgroundImage: "url('/heroBg.png')" }}

        >
            <div className="fixed top-0 w-full left-0">
                <Navbar />
            </div>

            <section className="pt-24 w-full pb-4">
                {/* heading title */}
                <h1 className="text-4xl text-center">
                    All Student Needs <br />At One Stop
                </h1>

                {/* location and input box here */}
                <div className="flex w-full justify-center mt-20 ">
                    <div className="flex  border border-black rounded-full bg-white">
                        {/* location here */}
                        <section className="flex gap-2 border-r border-black px-4 py-3 items-center">
                            <div>
                                <Image
                                    src="/locationPointer.svg"
                                    alt="Location Pin"
                                    width="20"
                                    height="20"
                                />
                            </div>
                            <div className="text-xl">
                                Mumbai
                            </div>
                        </section>

                        {/* search box here */}
                        <div className="flex items-cetner pr-4 rounded-full">
                            <input
                                className="rounded-r-full pl-2 text-xl focus:outline-none bg-inherit"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </header>
    )
}