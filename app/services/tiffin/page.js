import TiffinCard from "@/app/ui/components/tiffin/tiffinCard";
import { comfortaa } from "@/app/ui/fonts";


export default function Tiffin() {
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
                    <TiffinCard
                        title="Panner Veg Thali"
                        price="120"
                        description="Panner Thali with Panner Sabji, 3 chapatis, dal, aachar, simple papad and rice. (serves 1) "
                        src="/image"
                        alt="something"
                        serviceProvider="Lokhande Tiffin Services"
                    />
                    <TiffinCard
                        title="Panner Veg Thali"
                        price="120"
                        description="Panner Thali with Panner Sabji, 3 chapatis, dal, aachar (serves 1) "
                        src="/image"
                        alt="something"
                        serviceProvider="Lokhande Tiffin Services"
                    />
                    <TiffinCard
                        title="Panner Veg Thali"
                        price="120"
                        description="Panner Thali with Panner Sabji, 3 chapatis, dal, aachar, simple papad and rice. (serves 1) "
                        src="/image"
                        alt="something"
                        serviceProvider="Lokhande Tiffin Services"
                    />
                    <TiffinCard
                        title="Panner Veg Thali"
                        price="120"
                        description="Panner Thali with Panner Sabji, 3 chapatis, dal, aachar, simple papad and rice. (serves 1) "
                        src="/image"
                        alt="something"
                        serviceProvider="Lokhande Tiffin Services"
                    />
                    <TiffinCard
                        title="Panner Veg Thali"
                        price="120"
                        description="Panner Thali with Panner Sabji, 3 chapatis, dal, aachar, . (serves 1) "
                        src="/image"
                        alt="something"
                        serviceProvider="Lokhande Tiffin Services"
                    />
                </section>
            </section>
        </div>
    )
}   