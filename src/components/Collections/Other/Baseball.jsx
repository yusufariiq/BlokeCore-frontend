import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const Baseball = () => {
    const { baseballProducts } = useContext(ShopContext);
    return <Catalogue title="Baseball Shirt" products={baseballProducts} />;
}

export default Baseball