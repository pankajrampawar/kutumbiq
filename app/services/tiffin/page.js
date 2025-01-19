'use client'
import TiffinCard from "@/app/ui/components/tiffin/tiffinCard";
import { comfortaa } from "@/app/ui/fonts";
import { useCart } from "@/app/context/cartContext";
import { useEffect, useState } from "react";
import TiffinList from "@/app/ui/components/tiffin/tiffinList";
import TiffinFilter from "@/app/ui/components/tiffin/tiffinFilter";

export default function Tiffin() {
    const [filter, setFilter] = useState(null)

    const addFilter = (tag) => {
        setFilter(tag);
    }

    return (
        <div>
            {/* hero section */}
            <section className="flex flex-col items-center gap-6">
                <div className="flex justify-center items-center text-center">
                    <h1 className={`text-2xl font-bold ${comfortaa.className}`}>Budget Friendly And Truly Good Meal.</h1>
                </div>

                <div>
                    Location
                </div>
            </section>

            {/* items section */}
            <section>
                {/* section for filters */}
                <section className="flex gap-4">
                    <TiffinFilter addTiffinFilter={(filter) => addFilter(filter)} />
                </section>

                <section className="mb-40">
                    <TiffinList filter={filter} />
                </section>
            </section>
        </div >
    )
}   