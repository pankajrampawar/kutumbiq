'use client';
import { useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { createContext, useState, useContext } from "react";
import { montserrat } from "../ui/fonts";
import { usePathname, useRouter } from "next/navigation";

const saveCartToLocalStorage = (cartItems, serviceProviderInCart) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("serviceProviderInCart", JSON.stringify(serviceProviderInCart));
};

const loadCartFromLocalStorage = () => {
    const savedCartItems = localStorage.getItem("cartItems");
    const savedServiceProviderInCart = localStorage.getItem("serviceProviderInCart");

    return {
        cartItems: savedCartItems ? JSON.parse(savedCartItems) : [],
        serviceProviderInCart: savedServiceProviderInCart ? JSON.parse(savedServiceProviderInCart) : null,
    };
};

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {

    const router = useRouter();
    const pathname = usePathname()
    const [cartItems, setCartItems] = useState([]);
    const [serviceProviderInCart, setServiceProviderInCart] = useState(null);

    useEffect(() => {
        const { cartItems, serviceProviderInCart } = loadCartFromLocalStorage();
        setCartItems(cartItems);
        setServiceProviderInCart(serviceProviderInCart);
    }, []);

    useEffect(() => {
        saveCartToLocalStorage(cartItems, serviceProviderInCart);
    }, [cartItems, serviceProviderInCart]);

    const addItemToCart = (item) => {
        if (!serviceProviderInCart) {
            setServiceProviderInCart(item.serviceProvider);
        } else if (serviceProviderInCart !== item.serviceProvider) {
            alert("You can only order from one service provider at a time");
            return false;
        }

        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            setCartItems((prevItems) => [...prevItems, item]);
        }

        return true;
    };

    const removeItemFromCart = (itemId) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === itemId);
        if (existingItemIndex === -1) return;

        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity -= 1;

        if (updatedCartItems[existingItemIndex].quantity === 0) {
            updatedCartItems.splice(existingItemIndex, 1);

            if (updatedCartItems.length === 0) {
                setServiceProviderInCart(null);
            }
        }

        setCartItems(updatedCartItems);
    };

    const clearCart = () => {
        setCartItems([]);
        setServiceProviderInCart(null);
    };

    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, serviceProviderInCart, clearCart }}>
            {children}

            {/* Animated Checkout Bar */}
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: pathname === "/services/tiffin/cart" && "/services/tiffin/confirmOrder" && "/form/address" && "/for/phoneNumber" ? "100%" : cartItems.length > 0 ? 0 : "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={clsx(
                    "fixed bottom-0 left-0 w-screen px-2 pb-2 flex justify-between items-center",
                    { "text-xl": cartItems.length > 0 },
                    { "": pathname === "/services/tiffin/cart" }
                )}
            >
                <div className="flex justify-between w-full items-center bg-black h-full p-4 text-white rounded-xl">
                    <span>{cartItems.length} item(s) in cart</span>
                    <button className={`bg-white text-black px-4 py-2 rounded  tracking-wide ${montserrat.className}`}
                        onClick={() => { router.push('/services/tiffin/cart') }}
                    >
                        Checkout
                    </button>
                </div>
            </motion.div>
        </CartContext.Provider >
    );
};