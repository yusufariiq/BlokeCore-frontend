import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Catalogue from '../../pages/Catalogue';
import Loading from '../Common/Loading';

const LatestCollection = () => {
    const { getLatestProducts, products, isLoading, error } = useContext(ShopContext);

    useEffect(() => {
        getLatestProducts();
    }, [getLatestProducts]);

    if (isLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;

    return <Catalogue title="Latest Collection" products={products} />;
};

export default LatestCollection;