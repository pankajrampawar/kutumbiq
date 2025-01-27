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
                const menuItemsFromLocalStorage = localStorage.getItem('menuItems')

                if (!menuItemsFromLocalStorage) { // fetches menu item form server
                    const menuItemsFromServer = await getMenuItemsFromServer();

                    if (!menuItemsFromServer) {
                        console.error("Some error occured")
                    }
                    localStorage.setItem('menuItems', JSON.stringify(menuItemsFromServer));
                    setMenuItems(menuItemsFromServer);
                }

                const readableMenuItems = JSON.parse(menuItemsFromLocalStorage);
                setMenuItems(readableMenuItems);
                console.log(menuItems)
                setLoadingMenuItems(false)
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
                    <section className="mb-40 mx-[3%] flex flex-col gap-4 md:flex-row md:w-full">
                        {menuItems.map((item) => {
                            return (
                                <VendorCard name={item.name}
                                    description={item.description}
                                    rating={item.rating}
                                    deliveryTime={item.deliveryTime}
                                    pricePerMeal={item.avgPrice}
                                    image={item.image}
                                    id={item._id}
                                />
                            )
                        })}
                        <VendorCard name="Mauli Hotel" description="Authentic Maharashtiran meal, specialty in non-veg items especially fish." rating="3.9" deliveryTime="9:00 PM" pricePerMeal="95" image="/mauli.png" id="mauli" />
                        <VendorCard name="Nalli's Hotel" description="Pure Veg meal, Maharashtrian style. serving complete thali" rating="4.1" deliveryTime="9:00 PM" pricePerMeal="90" image="/nallii's.png" id="nallii's" />
                    </section>
                }
            </section>
        </div>
    );
}
