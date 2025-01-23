'use client'
import Image from "next/image"
import { Star, Clock, IndianRupee } from "lucide-react"
import { useRouter } from "next/navigation"

export default function VendorCard({ image, name, description, rating, deliveryTime, pricePerMeal, id }) {

    const router = useRouter();

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow max-w-[450px]">
            <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-zinc-900">
                        <Star className="h-4 w-4 fill-current text-orange-500" />
                        <span className="ml-1">{rating}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="ml-1">{deliveryTime}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <IndianRupee className="h-4 w-4" />
                        <span className="ml-1">{pricePerMeal}</span>
                    </div>
                </div>
                <button className={`mt-4 w-full ${id === "nallii's" ? "bg-zinc-700" : "bg-zinc-900"} text-white py-4  rounded-xl hover:bg-black transition-colors"`}
                    onClick={() => {
                        if (id === "nallii's") {
                            alert('Oops! This vendor is closed for today.');
                            return;
                        } else {
                            router.push(`/services/tiffin/menu/${id}`)
                        }
                    }}
                >
                    View Menu
                </button>
            </div>
        </div >
    )
}