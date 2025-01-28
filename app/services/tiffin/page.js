'use client';

import { useState, useEffect } from "react";
import { useAlert } from "@/app/context/alertContext";
import TiffinFilter from "@/app/ui/components/tiffin/tiffinFilter";
import { comfortaa } from "@/app/ui/fonts";
import TiffinPageSkeleton from "@/app/ui/components/tiffin/tiffinPageSkeleton";
import VendorCard from "@/app/ui/components/tiffin/vendorCard";
import { getMenuItemsFromServer } from "@/app/actions/tiffinActions";

export default function Tiffin() {

    const [loadingMenuItems, setLoadingMenuItems] = useState(true);
    const [vegFilter, setVegFilter] = useState(false);
    const [nonVegFilter, setNonVegFilter] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
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
        if (vegFilter || nonVegFilter) {
            setShowMenu(true);
        }
    }, [vegFilter, nonVegFilter, showMenu])

    useEffect(() => {
        const getMenuItems = async () => {
            try {
                const timestampFromLocalStorage = localStorage.getItem('menuItemsTimestamp');
                if (!timestampFromLocalStorage) {
                    localStorage.removeItem('menuItems')
                }
                const menuItemsFromLocalStorage = localStorage.getItem('menuItems');

                // Check if the data exists and if it is older than 45 minutes (2700000ms)
                const isDataExpired = timestampFromLocalStorage && (Date.now() - timestampFromLocalStorage > 2700000);

                // If no menu items or data is expired, fetch from the server
                if (!menuItemsFromLocalStorage || isDataExpired) {
                    const menuItemsFromServer = await getMenuItemsFromServer();

                    if (!menuItemsFromServer) {
                        console.error("Some error occurred while fetching menu items.");
                    } else {
                        // Save the menu items and current timestamp to localStorage
                        localStorage.setItem('menuItems', JSON.stringify(menuItemsFromServer));
                        localStorage.setItem('menuItemsTimestamp', Date.now().toString());
                        setMenuItems(menuItemsFromServer);
                    }
                } else {
                    // If valid data exists in localStorage, parse and use it
                    const readableMenuItems = JSON.parse(menuItemsFromLocalStorage);
                    setMenuItems(readableMenuItems);
                }

                setLoadingMenuItems(false);
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
                <div className="flex justify-center items-center text-center my-[8%] px-[5%]">
                    <h1 className={`text-2xl font-bold ${comfortaa.className}`}>
                        Budget Friendly And Truly Good Meal.
                    </h1>
                </div>

                <div>

                </div>
            </section>

            {/* Items section */}
            <section className="flex flex-col gap-6">
                {/* Filters section */}
                <section className="flex gap-4  border-b pb-4">
                    <TiffinFilter
                        vegFilter={vegFilter}
                        nonVegFilter={nonVegFilter}
                        toggleVegFilter={toggleVegFilter}
                        toggleNonVegFilter={toggleNonVegFilter}
                    />
                </section>


                {loadingMenuItems
                    ?
                    <div>
                        <TiffinPageSkeleton />
                        <TiffinPageSkeleton />
                    </div>
                    :
                    <section className="mb-40 mx-[3%] flex flex-col gap-4 md:flex-row md:w-full flex-wrap">
                        {menuItems.map((item) => {
                            return (
                                <VendorCard
                                    key={item.name}
                                    name={item.name}
                                    description={item.description}
                                    rating={item.rating}
                                    deliveryTime={item.deliveryTime}
                                    pricePerMeal={item.avgPrice}
                                    image={item.image}
                                    id={item._id}
                                />
                            )
                        })}

                    </section>
                }
            </section>
        </div>
    );
}
