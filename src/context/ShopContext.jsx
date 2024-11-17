import React, { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { products, DomesticShippingOptions, InternationalShippingOptions } from '../assets/Assets';
import { CURRENCY, DEFAULT_DELIVERY_FEE } from '../types/constant';
import { CartService } from '../services/CartService';
import { ShippingService } from '../services/ShippingService';
import { formatIDR } from '../utils/utils';
import { useCart } from '../hooks/useCart';
import { useShipping } from '../hooks/useShipping';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
    const { selectedCountry, setSelectedCountry, selectedShipping, setSelectedShipping } = useShipping();

    const clubProducts = useMemo(() => 
        products.filter((product) => product.subCategory === "Clubs"), 
    []);

    const nationProducts = useMemo(() => 
        products.filter((product) => product.subCategory === "Nation"), 
    []);

    const latestProducts = useMemo(() => 
        products.filter((product) => product.latest === true), 
    []);

    const deliveryFee = useMemo(() => 
        ShippingService.getShippingFee(
            selectedCountry, 
            selectedShipping, 
            DomesticShippingOptions, 
            InternationalShippingOptions
        ), 
    [selectedCountry, selectedShipping]);

    const value = {
        // Constants
        currency: CURRENCY,
        DEFAULT_DELIVERY_FEE,

        // Cart operations
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartCount: () => CartService.calculateCartCount(cartItems),
        getCartAmount: () => formatIDR(CartService.calculateCartTotal(cartItems, products)),
        getCartAmountRaw: () => CartService.calculateCartTotal(cartItems, products),

        // Shipping
        deliveryFee,
        selectedCountry,
        setSelectedCountry,
        selectedShipping,
        setSelectedShipping,
        getShippingOptions: () => ShippingService.getShippingOptions(
            selectedCountry, 
            DomesticShippingOptions, 
            InternationalShippingOptions
        ),

        // Products
        products,
        clubProducts,
        nationProducts,
        latestProducts,

        // Utilities
        formatIDR,
        navigate,
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;