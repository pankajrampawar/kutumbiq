'use client'
import Image from "next/image"
import { Star, Clock, IndianRupee } from "lucide-react"
import { useRouter } from "next/navigation"
import { montserrat, lato } from "../../fonts";

export default function VendorCard({
    image,
    name,
    description,
    rating,
    deliveryTime,
    pricePerMeal,
    id,
    filter // Add filter as a prop
}) {
    const router = useRouter();

    // Utility function to determine if the card is active
    const getCurrentTimeStatus = () => {
        const now = new Date();
        const currentHour = now.getHours();

        if (filter === "7PM") {
            // Allow clicks only between 5 PM and 7 PM
            return currentHour >= 17 && currentHour < 19;
        } else if (filter === "12PM") {
            // Allow clicks only between 5 PM and 12 AM
            return currentHour >= 17 || currentHour < 12;
        }

        return true; // Default to clickable if no filter matches
    };

    const isActive = getCurrentTimeStatus();

    const handleClick = () => {
        if (!isActive) {
            alert("This service is available from 5 PM to 12 AM.");
            return;
        }
        router.push(`/services/tiffin/menu/${id}`);
    };


    console.log(filter)
    return (
        <button
            onClick={handleClick}
            disabled={!isActive}
            className={`transition-shadow max-w-[450px] text-start ${lato.className} ${isActive ? "" : "opacity-50 cursor-not-allowed"
                }`}
        >
            <div
                className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl ${isActive ? "" : "hover:shadow-md"
                    }`}
            >
                <img
                    src={image}
                    alt={name}
                    className={`w-full h-48 object-cover ${isActive ? "" : "grayscale"
                        }`}
                />
                <div className="p-4">
                    <h3
                        className={`text-xl font-semibold mb-2 ${isActive ? "text-gray-900" : "text-gray-500"
                            } ${montserrat.className}`}
                    >
                        {name}
                    </h3>
                    <p className={`mb-4 ${isActive ? "text-gray-600" : "text-gray-400"}`}>
                        {description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-rustOrange ">
                            <Star className="h-4 w-4 fill-current text-orange-500" />
                            <span className="ml-1">{rating}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span className="ml-1">{deliveryTime}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-[16px]">
                            <IndianRupee className="h-4 w-4" />
                            <span className="">{pricePerMeal} / meal</span>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
}