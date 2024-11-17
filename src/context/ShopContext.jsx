import React, { createContext, useEffect, useState } from 'react'
import { products, DomesticShippingOptions, InternationalShippingOptions } from '../assets/Assets';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "Rp";
    const DEFAULT_DELIVERY_FEE = 20000;
    const [cartItems, setCartItems] = useState({});
    const [selectedCountry, setSelectedCountry] = useState('Indonesia');
    const [selectedShipping, setSelectedShipping] = useState('reguler');
    const navigate = useNavigate();
    
    const getShippingFee = () => {
        if (!selectedShipping) return DEFAULT_DELIVERY_FEE;
        
        const shippingOptions = selectedCountry === 'Indonesia' 
            ? DomesticShippingOptions 
            : InternationalShippingOptions;
        
        const selectedOption = shippingOptions.find(option => option.id === selectedShipping);
        return selectedOption 
            ? parseInt(selectedOption.price.replace(/[^\d]/g, '')) 
            : DEFAULT_DELIVERY_FEE;
    };

    const deliveryFee = getShippingFee();

    const clubProducts = products.filter((product) => product.subCategory === "Clubs");
    const nationProducts = products.filter((product) => product.subCategory === "Nation");
    const latestProducts = products.filter((product) => product.latest === true);

    const formatIDR = (amount) => {
        return amount.toLocaleString('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })
    }

    const addToCart = async (itemId, size) => {
        if (!size){
            toast.error('Select product size!');
            return
        }

        let cartData = structuredClone(cartItems);
        
        if (cartData[itemId]){
            if (cartData[itemId][size]){
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
            toast.success("Successfully added product to cart")
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        } 

        setCartItems(cartData);
    }

    const removeFromCart = (itemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId] && cartData[itemId][size]) {
          if (cartData[itemId][size] > 1) {
            cartData[itemId][size] -= 1;
          } else {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
              delete cartData[itemId];
            }
          }
          setCartItems(cartData);
          toast.success("Product removed from cart");
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmountRaw = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product.id === items);
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    // Handle error
                }
            }
        }
        return totalAmount;
    }

    const getCartAmount = () => {
        return formatIDR(getCartAmountRaw());
    }

    const getShippingOptions = () => {
        return selectedCountry === 'Indonesia' ? DomesticShippingOptions : InternationalShippingOptions;
    };

    useEffect(() => {
        if (selectedCountry === 'Indonesia') {
            setSelectedShipping('reguler');
        } else {
            setSelectedShipping('international');
        }
    }, [selectedCountry]);

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if (cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const value = {
        addToCart,
        cartItems,
        currency,
        clubProducts,
        formatIDR,
        getCartCount,
        getCartAmount,
        getCartAmountRaw,
        deliveryFee,
        DEFAULT_DELIVERY_FEE,
        latestProducts,
        nationProducts,
        navigate,
        products,
        removeFromCart,
        updateQuantity,
        selectedCountry,
        setSelectedCountry,
        selectedShipping,
        setSelectedShipping,
        getShippingOptions,
      };

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;