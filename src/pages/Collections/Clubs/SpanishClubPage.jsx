import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../Catalogue/Catalogue';
import Loading from '../../../components/Common/Loading';

const SpanishClubPage = () => {
    const { getProductsByCategory, products, isLoading, error } = useContext(ShopContext);

    useEffect(() => {
        getProductsByCategory('clubs', 'spain');
    }, [getProductsByCategory]);

    if (isLoading) return <Loading />;

    if (error) return <div className='min-h-screen'>Error: {error.message}</div>;

    return <Catalogue title="Spanish Club" products={products} />;
}

export default SpanishClubPage;