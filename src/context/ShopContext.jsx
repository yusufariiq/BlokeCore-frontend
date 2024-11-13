import React, { createContext, useEffect, useState } from 'react'
import { products } from '../assets/Assets';
import toast from 'react-hot-toast';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    
    const currency = "Rp";
    const deliveryFee = 20000;
    const [ cartItems, setCartItems ] = useState({});

    const clubProducts = products.filter((product) => product.subCategory === "Clubs");
    const nationProducts = products.filter((product) => product.subCategory === "Nation");
    const latestProducts = products.filter((product) => product.latest === true);
    
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

    useEffect(() => {
        console.log(cartItems);
    },[cartItems])

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
        removeFromCart,
        cartItems,
        currency,
        clubProducts,
        deliveryFee,
        getCartCount,
        latestProducts,
        nationProducts,
        products,
        updateQuantity,
      };

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;