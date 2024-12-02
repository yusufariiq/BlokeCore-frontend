import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Catalogue from '../../pages/Catalogue';

const LatestCollection = () => {
    const { getLatestProducts, products, error } = useContext(ShopContext);
    
    useEffect(() => {
        getLatestProducts();
    }, [getLatestProducts]);
    
    if (error) return <div>Error: {error.message}</div>;

    return <Catalogue title="Latest Collection" products={products} />;
};

export default LatestCollection;