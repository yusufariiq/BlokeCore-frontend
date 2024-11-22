import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const AmericanPage = () => {
    const { americaNationProducts } = useContext(ShopContext);
    return <Catalogue title="America" products={americaNationProducts} />;
}

export default AmericanPage