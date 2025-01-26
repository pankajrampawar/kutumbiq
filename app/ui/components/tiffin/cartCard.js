import CheckoutCrumb from "./checkoutCrumb"

export default function CartCard({ cartItems }) {
    return (
        <div className="flex flex-col gap-2 backdrop:blur-sm bg-white/10 shadow-lg py-6 px-4 rounded-[20px]">
            {cartItems.map((item) => {
                return (
                    <div key={item.id} className="flex justify-between w-full">
                        <CheckoutCrumb item={item} />
                    </div>
                )
            })}
        </div>
    )
}