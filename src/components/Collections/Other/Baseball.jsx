import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const Baseball = () => {
    const { getProductsByCategory, products, error } = useContext(ShopContext);
    
    useEffect(() => {
        getProductsByCategory('others', 'baseball');
    }, [getProductsByCategory]);

    if (error) return <div className='min-h-screen'>Error: {error.message}</div>;

    return <Catalogue title="Baseball Shirt" products={products} />;
}

export default Baseball;