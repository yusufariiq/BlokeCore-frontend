import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useCart = () => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = useCallback((itemId, size) => {
        if (!size) {
            toast.error('Select product size!');
            return;
        }

        setCartItems(prevItems => {
            const cartData = structuredClone(prevItems);
            
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
                } else {
                    cartData[itemId][size] = 1;
                }
            } else {
                cartData[itemId] = { [size]: 1 };
            }
            toast.success("Successfully added product to cart");
            return cartData;
        });
    }, []);

    const removeFromCart = useCallback((itemId, size) => {
        setCartItems(prevItems => {
            const cartData = structuredClone(prevItems);
            if (cartData[itemId]?.[size]) {
                if (cartData[itemId][size] > 1) {
                    cartData[itemId][size] -= 1;
                } else {
                    delete cartData[itemId][size];
                    if (Object.keys(cartData[itemId]).length === 0) {
                        delete cartData[itemId];
                    }
                }
                toast.success("Product removed from cart");
            }
            return cartData;
        });
    }, []);

    const updateQuantity = useCallback((itemId, size, quantity) => {
        setCartItems(prevItems => {
            const cartData = structuredClone(prevItems);
            if (quantity === 0) {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            } else {
                cartData[itemId][size] = quantity;
            }
            return cartData;
        });
    }, []);

    const resetCart = useCallback(() => {
        setCartItems({});
        toast.success("Cart has been cleared");
    }, []);

    return {
        resetCart,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity
    };
};