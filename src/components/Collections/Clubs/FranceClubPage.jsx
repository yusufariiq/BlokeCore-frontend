import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const FranceClubPage = () => {
    const { getProductsByCategory, products, error } = useContext(ShopContext);
    
    useEffect(() => {
        getProductsByCategory('clubs', 'france');
    }, [getProductsByCategory]);

    if (error) return <div className='min-h-screen'>Error: {error.message}</div>;

    return <Catalogue title="France Club" products={products} />;
}

export default FranceClubPage;