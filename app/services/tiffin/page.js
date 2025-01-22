'use client';

import { useState, useEffect } from "react";
import { useAlert } from "@/app/context/alertContext";
import TiffinFilter from "@/app/ui/components/tiffin/tiffinFilter";
import { comfortaa } from "@/app/ui/fonts";
import TiffinPageSkeleton from "@/app/ui/components/tiffin/tiffinPageSkeleton";

export default function Tiffin() {

    const [loadingMenuItems, setLoadingMenuItems] = useState(true);
    const [vegFilter, setVegFilter] = useState(false);
    const [nonVegFilter, setNonVegFilter] = useState(false);
    const [filter, setFilter] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const { addAlert } = useAlert();

    const toggleVegFilter = () => {
        setVegFilter((prev) => {
            if (!prev) {
                setNonVegFilter(false);
                setFilter("veg");
            } else {
                setFilter(null);
            }
            return !prev;
        });
    };

    const toggleNonVegFilter = () => {
        setNonVegFilter((prev) => {
            if (!prev) {
                setVegFilter(false);
                setFilter("non-veg");
            } else {
                setFilter(null);
            }
            return !prev;
        });
    };

    useEffect(() => {
        const getMenuItems = async () => {
            try {
                const response = await fetch("/api/tiffin/getMenu", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData || "Unable to fetch the menu items");
                }

                const data = await response.json();
                setMenuItems(data);
                console.log(data)
                //setLoadingMenuItems(false)
                addAlert('Online order closes at 7PM', 'warning');
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };

        getMenuItems();
    }, [addAlert]);

    return (
        <div>
            {/* Hero section */}
            <section className="flex flex-col items-center gap-6">
                <div className="flex justify-center items-center text-center">
                    <h1 className={`text-2xl font-bold ${comfortaa.className}`}>
                        Budget Friendly And Truly Good Meal.
                    </h1>
                </div>

                <div>

                </div>
            </section>

            {/* Items section */}
            <section>
                {/* Filters section */}
                <section className="flex gap-4 mb-4">
                    <TiffinFilter
                        vegFilter={vegFilter}
                        nonVegFilter={nonVegFilter}
                        toggleVegFilter={toggleVegFilter}
                        toggleNonVegFilter={toggleNonVegFilter}
                    />
                </section>

                {/* Tiffin list section */}
                {
                    loadingMenuItems ?
                        <div>
                            <TiffinPageSkeleton />
                        </div>
                        :
                        <section className="mb-40">
                            {/* <TiffinList menuItems={menuItems} filter={filter} /> */}
                        </section>
                }
            </section>
        </div>
    );
}
