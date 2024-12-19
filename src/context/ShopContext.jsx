import React, { createContext, useCallback, useMemo, useState, useEffect } from 'react';
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
    
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${API_URL}/api/product/list`);
                const fetchedProducts = response.data.product || [];
                const processedProducts = fetchedProducts.map(product => ({
                    ...product,
                    stock: product.stock !== undefined ? product.stock : 0,
                    discount: product.discount !== undefined ? product.discount : 0,
                }));
                setAllProducts(processedProducts);
                setProducts(processedProducts);
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
                console.error('Failed to fetch products:', errorMessage);
                setError({ message: errorMessage });
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    const getProductsByCategory = useCallback((category, subCategory) => {
        if (!category) {
            setProducts(allProducts);
            return;
        }

        const filtered = allProducts.filter(product => {
            const categoryMatch = product.category.toLowerCase() === category.toLowerCase();
            const subCategoryMatch = !subCategory || 
                (product.subCategory && product.subCategory.toLowerCase() === subCategory.toLowerCase());
            
            return categoryMatch && subCategoryMatch;
        });

        setProducts(filtered);
    }, [allProducts]);

    const getLatestProducts = useCallback(() => {
        const latestProducts = allProducts.filter(product => 
            product.details?.isLatest === true
        );
        setProducts(latestProducts);
    }, [allProducts]);

    const searchProducts = useCallback(async (query) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get(`${API_URL}/api/product/search`, {
                params: { q: query }
            });
            setProducts(response.data.products || []);
            return response.data.products || [];
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            console.error('Failed to search products:', errorMessage);
            setError({ message: errorMessage });
            setProducts([]);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deliveryFee = useMemo(() => 
        ShippingService.getShippingFee(
            selectedCountry, 
            selectedShipping, 
            DomesticShippingOptions, 
            InternationalShippingOptions
        ), 
    [selectedCountry, selectedShipping]);

    const value = useMemo(() =>  ({
        // Product-related methods
        products,
        allProducts,
        getProductsByCategory,
        getLatestProducts,
        searchProducts,
        
        // Currency and delivery
        currency: CURRENCY,
        DEFAULT_DELIVERY_FEE,
        deliveryFee,

        // Cart-related methods
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        resetCart,
        getCartCount: () => CartService.calculateCartCount(cartItems),
        getCartAmount: () => formatIDR(CartService.calculateCartTotal(cartItems, allProducts)),
        getCartAmountRaw: () => CartService.calculateCartTotal(cartItems, allProducts),

        // Shipping-related methods
        selectedCountry,
        setSelectedCountry,
        selectedShipping,
        setSelectedShipping,
        getShippingOptions: () => ShippingService.getShippingOptions(
            selectedCountry, 
            DomesticShippingOptions, 
            InternationalShippingOptions
        ),

        // Loading and error states
        isLoading,
        error,

        // Utility methods
        formatIDR,
        navigate, 
    }), [
        products,
        allProducts,
        cartItems,
        error,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        resetCart,
        getLatestProducts,
        getProductsByCategory,
        searchProducts,
    ]);

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;