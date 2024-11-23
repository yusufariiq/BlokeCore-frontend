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
        products.filter((product) => {
            return product.category === "Clubs" || 
                   (product.subCategory?.clubs) || 
                   product.subCategory === "Clubs";
        }), 
    []);
    
    const englishClubProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Clubs" &&
                product.subCategory === "English";
        }), 
    []);

    const spanishClubProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Clubs" && 
                   product.subCategory === "Spanish";
        }), 
    []);

    const frenchClubProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Clubs" && 
                   product.subCategory === "French";
        }), 
    []);

    const germanClubProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Clubs" && 
                   product.subCategory === "German";
        }), 
    []);

    const italianClubProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Clubs" && 
                   product.subCategory === "Italian";
        }), 
    []);

    const otherClubProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Clubs" && 
                   (!product.subCategory || 
                   !["English", "Spanish", "French", "German", "Italian"].includes(product.subCategory.clubs));
        }), 
    []);

    const nationProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Nation" || 
                   (product.subCategory?.nations) || 
                   product.subCategory === "Nation";
        }), 
    []);
    
    const americaNationProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Nation" && 
                   product.subCategory === "America";
        }), 
    []);

    const asiaNationProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Nation" && 
                   product.subCategory === "Asia";
        }), 
    []);

    const africaNationProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Nation" && 
                   product.subCategory === "Africa";
        }), 
    []);

    const europeNationProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Nation" && 
                   product.subCategory === "Europe";
        }), 
    []);

    const oceaniaNationProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Nation" && 
                   product.subCategory === "Oceania";
        }), 
    []);
    
    const otherSports = useMemo(() => 
        products.filter((product) => {
            return product.category === "Other" || 
            (product.subCategory?.other) || 
            product.subCategory === "Other";
        }), 
    []);
    
    const basketballProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Others" && 
                   product.subCategory === "Basketball";
        }), 
    []);

    const baseballProducts = useMemo(() => 
        products.filter((product) => {
            return product.category === "Others" && 
                   product.subCategory === "Baseball";
        }), 
    []);

    const latestProducts = useMemo(() => 
        products.filter((product) => {
            return product.latest === true || 
                   product.details?.isLatest === true;
        }), 
    []);

    const deliveryFee = useMemo(() => 
        ShippingService.getShippingFee(
            selectedCountry, 
            selectedShipping, 
            DomesticShippingOptions, 
            InternationalShippingOptions
        ), 
    [selectedCountry, selectedShipping]);

    const productUtils = {
        getProductName: (product) => product.name,
        getProductPrice: (product) => product.price,
        getProductImage: (product) => Array.isArray(product.image) ? product.image : product.images,
        getProductSize: (product) => product.sizes || product.details?.size || [],
        getProductCondition: (product) => product.condition || product.details?.condition
    };

    const value = {
        currency: CURRENCY,
        DEFAULT_DELIVERY_FEE,

        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartCount: () => CartService.calculateCartCount(cartItems),
        getCartAmount: () => formatIDR(CartService.calculateCartTotal(cartItems, products)),
        getCartAmountRaw: () => CartService.calculateCartTotal(cartItems, products),

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

        products,
        productUtils,
        
        clubProducts,
        englishClubProducts,
        spanishClubProducts,
        frenchClubProducts,
        germanClubProducts,
        italianClubProducts,
        otherClubProducts,
        
        nationProducts,
        africaNationProducts,
        americaNationProducts,
        asiaNationProducts,
        europeNationProducts,
        oceaniaNationProducts,

        otherSports,
        baseballProducts,
        basketballProducts,
        
        latestProducts,

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