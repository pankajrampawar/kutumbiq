'use client';

import clsx from "clsx";
import FilterBlock from "../../filterBlock";

export default function TiffinFilter({ vegFilter, nonVegFilter, toggleVegFilter, toggleNonVegFilter }) {
    return (
        <div className="flex justify-start gap-4 w-full mx-[3%]">
            {/* <div className="flex gap-2">
                <FilterBlock onClick={toggleVegFilter}>
                    <div
                        className={clsx(
                            "min-w-[30px] min-h-[10px] rounded-full relative",
                            { "bg-zinc-300": !vegFilter },
                            { "bg-green-200": vegFilter }
                        )}
                    >
                        <div
                            className={clsx(
                                "min-w-[15px] min-h-[16px] absolute top-1/2 -translate-y-1/2 flex justify-center items-center border border-green-600 rounded-sm bg-white transition-all ease-in-out",
                                { "left-0": !vegFilter },
                                { "right-0": vegFilter }
                            )}
                        >
                            <div className="rounded-full min-w-[10px] min-h-[10px] bg-green-600"></div>
                        </div>
                    </div>
                </FilterBlock>

                <FilterBlock onClick={toggleNonVegFilter}>
                    <div
                        className={clsx(
                            "min-w-[30px] min-h-[10px] rounded-full relative",
                            { "bg-zinc-300": !nonVegFilter },
                            { "bg-red-200": nonVegFilter }
                        )}
                    >
                        <div
                            className={clsx(
                                "min-w-[15px] min-h-[16px] absolute top-1/2 -translate-y-1/2 flex justify-center items-center border border-red-600 rounded-sm bg-white transition-all ease-in-out",
                                { "left-0": !nonVegFilter },
                                { "right-0": nonVegFilter }
                            )}
                        >
                            <div className="rounded-full min-w-[10px] min-h-[10px] bg-red-600"></div>
                        </div>
                    </div>
                </FilterBlock>
            </div> */}
            <FilterBlock onClick={() => { alert("Honestly, we recommend everything! (We ourselves order every day from here 😋)") }}>Recommended</FilterBlock>
            <FilterBlock onClick={() => { alert("Bhai 2 restraunts mei kya sort he karega? 👀") }}>Sort By</FilterBlock>
        </div>
    );
}
