import React, { createContext } from 'react'
import { products } from '../assets/Assets';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    
    const currency = "Rp";
    const deliveryFee = 20000;

    const value = {
        products,
        currency,
        deliveryFee,
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;