import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const Basketball = () => {
    const { basketballProducts } = useContext(ShopContext);
    return <Catalogue title="Basketball Shirt" products={basketballProducts} />;
}

export default Basketball