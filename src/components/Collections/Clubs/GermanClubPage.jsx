import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const GermanClubPage = () => {
    const { getProductsByCategory, products, error } = useContext(ShopContext);
    
    useEffect(() => {
        getProductsByCategory('clubs', 'german');
    }, [getProductsByCategory]);

    if (error) return <div className='min-h-screen'>Error: {error.message}</div>;

    return <Catalogue title="German Club" products={products} />;
}

export default GermanClubPage;