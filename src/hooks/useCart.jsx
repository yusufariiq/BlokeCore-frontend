import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config/apiConfig';

export const useCart = () => {
    const { user, isAuthenticated, getAuthToken } = useAuth();
    const [cartItems, setCartItems] = useState({});
    const [isCartLoading, setIsCartLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            if (isAuthenticated) {
                try {
                    setIsCartLoading(true);
                    const token = getAuthToken();
                    const response = await axios.get(`${API_URL}/api/cart`, {
                        headers: { 
                            'Authorization': `Bearer ${token}` 
                        }
                    });
                    
                    const guestCart = JSON.parse(sessionStorage.getItem('guest_cart') || '{}');
                    const mergedCart = mergeCartData(guestCart, response.data.cart || {});
                    
                    setCartItems(mergedCart);
                    
                    await syncCartToServer(mergedCart);
                    
                    sessionStorage.removeItem('guest_cart');
                } catch (error) {
                    console.error('Error fetching cart:', error);
                    toast.error('Failed to load cart');
                } finally {
                    setIsCartLoading(false);
                }
            } else {
                const guestCart = JSON.parse(sessionStorage.getItem('guest_cart') || '{}');
                setCartItems(guestCart);
                setIsCartLoading(false);
            }
        };

        fetchCart();
    }, [isAuthenticated]);

    const syncCart = useCallback(async (newCartItems) => {
        if (isAuthenticated) {
            try {
                await syncCartToServer(newCartItems);
            } catch (error) {
                console.error('Cart sync error:', error);
            }
        } else {
            sessionStorage.setItem('guest_cart', JSON.stringify(newCartItems));
        }
    }, [isAuthenticated]);

    const addToCart = useCallback(async (itemId, size) => {
        if (!size) {
            toast.error('Select product size!');
            return;
        }

        const newCartItems = (prevItems) => {
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
            return cartData;
        };

        setCartItems(newCartItems);
        await syncCart(newCartItems(cartItems));
        toast.success("Successfully added product to cart");
    }, [cartItems, isAuthenticated]);

    const removeFromCart = useCallback(async (itemId, size) => {
        const newCartItems = (prevItems) => {
            const cartData = structuredClone(prevItems || {});
            
            if (cartData[itemId] && cartData[itemId][size]) {
                if (cartData[itemId][size] > 1) {
                    cartData[itemId][size] -= 1;
                } else {
                    delete cartData[itemId][size];
                    
                    if (Object.keys(cartData[itemId]).length === 0) {
                        delete cartData[itemId];
                    }
                }
            }
            return cartData;
        };

        const updatedCart = newCartItems(cartItems);
        
        setCartItems(updatedCart);
        await syncCart(updatedCart);
        toast.success("Product removed from cart");
    }, [cartItems, isAuthenticated]);

    const updateQuantity = useCallback(async (itemId, size, quantity) => {
        const newCartItems = (prevItems) => {
            const cartData = structuredClone(prevItems || {});
            
            if (cartData[itemId] && cartData[itemId][size]) {
                if (quantity === 0) {
                    delete cartData[itemId][size];
                    
                    if (Object.keys(cartData[itemId]).length === 0) {
                        delete cartData[itemId];
                    }
                } else {
                    cartData[itemId][size] = quantity;
                }
            }
            return cartData;
        };

        const updatedCart = newCartItems(cartItems);
        
        setCartItems(updatedCart);
        await syncCart(updatedCart);
    }, [cartItems, isAuthenticated]);

    const resetCart = useCallback(async () => {
        setCartItems({});
        
        if (isAuthenticated) {
            try {
                const token = getAuthToken();
                await axios.delete(`${API_URL}/api/cart`, {
                    headers: { 
                        'Authorization': `Bearer ${token}` 
                    }
                });
            } catch (error) {
                console.error('Reset cart error:', error);
            }
        } else {
            sessionStorage.removeItem('guest_cart');
        }
    }, [isAuthenticated]);

    const mergeCartData = (guestCart, serverCart) => {
        const mergedCart = { ...serverCart };
        
        for (const itemId in guestCart) {
            if (!mergedCart[itemId]) {
                mergedCart[itemId] = guestCart[itemId];
            } else {
                for (const size in guestCart[itemId]) {
                    if (!mergedCart[itemId][size]) {
                        mergedCart[itemId][size] = guestCart[itemId][size];
                    } else {
                        mergedCart[itemId][size] += guestCart[itemId][size];
                    }
                }
            }
        }

        return mergedCart;
    };

    const syncCartToServer = async (cart) => {
        if (isAuthenticated) {
            try {
                const token = getAuthToken();
                await axios.post(`${API_URL}/api/cart`, { cart }, {
                    headers: { 
                        'Authorization': `Bearer ${token}` 
                    }
                });
            } catch (error) {
                console.error('Cart sync to server failed:', error);
            }
        }
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        resetCart,
        isCartLoading
    };
};