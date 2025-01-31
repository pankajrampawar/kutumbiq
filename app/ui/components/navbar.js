'use client'
import Image from "next/image"
import { useState } from "react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { comfortaa } from "../fonts";
import clsx from 'clsx'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev)
    }

    const NavItems = () => {
        const pageLinks = [
            {
                name: "Home",
                href: '/'
            },
            {
                name: "Tiffin",
                href: '/services/tiffin'
            },
            {
                name: "Maid",
                href: '/services/maid'
            },
            {
                name: "Housing",
                href: '/services/housing'
            },
            {
                name: "Furniture",
                href: '/services/furniture'
            },
            {
                name: "Your Orders",
                href: '/user/orders'
            }
        ]

        return (
            <nav className="flex justify-center items-center mt-20 w-full">
                <ul className="flex flex-col justify-center items-star gap-4 w-full px-[5%]">
                    {
                        pageLinks.map((link) => {
                            return (
                                <li key={link.name}
                                    className={clsx(
                                        `border-b border-gray-600 w-full text-2xl ${comfortaa.className} font-medium tracking-wider pb-2 pl-2`,
                                        {
                                            'text-white border-white': pathname === link.href,
                                        }
                                    )}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={toggleMenu}
                                    >
                                        <p>{link.name}</p>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        )
    }

    return (
        <div className={clsx(`p-2 flex justify-between w-full z-50 `,
            { "fixed top-0": isMenuOpen },
            { "relative": !isMenuOpen }
        )}>
            <h3 className="relative z-30">
                <Link href="/">
                    <Image
                        src="/kutumbiq.svg"
                        alt="kutumbiq logo"
                        priority={true}
                        width="150"
                        height="40"
                        loading="eager"
                        className={clsx({
                            'invert': isMenuOpen
                        })}
                    />
                </Link>
            </h3>
            <nav className="hidden">
                <ul>

                </ul>
            </nav>

            <div className="flex justify-center items-center gap-3 relative">
                <button
                    onClick={toggleMenu}
                    className={clsx("relative z-10 bg-black p-2 rounded-lg",
                    )}
                >
                    <Image
                        src="/hamIcon.svg"
                        alt="Menu Icon"
                        width="28"
                        height="20"
                        priority={true}
                        loading="eager"
                        className={clsx("invert max-w-[24px] min-h-[20px]")}
                    />
                </button>
            </div>

            <div className={`fixed w-screen h-screen top-0 left-0 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} bg-black text-gray-400 h-screen transition-all ease-in-out duration-500 `}>
                <NavItems />
            </div>
        </div >
    )
}