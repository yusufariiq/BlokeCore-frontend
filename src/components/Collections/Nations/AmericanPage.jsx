import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';
import Loading from '../../Common/Loading';

const AmericanPage = () => {
    const { getProductsByCategory, products, isLoading, error } = useContext(ShopContext);

    useEffect(() => {
        getProductsByCategory('nations', 'america');
    }, [getProductsByCategory]);

    if (isLoading) return <Loading />;
    if (error) return <div className='min-h-screen'>Error: {error.message}</div>;

    return <Catalogue title="American Continent" products={products} />;
}

export default AmericanPage;