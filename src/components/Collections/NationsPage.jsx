import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Catalogue from '../../pages/Catalogue';
import Loading from '../Common/Loading';

const NationsPage = () => {
    const { getProductsByCategory, products, isLoading, error } = useContext(ShopContext);
    useEffect(() => {
        getProductsByCategory('nations');
    }, []);

    if (isLoading) return <Loading/>;
    if (error) return <div>Error: {error.message}</div>;

    return <Catalogue title="Nations" products={products} />;
};

export default NationsPage;