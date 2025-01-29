import BgBlurCard from "../../bgBlurCard"
import CheckoutCrumb from "./checkoutCrumb"

export default function CartCard({ cartItems }) {
    return (
        <BgBlurCard>
            <div className="flex flex-col gap-3">
                {cartItems.map((item) => {
                    return (
                        <div key={item.id} className="flex justify-between w-full">
                            <CheckoutCrumb item={item} />
                        </div>
                    )
                })}
            </div>
        </BgBlurCard>
    )
}