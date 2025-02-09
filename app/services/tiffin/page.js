"use client"
import { comfortaa, lato, montserrat } from "@/app/ui/fonts";
import { useState, useEffect } from "react";
import { useAlert } from "@/app/context/alertContext";
import TiffinPageSkeleton from "@/app/ui/components/tiffin/tiffinPageSkeleton";
import VendorCard from "@/app/ui/components/tiffin/vendorCard";
import { getMenuItemsFromServer } from "@/app/actions/tiffinActions";
import IndividualItemCard from "@/app/ui/components/tiffin/individualItemCard";
import { XIcon } from "lucide-react";
import Image from "next/image";
import MessageCard from "@/app/ui/messageCard";
import { useRouter } from "next/navigation";

export default function Tiffin() {
    const router = useRouter();
    const [loadingMenuItems, setLoadingMenuItems] = useState(true);
    const [loadingFilter, setLoadingFilter] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [closedForToday, setClosedForToday] = useState(true)
    const { addAlert } = useAlert();
    const [filter, setFilter] = useState(null);

    // useEffect(() => {
    //     const getMenuItems = async () => {
    //         try {
    //             const timestampFromLocalStorage = localStorage.getItem('menuItemsTimestamp');
    //             if (!timestampFromLocalStorage) {
    //                 localStorage.removeItem('menuItems')
    //             }
    //             const menuItemsFromLocalStorage = localStorage.getItem('menuItems');

    //             // Check if the data exists and if it is older than 45 minutes (2700000ms)
    //             const isDataExpired = timestampFromLocalStorage && (Date.now() - timestampFromLocalStorage > 2700000);

    //             // If no menu items or data is expired, fetch from the server
    //             if (!menuItemsFromLocalStorage || isDataExpired) {
    //                 const menuItemsFromServer = await getMenuItemsFromServer();

    //                 if (!menuItemsFromServer) {
    //                     console.error("Some error occurred while fetching menu items.");
    //                 } else {
    //                     // Save the menu items and current timestamp to localStorage
    //                     localStorage.setItem('menuItems', JSON.stringify(menuItemsFromServer));
    //                     localStorage.setItem('menuItemsTimestamp', Date.now().toString());
    //                     setMenuItems(menuItemsFromServer);
    //                 }
    //             } else {
    //                 // If valid data exists in localStorage, parse and use it
    //                 const readableMenuItems = JSON.parse(menuItemsFromLocalStorage);
    //                 setMenuItems(readableMenuItems);
    //             }

    //             setLoadingMenuItems(false);
    //         } catch (error) {
    //             console.error("Error fetching menu items:", error);
    //         }
    //     };
    //     getMenuItems();
    // }, [addAlert]);

    // // Filter items when filter changes
    // useEffect(() => {
    //     const filterItems = async () => {
    //         if (!filter) return;

    //         setLoadingFilter(true);
    //         try {
    //             const filtered = menuItems.filter(vendor =>
    //                 vendor.menu.some(menuItem =>
    //                     menuItem.tags.includes(filter.toLowerCase())
    //                 )
    //             );
    //             setFilteredItems(filtered);
    //         } catch (error) {
    //             console.error("Error filtering items:", error);
    //         }
    //         setLoadingFilter(false);
    //     };

    //     filterItems();
    // }, [filter, menuItems]);


    return (
        <div className="h-screen relative flex justify-center">
            <div className="flex min-w-10 max-w-10 min-h-10 bg-rustOrange absolute left-1/2 -translate-x-1/2 top-28 blur-[46px]"></div>
            <div className="flex min-w-10 max-w-10 min-h-10 bg-brightYellow absolute left-1/2 -translate-x-1/2 top-60 blur-[46px]"></div>

            <div className="text-center space-y-4">
                <div className="mt-32 relative">
                    <MessageCard message="Excited to see you tomorrow" />
                    <Image
                        src="/panda.svg"
                        alt="Panda image"
                        height={300}
                        width={300}
                    />
                </div>
                <h1 className={`text-3xl font-semibold text-center mt-36 tracking-wide ${montserrat.className}`}>This service will <br /> start tomorrow.</h1>
                <div className="flex justify-center w-full">
                    <button onClick={() => router.back()} className={`${montserrat.className} min-w-[140px] font-semibold text-xl bg-primary text-white relative z-40 p-2 px-3 rounded-xl mt-4`}>Go Back</button>
                </div>
            </div>
        </div >
    )

    return (
        <div>
            {/* Hero section */}
            <section className="flex flex-col items-center gap-6">
                <div className="flex justify-center items-center text-center my-[8%] px-[5%] pt-10">
                    <h1 className={`text-2xl font-bold ${comfortaa.className}`}>
                        Budget Friendly And Truly Good Meal.
                    </h1>
                </div>
                <div>

                </div>
            </section>

            {/* Filter section */}
            <section className="flex flex-col gap-3 pb-8 border-b mb-8">
                <div className="flex justify-evenly">
                    <IndividualItemCard
                        src="/eggNoBg.png"
                        alt="Coke bottle and chips"
                        itemName="Egg"
                        onClick={() => setFilter('egg')}
                    />
                    <IndividualItemCard
                        src="/paneer.png"
                        alt="Paneer dish"
                        itemName="Paneer"
                        onClick={() => setFilter('paneer')}
                    />
                    <IndividualItemCard
                        src="/chicken.png"
                        alt="Chicken dish"
                        itemName="Chicken"
                        onClick={() => setFilter('chicken')}
                    />
                </div>
            </section>

            {/* Items section */}
            <section className="flex flex-col gap-6">
                {loadingMenuItems ? (
                    <div>
                        <TiffinPageSkeleton />
                        <TiffinPageSkeleton />
                    </div>
                ) : filter ? (
                    loadingFilter ? (
                        <div>
                            <TiffinPageSkeleton />
                            <TiffinPageSkeleton />
                        </div>
                    ) : (
                        <section className="mb-40 mx-[3%] flex flex-col gap-4 md:flex-row md:w-full flex-wrap">
                            <div className="flex items-center w-full ">
                                <button onClick={() => { setFilter(null) }}>
                                    <XIcon />
                                </button>
                                Suggesting vendors that sell {filter}
                            </div>
                            {filteredItems.map((item) => (
                                <VendorCard
                                    key={item._id}
                                    name={item.name}
                                    description={item.description}
                                    rating={item.rating}
                                    deliveryTime={item.deliveryTime}
                                    pricePerMeal={item.avgPrice}
                                    image={item.image}
                                    id={item._id}
                                    filter={item.filter}
                                />
                            ))}
                        </section>
                    )
                ) : (
                    <section className="mb-40 mx-[3%] flex flex-col gap-4 md:flex-row md:w-full flex-wrap">
                        {menuItems.map((item) => (
                            <VendorCard
                                key={item._id}
                                name={item.name}
                                description={item.description}
                                rating={item.rating}
                                deliveryTime={item.deliveryTime}
                                pricePerMeal={item.avgPrice}
                                image={item.image}
                                id={item._id}
                                filter={item.filter}
                            />
                        ))}
                    </section>
                )}
            </section>
        </div >
    );
}