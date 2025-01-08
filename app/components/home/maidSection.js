import { montserrat } from "@/app/ui/fonts"
import SimpleHousingCard from "@/app/ui/simpleHousingCard"

export default function Section() {

    return (
        <div className="mx-[5%] mt-10">
            <article className="flex flex-col gap-1">
                <h2 className={`${montserrat.className} text-xl font-semibold`}>
                    Brokerage Free Housing
                </h2>

                <p>Get the house hassle free and that too wihtout paying massive brokerage. Perfectly handpicked houses for students specifically considering ease of access to your college.</p>
            </article>
            <ul className="flex gap-2 overflow-x-scroll mt-6">
                <li>
                    <SimpleHousingCard
                        specification={item.specification}
                        address={item.address}
                        price={item.price}
                        src={item.src}
                        alt={item.alt}
                    />
                </li>
                <li>

                </li>
            </ul>
        </div>
    )
}