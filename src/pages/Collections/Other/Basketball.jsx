import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../Catalogue/Catalogue';
import Loading from '../../../components/Common/Loading';

const Basketball = () => {
    const { getProductsByCategory, products, isLoading, error } = useContext(ShopContext);

    useEffect(() => {
        getProductsByCategory('others', 'basketball');
    }, [getProductsByCategory]);

    if (isLoading) return <Loading />;
    if (error) return <div className='min-h-screen'>Error: {error.message}</div>;
    
    return <Catalogue title="Basketball Shirt" products={products} />; 
}

export default Basketball