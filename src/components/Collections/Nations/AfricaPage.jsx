import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const AfricaPage = () => {
    const { africaNationProducts } = useContext(ShopContext);
    return <Catalogue title="Africa" products={africaNationProducts} />;
}

export default AfricaPage