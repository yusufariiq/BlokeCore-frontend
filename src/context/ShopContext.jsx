import React, { createContext, useMemo, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { DomesticShippingOptions, InternationalShippingOptions } from '../assets/Assets';
import { CURRENCY, DEFAULT_DELIVERY_FEE } from '../types/constant';
import { CartService } from '../services/CartService';
import { ShippingService } from '../services/ShippingService';
import { formatIDR } from '../utils/utils';
import { useCart } from '../hooks/useCart';
import { useShipping } from '../hooks/useShipping';
import { API_URL } from '../config/apiConfig';

export const ShopContext = createContext();
const ShopContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const { cartItems, addToCart, removeFromCart, updateQuantity, resetCart } = useCart();
    const { selectedCountry, setSelectedCountry, selectedShipping, setSelectedShipping } = useShipping();

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProductsByCategory = async (category, subCategory) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_URL}/api/product/category`, {
                params: { category, subCategory }
            });
            setProducts(response.data.products);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch products:', error.response ? error.response.data : error.message);
            setError(error);
            setIsLoading(false);
        }
    };

    const getLatestProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_URL}/api/product/latest`);
            setProducts(response.data.products);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch latest products:', error.response ? error.response.data : error.message);
            setError(error);
            setIsLoading(false);
        }
    };

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
        resetCart,
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

        formatIDR,
        navigate,
        
        getLatestProducts,
        getProductsByCategory,
        isLoading,
        error
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;