import React, { useContext, useEffect, } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';
import Loading from '../../Common/Loading';

const ItalyClubPage = () => {
    const { getProductsByCategory, products, isLoading, error } = useContext(ShopContext);

    useEffect(() => {
        getProductsByCategory('clubs', 'italy');
    }, [getProductsByCategory]);

    if (isLoading) return <Loading />;
    if (error) return <div className='min-h-screen'>Error: {error.message}</div>;

    return <Catalogue title="Italian Club" products={products} />;
}

export default ItalyClubPage;