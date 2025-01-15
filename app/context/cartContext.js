'use client'
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

import react, { createContext, useState, useContext } from "react";
import { useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
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

    const addItemToCart = (item) => { // Add items to cart
        if (!serviceProviderInCart) {
            setServiceProviderInCart(item.serviceProvider)
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
            setCartItems((prevItems) => [...prevItems, item])
        }

        console.log(cartItems);
        return true;
    }

    const removeItemFromCart = (itemId) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === itemId);

        if (existingItemIndex === -1) return;
        else {
            const updatedCartItems = [...cartItems]

            updatedCartItems[existingItemIndex].quantity -= 1;

            if (updatedCartItems[existingItemIndex].quantity === 0) {
                updatedCartItems.splice(existingItemIndex, 1);

                setCartItems(updatedCartItems);

                if (updatedCartItems.length === 0) {  // Reset service provider if cart is empty
                    setServiceProviderInCart(null);
                }
            }
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, serviceProviderInCart }}>
            {children}
        </CartContext.Provider>
    )
};

