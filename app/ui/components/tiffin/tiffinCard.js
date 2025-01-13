'use client'
import { useState } from "react"

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
        <div>
            <section>
                <article>
                    <h2>{title}</h2>
                    <p><span>{price}</span></p>
                    <p>{description}</p>
                </article>

                <div>
                    <img
                        src={src}
                        alt={alt}
                    />
                    <div>
                        {itemsInCart
                            ?
                            <div>
                                <button ><span onClick={removeItemFromCart}>-</span></button>
                                <button onClick={addItemToCart}><span>+</span></button>
                            </div>
                            :
                            <button onClick={addItemToCart}>
                                <p>Add</p>
                            </button>
                        }
                    </div>
                </div>
            </section>

            <section>
                <div>
                    <p>By: {serviceProvider}</p>
                </div>
            </section>
        </div>
    )
}