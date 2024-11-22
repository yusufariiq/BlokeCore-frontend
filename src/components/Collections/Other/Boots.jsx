import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const Boots = () => {
    const { bootsProduct } = useContext(ShopContext);
    return <Catalogue title="Boots" products={bootsProduct} />;
}

export default Boots