import BgBlurCard from "../../bgBlurCard";
import { montserrat } from "../../fonts";

export default function BillCard({ itemTotal }) {
    return (
        <div>
            <p className={`text-xl ${montserrat.className} font-semibold tracking-wide text-black ml-1`}>Billing</p>

            <div className="mt-2">
                <BgBlurCard>
                    <div><span className="">Item Total</span></div>
                </BgBlurCard>
            </div>
        </div>
    )
}