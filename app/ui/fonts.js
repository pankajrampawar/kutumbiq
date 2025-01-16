import { Comfortaa } from "next/font/google";
import { Montserrat } from "next/font/google";
import { Lato } from "next/font/google";

export const lato = Lato({
    weight: ['400', '700'],
    subsets: ['latin']
})

export const comfortaa = Comfortaa({
    weight: ['400', '700'],
    subsets: ['latin']
})

export const montserrat = Montserrat({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin']
})