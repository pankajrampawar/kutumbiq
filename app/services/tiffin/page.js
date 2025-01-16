'use client'
import TiffinCard from "@/app/ui/components/tiffin/tiffinCard";
import { comfortaa } from "@/app/ui/fonts";
import { useCart } from "@/app/context/cartContext";

const tiffinItems = [
    {
        id: "60d21b4667d0d8992e610c85",
        title: "Panner Veg Thali",
        price: "120",
        description: "Panner Thali with Panner Sabji, 3 chapatis, dal, aachar, simple papad and rice. (serves 1)",
        src: "/image",
        alt: "something",
        serviceProvider: "Lokhande Tiffin Services"
    },
    {
        id: "60d21b4667d0d8992e610c86",
        title: "Dal Fry",
        price: "120",
        description: "Panner Thali with Panner Sabji, 3 chapatis, dal, aachar (serves 1)",
        src: "/image",
        alt: "something",
        serviceProvider: "Lokhande Tiffin Services 1"
    },
    {
        id: "60d21b4667d0d8992e610c87",
        title: "Panner Veg Thali",
        price: "120",
        description: "Panner Thali with Panner Sabji, 3 chapatis, dal, aachar, simple papad and rice. (serves 1)",
        src: "/image",
        alt: "something",
        serviceProvider: "Lokhande Tiffin Services 4"
    },
    {
        id: "60d21b4667d0d8992e610c88",
        title: "Dal Tadka",
        price: "120",
        description: "Panner Thali with Panner Sabji, 3 chapatis, dal, aachar, simple papad and rice. (serves 1)",
        src: "/image",
        alt: "something",
        serviceProvider: "Lokhande Tiffin Services 5"
    },
    {
        id: "60d21b4667d0d8992e610c89",
        title: "Bhendi masala",
        price: "120",
        description: "Panner Thali with Panner Sabji, 3 chapatis, dal, aachar. (serves 1)",
        src: "/image",
        alt: "something",
        serviceProvider: "Lokhande Tiffin Services 1"
    }
];

export default function Tiffin() {

    const { serviceProviderInCart } = useCart();

    return (
        <div>
            {/* hero section */}
            <section className="flex flex-col items-center gap-6">
                <div className="flex justify-center items-center text-center">
                    <h1 className={`text-2xl font-bold ${comfortaa.className}`}>Budget Friendly And Truly Good Meal.</h1>
                </div>

                <div>
                    Location
                </div>
            </section>

            {/* items section */}
            <section>
                {/* section for filters */}
                <section className="flex gap-4">
                    <div>
                        Veg
                    </div>
                    <div>
                        Non Veg
                    </div>
                    <div>
                        Filter
                    </div>
                </section>

                {/* items list */}
                <section>
                    {
                        tiffinItems.map((item) => {
                            if (serviceProviderInCart) {
                                if (serviceProviderInCart === item.serviceProvider) {
                                    return (
                                        < TiffinCard key={item.id} {...item} >
                                        </TiffinCard>
                                    )
                                }
                            } else
                                return (
                                    < TiffinCard key={item.id} {...item} >
                                    </TiffinCard>
                                )
                        })
                    }
                </section>
            </section>
        </div >
    )
}   