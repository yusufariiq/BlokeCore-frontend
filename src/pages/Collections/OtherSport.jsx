import React, { useContext, useEffect, } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Catalogue from '../Catalogue/Catalogue';
import Loading from '../../components/Common/Loading';

const OtherSport = () => {
    const { getProductsByCategory, products, isLoading, error } = useContext(ShopContext);

    useEffect(() => {
        getProductsByCategory('others');
    }, [getProductsByCategory]);

    if (isLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;

    return <Catalogue title="Others" products={products} />;
}

export default OtherSport