'use client';
import { useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { createContext, useState, useContext } from "react";
import { montserrat } from "../ui/fonts";
import { usePathname, useRouter } from "next/navigation";
import { Delete, DeleteIcon } from "lucide-react";
import { Trash, Trash2, Trash2Icon, TrashIcon } from "lucide-react";

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
                animate={{
                    y:
                        ["/services/tiffin/cart", "/services/tiffin/confirmOrder", "/form/address", "/form/phoneNumber"].includes(pathname)
                            ? "100%"
                            : cartItems.length > 0
                                ? -15
                                : "100%",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={clsx(
                    "fixed bottom-0 left-0 w-screen px-2 pb-2 flex justify-center items-center z-50",
                    { "text-xl": cartItems.length > 0 },
                    { "": pathname === "/services/tiffin/cart" }
                )}
            >
                <div className="flex justify-between items-center w-[90vw] bg-white/20 py-4 px-3 backdrop-blur-lg rounded-[20px] shadow-xl overflow-x-hidden z-50">
                    <div className="flex gap-2">
                        <button onClick={clearCart}>
                            <Trash2Icon strokeWidth={2.2} />
                        </button>
                        <p className={`${montserrat.className} font-medium text-lg`}>{cartItems.length} Item(s) in Cart</p>
                    </div>

                    <div className={`text-white ${montserrat.className} text-xl relative`}>
                        <div className="absolute top-0 left-0 w-2/3 h-2/3 blur-2xl bg-primary"></div>
                        <button className="bg-primary p-2 font-semibold tracking-wider rounded-[10px] relative z-10" onClick={() => { router.push('/services/tiffin/cart') }}>
                            Checkout
                        </button>
                    </div>
                </div>
            </motion.div>
        </CartContext.Provider >
    );
};