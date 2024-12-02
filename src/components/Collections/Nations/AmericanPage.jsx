import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const AmericanPage = () => {
    const { getProductsByCategory, products, error } = useContext(ShopContext);
    
    useEffect(() => {
        getProductsByCategory('nations', 'america');
    }, [getProductsByCategory]);

    if (error) return <div className='min-h-screen'>Error: {error.message}</div>;

    return <Catalogue title="American Continent" products={products} />;
}

export default AmericanPage;