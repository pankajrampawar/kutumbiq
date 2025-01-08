import { montserrat } from "@/app/ui/fonts"
import HolderCard from "@/app/ui/holderCard"
import SimpleHousingCard from "@/app/ui/simpleHousingCard"

export default function MaidSection() {

    return (
        <div className="mx-[5%] mt-10">
            <article className="flex flex-col gap-1">
                <h2 className={`${montserrat.className} text-xl font-semibold`}>
                    Looking for a Maid?
                </h2>

                <p>
                    We connect you with trusted, skilled maids in your area who offer great cooking and cleaning services at affordable prices. Our service plans are designed to suit your needs, whether you require help for just a day, weekly, biweekly, or on a monthly basis. Simply choose a plan that works best for you and enjoy hassle-free home assistance.
                </p>
            </article>
            <ul className="flex gap-2 overflow-x-scroll mt-6">
                <li>
                    <HolderCard
                        src="/maidCleaning.png"
                        alt="maid holding a cloth and cleaning a surface, an illustration to showcase our cleaning service we offer."
                        title="House Cleaning"
                        href="/maid"
                    />
                </li>
                <li>
                    <HolderCard
                        src="/maidCooking.png"
                        alt="maid holding a pan and cooking a meal, an illustration showcasing cooking service we offer."
                        title="Cooking"
                        href="/maid"
                    />
                </li>
            </ul>
        </div>
    )
}