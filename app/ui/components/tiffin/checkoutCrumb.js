'use client'
import { useCart } from "@/app/context/cartContext"

export default function CheckoutCrumb({ item }) {

    const { addItemToCart, removeItemFromCart } = useCart();

    return (
        <div className="w-full flex justify-between">
            <h3 className="text-lg">{item.title}</h3>
            <section className="flex gap-4">
                <div className="flex gap-3 bg-slate-200 p-1 rounded-lg text-sm">
                    <button onClick={() => removeItemFromCart(item.id)}><span>-</span></button>
                    <p>{item.quantity}</p>
                    <button onClick={() => addItemToCart(item)}><span>+</span></button>
                </div>
                <p>{item.price * item.quantity}</p>
            </section>
        </div>
    )
}