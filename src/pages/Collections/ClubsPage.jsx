import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Catalogue from '../Catalogue/Catalogue';
import Loading from '../../components/Common/Loading';

const ClubsPage = () => {
    const { getProductsByCategory, products, isLoading, error } = useContext(ShopContext);

    useEffect(() => {
        getProductsByCategory('clubs');
    }, [getProductsByCategory]);

    if (isLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;

    return <Catalogue title="Clubs" products={products} />;
};

export default ClubsPage;