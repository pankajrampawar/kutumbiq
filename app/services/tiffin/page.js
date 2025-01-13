import TiffinCard from "@/app/ui/components/tiffin/tiffinCard";

export default function Tiffin() {
    return (
        <div>
            {/* hero section */}
            <section>
                <div>
                    <h1>Budget Friendly And Truly Good Meal.</h1>
                </div>

                <div>
                    Location
                </div>
            </section>

            {/* items section */}
            <section>
                {/* section for filters */}
                <section>
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

                    />
                </section>
            </section>
        </div>
    )
}   