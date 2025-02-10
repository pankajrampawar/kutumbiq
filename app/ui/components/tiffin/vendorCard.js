'use client'
import Image from "next/image"
import { Star, Clock, IndianRupee } from "lucide-react"
import { useRouter } from "next/navigation"
import { montserrat, lato } from "../../fonts";
import { getCurrentTimeStatus } from "@/app/actions/tiffinActions";

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

    const isActive = getCurrentTimeStatus(filter);

    const handleClick = () => {
        router.push(`/services/tiffin/menu/${id}`);
        if (!isActive) {
            alert("This service is available from 5 PM to 12 AM.");
            return;
        }
    };


    console.log(filter)
    return (
        <button
            onClick={handleClick}
            className={`transition-shadow max-w-[450px] text-start ${lato.className} ${isActive ? "" : "opacity-70 cursor-not-allowed"
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