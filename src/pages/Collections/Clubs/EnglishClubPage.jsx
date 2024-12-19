import React, { useContext, useEffect, } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../Catalogue/Catalogue';
import Loading from '../../../components/Common/Loading';

const EnglishClubPage = () => {
    const { getProductsByCategory, products, isLoading, error } = useContext(ShopContext);

    useEffect(() => {
        getProductsByCategory('clubs', 'english');
    }, [getProductsByCategory]);

    if (isLoading) return <Loading />;
    if (error) return <div className='min-h-screen'>Error: {error.message}</div>;

    return <Catalogue title="English Club" products={products} />;
}

export default EnglishClubPage;