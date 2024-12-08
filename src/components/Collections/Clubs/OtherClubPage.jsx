import React, { useContext, useEffect, } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';
import Loading from '../../Common/Loading';

const OtherClubPage = () => {
    const { getProductsByCategory, products, isLoading, error } = useContext(ShopContext);

    useEffect(() => {
        getProductsByCategory('clubs', 'others');
    }, [getProductsByCategory]);

    if (isLoading) return <Loading />;
    if (error) return <div className='min-h-screen'>Error: {error.message}</div>;

    return <Catalogue title="Others Club" products={products} />;
}

export default OtherClubPage;