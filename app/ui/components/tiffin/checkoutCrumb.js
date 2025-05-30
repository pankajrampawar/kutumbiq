'use client'
import { useCart } from "@/app/context/cartContext"
import { montserrat } from "../../fonts";

export default function CheckoutCrumb({ item }) {

    const { addItemToCart, removeItemFromCart } = useCart();

    return (
        <div className={`w-full flex justify-between ${montserrat.className} font-medium text-lg`}>
            <h3 className={`text-lg tracking-wide`}>{item.title}</h3>
            <section className="flex gap-4">
                <div className="flex gap-3 bg-white/5 p-1 rounded-lg text-sm min-w-[60px] justify-between relative overflow-hidden">
                    <div className="absolute blur-xl  bg-primary min-w-5 min-h-5 left-0"></div>
                    <div className="absolute blur-xl  bg-rustOrange min-w-5 min-h-5 right-0"></div>
                    <button onClick={() => removeItemFromCart(item.id)} className="realtive z-20"><span>-</span></button>
                    <p>{item.quantity}</p>
                    <button onClick={() => addItemToCart(item)} className="realtive z-20"><span>+</span></button>
                </div>
                <p className="min-w-[40px] flex justify-end">{item.price * item.quantity}</p>
            </section>
        </div>
    )
}