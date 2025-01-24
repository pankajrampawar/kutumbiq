'use client';

import { useState, useEffect } from "react";
import { useAlert } from "@/app/context/alertContext";
import TiffinFilter from "@/app/ui/components/tiffin/tiffinFilter";
import { comfortaa } from "@/app/ui/fonts";
import TiffinPageSkeleton from "@/app/ui/components/tiffin/tiffinPageSkeleton";
import VendorCard from "@/app/ui/components/tiffin/vendorCard";
import ListMenuItems from "@/app/ui/components/tiffin/listMenuItems";
import ClosedToday from "@/app/ui/closedForToday";

export default function Tiffin() {

    const [loadingMenuItems, setLoadingMenuItems] = useState(true);
    const [vegFilter, setVegFilter] = useState(false);
    const [nonVegFilter, setNonVegFilter] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [filter, setFilter] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [closedForToday, setClosedForToday] = useState(true)
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

    // useEffect(() => {
    //     const getMenuItems = async () => {
    //         try {
    //             const response = await fetch("/api/tiffin/getMenu", {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             });

    //             if (!response.ok) {
    //                 const errorData = await response.json();
    //                 throw new Error(errorData || "Unable to fetch the menu items");
    //             }

    //             const data = await response.json();
    //             setMenuItems(data);
    //             localStorage.setItem('menuItems', JSON.stringify(data))
    //             console.log(data)
    //             //setLoadingMenuItems(false)
    //             addAlert('Online order closes at 7PM', 'warning');
    //         } catch (error) {
    //             console.error("Error fetching menu items:", error);
    //         }
    //     };

    //     getMenuItems();
    // }, [addAlert]);

    // useEffect(() => {
    //     const getAllVendors = async () => {
    //         try {
    //             const response = await fetch("/api/tiffin/getAllVendors", {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             });

    //             if (!response.ok) {
    //                 const errorData = await response.json();
    //                 throw new Error("Error Collecting Data", errorData)
    //             }

    //             const vendorsList = await response.json();
    //             setVendors(vendorsList);
    //             addAlert("Online order closes at 7pm", 'warning');
    //         } catch (error) {
    //             console.log("Error Fetching Restaurants", error)
    //         }
    //     }
    // })

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

                {/* Tiffin list section */}
                <section className="mb-40 mx-[3%] flex flex-col gap-4 md:flex-row md:w-full">
                    <VendorCard name="Mauli Hotel" description="Authentic Maharashtrian meal, specialty in non-vegetarian items especially fish." rating="3.9" deliveryTime="9:00 PM" pricePerMeal="95" image="/mauli.png" id="mauli" />
                    <VendorCard name="Nalli's Hotel" description="Pure Veg meal, Maharashtrian style. serving complete thali" rating="4.1" deliveryTime="9:00 PM" pricePerMeal="90" image="/nallii's.png" id="nallii's" />
                </section>
            </section>

            {closedForToday &&
                <ClosedToday />
            }
        </div>
    );
}
