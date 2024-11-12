import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Catalogue from '../../pages/Catalogue';

const LatestCollection = () => {
    const { latestProducts } = useContext(ShopContext);
    return <Catalogue title="Latest Collection" products={latestProducts} />;
};

export default LatestCollection;