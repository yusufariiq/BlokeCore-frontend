import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../Catalogue/Catalogue';
import Loading from '../../../components/Common/Loading';

const AfricaPage = () => {
    const { getProductsByCategory, products, isLoading, error } = useContext(ShopContext);

    useEffect(() => {
        getProductsByCategory('nations', 'africa');
    }, [getProductsByCategory]);

    if (isLoading) return <Loading />;
    if (error) return <div className='min-h-screen'>Error: {error.message}</div>;

    return <Catalogue title="African Continent" products={products} />;
}

export default AfricaPage;