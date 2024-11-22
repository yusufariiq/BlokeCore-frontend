import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const AsiaPage = () => {
    const { asiaNationProducts } = useContext(ShopContext);
    return <Catalogue title="Asia" products={ asiaNationProducts } />;
}

export default AsiaPage