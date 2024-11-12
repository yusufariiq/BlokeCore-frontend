import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Catalogue from '../../pages/Catalogue';

const NationsPage = () => {
    const { nationProducts } = useContext(ShopContext);
    return <Catalogue title="Nations" products={nationProducts} />;
};

export default NationsPage;