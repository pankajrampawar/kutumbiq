'use client'
import { useState } from "react"
import { montserrat } from "../../fonts";

export default function TiffinCard({ title, price, description, src, alt, serviceProvider }) {

    const [itemsInCart, setItemsInCart] = useState(0);

    const addItemToCart = () => {
        setItemsInCart(prev => prev + 1);
    };

    const removeItemFromCart = () => {
        setItemsInCart((prev) => {
            if (prev === 0) return 0;
            else {
                return prev - 1;
            }
        });
    };

    return (
        <div className="flex flex-col gap-4 mx-[2%] border-t py-[5%]">
            <section className="flex justify-between gap-2 items-center ">
                <article className="flex-1 ">
                    <h2 className={`text-lg font-semibold ${montserrat.className}`}>{title}</h2>
                    <p className="text-lg"><span>Rs. {price}</span></p>
                    <p className="text-sm">{description}</p>
                </article>

                <div className="relative">
                    <div className="bg-gray-200 aspect-square min-w-[140px] rounded-xl">
                        <img
                            src={src}
                            alt={alt}
                        />
                    </div>
                    <div className="absolute bg-white border border-black rounded-3xl bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                        {itemsInCart
                            ?
                            <div className="flex justify-between text-2xl gap-2 px-4 py-1">
                                <button ><span onClick={removeItemFromCart}>-</span></button>
                                <button onClick={addItemToCart}><span>+</span></button>
                            </div>
                            :
                            <button onClick={addItemToCart} className="px-4 py-1 text-xl">
                                <p>Add</p>
                            </button>
                        }
                    </div>
                </div>
            </section>

            <section>
                <div>
                    <p className="text-sm">By: {serviceProvider}</p>
                </div>
            </section>
        </div>
    )
}