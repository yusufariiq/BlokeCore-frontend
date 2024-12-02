import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const AsiaPage = () => {
    const { getProductsByCategory, products, error } = useContext(ShopContext);
    
    useEffect(() => {
        getProductsByCategory('nations', 'asia');
    }, [getProductsByCategory]);

    if (error) return <div className='min-h-screen'>Error: {error.message}</div>;

    return <Catalogue title="Asian Continent" products={products} />;
}

export default AsiaPage;