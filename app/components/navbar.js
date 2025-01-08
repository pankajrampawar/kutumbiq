'use client'

import Image from "next/image"
import { useState } from "react"

export default function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev)
    }

    const NavItems = () => {
        return (
            <nav className="flex justify-center items-center">
                <ul className="flex flex-col justify-center items-center gap-3">
                    <li>Home</li>
                    <li>Dabba</li>
                    <li>Maid</li>
                    <li>Housing</li>
                    <li>Furniture</li>
                </ul>
            </nav>
        )
    }

    return (
        <div className="p-2 flex justify-between w-full relative">
            <h3 className="relative z-10">
                <Image
                    src="/kutumbiq.svg"
                    alt="kutumbiq logo"
                    priority={true}
                    width="150"
                    height="40"
                    loading="eager"
                />
            </h3>
            <nav className="hidden">
                <ul>

                </ul>
            </nav>

            <div className="flex justify-center items-center">
                <button
                    onClick={toggleMenu}
                    className="relative z-10"
                >
                    <Image
                        src="/hamIcon.svg"
                        alt="Menu Icon"
                        width="35"
                        height="21"
                        priority={true}
                        loading="eager"
                    />
                </button>
            </div>

            <div className={`absolute w-full ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} bg-white h-screen transition-all ease-in-out duration-500`}>
                <NavItems />
            </div>
        </div>
    )
}