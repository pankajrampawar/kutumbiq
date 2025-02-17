import BgBlurCard from "../../bgBlurCard";
import { montserrat } from "../../fonts";
import { IndianRupeeIcon } from "lucide-react";

export default function BillCard({ total }) {

    //const discountedPrice = total * 0.25;
    //const finalPrice = total - Math.ceil(discountedPrice)

    return (
        <div>
            <p className={`text-xl ${montserrat.className} font-semibold tracking-wide text-black ml-1 mb-2`}>Billing</p>

            <BgBlurCard>
                <div className={`${montserrat.className} font-medium flex flex-col gap-1`}>
                    <div className={`text-base`}>
                        <div className="flex justify-between">
                            <p>Item Total</p>
                            <p className="flex items-center">{total}</p>
                        </div>
                    </div>

                    <div className={`text-base`}>
                        <div className="flex justify-between">
                            <p>Platform Fee</p>
                            <p className="flex items-center">7</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-textAlt">
                        <p>Discount</p>
                        <p>-7</p>
                    </div>

                    {/* <div className="flex justify-between items-center text-textAlt text-semibold">
                        <p className="text-green-700 font-semibold">Kutumbiq OP 🎉</p>
                        <p>-{discountedPrice}</p>
                    </div> */}

                    <div className="flex justify-between text-xl font-semibold pt-2 border-t mt-2">
                        <p>Total</p>
                        <p className="flex items-center"><IndianRupeeIcon height={20} />{total}</p>
                    </div>
                </div>
            </BgBlurCard>
        </div >
    )
}