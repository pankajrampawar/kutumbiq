import { montserrat } from "@/app/ui/fonts"
import SimpleFoodCard from "@/app/ui/simpleFoodCard"

export default function TiffinSection() {

    const tiffinItemsList = [
        {
            tiffinItem: "Veg tffin with paneer",
            tiffinPrice: "30",
            src: "/tiffinImage.png"
        },
        {
            tiffinItem: "Veg tffin with paneer 1",
            tiffinPrice: "30",
            src: "/tiffinImage.png"
        },
        {
            tiffinItem: "Veg tffin with paneer 2",
            tiffinPrice: "30",
            src: "/tiffinImage.png"
        },
        {
            tiffinItem: "Veg tffin with paneer 3",
            tiffinPrice: "30",
            src: "/tiffinImage.png"
        },
        {
            tiffinItem: "Veg tffin with paneer 4",
            tiffinPrice: "30",
            src: "/tiffinImage.png"
        },
        {
            tiffinItem: "Veg tffin with paneer 5",
            tiffinPrice: "30",
            src: "/tiffinImage.png"
        },
        {
            tiffinItem: "Veg tffin with paneer 6",
            tiffinPrice: "30",
            src: "/tiffinImage.png"
        },
        {
            tiffinItem: "Veg tffin with paneer 7",
            tiffinPrice: "30",
            src: "/tiffinImage.png"
        },
        {
            tiffinItem: "Veg tffin with paneer 10",
            tiffinPrice: "30",
            src: "/tiffinImage.png"
        }
    ]
    return (
        <div className="mx-[5%] mt-10">
            <article className="flex flex-col gap-2">
                <h2 className={`${montserrat.className} text-xl font-semibold`}>
                    Order Tiffin Online
                </h2>

                <p>Order the best tiffins in your area online, select the menu enter the address and bam save a load of money.</p>
            </article>

            <ul className="flex overflow-x-scroll gap-4 mt-6">
                {
                    tiffinItemsList.map((item) => {
                        return (
                            <li key={item.tiffinItem}>
                                <SimpleFoodCard
                                    tiffinItem={item.tiffinItem}
                                    tiffinPrice={item.tiffinPrice}
                                    src={item.src}
                                    alt={item.alt}
                                />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}