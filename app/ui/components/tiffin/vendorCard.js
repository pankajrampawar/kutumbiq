'use client'
import Image from "next/image"
import { Star, Clock, IndianRupee } from "lucide-react"
import { useRouter } from "next/navigation"
import { montserrat, lato } from "../../fonts";
import { getCurrentTimeStatus } from "@/app/actions/tiffinActions";
import { motion } from "framer-motion";

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

    const { isActive, alert } = getCurrentTimeStatus(filter);

    const handleClick = () => {
        router.push(`/services/tiffin/menu/${id}`);
    };

    const shakeAnimation = {
        inView: {
            x: [0, -8, 8, -8, 8, -8, 8, -8, 0], // More pronounced horizontal movement
            scale: [1, 1.05, 1, 1.05, 1, 1.05, 1, 1.05, 1], // Slight scaling for emphasis
            transition: {
                duration: 1.2, // Total duration of the animation
                ease: "easeInOut", // Smoother easing
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1], // Evenly spaced keyframes
            },
        },
    };

    console.log(filter)
    return (
        <button
            onClick={handleClick}
            className={`transition-shadow max-w-[450px] text-start ${lato.className} ${isActive ? "" : "opacity-70 cursor-not-allowed"
                }`}
        >
            <div
                className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl relative ${isActive ? "" : "hover:shadow-md"
                    }`}
            >
                <div className="absolute top-0 right-0 z-10">
                    {isActive ? <span className={` ${montserrat.className} p-2 px-3 text-[14px] font-bold text-white rounded bg-gradient-to-b from-rustOrange/70 via-rustOrange to-rustOrange/70 rounded-bl-[20px]`}>
                        25% OFF <span className="text-lg ml-2">🎉</span>
                    </span> :
                        <span className="flex justify-center items-center font-semibold p-1 bg-white">
                            {alert}
                        </span>
                    }
                </div>
                <div className="relative">
                    <img
                        src={image}
                        alt={name}
                        className={`w-full h-48 object-cover ${isActive ? "" : "grayscale"
                            }`}
                    />
                    <motion.div
                        whileInView="inView"
                        viewport={{ once: true }}
                        variants={shakeAnimation}
                        transition={{ delay: 0.6 }}
                        className={` ${name === "Nallii's Kitchen" ? "" : "hidden"} absolute  text-white p-1 bottom-0 ${montserrat.className} text-base font-medium  bg-gradient-to-b from-green-700/70 via-green-700 to-green-700/70`}>
                        Best in Tiffins 🏆
                    </motion.div>
                </div>
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