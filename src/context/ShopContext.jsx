import React, { createContext } from 'react'
import { products } from '../assets/Assets';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    
    const currency = "Rp";
    const deliveryFee = 20000;

    const clubProducts = products.filter((product) => product.subCategory === "Clubs");
    const nationProducts = products.filter((product) => product.subCategory === "Nation");
    const latestProducts = products.filter((product) => product.latest === true);

    const value = {
        clubProducts,
        nationProducts,
        latestProducts,
        currency,
        deliveryFee,
    };

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;