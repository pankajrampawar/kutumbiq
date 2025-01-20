'use client'

import { useState } from "react"
import FilterBlock from "../../filterBlock"
import clsx from "clsx";

export default function TiffinFilter({ addTiffinFilter }) {

    const [vegFilter, setVegFilter] = useState(false);
    const [nonVegFilter, setNonVegFilter] = useState(false)


    const toggleVegFilter = () => {
        setVegFilter((prev) => {
            if (prev === false) {
                setNonVegFilter(false);
            }

            if (!prev === true) {
                addTiffinFilter("veg")
            } else addTiffinFilter(null);
            return !prev
        })
    }

    const toggleNonVegFilter = () => {
        setNonVegFilter((prev) => {
            if (prev === false) setVegFilter(false)
            if (!prev === true) {
                addTiffinFilter("non-veg");
            } else addTiffinFilter(null)
            return !prev
        })
    }

    return (
        <div className="flex justify-between w-full mx-[3%]">
            <div className="flex gap-2">
                <FilterBlock onClick={toggleVegFilter}>
                    <div className={clsx("min-w-[30px] min-h-[10px] rounded-full relative",
                        { "bg-zinc-300": !vegFilter },
                        { "bg-green-200": vegFilter }
                    )}>
                        <div className={clsx("min-w-[15px] min-h-[16px] absolute top-1/2 -translate-y-1/2 flex justify-center items-center border border-green-600 rounded-sm bg-white transition-all ease-in-out",
                            { "left-0": !vegFilter },
                            { "right-0": vegFilter }
                        )}>
                            <div className="rounded-full min-w-[10px] min-h-[10px] bg-green-600"></div>
                        </div>
                    </div>
                </FilterBlock>

                <FilterBlock onClick={toggleNonVegFilter}>
                    <div className={clsx("min-w-[30px] min-h-[10px] rounded-full relative",
                        { "bg-zinc-300": !nonVegFilter },
                        { "bg-red-200": nonVegFilter }
                    )}>
                        <div className={clsx("min-w-[15px] min-h-[16px] absolute top-1/2 -translate-y-1/2 flex justify-center items-center border border-red-600 rounded-sm bg-white transition-all ease-in-out",
                            { "left-0": !nonVegFilter },
                            { "right-0": nonVegFilter }
                        )}>
                            <div className="rounded-full min-w-[10px] min-h-[10px] bg-red-600"></div>
                        </div>
                    </div>
                </FilterBlock>
            </div>
            <FilterBlock>Recommended</FilterBlock>
            <FilterBlock>Sort By</FilterBlock>
        </div>
    )
}