import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from '../config/apiConfig';
import { useSelector } from 'react-redux';

export const useCart = () => {
    const { isAuthenticated, token } = useSelector(state => state.auth);
    const [cartItems, setCartItems] = useState({});
    const [isCartLoading, setIsCartLoading] = useState(true);

    const syncCartToServer = useCallback (async (cart) => {
        if (isAuthenticated) {
            try {
                await axios.post(`${API_URL}/api/cart`, { cart }, {
                    headers: { 
                        'Authorization': `Bearer ${token}` 
                    }
                });
            } catch (error) {
                console.error('Cart sync to server failed:', error);
            }
        }
    }, [isAuthenticated, token]);

    const mergeCartData = useCallback((guestCart, serverCart) => {
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
    }, []);
    
    const syncCart = useCallback(async (newCartItems) => {
        if (isAuthenticated && token) {
            try {
                await syncCartToServer(newCartItems);
            } catch (error) {
                console.error('Cart sync error:', error);
            }
        } else {
            sessionStorage.setItem('guest_cart', JSON.stringify(newCartItems));
        }
    }, [isAuthenticated, token, syncCartToServer]);

    
    useEffect(() => {
        let isMounted = true;

        const fetchCart = async () => {
            if (!isMounted) return; 

            if (isAuthenticated && token) {
                try {
                    setIsCartLoading(true);
                    const response = await axios.get(`${API_URL}/api/cart`, {
                        headers: { 
                            'Authorization': `Bearer ${token}` 
                        }
                    });

                    if (!isMounted) return; 
                    
                    const guestCart = JSON.parse(sessionStorage.getItem('guest_cart') || '{}');
                    const mergedCart = mergeCartData(guestCart, response.data.cart || {});
                    
                    setCartItems(mergedCart);

                    if (Object.keys(guestCart).length > 0) {
                        await syncCartToServer(mergedCart);
                        sessionStorage.removeItem('guest_cart');
                    }
                    
                     } catch (error) {
                    if (!isMounted) return;
                    console.error('Error fetching cart:', error);
                    toast.error('Failed to load cart');
                } finally {
                    if (isMounted) {
                        setIsCartLoading(false);
                    }
                }
            } else {
                const guestCart = JSON.parse(sessionStorage.getItem('guest_cart') || '{}');
                setCartItems(guestCart);
                setIsCartLoading(false);
            }
        };

        fetchCart();

        return () => {
            isMounted = false;
        };
        
    }, [isAuthenticated, token]);

    const addToCart = useCallback(async (itemId, size) => {
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
                syncCart(cartData);
                return cartData;
        })
        toast.success("Successfully added product to cart");
    }, [syncCart]);

    const removeFromCart = useCallback(async (itemId, size) => {
        setCartItems(prevItems => {
            const cartData = structuredClone(prevItems || {});
            
            if (cartData[itemId]?.[size]) {
                if (cartData[itemId][size] > 1) {
                    cartData[itemId][size] -= 1;
                } else {
                    delete cartData[itemId][size];
                    if (Object.keys(cartData[itemId]).length === 0) {
                        delete cartData[itemId];
                    }
                }
            }
            syncCart(cartData);
            return cartData;
        });

        toast.success("Product removed from cart");
    }, [syncCart]);


    const updateQuantity = useCallback(async (itemId, size, quantity) => {
        setCartItems(prevItems => {
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
        })

        syncCart(cartData);
        return cartData;
    }, [syncCart]);

    const resetCart = useCallback(async () => {
        setCartItems({});
        
        if (isAuthenticated && token) {
            try {
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
    }, [isAuthenticated, token]);

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        resetCart,
        isCartLoading
    };
};