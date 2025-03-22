import BgBlurCard from "../../bgBlurCard";
import { montserrat } from "../../fonts";
import { IndianRupeeIcon } from "lucide-react";

export default function BillCard({ total, couponApplied }) {

    const discountedPrice = total * 0.25;
    const afterCouponPrice = total * 0.5;

    const getDiscountedPrice = (total) => {
        if (total < 229) {
            let netTotal = total;
            if (couponApplied) {
                netTotal = Math.ceil(total * 2);
            }
            return netTotal;
        } else if (total > 229) {
            let finalPrice;
            if (!couponApplied) {
                const discountedPrice = total * 0.25;
                finalPrice = total - Math.ceil(discountedPrice)
            } else {
                finalPrice = Math.ceil(total * 0.5)
            }
            return finalPrice;
        }
    }

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

                    {couponApplied &&
                        <div className="flex justify-between items-center text-textAlt text-semibold">
                            <p className="text-green-700 font-semibold">NEW50 🎉</p>
                            <p>-{afterCouponPrice}</p>
                        </div>
                    }

                    {total && !couponApplied && total > 229 && <div className="flex justify-between items-center text-textAlt text-semibold">
                        <p className="text-green-700 font-semibold">Kutumbiq OP 🎉</p>
                        <p>-{discountedPrice}</p>
                    </div>}

                    <div className="flex justify-between text-xl font-semibold pt-2 border-t mt-2">
                        <p>Total</p>
                        <p className="flex items-center"><IndianRupeeIcon height={20} />{getDiscountedPrice(total)}</p>
                    </div>
                </div>
            </BgBlurCard>
        </div >
    )
}